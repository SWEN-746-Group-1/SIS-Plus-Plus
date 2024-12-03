// sum.test.js
import { expect, test, vi } from 'vitest';
import getCourses from '@/app/courses/coursesData';
import { prisma as prismaMock } from './mocks/prisma';

vi.mock('@/lib/prisma', async () => {
    const actual = await vi.importActual('./mocks/prisma');
    return {
        ...actual,
    };
});

const user = {
    id: '1',
    name: 'Alice',
    email: 'alice@..',
    completedCourses: [
        {
            fullCode: 'CSC101',
        },
    ],
    enrolled: [
        {
            courseSection: {
                course: {
                    fullCode: 'CSC102',
                },
            },
        },
    ],
    major: {
        courses: [
            {
                fullCode: 'CSC103',
            },
        ],
    },
};

test('getCourses', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);
    const courses = await getCourses('1');
    expect(courses).toEqual([
        { code: 'CSC101', status: 'COMPLETE' },
        { code: 'CSC102', status: 'IN_PROGRESS' },
        { code: 'CSC103', status: 'INCOMPLETE' },
    ]);
});
