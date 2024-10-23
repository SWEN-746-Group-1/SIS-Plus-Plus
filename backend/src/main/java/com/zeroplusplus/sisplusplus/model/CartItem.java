package com.zeroplusplus.sisplusplus.model;

public abstract class CartItem {
    //CartConflict conflict;
    void visit(CartVisitor cartVisitor);
}
