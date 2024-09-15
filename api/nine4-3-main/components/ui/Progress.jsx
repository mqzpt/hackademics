import React from 'react';

export function Progress({ value, className }) {
  return (
    <div className={`relative pt-1 ${className}`}>
      <div className="flex mb-2 items-center justify-between">
        <div className="text-xs font-medium text-white"> {/* Changed text color to white */}
          {value}%
        </div>
      </div>
      <div className="relative flex mb-6 items-center">
        <div className="w-full max-w-4xl bg-gray-700 h-4 rounded-lg overflow-hidden shadow-lg"> {/* Changed background to darker gray and added a larger shadow */}
          <div
            className="absolute top-0 left-0 h-4 rounded-lg transition-all duration-500 ease-in-out"
            style={{
              width: `${value}%`,
              background: `linear-gradient(to right, red, yellow, green)`,
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)' // Added a white shadow for better visibility
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
