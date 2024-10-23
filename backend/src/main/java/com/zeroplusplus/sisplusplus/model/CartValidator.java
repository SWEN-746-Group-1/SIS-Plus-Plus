package com.zeroplusplus.sisplusplus.model;

import java.util.ArrayList;
import java.util.List;

public class CartValidator implements CartVisitor{

    List<CartItem> validItems;
    public CartValidator(){
        //TODO change
        this.validItems = new ArrayList<CartItem>();
    }
    @Override
    public void visitCourseSection(CourseSection section){

    }
    @Override
    public void visitSwapGroup(SwapGroup group){

    }
}