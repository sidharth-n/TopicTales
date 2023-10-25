import React from "react";

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full h-1 bg-slate-100 my-4">
      <div
        className="h-full bg-indigo-500 transition-all duration-1000 delay-100 ease-in-out"
        style={{ width: `${(currentStep / 4) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
