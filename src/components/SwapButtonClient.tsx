'use client';

import React, { useState } from 'react';

type CourseSection = {
  id: string;
  section: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  daysOfTheWeek: string[];
};

type SwapButtonClientProps = {
  enrollmentId: string;
  courseId: string;
  availableSections?: CourseSection[];
};

const SwapButtonClient: React.FC<SwapButtonClientProps> = ({
  enrollmentId,
  courseId,
  availableSections = [],
}) => {
  const [isSwapSectionModalOpen, setIsSwapSectionModalOpen] = useState(false);

  const handleSelectSection = (sectionId: string) => {
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Available Sections
            </h2>
            <div className="space-y-2">
              {availableSections.length === 0 ? (
                <p>No sections available for this course at the moment.</p>
              ) : (
                availableSections.map((section) => (
                  <div key={section.id} className="p-4 bg-gray-100 rounded-md mb-2">
                    <h3 className="font-semibold">
                      {section.section} - {section.instructor}
                    </h3>
                    <p>{section.location}</p>
                    <p>
                      {section.startTime} - {section.endTime}
                    </p>
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
                      onClick={() => handleSelectSection(section.id)}
                    >
                      Select Section
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              className="w-full px-4 py-2 bg-gray-300 text-gray-900 font-medium rounded-md hover:bg-gray-400 transition"
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
