package com.zeroplusplus.sisplusplus.model;

enum EnrollmentStatus{
    ENROLLED,
    WAITLISTED,
    DROPPED,
    COMPLETE,
    FAILED,
    INCOMPLETE
    //TODO: add names
}
public class Enrollment {
    private CourseSection section;
    private Enrollment alternative;
    private EnrollmentStatus status;
    public Enrollment(){
        //TODO: Implement
        this.section = null;
        this.alternative = null;
        this.status = null;
    }
}
