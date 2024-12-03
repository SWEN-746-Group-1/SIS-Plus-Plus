// sum.test.js
import { expect, test, vi } from 'vitest';
import { prisma as prismaMock } from './mocks/prisma';
import { auth as authMock } from './mocks/auth';
import { getCart } from '@/app/cart/cartData';
import { addToCart } from '@/app/cart/addToCart';

vi.mock('@/lib/prisma', async () => {
    const actual = await vi.importActual('./mocks/prisma');
    return {
        ...actual,
    };
});

vi.mock('@/lib/auth', async () => {
    const actual = await vi.importActual('./mocks/auth');
    return {
        ...actual,
    };
});

vi.mock('next/cache', async () => {
    return {
        revalidatePath: vi.fn(),
    };
});

const cartDB = {
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
            timeSlot: {
                id: '1',
                daysOfTheWeek: ['M', 'W', 'F'],
                startTime: 540,
                endTime: 590,
                courseSectionId: '1',
            },
            classList: [
                {
                    id: '1',
                    studentId: '1',
                    sectionId: '1',
                    status: 'ENROLLED',
                    order: 0,
                },
            ],
            course: {
                id: '1',
                department: 'CSC',
                code: '101',
                fullCode: 'CSC 101',
                credits: 3,
                honorsOnly: false,
                title: 'Intro to Computer Science',
                description: 'An introduction to computer science',
                prerequisites: [],
            },
        },
    ],
    user: {
        id: '1',
        name: 'John Doe',
        email: 'john@john.com',
        emailVerified: new Date(),
        completedCourses: [],
        enrolled: [
            {
                courseSection: {
                    course: {
                        id: '1',
                    },
                },
            },
        ],
    },
};

const result = {
    cartItems: cartDB.courseSections,
    completedCourses: cartDB.user.completedCourses,
    enrolledCourses: cartDB.user.enrolled.map(
        (enrolled) => enrolled.courseSection.course.id
    ),
};

test('cartData', async () => {
    prismaMock.cart.findFirst.mockResolvedValue(cartDB);
    const courses = await getCart('1');
    expect(courses).toEqual(result);
});

test('addCourseToCart Logged Out', async () => {
    authMock.mockResolvedValue(null);
    await expect(addToCart('1', '1')).rejects.toThrow(
        'You must be logged in to add to cart'
    );
});

test('addCourseToCart Logged In', async () => {
    authMock.mockResolvedValue({
        user: {
            id: '1',
        },
    });
    prismaMock.cart.upsert.mockResolvedValue(cartDB);
    await addToCart('1', '1');
    expect(prismaMock.cart.upsert).toHaveBeenCalledWith({
        create: {
            userId: '1',
            courseSections: {
                connect: {
                    id: '1',
                },
            },
        },
        update: {
            courseSections: {
                connect: {
                    id: '1',
                },
            },
        },
        where: {
            userId: '1',
        },
    });
});
