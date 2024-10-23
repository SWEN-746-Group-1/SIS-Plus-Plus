package com.zeroplusplus.sisplusplus.model;

import java.util.List;

public class CourseSelector implements CourseSelectorInterface{
    private CourseCatalog catalog;

    public CourseSelector(){
        //TODO implement
        this.catalog = null;
    }
    public Boolean validate(Cart cart, Student student){
        return false;
    }

    public List<Enrollment> enroll(Cart cart, Student student){
        return null;
    }
    public List<CourseSection> searchByReqs(Student student){
        return null;
    }
}
