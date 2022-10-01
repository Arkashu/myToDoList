'use strict';
( function (){
    const form = document.getElementById('todoForm');
    const clearButton = document.querySelector('.btn-danger');
    const dataKey = 'todoItem';
    const todoItems = document.querySelector('#todoItems')
    let id = 1;
    if (localStorage.getItem(dataKey) && JSON.parse(localStorage.getItem(dataKey)).length) {
        const data = JSON.parse(localStorage.getItem(dataKey))
        id = data[data.length -1].id
    }

    const renderItem = (todoItem) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('col-4');
        wrapper.setAttribute('data-id', todoItem.id);
        wrapper.innerHTML = `
                       <div class="taskWrapper">
                       <button type="button" class="close" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                        </button>
                            <div class="taskHeading">${todoItem.title}</div>
                          <div class="taskDescription">${todoItem.description}</div>
</div>
                      </div>`;
        todoItems.prepend(wrapper);
    }
    document.addEventListener('DOMContentLoaded', e => {
        if (!localStorage.getItem(dataKey)) return;
        const data = JSON.parse(localStorage.getItem(dataKey))
            .forEach((item) => {
                renderItem(item)
            })
    })
    todoItems.addEventListener('click', e => {
        e.stopPropagation();
        const currentItem = e.target.closest('[data-id]');
        const currentItemId = +currentItem.getAttribute('data-id');
        const allToDos = JSON.parse(localStorage.getItem(dataKey))
            .filter(item => item.id !== currentItemId);
        localStorage.setItem(dataKey, JSON.stringify(allToDos));
        currentItem.remove()

    })
    clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!localStorage.getItem(dataKey)) return;
        localStorage.clear();
        todoItems.innerHTML = '';
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {target} = e;
        let data = target.querySelectorAll('input, textarea')
        data = Array.from(data)
            .reduce((acc, item) => {
                acc[item.name] = item.value
                return acc;
            }, {})
        data.id = id += 1;
        const dataToSave = localStorage.getItem(dataKey) ? JSON.parse(localStorage.getItem(dataKey)) : [];
       dataToSave.push(data);
       localStorage.setItem(dataKey, JSON.stringify(dataToSave))
        renderItem(data);
        const allInputs = target.querySelectorAll('input, textarea');
        allInputs.forEach((item) => {
            item.value = '';
        })
    })
})()