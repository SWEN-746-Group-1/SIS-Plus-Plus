import { prisma } from '@/lib/prisma';
import SwapButtonClient from './SwapButtonClient';

type TimeSlot = {
  startTime: string;
  endTime: string;
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

type SwapButtonServerProps = {
  enrollmentId: string;
  courseId: string;
};

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
  }: SwapButtonServerProps) {
  
    const availableSections = await getCourseSections(courseId);

    return (
      <SwapButtonClient
        enrollmentId={enrollmentId}
        courseId={courseId}
        availableSections={availableSections}
      />
    );
  }
