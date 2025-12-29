import "./styles.css"
import { format, compareAsc } from "date-fns";
import { showDialog, closeDialog, extractDataFromForm, displayToDoList, resetContent } from "./event.js"
import { changeViewNumber, changeViewDisplay } from "./event.js"

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


function toDoListDisplay() {
    const currentList = new toDoListConsole()
    changeViewDisplay("All Time", currentList.toDoListStorage)
    displayToDoList(currentList.toDoListStorage)

    // Buttons for viewing
    const todayButton = document.getElementById("today")
    const thisWeekButton = document.getElementById("this-week")
    const allTimeButton = document.getElementById("all-time")
    const completedButton = document.getElementById("completed")

    allTimeButton.addEventListener("click", (event) => {
        resetContent()
        const buttonTextContent = event.target.textContent
        changeViewDisplay(buttonTextContent, currentList.toDoListStorage)
        displayToDoList(currentList.toDoListStorage)
    })


    // Buttons for adding list and projects
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
        changeViewNumber(currentList.toDoListStorage.length)
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
}


toDoListDisplay()