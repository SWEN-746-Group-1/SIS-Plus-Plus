package com.zeroplusplus.sisplusplus.model;

import java.util.ArrayList;
import java.util.List;

public class Course {
    private String department;
    private int code;
    private int credits;
    private Boolean honorsOnly;
    private List<Enum> semestersOffered;
    private String title;
    private String description;
    private List<Course> prerequisites;

    public Course(){
        this.department= null;
        this.code =0 ;
        this.credits = 0;
        this.honorsOnly = false;
        this.semestersOffered = new ArrayList<>();
        this.title = null;
        this.description = null;
        this.prerequisites = new ArrayList<>();
    }
}
