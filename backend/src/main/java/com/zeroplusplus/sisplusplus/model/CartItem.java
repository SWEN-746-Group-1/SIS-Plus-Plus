package com.zeroplusplus.sisplusplus.model;

public interface CartItem {
    void visit(CartVisitor cartVisitor);
}
