import React from "react";

interface FinalScreenProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ setCurrentStep }) => {
  return (
    <div className="mx-3 mt-5 p-5 relative flex flex-col items-center">
      <h1 className="story-title font-extrabold text-lg">
        The Quantum Quest of Zippy Quark
      </h1>
      <p className="story p-2 text-base pt-5 pb-8 leading-8 text-center">
        Zippy Quark was a teeny tiny particle who lived in an odd atomic world
        where strange things happened. One day, as Zippy was spinning around,
        his friend Wavey said, "Slow down! I can't see you clearly when you move
        so fast." Zippy grinned, "But I'm both a particle and a wave! When I
        spin super fast, my wave nature takes over and I become a blurry smear."
        "You're weird, Zippy," Wavey chuckled. "It's one of your quantum
        quirks." Later, Zippy got zapped into a cage made of impenetrable metal
        walls. "Oh no!" he cried. "I'm trapped!" He leaned against a wall and
      </p>
    </div>
  );
};

export default FinalScreen;
