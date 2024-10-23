package com.zeroplusplus.sisplusplus.model;

public interface CartVisitor {
    void visitCourseSection(CourseSection section);
    void visitSwapGroup(SwapGroup group);
}
