const addInput = document.querySelector('.add-input')
const addBtn = document.querySelector('.add-btn')
const todoList = document.querySelector('.todo-list')


let allTodos = JSON.parse(localStorage.getItem('todos')) || []

addBtn.addEventListener('click', () => {
    addNewItem()
})

addInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNewItem()
    }
})

const addNewItem = () => {
    if (addInput.value.trim() === '') {
        alert('Please Enter Item Name')
        addInput.value = ''
        return
    }
    allTodos = [...allTodos, addInput.value]
    localStorage.setItem('todos', JSON.stringify(allTodos))
    drawList(allTodos)
    addInput.value = ''

}

const clickDeleteBtn = () => {
    const deleteButtons = todoList.querySelectorAll('.delete-btn')
    deleteButtons.forEach((deleteButtons, btnIndex) => {
        deleteButtons.addEventListener('click', () => {
            allTodos = allTodos.filter((_, indexFromStorage) => btnIndex !== indexFromStorage)
            localStorage.setItem('todos', JSON.stringify(allTodos))
            drawList(allTodos)
        })
    })
}

const clickclearBtn = () => {
    const delList = []
    const delSelected = todoList.querySelectorAll('.form-check-input')

    delSelected.forEach((item, idx) => {
        delList[idx] = item.checked
        //--
        //       if (item.checked === true) item.parentElement.remove()
    })

    allTodos = allTodos.filter((_, idx) => delList[idx] === false)

    localStorage.setItem('todos', JSON.stringify(allTodos))
    drawList(allTodos)

}


const drawItem = itemText => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-start', 'align-items-center', 'gap-1')
    const button = document.createElement('button')
    button.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn')
    button.textContent = 'X'
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.classList.add('form-check-input')
    span = document.createElement('span')
    span.innerText = itemText
    li.appendChild(button)
    li.appendChild(input)
    li.appendChild(span)
    todoList.appendChild(li)
}

const listBtn = () => {
    if (allTodos.length > 0) {
        const li = document.createElement('li')
        li.classList.add('list-group-item', 'd-flex', 'justify-content-end', 'align-items-center')
        const button = document.createElement('button')
        button.classList.add('btn', 'btn-danger', 'btn-sm')
        button.textContent = 'Clear Selected'
        button.addEventListener('click', clickclearBtn)
        li.appendChild(button)
        todoList.appendChild(li)
    }
    else {
        const li = document.createElement('li')
        li.classList.add('list-group-item', 'd-flex', 'justify-content-center', 'align-items-center')
        li.textContent = 'Please Add todo Items'
        todoList.appendChild(li)

    }
}

const drawList = (array) => {
    todoList.innerHTML = ''
    array.forEach((todo) => {
        drawItem(todo)
    })
    clickDeleteBtn()
    listBtn()
}

drawList(allTodos)