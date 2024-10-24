package com.zeroplusplus.sisplusplus.model;

public abstract class CartItem {
    //CartConflict conflict;
    abstract void visit(CartVisitor cartVisitor);
}
