import React, { useRef, useState } from "react";

interface TopicInputProps {
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const TopicInput: React.FC<TopicInputProps> = ({
  setTopic,
  setCurrentStep,
}) => {
  const [borderVisible, setBorderVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputClick = () => {
    setBorderVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setTopic(e.target.value);

    // Dynamically adjust the height of the textarea based on its content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const isButtonDisabled = !inputValue.trim(); // Check if inputValue is empty or only whitespace

  return (
    <div className="mx-3 mt-5 p-5 transition duration-300 ease-in-out fade-in">
      <label className="block text-xl font-extrabold transition duration-300 ease-in-out">
      Suggest a Topic
      </label>
      <div className="pt-2 description text-sm font-medium text-slate-400 transition duration-300 ease-in-out">
        This will be the spark to create a concept story just for you.
      </div>

      <textarea
        ref={textareaRef}
        rows={1}
        className={`p-3 w-full  mt-8 rounded-lg bg-slate-100  placeholder:text-slate-400 placeholder:text-sm focus:ring-2 focus:ring-bg-indigo-200
                    ${
                      borderVisible ? "border" : "border-0"
                    } transition duration-300 ease-in-out resize-none`}
        value={inputValue}
        onClick={handleInputClick}
        onChange={handleInputChange}
        placeholder="Enter a topic"
        style={{ overflowY: "hidden" }}
      ></textarea>
        <div className=" description text-xs font-base text-slate-400 italic transition duration-300 ease-in-out">
          Eg: Aritificial Intelligence
       </div>
      <button
        className={`text-white p-4 pl-8 pr-8 font-medium rounded-lg absolute left-1/2 transform -translate-x-1/2 bottom-12 text-sm flex flex-row items-center gap-1 transition duration-300 ease-in-out  ${
          isButtonDisabled
            ? "bg-indigo-400"
            : "hover:bg-indigo-700 bg-indigo-500"
        }`}
        onClick={() => setCurrentStep(2)}
        disabled={isButtonDisabled}
      >
        Continue
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="10"
          viewBox="0 0 15 10"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.8848 0.470085L14.6498 4.21809C14.9328 4.50009 14.9328 4.99909 14.6498 5.28209L10.8848 9.03009C10.5908 9.32209 10.1158 9.32109 9.82375 9.02709C9.53175 8.73309 9.53175 8.25909 9.82575 7.96609L12.3028 5.49909L0.888 5.5C0.473 5.5 0.138 5.164 0.138 4.75C0.138 4.336 0.473 4 0.888 4L12.3028 3.99909L9.82575 1.53309C9.67875 1.38609 9.60575 1.19409 9.60575 1.00109C9.60575 0.810085 9.67875 0.618085 9.82375 0.472085C10.1158 0.179085 10.5908 0.178085 10.8848 0.470085Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default TopicInput;
