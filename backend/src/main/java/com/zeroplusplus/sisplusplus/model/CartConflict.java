package com.zeroplusplus.sisplusplus.model;

public enum CartConflictType{
    TIME_OVERLAP,
    MISSING_PREREQUISITE,
    MISSING_COREQUISITE,
    INVALID_MAJOR_PROGRAM,
    CREDIT_LIMIT_EXCEEDED,
    INVALID_HONOR_STATUS,
    DUPLICATE_COURSE

    //Insert name functionhere
    //Insert description here
}
public class CartConflict(){
    private CartItem cause;
}