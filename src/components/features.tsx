import React from "react";

const Features = () => {
  return (
    <div className="max-w-5xl my-20 flex flex-col gap-10">
      <div className="flex flex-col text-center gap-3 px-6 lg:px-8">
        <h2 className="font-bold text-4xl text-gray-900 sm:text-5xl">
          Start Chatting in minutes
        </h2>
        <p className="text-lg text-gray-600 font-medium">
          Chatting to your PDF files has never been so easy
        </p>
      </div>
      {/*Steps*/}
      <ol className="flex flex-row gap-6">
        {steps.map((item, index) => (
          <li
            key={index}
            className="flex flex-col bg-gray-200 p-6 rounded-lg border drop-shadow-lg"
          >
            <span className="text-sm font-medium text-blue-600">
              {item.step}
            </span>
            <span className="text-xl font-bold text-zinc-700">
              {item.title}
            </span>
            <span className="mt-2 text-zinc-700">{item.description}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Features;

interface Steps {
  step: string;
  title: string;
  description: string;
}

const steps: Steps[] = [
  {
    step: "Step 1",
    title: "Sign up for an account",
    description:
      " Either starting out with a free plan or choose our pro plan.",
  },
  {
    step: "Step 2",
    title: "Upload your PDF file",
    description: " We'll process your file and make it ready for you to chat",
  },
  {
    step: "Step 3",
    title: "Start ask questions",
    description: "It's that simple. Try out Quill today - it really simple",
  },
];
