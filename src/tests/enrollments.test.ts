import { expect, test, vi, beforeEach, afterEach } from 'vitest';
import { prisma as prismaMock } from './mocks/prisma';
import EnrolledPage from '@/app/enrolled/page';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

test('renders enrolled courses when user is enrolled', async () => {
    const mockUser = {
        id: 'user1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        emailVerified: null,
        image: null,
        majorid: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        enrolled: [
          {
            id: 'enrollment1',
            status: 'ENROLLED',
            courseSection: {
              id: 'section1',
              section: 'A',
              instructor: 'Prof. Smith',
              location: 'Room 101',
              capacity: 30,
              course: {
                id: 'course1',
                department: 'CS',
                code: '101',
                fullCode: 'CS101',
                credits: 3,
                honorsOnly: false,
                title: 'Introduction to Programming',
                description: 'Learn the basics of programming.',
              },
              timeSlot: {
                startTime: '10:00 AM',
                endTime: '12:00 PM',
                daysOfTheWeek: ['Monday', 'Wednesday'],
              },
            },
          },
        ],
    };
      
  (vi.fn() as any).mockResolvedValueOnce({ user: { id: 'user1' } });

  prismaMock.user.findUnique.mockResolvedValueOnce(mockUser);

  render(<EnrolledPage />);

  await waitFor(() => screen.getByText('Introduction to Programming'));

  expect(screen.getByText('Introduction to Programming')).toBeInTheDocument();
  expect(screen.getByText('Section: A - Prof. Smith')).toBeInTheDocument();
  expect(screen.getByText('Location: Room 101')).toBeInTheDocument();
  expect(screen.getByText('Time: 10:00 AM - 12:00 PM')).toBeInTheDocument();
  expect(screen.getByText('Days: Monday, Wednesday')).toBeInTheDocument();
  expect(screen.getByText('Status:')).toHaveClass('text-green-600');
});

test('renders message when no enrolled courses are found', async () => {
    const mockUser = {
        id: 'user1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        emailVerified: null,
        image: null,
        majorid: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        enrolled: [],
    };

  (vi.fn() as any).mockResolvedValueOnce({ user: { id: 'user2' } });

  prismaMock.user.findUnique.mockResolvedValueOnce(mockUser);

  render(<EnrolledPage />);

  await waitFor(() => screen.getByText('No enrolled sections found.'));

  expect(screen.getByText('No enrolled sections found.')).toBeInTheDocument();
});

test('correctly handles waitlisted courses', async () => {
    const mockUser = {
        id: 'user1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        emailVerified: null,
        image: null,
        majorid: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        enrolled: [
          {
            id: 'enrollment1',
            status: 'WAITLISTED',
            courseSection: {
              id: 'section1',
              section: 'A',
              instructor: 'Prof. Smith',
              location: 'Room 101',
              capacity: 30,
              course: {
                id: 'course1',
                department: 'CS',
                code: '101',
                fullCode: 'CS101',
                credits: 3,
                honorsOnly: false,
                title: 'Introduction to Programming',
                description: 'Learn the basics of programming.',
              },
              timeSlot: {
                startTime: '10:00 AM',
                endTime: '12:00 PM',
                daysOfTheWeek: ['Monday', 'Wednesday'],
              },
            },
          },
        ],
    };

  (vi.fn() as any).mockResolvedValueOnce({ user: { id: 'user3' } });

  prismaMock.user.findUnique.mockResolvedValueOnce(mockUser);

  render(<EnrolledPage />);

  await waitFor(() => screen.getByText('Calculus I'));

  expect(screen.getByText('Calculus I')).toBeInTheDocument();
  expect(screen.getByText('Section: B - Prof. Johnson')).toBeInTheDocument();
  expect(screen.getByText('Location: Room 102')).toBeInTheDocument();
  expect(screen.getByText('Time: 1:00 PM - 3:00 PM')).toBeInTheDocument();
  expect(screen.getByText('Days: Tuesday, Thursday')).toBeInTheDocument();
  expect(screen.getByText('Status:')).toHaveClass('text-orange-600');
});