'use strict';
Parse.initialize('M7rEpExhQwGyQFhORep60981O9FF83c66vj8SQ1L','LVdjgbIgxWhoqazEsjDTRMTWGKxPPBRzsjuDYKKe');
var logout = document.getElementById('logout');
logout.addEventListener('click', function(){
  Parse.logOut().then(function(res){
    location.href = 'index.html';
  });
});

var locArr = [];

function localTask(dayAssigned,deadline, diffLvl, name, taskType){
  this.name = name;
  this.dayAssigned = dayAssigned;
  this.deadline = deadline;
  this.diffLvl = parseInt(diffLvl);
  this.task = null;
  this.timeStarted = null;
  this.duration = null;
  this.prioLvl = null;
  this.timeToStart = (this.deadline-this.dayAssigned)+this.duration;
  this.setTaskType = function(taskType){
    console.log(taskType)
    switch (taskType) {
      case "Project":
          this.task = 7;
          break;
      case "Paper":
          this.task = 2;
          break;
      case "Orals":
          this.task = 3;
          break;
      case "Homework":
          this.task = 2;
          break;
      case "Exam":
          this.task = 2;
          break;
      case "Quiz":
          this.task = 1;
          break;
      case "Reading":
          this.task = 2;
          break;
      default:
          //the part where you can specify another task
          break;
    }
  };
  this.setDuration = function(diffLevel){
    console.log(diffLevel);

    switch(diffLevel){
        case "1":
            this.duration = this.task*0.25;
            break;
         case "2":
            this.duration = this.task*0.75;
            break;
         case "3":
            this.duration = this.task;
            break;
         case "4":
            this.duration = this.task*1.25;
            break;
         case "5":
            this.duration = this.task*1.75;
            break;
         default:
            break;
    }
  };
  this.setPrioLevel = function(level){
    switch (level) {
      case "Low Priority":
        this.prioLvl = 1;
        break;
      case "Medium Priority":
        this.prioLvl = 2;
        break;
      case "High Priority":
        this.prioLvl = 3;
        break;
      default:
        this.prioLvl = 2;
      }
    };
}

var createTask = function(arr){
  var taskName = document.getElementById('task_name').value;
  var taskType_input = document.getElementById('task_type');
  var taskType = taskType_input.options[taskType_input.selectedIndex].text;
  var taskDiff_input = document.getElementById('diff_level');
  var taskDiff = taskDiff_input.options[taskDiff_input.selectedIndex].value;
  var prioLvl_input = document.getElementById('prio_level');
  var prioLvl = prioLvl_input.options[prioLvl_input.selectedIndex].text;
  var deadline = document.getElementById('datepicker').value;
  var currDate = new Date();
  var local = new localTask(currDate, new Date(deadline), taskDiff, taskName, taskType);
  local.setTaskType(taskType);
  local.setDuration(taskDiff);
  local.setPrioLevel(prioLvl);
  console.log(typeof local.timeToStart);

  addTask(local,arr);
  var locEl = document.createElement('label');
  var locElInput = document.createElement('input');
  locElInput.setAttribute('type','checkbox');
  locElInput.setAttribute('class','task');
  locElInput.innerHTML = local.name;
  locEl.appendChild(locElInput);
  var root = document.getElementById('today');
  appendToDiv(root,locEl);
};
var createBtn = document.getElementById('add');
createBtn.addEventListener('click', function(event){
  event.preventDefault();
  createTask(locArr);
});

function appendToDiv(root,child){
  root.appendChild(child);
}

function addTask(localTask, localTaskArr){
  if(localTaskArr.length == 0){
    localTaskArr.push(localTask);
  } else {
    for(var i = 0; i < localTaskArr.length; i++){
      if(new Date(localTask.timeToStart).getHours() == new Date(localTaskArr[i].timeToStart).getHours()){
        if(localTask.prioLvl == localTaskArr[i].prioLvl){
          if(localTask.diffLvl == localTaskArr[i].diffLvl){
            if(localTask.duration == localTaskArr[i].duration){
              localTaskArr.splice(i,0,localTask);
              break;
            } else if(localTask.duration < localTaskArr[i].duration){
              localTaskArr.splice(i,0,localTask);
              break;
            } else {
              localTaskArr.splice(i+1,0,localTask);
              break;
            }
          } else if(localTask.diffLvl < localTaskArr[i].diffLvl){
            localTaskArr.splice(i,0,localTask);
            break;
          } else {
            localTaskArr.splice(i+1,0,localTask);
            break;
          }
        } else if(localTask.prioLvl > localTaskArr[i].prioLvl){
          localTaskArr.splice(i,0,localTask);
          break;
        } else {
          localTaskArr.splice(i+1,0,localTask);
          break;
        }
      } else if(new Date(localTask.timeToStart).getHours() < new Date(localTaskArr[i].timeToStart).getHours()){
        localTaskArr.splice(i,0,localTask);
        break;
      } else {
        localTaskArr.splice(i+1,0,localTask);
        break;
      }
      if(i == localTaskArr){
        localTaskArr.push(localTask);
      }
    }
  }
}
