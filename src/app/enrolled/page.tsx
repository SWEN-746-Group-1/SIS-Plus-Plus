import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

type TimeSlot = {
  startTime: string;
  endTime: string;
  daysOfTheWeek: string[];
};

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

  let enrolledUser: { enrolled: Enrollment[] } | null = null;
  let enrollments: Enrollment[] = [];

  if (userId) {
    enrolledUser = await prisma.user.findUnique({
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
  <div className="flex w-full ml-5 mt-5 flex-col gap-5">
    <h1 className="text-3xl font-semibold text-center">Enrolled Courses</h1>
    {enrollments.length > 0 ? (
      <ul className="w-full max-w-sm space-y-2">
        {enrollments.map((enrollment) => (
          <li
            key={enrollment.id}
            className="divide-orange-400 border-solid border-orange-500 p-2 bg-gray-500 rounded-md"
          >
            <div className="font-semibold">Course: {enrollment.courseSection.course.title}</div>
            <div>
              Section: {enrollment.courseSection.section} - {enrollment.courseSection.instructor}
            </div>
            <div>
              Location: {enrollment.courseSection.location}
            </div>
            <div>
              Time: {enrollment.courseSection.timeSlot?.startTime} - {enrollment.courseSection.timeSlot?.endTime}
            </div>
            <div>
              Days: {enrollment.courseSection.timeSlot?.daysOfTheWeek.join(', ')}
            </div>
            <div>
                  Status: {enrollment.status === 'ENROLLED' ? 'Enrolled' : 'Waitlisted'}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No enrolled sections found.</p>
    )}
  </div>
  );
}