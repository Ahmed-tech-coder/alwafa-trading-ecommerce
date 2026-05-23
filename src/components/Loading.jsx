import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F9F5F0] text-[#4B2E05] px-4">
      <svg
        className="w-24 h-24 animate-spin-slow"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#woodGradient)"
          stroke="#6B4C3B"
          strokeWidth="4"
        />

        <g stroke="#8C6642" strokeWidth="2" strokeLinecap="round">
          <line x1="20" y1="50" x2="80" y2="50" />
          <line x1="30" y1="35" x2="70" y2="35" />
          <line x1="25" y1="65" x2="75" y2="65" />
          <line x1="40" y1="25" x2="60" y2="25" />
          <line x1="40" y1="75" x2="60" y2="75" />
        </g>
      </svg>

      <svg width="0" height="0">
        <defs>
          <radialGradient id="woodGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D2B48C" />
            <stop offset="70%" stopColor="#A9746E" />
            <stop offset="100%" stopColor="#6B4C3B" />
          </radialGradient>
        </defs>
      </svg>

      <p className="mt-8 text-2xl font-serif font-semibold tracking-wide select-none text-[#6B4C3B] animate-fadeInPulse">
        Loading...
      </p>

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }

        @keyframes fadeInPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-fadeInPulse {
          animation: fadeInPulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
