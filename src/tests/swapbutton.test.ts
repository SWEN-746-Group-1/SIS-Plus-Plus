import { expect, test, vi } from 'vitest';
import SwapButtonServer from '@/components/SwapButtonServer';
import SwapButtonClient from '@/components/SwapButtonClient';
import { prisma as prismaMock } from '@/lib/prisma';

const mockCourseId = 'course456';
const mockEnrollmentId = 'enrollment123';
const mockCourseSections = [
  {
    id: 'section1',
    section: 'A',
    instructor: 'Dr. Smith',
    location: 'Room 101',
    capacity: 30,
    course: {
      id: mockCourseId,
      department: 'CS',
      code: '101',
      fullCode: 'CS101',
      credits: 3,
      honorsOnly: false,
      title: 'Introduction to Computer Science',
      description: 'A foundational course in computer science.',
    },
    timeSlot: {
      startTime: '09:00',
      endTime: '10:30',
      daysOfTheWeek: ['Monday', 'Wednesday'],
    },
  },
  {
    id: 'section2',
    section: 'B',
    instructor: 'Prof. Lee',
    location: 'Room 102',
    capacity: 25,
    course: {
      id: mockCourseId,
      department: 'CS',
      code: '101',
      fullCode: 'CS101',
      credits: 3,
      honorsOnly: false,
      title: 'Introduction to Computer Science',
      description: 'A foundational course in computer science.',
    },
    timeSlot: {
      startTime: '11:00',
      endTime: '12:30',
      daysOfTheWeek: ['Tuesday', 'Thursday'],
    },
  },
];

test('SwapButtonServer fetches course sections and renders SwapButtonClient with correct props', async () => {
  prismaMock.courseSection.findMany = vi.fn().mockResolvedValue(mockCourseSections);

  vi.mock('@/components/SwapButtonClient', () => ({
    default: vi.fn(() => null),
  }));

  await SwapButtonServer({
    enrollmentId: mockEnrollmentId,
    courseId: mockCourseId,
  });

  expect(prismaMock.courseSection.findMany).toHaveBeenCalledWith({
    where: { courseId: mockCourseId },
    include: { timeSlot: true, course: true },
  });
});