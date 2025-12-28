import "./styles.css"
import { format, compareAsc } from "date-fns";
import { showDialog, closeDialog, extractDataFromForm, displayToDoList } from "./event.js"

function toDoListConsole() {
    const toDoListStorage = [
        {project: "school", title: "Get school supplies", description: "Reminder to buy paper", date: "2025-12-08", priority: "low"},
        {project: "school", title: "Pay tuition", description: "Review or fail", date: "2025-12-10", priority: "medium"},
        {project: "school", title: "Finish scholarship application", description: "Get certificate of indigency", date: "2025-12-30", priority: "high"}
    ]
    
    const checkToDoList = () => toDoListStorage.forEach((list) => {
        console.log(list)
    })

    const addToDoList = (project, title, description, date, priority) => {
        toDoListStorage.push({ project, title, description, date, priority})
    }

    return {
        checkToDoList,
        addToDoList,
        toDoListStorage
    }
}

const currentList = new toDoListConsole()
displayToDoList(currentList.toDoListStorage)

function resetContent() {
    const parentOfListContainer = document.querySelector("ul")
    parentOfListContainer.replaceChildren()
}

// Just buttons
const addTaskButton = document.getElementById("add-task-button")
const addTaskDialog = document.getElementById("add-task-dialog")
const addProjectButton = document.getElementById("add-project-button")
const addProjectDialog = document.getElementById("add-project-dialog")
const cancelDialogProjectButton = document.getElementById("close-project")
const cancelDialogTaskButton = document.getElementById("close-task")
const addTaskForm = document.getElementById("add-task-form")
const addProjectForm = document.getElementById("add-project-form")

addTaskButton.addEventListener("click", () => showDialog(addTaskDialog))
addProjectButton.addEventListener("click", () => showDialog(addProjectDialog))

addTaskDialog.addEventListener("submit", (event) => {
    event.preventDefault()
    extractDataFromForm(currentList.toDoListStorage)
    addTaskForm.reset()
    resetContent()
    displayToDoList(currentList.toDoListStorage)
    closeDialog(addTaskDialog)
})

addProjectDialog.addEventListener("submit", (event) => {
    event.preventDefault()
    addProjectForm.reset()
    closeDialog(addProjectDialog)
})

cancelDialogTaskButton.addEventListener("click", (event) => {
    event.preventDefault()
    closeDialog(addTaskDialog)
})

cancelDialogProjectButton.addEventListener("click", (event) => {
    event.preventDefault()
    closeDialog(addProjectDialog)
})