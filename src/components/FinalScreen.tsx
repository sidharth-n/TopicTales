import React from "react";

interface FinalScreenProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  response: {
    title: string;
    story: string;
    topic_explanation: string;
  };
}

const FinalScreen: React.FC<FinalScreenProps> = ({
  setCurrentStep,
  response,
}) => {
  console.debug("Debug: Displaying response in FinalScreen:", response);

  return (
    <div className="final-screen-container overflow-y-auto max-h-[80vh]">
      <div className="px-4 relative flex flex-col items-center">
        <h1 className="story-title font-bold text-lg">{response.title}</h1>
        <div
          className="story p-2 text-base pb-8"
          dangerouslySetInnerHTML={{ __html: response.story }}
        ></div>
        {/* If you want to display the topic explanation too */}
        <p className="topic-explanation p-2 text-base pb-8 ">
          {response.topic_explanation}
        </p>
      </div>
    </div>
  );
};

export default FinalScreen;
