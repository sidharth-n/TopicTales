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
            className=" bg-gray-200 p-1 rounded-lg"
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
          <div className="fake-back bg-white p-1 rounded-lg h-7 w-7 "></div>
        )}
        <h1 className="title">TopicTales</h1>
        <button onClick={toggleDarkMode} className="mode-btn">
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
          fetchStory={fetchStory}
        />
      )}

      {isLoading ? (
        <div className="loader">Generating...</div>
      ) : currentStep === 4 ? (
        <FinalScreen setCurrentStep={setCurrentStep} response={response} />
      ) : null}
    </div>
  );
};

export default App;
