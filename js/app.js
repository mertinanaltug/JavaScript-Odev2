const taskDOM = document.querySelector("#task");
const buttonDOM = document.querySelector(".button")
const ulDOM = document.querySelector("#list")
const arrayTaskList = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExampleS = document.getElementById('liveToastS')
const toastLiveExampleE = document.getElementById('liveToastE')


window.onload = () => {
    displayItems()

    taskDOM.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            buttonDOM.click();
        }
    })
}

function newElement() {
    if (taskDOM.value == null || taskDOM.value.trim() == "") {
        const toast = new bootstrap.Toast(toastLiveExampleE)
        toast.show()
    } else {
        let liDOM = document.createElement("li");
        liDOM.innerHTML = taskDOM.value
        liDOM.setAttribute("onclick", "checkedClass(event)")
        ulDOM.append(liDOM)

        let spanDOM = document.createElement("span");
        spanDOM.innerHTML = "&times;"
        spanDOM.setAttribute("class", "close")
        spanDOM.setAttribute("onclick", "deleteElement(event)")
        liDOM.append(spanDOM)

        arrayTaskList.push(taskDOM.value);
        localStorage.setItem("tasks", JSON.stringify(arrayTaskList))
        taskDOM.value = ""

        const toast = new bootstrap.Toast(toastLiveExampleS)
        toast.show()
    }

}

function displayItems() {
    for (let index = 0; index < arrayTaskList.length; index++) {
        let liDOM = document.createElement("li");
        liDOM.innerHTML = arrayTaskList[index]
        liDOM.setAttribute("onclick", "checkedClass(event)")
        ulDOM.append(liDOM)
        let spanDOM = document.createElement("span");
        spanDOM.innerHTML = "&times;"
        spanDOM.setAttribute("class", "close")
        spanDOM.setAttribute("onclick", "deleteElement(event)")
        liDOM.append(spanDOM)
    }
}

function deleteElement(e) {
    const element = e.target
    const nameElement = arrayTaskList.indexOf(element.parentNode.childNodes[0].nodeValue)
    arrayTaskList.splice(nameElement, 1)
    localStorage.setItem("tasks", JSON.stringify(arrayTaskList))
    element.parentNode.remove();
}

function checkedClass(event) {
    const element = event.target;
    element.classList.toggle("checked")
}
