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
    <div>
      <h1>Enrolled Sections</h1>
      {enrollments.length > 0 ? (
        <ul>
          {enrollments.map((enrollment) => (
            <li key={enrollment.id}>
              <strong>Section: {enrollment.courseSection.section}</strong><br />
              Instructor: {enrollment.courseSection.instructor} <br />
              Location: {enrollment.courseSection.location} <br />
              Course: {enrollment.courseSection.course.title} <br />
              Time: {enrollment.courseSection.timeSlot?.startTime} - {enrollment.courseSection.timeSlot?.endTime}<br />
              Days: {enrollment.courseSection.timeSlot?.daysOfTheWeek.join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No enrolled sections found.</p>
      )}
    </div>
  );
}