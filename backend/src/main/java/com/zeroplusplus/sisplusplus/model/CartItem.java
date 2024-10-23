package com.zeroplusplus.sisplusplus.model;

public abstract class CartItem {
    private CartConflict conflict;
    void visit(CartVisitor cartVisitor);
}
