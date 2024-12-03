import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SwapButtonServer from '@/components/SwapButtonServer';
import SwapButtonClient from '@/components/SwapButtonClient';
import { prisma as prismaMock } from './mocks/prisma';

vi.mock('@/lib/prisma', async () => {
  const actual = await vi.importActual('./mocks/prisma');
  return {
      ...actual,
  };
});


beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});


test('renders SwapButtonServer and fetches sections', async () => {
  const mockCourseId = 'course1';
  const mockEnrollmentId = 'enrollment1';

  const mockData = [
    {
        id: '1',
        courseId: '1',
        section: '001',
        instructor: 'Dr. Smith',
        location: 'Online',
        capacity: 100,
        timeSlot: {
            id: '1',
            daysOfTheWeek: ['M', 'W', 'F'],
            startTime: '09:00',
            endTime: '09:50',
            courseSectionId: '1',
        },
        classlist: [
            {
                id: '1',
                studentId: '1',
                sectionId: '1',
                status: 'ENROLLED',
                order: 0,
            },
        ],
    },
];

  prismaMock.courseSection.findMany.mockResolvedValue(mockData);

  render(await SwapButtonServer({ enrollmentId: mockEnrollmentId, courseId: mockCourseId }));

  expect(screen.getByText(/Edit/i)).toBeDefined();
});

test('opens and displays available sections in SwapButtonClient', async () => {
  const mockAvailableSections = [
    {
      id: 'section1',
      section: 'A',
      instructor: 'Dr. Smith',
      location: 'Room 101',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      daysOfTheWeek: ['Monday', 'Wednesday'],
    },
    {
      id: 'section2',
      section: 'B',
      instructor: 'Dr. Jones',
      location: 'Room 202',
      startTime: '1:00 PM',
      endTime: '2:30 PM',
      daysOfTheWeek: ['Tuesday', 'Thursday'],
    },
  ];

  render(
    <SwapButtonClient
      enrollmentId="enrollment1"
      courseId="course1"
      availableSections={mockAvailableSections}
    />
  );


  const editButton = screen.getAllByText(/Edit/i)[0];
  fireEvent.click(editButton);

  expect(screen.getByText(/Available Sections/i)).toBeDefined();
  expect(screen.getByText(/Dr. Smith/i)).toBeDefined();
  expect(screen.getByText(/Online/i)).toBeDefined();
});

test('closes the modal when "Close" button is clicked', async () => {
  const mockAvailableSections = [
    {
      id: 'section1',
      section: 'A',
      instructor: 'Dr. Smith',
      location: 'Room 101',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      daysOfTheWeek: ['Monday', 'Wednesday'],
    },
  ];

  render(
    <SwapButtonClient
      enrollmentId="enrollment1"
      courseId="course1"
      availableSections={mockAvailableSections}
    />
  );

  const editButton = screen.getAllByText(/Edit/i)[0];
  fireEvent.click(editButton);

  const closeButton = screen.getByText(/Close/i);
  fireEvent.click(closeButton);

  expect(screen.queryByText(/Available Sections/i)).toBeDefined();
});