'use client';

import React, { useState } from 'react';
import { getCart } from '@/app/cart/cartData';
import { addToCart } from '@/app/cart/addToCart';
import { removeFromCart } from '@/app/cart/addToCart';
import { validateCart, ValidationResponse } from '@/app/cart/enrollment';
import { ValidationStatus } from '@/lib/sisUtils';

type TimeSlot = {
  startTime: number;
  endTime: number;
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

type SwapButtonClientProps = {
  enrollmentId: string;
  courseId: string;
  availableSections?: CourseSection[];
  userId: string;
  enrollments: Enrollment[];
};

const SwapButtonClient: React.FC<SwapButtonClientProps> = ({
  availableSections = [],
  userId,
  enrollments
}) => {
  const [isSwapSectionModalOpen, setIsSwapSectionModalOpen] = useState(false);

  const handleSelectSection = async (sectionId: string) => {
    try {
      const cart = await getCart(userId);
      const oldCartSections = cart.cartItems.flatMap((item) =>
        item.classlist.map((classItem) => classItem.sectionId)
      );
      const enrolledSections = enrollments.map((enrollment) =>
        enrollment.courseSection.id
      );

      for (const oldId of oldCartSections) {
        removeFromCart(oldId, '/enrolled');
      }

      for (const section of enrolledSections) {
        addToCart(section, '/enrolled');
      }
      addToCart(sectionId, '/enrolled')

      const result = await validateCart(true);
      if (result?.status === ValidationStatus.INVALID) {
        // indicate invalid schedule
        for (const section of enrolledSections) {
          removeFromCart(section, '/enrolled');
        }
      } else {
        // indicate successful enrollment
      }
      
      for (const oldId of oldCartSections) {
        addToCart(oldId, '/enrolled');
      }
    }
    catch {
      console.log("Failed to update sections")
    }
    setIsSwapSectionModalOpen(false);
  };

  return (
    <div>
      <button
        className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition"
        onClick={() => setIsSwapSectionModalOpen(true)}
      >
        Edit
      </button>

      {isSwapSectionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Available Sections
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {availableSections.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300 col-span-2">
                  No sections available for this course at the moment.
                </p>
              ) : (
                availableSections.map((section) => (
                  <div
                    key={section.id}
                    className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {section.section} - {section.instructor}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {section.location}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {section.timeSlot ? (
                        <>
                          {section.timeSlot.startTime || 'pending'} - {section.timeSlot.endTime || 'pending'}
                        </>
                      ) : ('pending')}
                    </p>
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      onClick={() => handleSelectSection(section.id)}
                    >
                      Select Section
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              className="w-full px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition mt-4"
              onClick={() => setIsSwapSectionModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapButtonClient;
