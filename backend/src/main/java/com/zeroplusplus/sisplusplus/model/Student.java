package com.zeroplusplus.sisplusplus.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Student {

    private String name;
    private int uid;
    private MajorProgram program;
    private List<Schedule> schedules;
    private Map<String, FuturePlan> futurePlans;
    private boolean honors;
    private Cart cart;

    public Student() {
        name = "default";
        uid = 0;
        program = new MajorProgram();
        schedules = new ArrayList<>();
        futurePlans = new HashMap<>();
        honors = false;
        cart = new Cart();
    }
}


