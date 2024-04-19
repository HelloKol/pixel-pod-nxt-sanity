"use client";
import { useCopyToClipboard } from "@/hooks";
import React from "react";

// Props
interface Props {
  code: string;
}

export default function CopyCode({ code }: Props) {
  const { copyToClipboard, isSuccess } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(code);
  };

  return (
    <>
      {!isSuccess ? (
        <button
          className="bg-[#3b3d40] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-200 "
          onClick={handleCopy}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z"
              stroke="#FFFFFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      ) : (
        <button className="bg-[#3b3d40] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-200 ">
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Complete">
              <g id="tick">
                <polyline
                  points="3.7 14.3 9.6 19 20.3 5"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </g>
            </g>
          </svg>
        </button>
      )}
    </>
  );
}
