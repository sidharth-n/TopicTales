import React, { useState, useEffect } from "react"
import ProgressBar from "./components/ProgressBar"
import TopicInput from "./components/TopicInput"
import CategorySelection from "./components/CategorySelection"
import LevelSelection from "./components/LevelSelection"
import FinalScreen from "./components/FinalScreen"
import LandingPage from "./components/LandingPage"
import "./App.css"
import logo from "./Assets/TTlogo.png"

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [topic, setTopic] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevel, setSelectedLevel] = useState("")
  const [response, setResponse] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  console.log("Current topic:", topic)
  console.log("Selected categories:", selectedCategories)
  console.log("Selected level:", selectedLevel)

  const fetchStory = async () => {
    setIsLoading(true)
    const newPrompt = `
Generate a short entertaining story around 300 words long in the ${selectedCategories[0]} category. The sole purpose of the story is to clearly explain the key concepts, principles and aspects of ${topic} through the plot and character dialog.

Use simple English words suitable for a general audience. The story should have a very short 1-3 word title hinting at the topic.

Creatively weave the factual explanations and definitions of ${topic} into the character dialog and storyline to teach the concepts in a contextual, engaging way. Use interesting characters, conversations, and conflict/resolution to aid the explanations.

Break the story into paragraphs with <p> tags and line breaks <br> for readability.

After the story, summarize the main points covered in the story in a 100 word topic explanation using scientific terminology.

Format as a JSON object with separate title, story, and explanation fields:

{

"title": "Title here",
"story": "Story content here",
"topic_explanation": "topic explanation here"

}

The sole purpose is to explain ${topic} clearly through an engaging 300 word story narrative for a general audience. Do not include anything else in the JSON response.
`

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
      )

      const result = await response.json()
      const resultContent = result.choices[0].message.content
      const parsedData = JSON.parse(resultContent)
      setResponse(parsedData)
      console.log(parsedData)
      setIsLoading(false)
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  console.debug("Debug: fetchStory in App.tsx is:", fetchStory)
  useEffect(() => {
    console.log("currentStep changed:", currentStep)
  }, [currentStep])

  return (
    <div
      className={`container App ${
        darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
      } font-jakarta`}
    >
      {currentStep === 0 ? (
        <LandingPage setCurrentStep={setCurrentStep} />
      ) : (
        <>
          <div className="header z-10">
            {currentStep > 1 ? (
              <button
                className={`p-1 rounded-lg ml-6 ${
                  darkMode
                    ? "bg-slate-800"
                    : "bg-slate-100 hover:bg-slate-200 transition duration-300 ease-in-out"
                }`}
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                {/* ... rest of your code for the back button */}
              </button>
            ) : (
              <div className="fake-back bg-white p-1 rounded-lg h-7 w-7 "></div>
            )}
            <a href="/">
              <img
                src="https://imgtr.ee/images/2023/10/28/5649c3d558b18a1288979f803070a1b1.png"
                alt="SimpleStories"
                className="logo-size title transition ease-in-out cursor-pointer mt-5 mb-5"
              />
            </a>
            <button className="mode-btn mr-6">
              {/* ... rest of your code for the mode button */}
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
        </>
      )}
    </div>
  )
}

export default App
