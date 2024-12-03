'use client';

import React, { useState } from 'react';

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
  handleSelectSection: (sectionId: string, userId: string, enrollments: Enrollment[]) => Promise<{ success: boolean; message: string }>;
  handleDeleteEnrollment: (enrollmentId: string) => Promise<{ success: boolean; message: string }>;
};

const SwapButtonClient: React.FC<SwapButtonClientProps> = ({
  enrollmentId,
  courseId,
  availableSections = [],
  userId,
  enrollments,
  handleSelectSection,
  handleDeleteEnrollment,
}) => {
  const [isSwapSectionModalOpen, setIsSwapSectionModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const onSelectSection = async (sectionId: string) => {
    const result = await handleSelectSection(sectionId, userId, enrollments);
    setMessage(result.message);
    setMessageType(result.success ? 'success' : 'error');
    setIsMessageModalOpen(true);
    if (result.success) {
      setIsSwapSectionModalOpen(false);
    }
  };

  const onDeleteEnrollment = async () => {
    setIsDeleteConfirmationOpen(false)
    const result = await handleDeleteEnrollment(enrollmentId);
    setMessage(result.message);
    setMessageType(result.success ? 'success' : 'error');
    setIsMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setMessage(null);
    setMessageType(null);
  };

  return (
    <div>
      <button
        className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition"
        onClick={() => setIsSwapSectionModalOpen(true)}
      >
        Edit
      </button>

      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition ml-4"
        onClick={() => setIsDeleteConfirmationOpen(true)}
      >
        Delete
      </button>

      {isSwapSectionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Available Sections
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {Array.isArray(availableSections) && availableSections.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300 col-span-2">
                  No sections available for this course at the moment.
                </p>
              ) : (
                Array.isArray(availableSections) &&
                availableSections.length > 0 &&
                availableSections.map((section) => (
                  <div key={section.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {section.section} - {section.instructor}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{section.location}</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {section.timeSlot ? (
                        <>
                          {section.timeSlot.startTime || 'pending'} - {section.timeSlot.endTime || 'pending'}
                        </>
                      ) : (
                        'pending'
                      )}
                    </p>
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      onClick={() => onSelectSection(section.id)}
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

      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {messageType === 'success' ? 'Success' : 'Error'}
            </h2>
            <p className={`text-lg ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              onClick={closeMessageModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Are you sure you want to delete this enrollment?
            </h2>
            <div className="flex justify-between gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={onDeleteEnrollment}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                onClick={() => setIsDeleteConfirmationOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapButtonClient;
