// sum.test.js
import { expect, test, vi } from 'vitest';
import getCourses from '@/app/search/searchData';
import { prisma as prismaMock } from './mocks/prisma';

vi.mock('@/lib/prisma', async () => {
    const actual = await vi.importActual('./mocks/prisma');
    return {
        ...actual,
    };
});

const course = {
    id: '1',
    department: 'CSC',
    code: '101',
    fullCode: 'CSC 101',
    credits: 3,
    honorsOnly: false,
    title: 'Intro to Computer Science',
    description: 'An introduction to computer science',
    sections: [
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
                startTime: 540,
                endTime: 590,
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
    ],
};

const cart1 = {
    id: '1',
    userId: '1',
    courseSections: [
        {
            id: '1',
            courseId: '1',
            section: '001',
            instructor: 'Dr. Smith',
            location: 'Online',
            capacity: 100,
        },
    ],
};

const cart2 = {
  id: '1',
  userId: '1',
  courseSections: [
  ],
};

test('getSearchCoursesLoggedOut', async () => {
    prismaMock.course.findMany.mockResolvedValue([course]);
    const courses = await getCourses('C', null);
    expect(courses).toEqual([
        {
            id: '1',
            department: 'CSC',
            code: '101',
            credits: 3,
            honorsOnly: false,
            title: 'Intro to Computer Science',
            description: 'An introduction to computer science',
            sections: [
                {
                    sectionId: '1',
                    sectionName: '001',
                    sectionTime: 'MWF 9:00 - 9:50',
                    sectionSeats: '1/100 (0 waitlisted)',
                    sectionInstructor: 'Dr. Smith',
                    sectionLocation: 'Online',
                    inCart: null,
                },
            ],
        },
    ]);
});

test('getSearchCoursesLoggedIn - In Cart', async () => {
    prismaMock.course.findMany.mockResolvedValue([course]);
    prismaMock.cart.upsert.mockResolvedValue(cart1);
    const courses = await getCourses('C', '1');
    expect(courses).toEqual([
        {
            id: '1',
            department: 'CSC',
            code: '101',
            credits: 3,
            honorsOnly: false,
            title: 'Intro to Computer Science',
            description: 'An introduction to computer science',
            sections: [
                {
                    sectionId: '1',
                    sectionName: '001',
                    sectionTime: 'MWF 9:00 - 9:50',
                    sectionSeats: '1/100 (0 waitlisted)',
                    sectionInstructor: 'Dr. Smith',
                    sectionLocation: 'Online',
                    inCart: true,
                },
            ],
        },
    ]);
});

test('getSearchCoursesLoggedIn - Not In Cart', async () => {
  prismaMock.course.findMany.mockResolvedValue([course]);
  prismaMock.cart.upsert.mockResolvedValue(cart2);
  const courses = await getCourses('C', '1');
  expect(courses).toEqual([
      {
          id: '1',
          department: 'CSC',
          code: '101',
          credits: 3,
          honorsOnly: false,
          title: 'Intro to Computer Science',
          description: 'An introduction to computer science',
          sections: [
              {
                  sectionId: '1',
                  sectionName: '001',
                  sectionTime: 'MWF 9:00 - 9:50',
                  sectionSeats: '1/100 (0 waitlisted)',
                  sectionInstructor: 'Dr. Smith',
                  sectionLocation: 'Online',
                  inCart: false,
              },
          ],
      },
  ]);
});

