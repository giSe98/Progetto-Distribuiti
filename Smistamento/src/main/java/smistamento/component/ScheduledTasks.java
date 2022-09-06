package smistamento.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;

import org.springframework.scheduling.annotation.Scheduled;
import smistamento.entities.Giacenza;
import smistamento.repositories.GiacenzaRepo;

@Component
public class ScheduledTasks {

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat(
            "MM/dd/yyyy HH:mm:ss");

    @Autowired
    private GiacenzaRepo giacenzaRepo;

    @Scheduled(cron = "0 0 0 * * *")
    public void performTaskUsingCron() {
        for(Giacenza g:giacenzaRepo.findAll()){
            Date data = g.getFine();
            if(data.after(new Date())){
                g.getOfferta().setOccupata(false);
            }
        }
        System.out.println("Regular task performed using Cron at "
                + dateFormat.format(new Date()));
    }
}
