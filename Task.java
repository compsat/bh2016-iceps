
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.LinkedList;
import java.util.Queue;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Pearl Santos
 */
public class Task {
    //String[] prioLevel = {"Low", "Medium", "High"};
    String name;
    Date deadline;
    String task;
    Date dayAssigned;
    int diffLvl;
    int prioLvl;
    int[] answers;
    Queue<Date> timeToStart;
    //String[] weeks = {"M", "T", "W", "Th", "F", "S", "Sun"};
    
    public Task(String name, String t, Date d, Date de, int diff, String prio){
        this.name = name;
        task = t;
        dayAssigned = d;
        deadline = de;
        diffLvl = diff;
        prioLvl = getPrioLevel(prio);
        //answers = timeToStart(getDay(deadline), getDay(dayAssigned), getDuration(diffLvl, task), timeOfFinishing(getDay(dayAssigned), getDuration(diffLvl, task)));
        
    }
    
//    private Date dateMaker(String date){
//        String[] inputs = date.split(" ");
//        return new GregorianCalendar(inputs[0], inputs[1], inputs[2]).getTime();
//    }
    
    private int getPrioLevel(String level){
        int prioLevel = 0;
        switch(level){
            case "Low":
                prioLevel = 1;
                break;
            case "Med":
                prioLevel = 2;
                break;
            case "High":
                prioLevel = 3;
                break;
            default:
                break;
        }
        return prioLevel;
    }
    
//    private int getDay(String day){
//        int dayInt = 0;
//        switch(day){
//            case "Monday":
//                dayInt = 1;
//                break;
//            case "Tuesday":
//                dayInt = 2;
//                break;
//            case "Wednesday":
//                dayInt = 3;
//                break;
//            case "Thursday":
//                dayInt = 4;
//                break;
//            case "Friday":
//                dayInt = 5;
//                break;
//            case "Saturday":
//                dayInt = 6;
//                break;
//            case "Sunday":
//                dayInt = 7;
//                break;
//        }
//        return dayInt*24;
//    }
    
    private double getDuration(int diffLevel,String task){
           switch(diffLevel){
               case 1:
                   return getTypeOfTask(task)*0.25;
                case 2:
                   return getTypeOfTask(task)*0.75;
                case 3:
                   return getTypeOfTask(task);
                case 4:
                   return getTypeOfTask(task)*1.25;
                case 5:
                   return getTypeOfTask(task)*1.75;
                default:
                   break;
                   
           }
           return 0;
    }
    
    public double returnDuration(){
        return getDuration(diffLvl, task);
    }
    
    //returns num of hours it takes to do a task
    private static int getTypeOfTask(String task){
        int daysForTask = 0;
        switch(task){
            case "Project":
                daysForTask = 7;
                break;
            case "Paper":
                daysForTask = 2;
                break;
            case "Orals":
                daysForTask = 3;
                break;
            case "HW":
                daysForTask = 2;
                break;
            case "Exam":
                daysForTask = 2;
                break;
            case "Quiz":
                daysForTask = 1;
                break;
            case "Reading":
                daysForTask = 2;
                break;
            default:
                //the part where you can specify another task
                break;
        }
        return daysForTask*24;
    }
    
    private int getIncrement(int numOfDays){
        switch (numOfDays) {
            case 0:
                return 0;
            case 1:
                return 1;
            default:
                return getIncrement(numOfDays - 1) + getIncrement(numOfDays - 2);
        }
    }
    
//    private int getDuration(String task, int diffLvl){
//        return  diffLvl * getTypeOfTask(task);
//    }
    //finding out which day you're going to finish given the day you started and the duration
    private int timeOfFinishing(int dayStarted, double duration){
        //in days
        return (int) ((dayStarted + duration)/24);
    }
    
    private Queue<Date> timeToStart(Date deadline, Date dayAssigned, int duration){ //must include prioLvl
        //System.out.println(timeOfFinishing + "tof");
        int howManyTask = (int) (getTimeLeft(deadline, dayAssigned)/(duration)); //numOfDay*24 - numOfDay*24
        timeToStart = new LinkedList<>();
        Calendar cal = Calendar.getInstance(); // creates calendar
        cal.setTime(dayAssigned); // sets calendar time/date
        for(int i = 0; i < howManyTask; i++){
            
            cal.add(Calendar.HOUR_OF_DAY, duration);// adds one hour
            timeToStart.add(cal.getTime());
            cal.setTime(cal.getTime());// returns new date object, one hour in the future
            //System.out.println((timeOfFinishing/24*i) + "tof");
           // System.out.println(timeToStart[i] + " " + i);
        }
        return timeToStart;
    }
    
    public Queue<Date> returnQueue(){
        return timeToStart(deadline, dayAssigned, (int) getDuration(diffLvl, task));
    }
    
    private static int getTimeLeft(Date deadline, Date dayAssigned){
        long diff = Math.abs(deadline.getTime() - dayAssigned.getTime());
        long diffHours = diff/(60 * 60 * 1000); //returns hours
        return (int) diffHours;
    }
    
    public int getTimeLeft(Date deadline){
        long diff = Math.abs(deadline.getTime() - Calendar.getInstance().getTime().getTime());
        long diffHours = diff/(60 * 60 * 1000); //returns hours
        return (int) diffHours;
    }
    
//    public int[] returnAnswers(){
//        return ;
//    }
    
    public static void main(String[] args){
        //Algorithms(String t, String d, String de, int diff, int prio)
        //Algorithms algo = new Algorithms("Paper", "Monday", "Friday", 3, "High");
        //int[] tried = algo.timeToStart("Paper", "Friday", "Monday", 3);
//        for(int i = 0; i < algo.answers.length; i++){
//            System.out.println(algo.answers[i]);
//        }
//        double ep = 0.5;
//        System.out.println((int) ep);
        //System.out.println(getTimeLeft(new GregorianCalendar(2016, Calendar.FEBRUARY, 27).getTime(), new GregorianCalendar(2016, Calendar.FEBRUARY, 28).getTime()));
        //timeToStart(new GregorianCalendar(2016, Calendar.MARCH, 2).getTime(), new GregorianCalendar(2016, Calendar.FEBRUARY, 27).getTime(), (int) getDuration(3, "Paper")).stream().forEach((s) -> {
//            System.out.println(s.toString());
//        });
        }
    }
    


