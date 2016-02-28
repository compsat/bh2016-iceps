var Task = new Parse.Object.extend("Task",{
  startTask: function(){
    this.hasStarted = true;
    this.timeStarted = moment().now();
  },
  
  /* This method is called when a task has been finished or deleted */
  endTask: function(){
    this.hasStarted = false;
    this.isFinished = true;
  },
  /* converts the String priority level to its numerical equivalent
  @param level - can only be "High", "Med", or "Low"; states the level of priority--is "Medium" by default */
  setPrioLevel: function(level){
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
    },
	/* converts the String type of task to its numerical equivalent
	@param task - the type of task */
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
	/*setting a task's duration given the type of task and the difficulty level
	@param diffLevel - the difficulty level specified by the user
	@param task - the type of task specified by the user */
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
	/* returns the duration  */
    returnDuration: function(){
        return getDuration(diffLvl, task);
    },
	/* gives the increment that you add to the priority level as the deadline of the task comes near using the Fibonacci algorithm
	@param days - days left before the deadline 
	@returns equivalent number*/
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
	/* getting the expected time of finish given the time the task was started on and the derived duration*/
    timeOfFinishing: function(){
        return (this.get('timeStarted')+this.get('duration'))/24;
    },
	/* getting time left from current time before deadline */
    getTimeLeftFromNow: function(){
      var diff = moment(this.get('deadline')).subtract(moment().now());
      return moment(diff).hour().millisecond();
    },
	/* getting time left since day assigned before deadline */
    getTimeLeft: function(){
      var deadline = moment(this.get('deadline'));
      var assigned = moment(this.get('dayAssigned'));
      return deadline.diff(assigned);
    },
	/* This method computes for all the possible times that the task might be started
	@return timeToStart - the list of all possible times to start on the task */
    timeToStart: function(){
      var howManyTask = this.getTimeLeft()/this.get('duration');
      var assignedMoment = new Date(this.get('dayAssigned'));
      var timeToStartArr;
      for (var i = 0; i < howManyTask; i++) {
        timeToStart.add(assignedMoment.add(this.get('duration'), 'hours'));
      }
        return assignedMoment.add(this.get('duration'), 'hours');
      },
    }
  );

function addTask(taskObj) {
  // var value = Parse
}
