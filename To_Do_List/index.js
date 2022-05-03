const tasksList = document.getElementById("Maiin");
const Icons = document.getElementsByClassName("icons");
const noTask = document.getElementById("hide");
let count = 0;
/************Select Button Add Task ************/
const addTask = document.querySelector("input[type=button]");
const inputTask = document.querySelector("input[type=text]");

addTask.addEventListener("click", addtask);
/**************function control display none task*************/
function contDisplayNoTask() {
  const taskList = document.getElementsByTagName("li");
  const taskNum = Array.from(taskList).length;
  console.log(taskNum);
  if (taskNum > 0) {
    noTask.classList.add("hide");
  } else {
    noTask.classList.remove("hide");
  }
}

/*****************Add new Task****************/
function addtask() {
  count++;
  let nameTask = document.querySelector("input[type=text]").value;

  let size = nameTask.length;
  if (size > 0 && nameTask != " ") {
    if (count > 0) {
      const tasksInList = document.getElementsByTagName("h2");
      const tasksValues = Array.from(tasksInList);
      for (let i = 0; i < tasksValues.length; i++) {
        if (tasksValues[i].textContent === nameTask) {
          tasksInList[i].parentNode.remove();
          Swal.fire("This Task is Already in list");
          inputTask.focus();
        }
      }

      let newTAsk = document.createElement("li");
      let textTask = document.createElement("h2");
      let icons = document.createElement("div");
      icons.className = "icons";
      icons.innerHTML = `<i id="${count}" class="fa-regular fa-circle-check Done"></i><i id="${count}" class="fa-solid fa-pen-to-square Notes"></i><i id="${count}" class="fa-regular fa-circle-xmark delete"></i>`;
      tasksList.appendChild(newTAsk);
      newTAsk.appendChild(textTask);
      newTAsk.appendChild(icons);
      newTAsk.className = "dis--row space--bet";
      newTAsk.id = count;
      textTask.textContent = nameTask;
      contDisplayNoTask();
      inputTask.focus();
    }
  } else {
    Swal.fire("The Name of Task must contain 1 charcture at least");
    inputTask.focus();
  }
}

/*****************delete & sign complete Task****************/

document.addEventListener("click", function (e) {
  if (e.target.className === "fa-regular fa-circle-xmark delete") {
    const tasks = document.getElementsByTagName("li");
    const tasksArr = Array.from(tasks);
    const childId = e.target.id;
    for (let i = 0; i < tasksArr.length; i++) {
      if (childId == tasksArr[i].id) {
        tasks[i].remove();
      }
    }
    contDisplayNoTask();
  } else if (e.target.className === "fa-regular fa-circle-check Done") {
    /****************Complete Sign****************/
    const tasks = document.getElementsByTagName("li");
    const tasksArr = Array.from(tasks);
    const childId = e.target.id;
    for (let i = 0; i < tasksArr.length; i++) {
      //console.log(tasksArr[i],childId);
      if (childId == tasksArr[i].id) {
        let len = tasksArr[i].getElementsByTagName("*").length;
        if (len <= 5) {
          tasks[i].classList.add("completed");
          let status = document.createElement("span");
          tasks[i].appendChild(status);
          let icons = tasks[i].getElementsByTagName("div");
          icons.className = "icons";
          status.textContent = "Completed!";
          status.classList.add("status");
        }
      }
    }
  }
});
