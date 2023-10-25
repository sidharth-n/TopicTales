import React, { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import TopicInput from "./components/TopicInput";
import CategorySelection from "./components/CategorySelection";
import LevelSelection from "./components/LevelSelection";
import FinalScreen from "./components/FinalScreen";
import "./App.css";
import logo from "./Assets/TTlogo.png";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Current topic:", topic);
  console.log("Selected categories:", selectedCategories);
  console.log("Selected level:", selectedLevel);

  const fetchStory = async () => {
    setIsLoading(true);
    const newPrompt = `
Generate a short interesting story around 300 words long in the ${selectedCategories[0]} category focused on clearly explaining the concept of ${topic}.

The story should have a very short, catchy 1-3 word title that hints at the topic as well. Use simple English words and terminology suitable for a general audience to tell the story.

Properly incorporate the key ideas, principles, and aspects of ${topic} into the storyline in a contextual way. Add interesting characters and dialog as needed to make the explanation engaging. Break the story into proper paragraphs to aid readability. using <p></p> tags and </br> tags and other tags for readability. iam using this directy inside html

After the story, provide a concise 100 word explanation of ${topic} using scientific terminology to summarize the main points covered in the story.

Format the output as a JSON object with the story title, story content, and topic explanation as separate fields like this:

{

"title": "Title here",

"story": "Story content here",

"topic_explanation": "topic explanation here"

}. please do not give me any other information than the json in the requied format.
`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: newPrompt }],
            temperature: 0.7,
          }),
        }
      );

      const result = await response.json();
      const resultContent = result.choices[0].message.content;
      const parsedData = JSON.parse(resultContent);
      setResponse(parsedData);
      console.log(parsedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  console.debug("Debug: fetchStory in App.tsx is:", fetchStory);

  return (
    <div
      className={` container App ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } font-jakarta`}
    >
      <div className="header">
        {currentStep > 1 ? (
          <button
            className={`p-1 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={darkMode ? "#none" : "none"}
              stroke={darkMode ? "#ffffff" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
        ) : (
          <div className="fake-back bg-white p-1 rounded-lg h-7 w-7 "></div>
        )}
        <a href="/">
          <img
            src={logo}
            alt="TopicTales Logo"
            className="logo-size title transition ease-in-out cursor-pointer"
          />
        </a>
        <button className="mode-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect width="24" height="24" rx="6" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 6C6.44772 6 6 6.44772 6 7C6 7.55228 6.44772 8 7 8H17C17.5523 8 18 7.55228 18 7C18 6.44772 17.5523 6 17 6H7ZM7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16H7Z"
              fill="#040415"
            />
            <rect x="3" y="11" width="18" height="2" rx="1" fill="#040415" />
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
          isDarkMode={darkMode}
        />
      )}
      {currentStep === 3 && (
        <LevelSelection
          selectedLevel={selectedLevel} // Passing down the state
          setSelectedLevel={setSelectedLevel}
          setCurrentStep={setCurrentStep}
          fetchStory={fetchStory}
          isDarkMode={darkMode}
        />
      )}

      {isLoading ? (
        <div className="loader text-base">Generating Tale...</div>
      ) : currentStep === 4 ? (
        <FinalScreen
          setCurrentStep={setCurrentStep}
          response={response}
          isDarkMode={darkMode}
        />
      ) : null}
    </div>
  );
};

export default App;
