package com.zeroplusplus.sisplusplus.model;

import java.util.ArrayList;
import java.util.List;

public class SwapGroup extends CartItem {

    private List<CourseSection> sections;

    public SwapGroup() {
        sections = new ArrayList<>();
    }

    @Override
    public void visit(CartVisitor cartVisitor) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'visit'");
    }
    
}
