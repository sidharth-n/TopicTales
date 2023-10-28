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
      Give us a topic
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
        placeholder="Write your topic here"
        style={{ overflowY: "hidden" }}
      ></textarea>
        <div className=" description text-xs font-base text-slate-400 italic transition duration-300 ease-in-out">
          Eg: Aritificial Intelligence
       </div>
       
       
      <div className="inline-flex rounded-md shadow-sm absolute left-1/2 transform -translate-x-1/2 bottom-12 text-sm flex flex-row items-center transition duration-300 ease-in-out shadow-no" role="group">
        <button
          className={`text-white p-4 pl-8 pr-8 font-medium rounded-l-lg inline-flex items-center gap-2 ${
            isButtonDisabled
              ? "bg-indigo-400"
              : "hover:bg-indigo-700 bg-indigo-500"
          }`}
          onClick={() => setCurrentStep(2)}
          disabled={isButtonDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <g clip-path="url(#clip0_784_595)">
              <path d="M13.125 5C12.2187 5 11.7125 5.9 11.9187 6.56875L9.7 8.79375C9.5125 8.7375 9.2375 8.7375 9.05 8.79375L7.45625 7.2C7.66875 6.53125 7.1625 5.625 6.25 5.625C5.34375 5.625 4.83125 6.525 5.04375 7.2L2.19375 10.0437C1.525 9.8375 0.625 10.3437 0.625 11.25C0.625 11.9375 1.1875 12.5 1.875 12.5C2.78125 12.5 3.2875 11.6 3.08125 10.9312L5.925 8.08125C6.1125 8.1375 6.3875 8.1375 6.575 8.08125L8.16875 9.675C7.95625 10.3437 8.4625 11.25 9.375 11.25C10.2813 11.25 10.7938 10.35 10.5813 9.675L12.8062 7.45625C13.475 7.6625 14.375 7.15625 14.375 6.25C14.375 5.5625 13.8125 5 13.125 5Z" fill="white"/>
              <path d="M9.375 5.625L9.9625 4.33125L11.25 3.75L9.9625 3.16875L9.375 1.875L8.8 3.16875L7.5 3.75L8.8 4.33125L9.375 5.625Z" fill="white"/>
              <path d="M2.1875 6.875L2.5 5.625L3.75 5.3125L2.5 5L2.1875 3.75L1.875 5L0.625 5.3125L1.875 5.625L2.1875 6.875Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_784_595">
                <rect width="15" height="15" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          Simplify

        </button>
        <button
          className={`text-white p-4 pl-8 pr-8 font-medium rounded-r-lg inline-flex items-center gap-2   ${
            isButtonDisabled
              ? "bg-indigo-400"
              : "hover:bg-indigo-700 bg-indigo-500"
          }`}
          onClick={() => setCurrentStep(2)}
          disabled={isButtonDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <g clip-path="url(#clip0_784_603)">
              <path d="M11.875 5.625L12.6562 3.90625L14.375 3.125L12.6562 2.34375L11.875 0.625L11.0938 2.34375L9.375 3.125L11.0938 3.90625L11.875 5.625ZM7.1875 5.9375L5.625 2.5L4.0625 5.9375L0.625 7.5L4.0625 9.0625L5.625 12.5L7.1875 9.0625L10.625 7.5L7.1875 5.9375ZM11.875 9.375L11.0938 11.0938L9.375 11.875L11.0938 12.6562L11.875 14.375L12.6562 12.6562L14.375 11.875L12.6562 11.0938L11.875 9.375Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_784_603">
                <rect width="15" height="15" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          Storify

        </button>
        </div>
    </div>
  );
};

export default TopicInput;
