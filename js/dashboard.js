'use strict';
Parse.initialize('M7rEpExhQwGyQFhORep60981O9FF83c66vj8SQ1L','LVdjgbIgxWhoqazEsjDTRMTWGKxPPBRzsjuDYKKe');
var logout = document.getElementById('logout');
logout.addEventListener('click', function(){
  Parse.logOut().then(function(res){
    location.href = 'index.html';
  });
});


var createTask = function(){
  var taskName = document.getElementById('task_name').value;
  var taskType_input = document.getElementById('task_type');
  var taskType = taskType_input.options[taskType_input.selectedIndex].text;
  var taskDiff_input = document.getElementById('diff_level');
  var taskDiff = taskDiff_input.options[taskDiff_input.selectedIndex].value;
  var prioLvl_input = document.getElementById('prio_level');
  var prioLvl = prioLvl_input.options[prioLvl_input.selectedIndex].value;
  var deadline = document.getElementById('datepicker').value;
  var currDate = new Date();
  console.log(typeof taskName);
  var task = new Task();
  task.set("dayAssigned", currDate);
  task.set('name', taskName);
  task.set('deadline', )
  task.save({
    success:function(res){
      console.log("Hi");
    },
    error:function(res,error){
      console.log("Error: " + error.code + " " + error.message);
    }
  });
};
var createBtn = document.getElementById('add');
createBtn.addEventListener('click', function(event){
  event.preventDefault();
  createTask();
});
