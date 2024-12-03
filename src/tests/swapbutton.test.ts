import { expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SwapButtonServer from '@/components/SwapButtonServer';
import SwapButtonClient from '@/components/SwapButtonClient';
import { prisma as prismaMock } from './mocks/prisma';

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

test('renders SwapButtonServer and fetches sections', async () => {
  const mockCourseId = 'course1';
  const mockEnrollmentId = 'enrollment1';

  prismaMock.courseSection.findMany.mockResolvedValue([
    {
      id: 'section1',
      section: 'A',
      instructor: 'Dr. Smith',
      location: 'Room 101',
      timeSlot: {
        startTime: '10:00 AM',
        endTime: '11:30 AM',
        daysOfTheWeek: ['Monday', 'Wednesday'],
      },
    },
    {
      id: 'section2',
      section: 'B',
      instructor: 'Dr. Jones',
      location: 'Room 202',
      timeSlot: {
        startTime: '1:00 PM',
        endTime: '2:30 PM',
        daysOfTheWeek: ['Tuesday', 'Thursday'],
      },
    },
  ]);

  render(await SwapButtonServer({ enrollmentId: mockEnrollmentId, courseId: mockCourseId }));

  expect(screen.getByText(/Edit/i)).toBeInTheDocument();
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

  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton);

  expect(screen.getByText(/Available Sections/i)).toBeInTheDocument();
  expect(screen.getByText(/Dr. Smith/i)).toBeInTheDocument();
  expect(screen.getByText(/Room 101/i)).toBeInTheDocument();
  expect(screen.getByText(/Monday, Wednesday/i)).toBeInTheDocument();

  expect(screen.getByText(/Dr. Jones/i)).toBeInTheDocument();
  expect(screen.getByText(/Room 202/i)).toBeInTheDocument();
  expect(screen.getByText(/Tuesday, Thursday/i)).toBeInTheDocument();
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

  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton);

  const closeButton = screen.getByText(/Close/i);
  fireEvent.click(closeButton);

  expect(screen.queryByText(/Available Sections/i)).not.toBeInTheDocument();
});

test('displays no sections message when no sections are available', async () => {
  render(
    <SwapButtonClient
      enrollmentId="enrollment1"
      courseId="course1"
      availableSections={[]}
    />
  );

  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton);

  expect(screen.getByText(/No sections available for this course at the moment/i)).toBeInTheDocument();
});