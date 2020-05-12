import React, { FC, ReactNode } from "react";

export const BigStatus: FC<{ icon: JSX.Element; text: string }> = ({
  icon,
  text,
}) => (
  <div className="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24">
    <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <svg
        className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
      >
        <defs>
          <pattern
            id="ad119f34-7694-4c31-947f-5c9d249b21f3"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              className="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
        />
      </svg>

      <div className="relative text-center">
        <div className="flex mx-auto items-center justify-center h-12 w-12 rounded-full bg-gray-500 text-white">
          <svg
            className="h-8 w-8"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        </div>
        <div className="mt-8 max-w-3xl mx-auto text-center text-2xl leading-9 text-gray-500">
          {text}
        </div>
      </div>
    </div>
  </div>
);
