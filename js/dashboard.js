Parse.initialize('M7rEpExhQwGyQFhORep60981O9FF83c66vj8SQ1L','LVdjgbIgxWhoqazEsjDTRMTWGKxPPBRzsjuDYKKe');
var logout = document.getElementById('logout');
logout.addEventListener('click', function(){
  Parse.logOut().then(function(res){
    location.href = 'index.html';
  });
});

var createTask = function(){
  var taskName = document.getElementById('task_name');
  var taskType_input = document.getElementById('task_type');
  var taskType = taskType_input.options[taskType_input.selectedIndex].text;
  var taskDiff_input = document.getElementById('diff_level');
  var taskDiff = taskDiff_input.options[taskDiff_input.selectedIndex].value;
  var prioLvl_input = document.getElementById('prio_level');
  var prioLvl = prioLvl_input.options[prioLvl_input.selectedIndex].value;
  var t = new Task();
};
