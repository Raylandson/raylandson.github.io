const input = document.getElementById("task-message-input");
const taskButtons = document.querySelectorAll(".task .button");
const todoContainer = document.getElementById("to-do-container");
const completedContainer = document.getElementById("completed-container");

function updateButtonListener() {
    taskButtons.forEach(buttonFree)
}


async function updateTask(taskId, newState, newMessage = null) {

    console.log(taskId, newState, newMessage)
    const taskData = {
        task_id: taskId, 
        state: newState, 
        message: newMessage 
    }


    try {
        const response = await fetch('https://fastapi-example-2wln.onrender.com/update_task', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Tarefa atualizada com sucesso:', result);

    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
    }

}


function buttonFree(button) {
    button.addEventListener('click', async () => {

        const task = button.parentElement;
        taskId = task.getAttribute("id");
        let state = 0;

        console.log(task.parentElement)
        console.log(todoContainer)

        if (task.parentElement.id === todoContainer.id) {
            state = 1;
        }

        console.log(state, taskId)
        updateTask(taskId, state)

        if (task.parentElement === todoContainer) {
            completedContainer.appendChild(task);
            button.textContent = "Descompletar";

            return;
        }
        todoContainer.appendChild(task);
        button.textContent = "Completar";


    })
}

function editButtonFunc(button) {
    button.addEventListener('click', () => {

    })

}

function deleteButtonFunction(button) {
    button.addEventListener('click', async () => {
        const taskElement = button.parentElement;
        const taskId = taskElement.getAttribute('id');
        try {
            const reponse = await fetch(`https://fastapi-example-2wln.onrender.com/delete_task/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!reponse.ok) {
                throw new Error('Erro: ${response.status} - ${response.statusText}');
            }

            taskElement.remove();
        } catch (error) {
            alert('erro ao deletar Faz o L');
        }
    })
}

function createNewTask(taskMessage, taskId, state = 0) {
    const taskSite = document.createElement('div');
    taskSite.classList.add('task');

    taskSite.setAttribute('id', taskId);

    console.log(taskId)

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = taskMessage;
    //taskInput.disabled = true;

    const taskInput = document.createElement('Input');
    taskInput.value = taskMessage;
    taskInput.style.display = "none";

    const taskButton = document.createElement('button');
    taskButton.classList.add('button');
    taskButton.textContent = 'Completar';

    const editIcon = document.createElement('img');
    editIcon.setAttribute('src', 'frontend/images/icon-editar.svg');
    //editIcon.setAttribute('alt', 'deletar task');
    editIcon.setAttribute('width', '18');
    editIcon.setAttribute('height', '18');

    const editButton = document.createElement('button');
    editButton.classList.add('button');
    editButton.appendChild(editIcon)

    function save_task(){
        taskTitle.textContent = taskInput.value;
        taskTitle.style.display = 'block';
        taskInput.style.display = 'none';
        taskInput.disabled = true;
        
        //editButton.textContent = 'Editar';
        
        let state = 0;
        if (editButton.parentElement.parentElement.id === completedContainer.id){
            state = 1;
        }
        updateTask(editButton.parentElement.getAttribute("id"), state, taskInput.value);
    }

    editButton.addEventListener('click', () => {
        if (taskInput.style.display === 'none') {
            taskTitle.style.display = 'none';
            taskInput.style.display = 'block';
            taskInput.disabled = false;
            taskInput.focus();
            //editButton.textContent = 'Salvar';
        } else {
            save_task();
        }
    });

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter"){
            save_task();
        }
    })

    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', 'frontend/images/icon-remover.svg');
    //deleteIcon.setAttribute('alt', 'deletar task');
    deleteIcon.setAttribute('width', '18');
    deleteIcon.setAttribute('height', '18');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button');
    deleteButton.appendChild(deleteIcon)


    taskSite.appendChild(taskTitle);
    taskSite.appendChild(taskInput);
    taskSite.appendChild(taskButton);
    taskSite.appendChild(editButton);
    taskSite.appendChild(deleteButton);
    
    deleteButtonFunction(deleteButton);
    buttonFree(taskButton);
    
    if (state == 0){
        todoContainer.appendChild(taskSite);
    } else{
        completedContainer.appendChild(taskSite);
    }

}

updateButtonListener();

async function loadTasks() {
    try {
        const response = await fetch('https://fastapi-example-2wln.onrender.com/get_all_tasks');

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const tasks = await response.json();

        tasks.forEach(task => {
            createNewTask(task.message, task._id, task.state);
        });

    } catch (error) {
        alert("erro ao carregar tarefas");
        console.error("erro ao carregar tarefa", error);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

input.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const messageValue = input.value;
        if (messageValue.trim() === '') {
            return;
        }

        const new_task = {
            message: messageValue
        }
        input.value = '';

        try {
            console.log('tentando')
            const response = await fetch('https://fastapi-example-2wln.onrender.com/add_task', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(new_task)
            });
            if (!response.ok) {
                alert('bolsonaro nao criou');

                throw new Error(`Erro: ${response.status} - ${response.statusText}`)
            }

            const json_response = await response.json();
            console.log(json_response.message);
            console.log(json_response._id, ' antes de mandar')
            createNewTask(messageValue, json_response.tarefa._id);

        } catch (error) {
            alert('backend offline, faz o L');
            console.error("Erro ao adicionar item:", error);
        }
    }
});
