package com.zeroplusplus.sisplusplus.model;

import java.util.ArrayList;
import java.util.List;

public class CartEnroller implements CartVisitor{
    private List<Enrollment> enrolledItems;

    public CartEnroller(){
        //TODO implement
        this.enrolledItems = new ArrayList<Enrollment>();
    }
    @Override
    public void visitCourseSection(CourseSection section) {

    }

    @Override
    public void visitSwapGroup(SwapGroup group) {

    }
}
