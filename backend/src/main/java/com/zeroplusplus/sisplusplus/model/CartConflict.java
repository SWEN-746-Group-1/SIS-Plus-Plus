package com.zeroplusplus.sisplusplus.model;

enum CartConflictType{
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
public class CartConflict{
    private CartItem cause;
    public CartConflict(){
        //TODO: implement
        this.cause = null;
    }
}