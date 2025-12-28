import "./styles.css"
import { format, compareAsc } from "date-fns";
import { showDialog, closeDialog, extractDataFromForm, displayToDoList, resetContent } from "./event.js"

function toDoListConsole() {
    const toDoListStorage = [
        {Project: "School", Title: "Get school supplies", Description: "Reminder to buy paper", Date: "2025-12-08", Priority: "Low"},
        {Project: "School", Title: "Pay tuition", Description: "Review or fail", Date: "2025-12-10", Priority: "Medium"},
        {Project: "School", Title: "Finish scholarship application", Description: "Get certificate of indigency", Date: "2025-12-30", Priority: "High"}
    ]
    
    const checkToDoList = () => toDoListStorage.forEach((list) => {
        console.log(list)
    })

    const addToDoList = (Project, Title, Description, Date, Priority) => {
        toDoListStorage.push({ Project, Title, Description, Date, Priority})
    }

    return {
        checkToDoList,
        addToDoList,
        toDoListStorage
    }
}

const currentList = new toDoListConsole()
displayToDoList(currentList.toDoListStorage)



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
    // resets answers
    addTaskForm.reset()

    // resets ui
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