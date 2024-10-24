package com.zeroplusplus.sisplusplus.model;

import java.util.ArrayList;
import java.util.List;

public class CourseSection extends CartItem {

    private Course course;
    private String instructor;
    private TimeSlot timeSlot;
    private String location;
    private int capacity;
    private List<Enrollment> classList;
    private List<Enrollment> waitlist;

    public CourseSection() {
        course = new Course();
        instructor = "Default";
        timeSlot = new TimeSlot();
        location = "Default";
        capacity = 0;
        classList = new ArrayList<>();
        waitlist = new ArrayList<>();
    }

    @Override
    public void visit(CartVisitor cartVisitor) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'visit'");
    }
    
}
