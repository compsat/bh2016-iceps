var Task = Parse.Object.extend("Task",{
  startTask: function(){
    this.hasStarted = true;
    this.timeStarted = moment().now();
  },
  endTask: function(){
    this.hasStarted = false;
    this.isFinished = true;
  },
  setPrioLevel: function(level){
    switch (level) {
      case "Low":
        this.prioLvl = 1;
        break;
      case "Med":
        this.prioLvl = 2;
        break;
      case "High":
        this.prioLvl = 3;
        break;
      default:
        this.prioLvl = 2;
      }
    },
    setTypeOfTask: function(task){
      switch (task) {
        case "Project":
            this.task = 7;
            break;
        case "Paper":
            this.task = 2;
            break;
        case "Orals":
            this.task = 3;
            break;
        case "HW":
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
    },
    setDuration: function(diffLevel, task){
      switch(diffLevel){
          case 1:
              return this.get('task')*0.25;
           case 2:
              return this.get('task')*0.75;
           case 3:
              return this.get('task');
           case 4:
              return this.get('task')*1.25;
           case 5:
              return this.get('task')*1.75;
           default:
              break;

      }
      return 0;
    },
    returnDuration: function(){
        return getDuration(diffLvl, task);
    },
    getIncrement: function(numOfDays){
      switch (numOfDays) {
          case 0:
              return 0;
          case 1:
              return 1;
          default:
              return getIncrement(numOfDays - 1) + getIncrement(numOfDays - 2);
      }
    },
    timeOfFinishing: function(){
        return (this.get('dayAssigned')+this.get('duration'))/24;
    },
    getTimeLeftFromNow: function(){
      var diff = moment(this.get('deadline')).subtract(moment().now());
      return moment(diff).hour().millisecond();
    },
    getTimeLeft: function(){
      var deadline = moment(this.get('deadline'));
      var assigned = moment(this.get('dayAssigned'));
      return deadline.diff(assigned).millisecond();
    },
    timeToStart: function(){
      var howManyTask = getTimeLeft()/this.get('duration');
      var assignedMoment = moment(this.get('dayAssigned'));
      var timeToStart;
      for (var i = 0; i < howManyTask; i++) {
        timeToStart.add(assignedMoment.add(this.get('duration'), 'hours'));
      }
        return timeToStart;
      },
    }
  );
},{});

function addTask(taskObj) {
  // var value = Parse
}
