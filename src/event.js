import deleteImage from "./delete.svg"
import editImage from "./square-edit-outline.svg"

function showDialog(dialog){
    dialog.showModal()
}

function closeDialog(dialog){
    dialog.close()
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

    const newList = {Project: listProjectText, Title: listTitleText, Description: listDescriptionText, Date: listDeadlineText, Priority: listPriorityText}
    currentList.push(newList)
}

function deleteList(container, id, currentList) {
    container.remove()

    // remove the array
    for (let i = currentList.length - 1; i>=0; i--) {
        if (currentList[i].Title === id) {
            currentList.splice(i, 1)
        }
    }
}

function editList(id, currentList) {
    const addTaskDialog = document.getElementById("add-task-dialog")

    for (let i = currentList.length - 1; i>=0; i--) {
        if (currentList[i].Title === id) {
            const dialogTitle = document.getElementById("list-title")
            const dialogDescription = document.getElementById("list-description")
            const dialogDeadline = document.getElementById("deadline")
            const dialogPriority = document.getElementsByName("priority")

            dialogTitle.value = currentList[i].Title
            dialogDescription.value = currentList[i].Description
            dialogDeadline.value = currentList[i].Date
            
            dialogPriority.forEach((radio) => {
                if (radio.value === currentList[i].Priority) {
                    radio.checked = true
                }
            })
            currentList.splice(i, 1)
        }
    }
    showDialog(addTaskDialog)
    displayToDoList(currentList)
}


function displayToDoList(currentList) {
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
        divContainerTask.appendChild(checkBox)

        const label = document.createElement("label")
        label.for = item["title"]
        label.textContent = item["Title"]
        divContainerTask.appendChild(label)
        
        const divContainerFunctionality = document.createElement("div")
        divContainerFunctionality.classList.add("task-functionality")
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
            resetContent()
        })
        divContainerFunctionality.appendChild(editImg)

        // delete
        const deleteImg = document.createElement("img")
        deleteImg.classList.add("delete")
        deleteImg.src = deleteImage
        deleteImg.addEventListener("click", () => {
            deleteList(listContainer, item["Title"], currentList)
        })
        deleteImg.alt = "delete"
        divContainerFunctionality.appendChild(deleteImg)

    })
}

function resetContent() {
    const parentOfListContainer = document.querySelector("ul")
    parentOfListContainer.replaceChildren()
}

export { showDialog, closeDialog, extractDataFromForm, displayToDoList, resetContent }