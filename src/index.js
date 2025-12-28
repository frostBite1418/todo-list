import "./styles.css"
import { showDialog, closeDialog } from "./event.js"

function makeToDoList() {
    // possible additions: date and priority 
    const toDoListStorage = [
        {"School": ["Read chapter 10 - physiology of the brain"]},
        {"School": ["Apply for the programming varsity tryouts"]}
    ]
    
    const checkToDoList = () => toDoListStorage.forEach((project) => {
        console.log(project["School"])
    })

    return {
        toDoListStorage,
        checkToDoList
    }
}

function displayToDoList(view) {
    
}

// buttons
const addTaskButton = document.getElementById("add-task-button")
const addTaskDialog = document.getElementById("add-task-dialog")
const addProjectButton = document.getElementById("add-project-button")
const addProjectDialog = document.getElementById("add-project-dialog")
const submitDialogProjectButton = document.getElementById("submit-project")
const submitDialogTaskButton = document.getElementById("submit-task")
const cancelDialogProjectButton = document.getElementById("close-project")
const cancelDialogTaskButton = document.getElementById("close-task")

addTaskButton.addEventListener("click", () => showDialog(addTaskDialog))
addProjectButton.addEventListener("click", () => showDialog(addProjectDialog))
cancelDialogTaskButton.addEventListener("click", (event) => {
    event.preventDefault()
    closeDialog(addTaskDialog)
})

cancelDialogProjectButton.addEventListener("click", (event) => {
    event.preventDefault()
    closeDialog(addProjectDialog)
})


makeToDoList()