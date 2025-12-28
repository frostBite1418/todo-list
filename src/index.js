import "./styles.css"
import { format, compareAsc } from "date-fns";
import { showDialog, closeDialog, extractDataFromForm } from "./event.js"

function toDoListConsole() {
    const toDoListStorage = [
        {project: "school", title: "Read chapter 10 - physiology of the brain", description: "Must finish urgently", date: "Jun 9", priority: "high"},
        {project: "school", title: "Apply for the programming varsity tryouts", description: "Review or fail", date: "Jun 9", priority: "high"},
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
currentList.checkToDoList()
currentList.addToDoList("school", "Attending a computer vision workshop", "Learn a thing or two about AI", "June 22", "Medium")


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