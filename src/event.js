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

export { showDialog, closeDialog, extractDataFromForm }