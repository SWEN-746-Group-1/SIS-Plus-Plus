package com.zeroplusplus.sisplusplus.model;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class TimeSlot {

    private List<Day> days;
    private LocalTime startTime;
    private LocalTime endTime;
    
    public TimeSlot() {
        days = new ArrayList<>();
        startTime = LocalTime.MIN;
        endTime = LocalTime.MAX;
    }

    public boolean overlaps(TimeSlot timeSlot) {
        return false;
    }
}
