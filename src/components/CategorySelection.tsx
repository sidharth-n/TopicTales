import React from "react";

interface CategorySelectionProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategories,
  setSelectedCategories,
  setCurrentStep,
}) => {
  const categories = [
    "Fantacy",
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
    if (selectedCategories.includes(category)) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([category]);
    }
  };

  return (
    <div className="mx-3 mt-5 p-5">
      <label className="block  text-xl font-extrabold ">
        Pick some category you like
      </label>
      <div className="pt-2 description text-sm font-extrabold text-gray-400 mb-5 ">
        We'll use these as an inspiration.
      </div>
      {categories.map((category) => (
        <button
          key={category}
          className={`m-2 p-2 ${
            selectedCategories.includes(category)
              ? "bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-full font-extrabold text-[14px] px-4"
              : "bg-gray-100 rounded-full text-[14px] px-4"
          }`}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </button>
      ))}
      <div className="mt-4">
        <button
        className="bg-indigo-500 text-white p-4 pl-8 pr-8 rounded-lg absolute left-1/2 transform -translate-x-1/2 bottom-12 text-sm flex flex-row items-center gap-1 transition duration-300 ease-in-out hover:bg-indigo-700"
        onClick={() => setCurrentStep(3)}
        >
          Continue
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8848 0.470085L14.6498 4.21809C14.9328 4.50009 14.9328 4.99909 14.6498 5.28209L10.8848 9.03009C10.5908 9.32209 10.1158 9.32109 9.82375 9.02709C9.53175 8.73309 9.53175 8.25909 9.82575 7.96609L12.3028 5.49909L0.888 5.5C0.473 5.5 0.138 5.164 0.138 4.75C0.138 4.336 0.473 4 0.888 4L12.3028 3.99909L9.82575 1.53309C9.67875 1.38609 9.60575 1.19409 9.60575 1.00109C9.60575 0.810085 9.67875 0.618085 9.82375 0.472085C10.1158 0.179085 10.5908 0.178085 10.8848 0.470085Z" fill="white"/>
</svg>
        </button>
      </div>
    </div>
  );
};

export default CategorySelection;
