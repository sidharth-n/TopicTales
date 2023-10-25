import React from "react";

interface CategorySelectionProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isDarkMode: boolean;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategories,
  setSelectedCategories,
  setCurrentStep,
  isDarkMode,
}) => {
  const categories = [
    "Fantasy",
    "Fiction",
    "Manga",
    "Fun",
    "Adventure",
    "Mystery",
    "Magic",
    "Thrill",
    "Random",
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories([category]); // Only set the selected category to the clicked one
  };

  const isButtonDisabled = selectedCategories.length === 0;

  return (
    <div className="mx-3 mt-5 p-5">
      <label className="block text-xl font-extrabold">
        Pick a category you like
      </label>
      <div className="pt-2 description text-sm font-medium text-slate-400 transition duration-300 ease-in-out mb-5">
        We'll use these as inspiration.
      </div>
      {categories.map((category) => (
        <button
          key={category}
          className={`m-2 p-2 ${
            selectedCategories.includes(category)
              ? isDarkMode
                ? "bg-indigo-800 text-indigo-100 border-2 border-indigo-500 rounded-full font-medium text-[14px] px-4 transition-all duration-500 ease-in-out"
                : "bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-full font-medium text-[14px] px-4 transition-all duration-500 ease-in-out"
              : isDarkMode
              ? "bg-slate-700 text-slate-100 border-2 border-slate-800 rounded-full  font-medium text-[14px] px-4 hover:border-indigo-500 hover:bg-indigo-800 hover:text-indigo-100 transition-all duration-500 ease-in-out"
              : "bg-slate-100 text-slate-500 border-2 border-slate-100 rounded-full font-medium text-[14px] px-4 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-300 transition-all duration-500 ease-in-out"
          }`}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </button>
      ))}
      <div className="mt-4">
        <button
          className={`text-white p-4 pl-8 pr-8 font-medium rounded-lg absolute left-1/2 transform -translate-x-1/2 bottom-12 text-sm flex flex-row items-center gap-1 transition duration-300 ease-in-out ${
            isButtonDisabled
              ? "bg-indigo-200"
              : "hover:bg-indigo-700 bg-indigo-500"
          }`}
          onClick={() => setCurrentStep(3)}
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
    </div>
  );
};

export default CategorySelection;
