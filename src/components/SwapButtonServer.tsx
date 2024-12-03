import { prisma } from '@/lib/prisma';
import { validateCart } from '@/app/cart/enrollment';
import { ValidationStatus } from '@/lib/sisUtils';
import { addToCart, removeFromCart } from '@/app/cart/addToCart';
import { getCart } from '@/app/cart/cartData';
import SwapButtonClient from './SwapButtonClient';
import React from 'react';
import { revalidatePath } from 'next/cache';

type TimeSlot = {
  startTime: number;
  endTime: number;
  daysOfTheWeek: string[];
};

type Course = {
  id: string;
  department: string;
  code: string;
  fullCode: string;
  credits: number;
  honorsOnly: boolean;
  title: string;
  description: string | null;
};

type CourseSection = {
  id: string;
  section: string;
  instructor: string;
  location: string;
  capacity: number;
  course: Course;
  timeSlot: TimeSlot | null;
};

type Enrollment = {
  id: string;
  status: 'ENROLLED' | 'WAITLISTED';
  courseSection: CourseSection;
};

type SwapButtonServerProps = {
  enrollmentId: string;
  courseId: string;
  userId: string;
  enrollments: Enrollment[];
};

async function handleSelectSection(sectionId: string, userId: string, enrollments: Enrollment[]) {
  "use server";
  try {
    const cart = await getCart(userId);

    const oldCartSections = cart.cartItems?.length
      ? cart.cartItems.flatMap((item) =>
          item.classlist.map((classItem) => classItem.sectionId)
        )
      : [];

    const enrolledSections = enrollments && Array.isArray(enrollments) 
      ? enrollments.map((enrollment) => enrollment.courseSection.id)
      : [];

    for (const oldId of oldCartSections) {
      await removeFromCart(oldId, '/enrolled');
    }

    for (const section of enrolledSections) {
      await addToCart(section, '/enrolled');
    }

    await addToCart(sectionId, '/enrolled');

    const result = await validateCart();

    if (result?.status === ValidationStatus.INVALID) {
      return { success: false, message: "The selected section conflicts with your current classes." };
    }

    if (oldCartSections.length > 0) {
      for (const oldId of oldCartSections) {
        await addToCart(oldId, '/enrolled');
      }
    }

    return { success: true, message: "Section swap successful!" };
  } catch (error) {
    console.error("Failed to update sections", error);
    return { success: false, message: "An error occurred while updating your sections." };
  }
}

async function handleDeleteEnrollment(enrollmentId: string) {
  "use server";
  try {
    const enrollment = await prisma.enrolled.findUnique({
      where: { id: enrollmentId },
      include: {
        courseSection: {
          include: {
            course: true,
          },
        },
        user: true,
      },
    });

    if (!enrollment) {
      return { success: false, message: "Enrollment not found." };
    }

    await prisma.enrolled.delete({
      where: { id: enrollmentId },
    });

    revalidatePath('/enrolled');
    return { success: true, message: "Enrollment deleted successfully." };
  } catch (error) {
    console.error("Failed to delete enrollment", error);
    return { success: false, message: "An error occurred while deleting the enrollment." };
  }
}



async function getCourseSections(courseId: string): Promise<CourseSection[]> {
  const courseSections = await prisma.courseSection.findMany({
    where: {
      courseId,
    },
    include: {
      timeSlot: true,
      course: true,
    },
  });

  return courseSections?.map((section) => ({
    id: section.id,
    section: section.section,
    instructor: section.instructor,
    location: section.location,
    capacity: section.capacity,
    course: section.course,
    timeSlot: section.timeSlot
      ? {
          startTime: section.timeSlot.startTime,
          endTime: section.timeSlot.endTime,
          daysOfTheWeek: section.timeSlot.daysOfTheWeek,
        }
      : null,
  })) || [];
}

export default async function SwapButtonServer({
  enrollmentId,
  courseId,
  userId,
  enrollments,
}: SwapButtonServerProps) {
  const availableSections = await getCourseSections(courseId);

  return (
    <SwapButtonClient
      enrollmentId={enrollmentId}
      courseId={courseId}
      availableSections={availableSections}
      userId={userId}
      enrollments={enrollments}
      handleSelectSection={handleSelectSection}
      handleDeleteEnrollment={handleDeleteEnrollment}
    />
  );
}
