import { prisma } from '@/lib/prisma';
import SwapButtonClient from './SwapButtonClient';

type CourseSection = {
  id: string;
  section: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  daysOfTheWeek: string[];
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
    },
  });

  console.log('Retrieved courseSections:', courseSections);

  return courseSections?.map((section) => ({
    id: section.id,
    section: section.section,
    instructor: section.instructor,
    location: section.location,
    startTime: section.timeSlot?.startTime ?? '',
    endTime: section.timeSlot?.endTime ?? '',
    daysOfTheWeek: section.timeSlot?.daysOfTheWeek ?? [],
  })) || [];
}

export default async function SwapButtonServer({
    enrollmentId,
    courseId,
  }: SwapButtonServerProps) {
    console.log('Received courseId in SwapButtonServer:', courseId);
  
    const availableSections = await getCourseSections(courseId);
  
    console.log('Available sections for courseId:', availableSections);
  
    return (
      <SwapButtonClient
        enrollmentId={enrollmentId}
        courseId={courseId}
        availableSections={availableSections}
      />
    );
  }
