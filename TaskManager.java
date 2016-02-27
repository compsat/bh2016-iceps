
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.LinkedList;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Pearl Santos
 */
public class TaskManager {
     static LinkedList<Task> llTask = new LinkedList<>();
        

    //ArrayList<Task> tasks = new ArrayList<>();

    public TaskManager() {

    }

    public static void main(String[] args) {
        TaskManager tasks = new TaskManager();
        Task t1 = new Task("EJ Task", "Paper", new GregorianCalendar(2016, Calendar.FEBRUARY, 27).getTime(), new GregorianCalendar(2016, Calendar.MARCH, 2).getTime(), 3, "Low");
        Task t2 = new Task("Chi Task", "Reading", new GregorianCalendar(2016, Calendar.MARCH, 3).getTime(), new GregorianCalendar(2016, Calendar.MARCH, 9).getTime(), 3, "High");
        Task t3 = new Task("Pearl Task", "Paper", new GregorianCalendar(2016, Calendar.FEBRUARY, 27).getTime(), new GregorianCalendar(2016, Calendar.MARCH, 2).getTime(), 3, "High");
        Task t4 = new Task("Ian Task", "Reading", new GregorianCalendar(2016, Calendar.MARCH, 3).getTime(), new GregorianCalendar(2016, Calendar.MARCH, 9).getTime(), 3, "High");
        tasks.addTask(t1);
        tasks.addTask(t2);
        tasks.addTask(t3);
        tasks.addTask(t4);
        
        for(Task lol: llTask){
            System.out.println("llTask "+lol.name);
        }
        Task t5 = new Task("Ian Task", "Reading", new GregorianCalendar(2016, Calendar.MARCH, 3).getTime(), new GregorianCalendar(2016, Calendar.MARCH, 9).getTime(), 5, "Low");
        tasks.update(t5);
        
         for(Task lol: llTask){
            System.out.println("llTask "+lol.name);
        }
    }
    
    public void update(Task newTask){
     for(Task t: llTask){
         if(t.name.equals(newTask.name)){
             llTask.remove(t);
             break;
         }
     }
     addTask(newTask);
        //llTask.add(newTask);
        //addTask(newTask)
    }

    private void addTask(Task t) {
        //tasks.add(t);
//        Collections.sort(tasks, (Task o1, Task o2) -> {
//            long val = Math.abs(o1.returnQueue().peek().getTime() - o2.returnQueue().peek().getTime());
//            return (int) val;
//        });
        System.out.println(t.name);
        if (llTask.isEmpty()) {
            llTask.add(t);
            
        } else {
            int s = llTask.size();
            System.out.println(s);
            for (int i = 0; i < s; i++) {
                if (llTask.get(i).chosenDate().equals(t.chosenDate())) {
                    if(llTask.get(i).prioLvl == t.prioLvl){
                                                   System.out.println("IAN IS ALLSKID");
//                        System.out.println("ll prio: " + llTask.get(i).prioLvl);
//                        System.out.println("t prio: " + t.prioLvl);
                        if(llTask.get(i).diffLvl == t.diffLvl){
                            if(llTask.get(i).returnDuration()==t.returnDuration()){
                                llTask.add(i + 1, t);
                                break;
                            } else if(llTask.get(i).returnDuration()>t.returnDuration()){
                                llTask.add(i, t);
                                break;
                            }
                        } else if(llTask.get(i).diffLvl < t.diffLvl){
 
                            llTask.add(i, t);
                            break;
                        }
                    } else if (llTask.get(i).prioLvl < t.prioLvl){
                           llTask.add(i, t);
                           break;
                    }
                } else if(llTask.get(i).chosenDate().compareTo( t.chosenDate()) == 1){
                        llTask.add(i, t);   
                        break;
                }
                if(i==s-1){
                    llTask.add(t);
                    System.out.println("here");
                    break;
                }
                    
                        
                        
                } 
            }

        }
       

    }
    
    

