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
 Generate a ${selectedLevel}-level short interesting story in the ${selectedCategories[0]} category focused on the topic of ${topic}.
 the story is supposd be around 500 words and it shouls have a very short apt catchy title as well. use simple english words to make the story and finally i need a prorper short(around 100 words)
 expalantion of the topic. remember this is project to convert any topics to short story so focus ion the topic mentioned and make sue the topic is well explained in the story in a storytelling way. add proper characters and conversations as per required. i need the data back as a json response in the following format. do not sedn anything else than the json in the fommolwing format with 
 appropriate generated content. make sure to add proper like breaks in the stroy and paragraph tage so that i can use it direcly on my webste without worrying about formatting. here is the sampel json format required :
{
  "title": "The title of the story will be here",
  "story": "The story content, limited to less than 1000 words, will be here",
  "topic_explanation": "A brief explanation of the selected topic will be here"
}
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
