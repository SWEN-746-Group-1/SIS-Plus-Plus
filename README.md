# SIS++ Class Selection System Design Documentation

## Team Information

-   Team name: TEAMNAME
-   Team members
    -   Daniel Arcega
    -   Dan Corcoran
    -   Reid Taylor
    -   Ryan Yocum

## Executive Summary

RIT's SIS (Student Information System) has a reputation among students and staff alike of being slow, clunky, and confusing. It has a large range of uses, including enrolling in courses, viewing grades, tracking program progress, and managing personal information. The scope of the system as a whole is too large for a team of four to tackle in a few months, so we have selected course enrollment and related activities to focus on, as it is the most common reason students find themselves using this software.

Our main goals are to streamline the current workflow for enrollment by providing relevant information in a clear way, and minimizing the number of actions needed to a few intuitive steps. We plan to introduce features that directly connect the program requirements and progress to the enrollment system as well as enabling students to make more informed choices about the courses the enroll in.

## Requirements

This section describes the features of the application.

### Definition of MVP

The following is a list of features that we consider to be critical in overhauling the course selection system. We will focus primarily on providing additional information and search filtering capability, as well as quality of life improvements. Beyond this, we will integrate expanded functionality for course swaps and waitlists, as well as future course planning.

### MVP Features

#### Must include

Students can search the course catalog based on their own required classes.

Students can view a flow diagram of their program requirements.

Students can view the full chain of prerequisites for a course.

Students can filter their search by fields including but not limited to professor, time slot, remote/hybrid/in-person.

Students can place themselves on a waitlist, view their position, and remove themselves from the waitlist.

Courses are pre-validated with a student's completed courses and their current cart to avoid needing to manually validate after adding.

Students can view their current cart in the form of a weekly schedule.

---

#### Should include

Students can view other major's program plans.

Students can form "Course Swap Groups" that allow their cart to be dynamic and respond to availabilities according to the student's preferences.

Students can select tentative courses for their future semesters and plan out their full degree.

Students can view the courses they took in previous semesters.

---

#### Could include

Students can leave reviews on courses and professors, and can view other students' reviews.

SIS++ can offer recommendations for courses to enroll in based on a student's requirements and past courses.

SIS++ displays clear and helpful messages when an action fails (such as enrolling in a course that is not available to them).

## Architecture and Design

This section describes the application architecture.

### Software Architecture

> _Place a architectural diagram here._ > _Describe your software architecture._

### Use Cases

![img](use_case.png)

> _Describe your use case diagram._

### Class Diagram

> _Place a class diagram here._ > _Describe your class diagram._
