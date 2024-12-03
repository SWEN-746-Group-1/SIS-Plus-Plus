import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import SwapButton from '@/components/SwapButtonServer';
import { TimeSlot } from '@prisma/client';
import { formatTimeSlot } from '@/lib/sisUtils';

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

type Enrollment = {
  id: string;
  status: 'ENROLLED' | 'WAITLISTED';
  courseSection: CourseSection;
};

export default async function EnrolledPage() {
  const session = await auth();
  let userId: string | null = null;

  if (session && session.user && session.user.id) {
    userId = session.user.id;
  }

  let enrollments: Enrollment[] = [];

  if (userId) {
    const enrolledUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        enrolled: {
          where: {
            status: 'ENROLLED',
          },
          include: {
            courseSection: {
              include: {
                course: true,
                timeSlot: true,
              },
            },
          },
        },
      },
    });

    if (enrolledUser && enrolledUser.enrolled) {
      enrollments = enrolledUser.enrolled;
    }
  }

  return (
    <div className="flex flex-col w-full ml-5 mt-5 gap-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
        Enrolled Courses
      </h1>
      {enrollments.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {enrollments.map((enrollment) => (
            <li
              key={enrollment.id}
              className="border border-gray-300 dark:border-gray-700 shadow-md p-4 rounded-lg bg-white dark:bg-gray-800 flex flex-col justify-between"
            >
              <div>
                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {enrollment.courseSection.course.title}
                  </h2>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p>
                    <strong>Section:</strong> {enrollment.courseSection.section} -{' '}
                    {enrollment.courseSection.instructor}
                  </p>
                  <p>
                    <strong>Location:</strong> {enrollment.courseSection.location}
                  </p>
                  <p>
                    <strong>Time:</strong>{' '}
                    {formatTimeSlot(enrollment.courseSection.timeSlot)}
                  </p>
                  <p>
                    <strong>Days:</strong>{' '}
                    {enrollment.courseSection.timeSlot?.daysOfTheWeek.join(', ')}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-medium ${
                        enrollment.status === 'ENROLLED'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-orange-600 dark:text-orange-400'
                      }`}
                    >
                      {enrollment.status === 'ENROLLED' ? 'Enrolled' : 'Waitlisted'}
                    </span>
                  </p>
                </div>
              </div>
              <SwapButton enrollmentId={enrollment.id} courseId={enrollment.courseSection.course.id} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No enrolled sections found.
        </p>
      )}
    </div>
  );
}