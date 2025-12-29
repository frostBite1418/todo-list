import deleteImage from "./delete.svg"
import editImage from "./square-edit-outline.svg"
import { format } from "date-fns"

function showDialog(dialog){
    dialog.showModal()
}

function closeDialog(dialog){
    dialog.close()
}

function getToday() {
    const today = new Date()
    return format(today.toLocaleDateString(), "yyyy-MM-dd")
}

function getMonth() {
    const month = new Date()
    if ((month.getMonth() + 1) >= 10)
        return month.getMonth() + 1
    else
        return ("0" + (month.getMonth() + 1))
}

function getList(constraint, list) {
    let newList = []
    list.forEach((item) => {
        if (item["Date"] == constraint) {
            newList.push(item)
        }
    })
    return newList
}

function getMonthList(constraint, list) {
    let newList = []
    list.forEach((item) => {
        if (format(item["Date"], "MM") == constraint) {
            newList.push(item)
        }
    })
    return newList
}

function getCompletedList(constraint, list) {
    let newList = []
    list.forEach((item) => {
        if (item["Completed"] == constraint) {
            newList.push(item)
        }
    })
    return newList
}

function extractDataFromProjectForm() {
    const projectTitle = document.getElementById("project-title")
    return projectTitle.value
}


function extractDataFromForm(currentList) {
    const listTitle = document.getElementById("list-title")
    const listDescription = document.getElementById("list-description")
    const listProject = document.getElementById("project")
    const listDeadline = document.getElementById("deadline")
    const listPriority = document.querySelector('input[name="priority"]:checked')

    const listTitleText = listTitle.value
    const listDescriptionText = listDescription.value
    const listProjectText = listProject.value
    const listDeadlineText = listDeadline.value
    const listPriorityText = listPriority.value

    const newList = {Project: listProjectText, Title: listTitleText, Description: listDescriptionText, Date: listDeadlineText, Priority: listPriorityText, Completed: "No"}
    currentList.push(newList)
}

function deleteList(container, id, currentList, referencedList) {
    container.remove()

    // remove the array
    for (let i = currentList.length - 1; i>=0; i--) {
        if (currentList[i].Title === id) {
            currentList.splice(i, 1)
        }
    }
    for (let i = referencedList.length - 1; i>=0; i--) {
        if (referencedList[i].Title === id) {
            referencedList.splice(i, 1)
        }
    }
}

function editList(id, currentList) {
    const addTaskDialog = document.getElementById("add-task-dialog2")
    const dialogTitle = document.getElementById("list-title2")
    const dialogDescription = document.getElementById("list-description2")
    const dialogDeadline = document.getElementById("deadline2")
    const dialogPriority = document.getElementsByName("priority2")
    const cancelEditTaskButton = document.getElementById("close-task2")
    const submitEditTaskButton = document.getElementById("submit-task2")

    for (let i = currentList.length - 1; i>=0; i--) {
        if (currentList[i].Title === id) {
            dialogTitle.value = currentList[i].Title
            dialogDescription.value = currentList[i].Description
            dialogDeadline.value = currentList[i].Date 
             
            dialogPriority.forEach((radio) => {
                if (radio.value === currentList[i].Priority) {
                    radio.checked = true
                    submitEditTaskButton.addEventListener("click", (event) => {
                        event.preventDefault()
                        currentList[i].Title = dialogTitle.value
                        currentList[i].Description = dialogDescription.value
                        currentList[i].Date = dialogDeadline.value
                        
                        // check priority 
                        const listPriority = document.querySelector('input[name="priority2"]:checked')
                        currentList[i].Priority = listPriority.value
                        resetContent()
                        displayToDoList(currentList, [])
                        closeDialog(addTaskDialog)
                    }, { once: true })
                    cancelEditTaskButton.addEventListener("click", (event) => {
                        event.preventDefault()
                        closeDialog(addTaskDialog)
                    })
                }
            })
        }
    }
    showDialog(addTaskDialog)

}


function displayToDoList(currentList, referencedList) {
    currentList.forEach((item) => {
        const parentOfListContainer = document.querySelector("ul")
        
        const listContainer = document.createElement("li")
        listContainer.classList.add(item["Priority"])
        parentOfListContainer.appendChild(listContainer)

        const divContainerTask = document.createElement("div")
        divContainerTask.classList.add("task")
        listContainer.append(divContainerTask)

        const checkBox = document.createElement("input")
        checkBox.type = "checkbox"
        checkBox.name = item["title"]
        checkBox.id = item["title"]
        checkBox.addEventListener("change", () => {
            item["Completed"] = (item["Completed"] === "No") ? "Yes" : "No"
            if (item["Completed"] === "Yes") 
                label.style.textDecoration = "line-through"
            else
                label.style.textDecoration = "none"
        })
        divContainerTask.appendChild(checkBox)

        const label = document.createElement("label")
        label.for = item["title"]
        label.textContent = item["Title"]
        divContainerTask.appendChild(label)
        
        const divContainerFunctionality = document.createElement("div")
        divContainerFunctionality.classList.add("task-functionality")
        if (item["Completed"] === "Yes") {
            checkBox.checked = true
            label.style.textDecoration = "line-through"
        }
        listContainer.appendChild(divContainerFunctionality)

        // functionality
        // details dialog - elements
        const dialogContainer = document.createElement("dialog")
        document.body.appendChild(dialogContainer)
        Object.keys(item).forEach(key => {
            const divTitleContainer = document.createElement("div")
            dialogContainer.appendChild(divTitleContainer)
            const detail = document.createElement("p")
            detail.textContent = key + ": " + item[key]
            divTitleContainer.appendChild(detail)
        })

        // details dialog - exit
        const divButtonContainer = document.createElement("div")
        dialogContainer.appendChild(divButtonContainer)
        const exitButton = document.createElement("button")
        exitButton.classList.add("close-button")
        exitButton.textContent = "Exit"
        exitButton.addEventListener("click", () => {
            closeDialog(dialogContainer)
        })
        divButtonContainer.appendChild(exitButton)

        // details 
        const details = document.createElement("button")
        details.classList.add("details")
        details.textContent = "Details"
        details.addEventListener("click", () => showDialog(dialogContainer))
        divContainerFunctionality.appendChild(details)

        // date
        const date = document.createElement("span")
        date.classList.add("date")
        date.textContent = item["Date"]
        divContainerFunctionality.appendChild(date)

        // edit
        const editImg = document.createElement("img")
        editImg.classList.add("edit")
        editImg.src = editImage
        editImg.alt = "edit"
        editImg.addEventListener("click", () => {
            editList(item["Title"], currentList)
        })
        divContainerFunctionality.appendChild(editImg)

        // delete
        const deleteImg = document.createElement("img")
        deleteImg.classList.add("delete")
        deleteImg.src = deleteImage
        deleteImg.addEventListener("click", () => {
            deleteList(listContainer, item["Title"], currentList, referencedList)
            changeViewNumber(currentList.length)
        })
        deleteImg.alt = "delete"
        divContainerFunctionality.appendChild(deleteImg)

    })
}

function resetContent() {
    const parentOfListContainer = document.querySelector("ul")
    parentOfListContainer.replaceChildren()
}

function changeViewDisplay(buttonTextContent, list) {
    const viewTitle = document.getElementById("view-title")
    viewTitle.textContent = buttonTextContent

    changeViewNumber(list.length)
}

function changeViewNumber(number) {
    const viewNumber = document.getElementById("view-number")
    viewNumber.textContent = number
}

export { showDialog, closeDialog, extractDataFromForm, displayToDoList, resetContent, changeViewDisplay, changeViewNumber, getToday, getMonth, getList, getMonthList, getCompletedList, extractDataFromProjectForm }