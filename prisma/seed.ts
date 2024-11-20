import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed majors
    const majors = [
        {
            name: 'Computer Science',
            courses: [
                {
                    department: 'CS',
                    code: '101',
                    credits: 3,
                    honorsOnly: false,
                    title: 'Intro to Programming',
                    description: 'Learn the basics of programming.',
                },
                {
                    department: 'CS',
                    code: '201',
                    credits: 4,
                    honorsOnly: false,
                    title: 'Data Structures',
                    description: 'Learn data structures and algorithms.',
                },
                {
                    department: 'CS',
                    code: '301',
                    credits: 3,
                    honorsOnly: true,
                    title: 'Honors Advanced Algorithms',
                    description: 'Dive deep into algorithm design.',
                },
                {
                    department: 'CS',
                    code: '401',
                    credits: 4,
                    honorsOnly: false,
                    title: 'Operating Systems',
                    description: 'Introduction to OS concepts.',
                },
                {
                    department: 'CS',
                    code: '501',
                    credits: 3,
                    honorsOnly: true,
                    title: 'Honors Artificial Intelligence',
                    description: 'Explore AI concepts and techniques.',
                },
            ],
        },
        {
            name: 'Mechanical Engineering',
            courses: [
                {
                    department: 'ME',
                    code: '101',
                    credits: 3,
                    honorsOnly: false,
                    title: 'Statics',
                    description: 'Fundamentals of statics and forces.',
                },
                {
                    department: 'ME',
                    code: '201',
                    credits: 4,
                    honorsOnly: false,
                    title: 'Thermodynamics',
                    description: 'Study of heat and energy systems.',
                },
                {
                    department: 'ME',
                    code: '301',
                    credits: 3,
                    honorsOnly: true,
                    title: 'Honors Fluid Mechanics',
                    description: 'Explore the dynamics of fluids.',
                },
                {
                    department: 'ME',
                    code: '401',
                    credits: 4,
                    honorsOnly: false,
                    title: 'Mechanics of Materials',
                    description: 'Learn material stress and strain.',
                },
                {
                    department: 'ME',
                    code: '501',
                    credits: 3,
                    honorsOnly: true,
                    title: 'Honors Robotics',
                    description: 'Introduction to robotic systems.',
                },
            ],
        },
        {
            name: 'Business Administration',
            courses: [
                {
                    department: 'BA',
                    code: '101',
                    credits: 3,
                    honorsOnly: false,
                    title: 'Intro to Business',
                    description: 'Basics of business operations.',
                },
                {
                    department: 'BA',
                    code: '201',
                    credits: 4,
                    honorsOnly: false,
                    title: 'Marketing Principles',
                    description: 'Learn core marketing concepts.',
                },
                {
                    department: 'BA',
                    code: '301',
                    credits: 3,
                    honorsOnly: true,
                    title: 'Honors Corporate Finance',
                    description: 'Explore corporate financial strategies.',
                },
                {
                    department: 'BA',
                    code: '401',
                    credits: 4,
                    honorsOnly: false,
                    title: 'Business Ethics',
                    description: 'Understand ethical decision-making.',
                },
                {
                    department: 'BA',
                    code: '501',
                    credits: 3,
                    honorsOnly: true,
                    title: 'Honors Strategic Management',
                    description: 'Advanced business strategy concepts.',
                },
            ],
        },
        // Add more majors as needed...
    ];

    for (const major of majors) {
        const createdMajor = await prisma.major.create({
            data: {
                name: major.name,
                courses: {
                    create: major.courses.map((course) => ({
                        department: course.department,
                        code: course.code,
                        credits: course.credits,
                        honorsOnly: course.honorsOnly,
                        title: course.title,
                        description: course.description,
                        sections: {
                            create: Array.from({ length: 5 }, (_, i) => ({
                                section: `${i + 1}`,
                                instructor: `Instructor ${i + 1}`,
                                location: `Room ${100 + i}`,
                                capacity: 30 + i * 10,
                                timeSlot: {
                                    create: {
                                        daysOfTheWeek: ['M', 'W', 'F'],
                                        startTime: `0${8 + i}:00`, // Dynamic start times
                                        endTime: `0${8 + i}:50`, // Dynamic end times
                                    },
                                },
                            })),
                        },
                    })),
                },
            },
        });

        console.log(`Major seeded: ${major.name}`);

        for (let i = 0; i < 5; i++) {
            const user = await prisma.user.create({
                data: {
                    name: `${major.name} Student ${i}`,
                    email: `${major.name
                        .toLowerCase()
                        .replace(' ', '')}${i}@sisplusplus.dev`,
                    emailVerified: new Date(),
                    major: {
                        connect: {
                            id: createdMajor.id,
                        },
                    },
                },
            });

            console.log(`User seeded: ${user.name}`);
        }

        // lets grab the major we just created

        const majorWithSections = await prisma.major.findUnique({
            where: {
                id: createdMajor.id,
            },
            include: {
                courses: {
                    include: {
                        sections: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });

        if (!majorWithSections) {
            throw new Error('Major not found');
        }

        await prisma.user.create({
            data: {
                name: `${major.name} Student ${6} - CART`,
                email: `${major.name
                    .toLowerCase()
                    .replace(' ', '')}${6}cart@sisplusplus.dev`,
                emailVerified: new Date(),
                major: {
                    connect: {
                        id: createdMajor.id,
                    },
                },
                cart: {
                    create: {
                        courseSections: {
                            connect: majorWithSections.courses
                                .flatMap((course) => course.sections)
                                .map((section) => ({
                                    id: section.id,
                                })),
                        },
                    },
                },
            },
        });

        // get current enrollment count for each section
        const currentEnrollments = await prisma.enrolled.groupBy({
            by: ['sectionId'],
            _count: true,
        });

        console.log(`User seeded: ${major.name} Student 6 - CART`);

        // now lets create a user with enrolled courses
        await prisma.user.create({
            data: {
                name: `${major.name} Student ${7} - ENROLLED`,
                email: `${major.name
                    .toLowerCase()
                    .replace(' ', '')}${7}enrolled@sisplusplus.dev`,
                emailVerified: new Date(),
                major: {
                    connect: {
                        id: createdMajor.id,
                    },
                },
                enrolled: {
                    create: majorWithSections.courses
                        .flatMap((course) => course.sections)
                        .map((section, idx) => ({
                            status: idx % 2 === 0 ? 'ENROLLED' : 'WAITLISTED',
                            order: currentEnrollments.find(
                                (e) => e.sectionId === section.id
                            )?._count || 0,
                            courseSection: {
                                connect: {
                                    id: section.id,
                                },
                            },
                        })),
                },
            },
        });
    }

    console.log('Majors seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
