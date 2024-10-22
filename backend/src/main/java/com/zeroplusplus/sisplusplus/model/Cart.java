package com.zeroplusplus.sisplusplus.model;

import java.util.ArrayList;
import java.util.List;

public class Cart {

    private List<CartItem> sections;
    private CourseSelectorInterface courseManager;

    public Cart() {
        sections = new ArrayList<>();
        courseManager = new CourseSelector();
    }
    
}
