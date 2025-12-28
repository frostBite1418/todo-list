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

    const newList = {project: listProjectText, title: listTitleText, description: listDescriptionText, date: listDeadlineText, priority: listPriorityText}
    currentList.push(newList)
}


function displayToDoList(currentList) {
    currentList.forEach((item) => {
        const parentOfListContainer = document.querySelector("ul")
        
        const listContainer = document.createElement("li")
        listContainer.classList.add(item["priority"])
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
        label.textContent = item["title"]
        divContainerTask.appendChild(label)
        
        const divContainerFunctionality = document.createElement("div")
        divContainerFunctionality.classList.add("task-functionality")
        listContainer.appendChild(divContainerFunctionality)

        const details = document.createElement("button")
        details.classList.add("details")
        details.textContent = "Details"
        divContainerFunctionality.appendChild(details)

        const date = document.createElement("span")
        date.classList.add("date")
        date.textContent = item["date"]
        divContainerFunctionality.appendChild(date)

        const editImg = document.createElement("img")
        editImg.classList.add("edit")
        editImg.src = editImage
        editImg.alt = "edit"
        divContainerFunctionality.appendChild(editImg)

        const deleteImg = document.createElement("img")
        deleteImg.classList.add("delete")
        deleteImg.src = deleteImage
        deleteImg.alt = "delete"
        divContainerFunctionality.appendChild(deleteImg)

    })
}

export { showDialog, closeDialog, extractDataFromForm, displayToDoList }