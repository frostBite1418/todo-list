import "./styles.css"
import { showDialog, closeDialog, extractDataFromForm, displayToDoList, resetContent } from "./event.js"
import { changeViewDisplay, getToday, getMonth, getList, getMonthList, getCompletedList, extractDataFromProjectForm } from "./event.js"

function toDoListConsole() {
    const toDoListStorage = [
        {Project: "School", Title: "Get school supplies", Description: "Reminder to buy paper", Date: "2025-12-08", Priority: "Low", Completed: "No"},
        {Project: "Personal", Title: "Study competitive programming", Description: "For tryout", Date: "2026-10-10", Priority: "Medium", Completed: "No"},
        {Project: "Work", Title: "Finish making blog website", Description: "Clients needs it by the end of this week", Date: "2025-12-29", Priority: "High", Completed: "No"}
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

function getSpecificProjectList(constraint, currentList) {
    const specificProjectList = []
    currentList.forEach((item) => {
        if (item["Project"] == constraint) {
            specificProjectList.push(item)
        }
    })

    return specificProjectList
}

function resetDisplayProject() {
    const viewContainer = document.querySelector(".project-button-container")
    viewContainer.replaceChildren() 
}

function displayProjectList(projectList, allList) {
    resetDisplayProject()
    const viewContainer = document.querySelector(".project-button-container")
    const optionContainer = document.getElementById("project")
    optionContainer.replaceChildren()
    projectList.forEach((project) => {
        const sideButtonDiv = document.createElement("div")
        sideButtonDiv.classList.add("button")

        // length of each project/view
        const sideButton = document.createElement("button")
        sideButton.textContent = project
        sideButton.classList.add("side-button")
        sideButton.id = project

        const option = document.createElement("option")
        option.value = project
        option.textContent = project
        optionContainer.appendChild(option)
        sideButton.addEventListener("click", (event) => {
            const buttonTextContent = event.target.textContent
            const newList = getSpecificProjectList(buttonTextContent, allList)
            changeViewDisplay(buttonTextContent, newList)
            resetContent()
            displayToDoList(newList, allList)
        })
        sideButtonDiv.appendChild(sideButton)

        viewContainer.appendChild(sideButtonDiv)
    })
}


function toDoListDisplay() {
    const currentList = new toDoListConsole()
    changeViewDisplay("All Time", currentList.toDoListStorage)
    displayToDoList(currentList.toDoListStorage, currentList.toDoListStorage)

    // Buttons for viewing
    const todayButton = document.getElementById("today")
    const thisMonthButton = document.getElementById("this-month")
    const allTimeButton = document.getElementById("all-time")
    const completedButton = document.getElementById("completed")
    const projectList = ["School", "Personal", "Work"]

    displayProjectList(projectList, currentList.toDoListStorage)
    function allTimeFunctionality(event) {
        resetContent()
        const buttonTextContent = event.target.textContent
        changeViewDisplay(buttonTextContent, currentList.toDoListStorage)
        displayToDoList(currentList.toDoListStorage, currentList.toDoListStorage)
    }

    function todayFunctionality(event) {
        const today = getToday()
        const buttonTextContent = event.target.textContent
        const newList = getList(today, currentList.toDoListStorage)
        changeViewDisplay(buttonTextContent, newList)
        resetContent()
        displayToDoList(newList, currentList.toDoListStorage)
    }

    function thisMonthFunctionality(event) {
        const month = getMonth()
        const buttonTextContent = event.target.textContent
        const newList = getMonthList(month, currentList.toDoListStorage)
        changeViewDisplay(buttonTextContent, newList)
        resetContent()
        displayToDoList(newList, currentList.toDoListStorage)
    }

    function completedFunctionality(event) {
        const buttonTextContent = event.target.textContent
        const newList = getCompletedList("Yes", currentList.toDoListStorage)
        changeViewDisplay(buttonTextContent, newList)
        resetContent()
        displayToDoList(newList, currentList.toDoListStorage)
    }

    allTimeButton.addEventListener("click", (event) => {
        allTimeFunctionality(event)
    })

    todayButton.addEventListener("click", (event) => {
       todayFunctionality(event)
    })

    thisMonthButton.addEventListener("click", (event) => {
        thisMonthFunctionality(event)
    })

    completedButton.addEventListener("click", (event) => {
       completedFunctionality(event)
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

        // Adds a dynamic on where the task is added
        const viewTitle = document.getElementById("view-title")
        // resets ui
        if (viewTitle.textContent === "Completed"){
            completedButton.click()
        }
        else if (viewTitle.textContent === "This Month") {
            thisMonthButton.click()
        }
        else if (viewTitle.textContent === "Today") {
            todayButton.click()
        } 
        else if (viewTitle.textContent === "All Time"){
            allTimeButton.click()
        } else {
            const project = document.getElementById(viewTitle.textContent)
            console.log(project)
            project.click()
        }

        closeDialog(addTaskDialog)
    })

    addProjectDialog.addEventListener("submit", (event) => {
        event.preventDefault()
        const newProject = extractDataFromProjectForm()
        projectList.push(newProject)
        displayProjectList(projectList, currentList.toDoListStorage)
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