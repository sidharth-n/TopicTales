import React, { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import TopicInput from "./components/TopicInput";
import CategorySelection from "./components/CategorySelection";
import LevelSelection from "./components/LevelSelection";
import FinalScreen from "./components/FinalScreen";
import "./App.css";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");

  console.log("Current topic:", topic);
  console.log("Selected categories:", selectedCategories);
  console.log("Selected level:", selectedLevel);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={` container App transition duration-300 ease-in-out ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } font-jakarta`}
    >
      <div className="header p-3 transition duration-300 ease-in-out">
        {currentStep > 1 ? (
          <button
            className=" bg-gray-100 p-1 ml-5 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
        ) : (
          <div className="fake-back bg-white p-1 rounded-lg h-7 w-7 transition duration-300 ease-in-out"></div>
        )}
    <a href="/">
      <img 
          src="https://imgtr.ee/images/2023/10/25/018875a7c80aceae4ddd32dda357e6ef.png" 
          alt="TopicTales" 
          className="logo-size title transition ease-in-out cursor-pointer"
      />
    </a>



        <button onClick={toggleDarkMode} className="mode-btn mr-5 transition duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-moon"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>
      </div>
      <ProgressBar currentStep={currentStep} />
      {currentStep === 1 && (
        <TopicInput setTopic={setTopic} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 2 && (
        <CategorySelection
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 3 && (
        <LevelSelection
          selectedLevel={selectedLevel} // Passing down the state
          setSelectedLevel={setSelectedLevel}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === 4 && <FinalScreen setCurrentStep={setCurrentStep} />}
    </div>
  );
};

export default App;
