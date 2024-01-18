import React, { useState } from "react";
import writeGood from "write-good";
import { Issue } from "./Issue";

interface AnnotatedTextProps {
  /** text to annotate (input) */
  text: string;
}

function AnnotatedText({ text }: AnnotatedTextProps) {
  const WhitespaceRegex = /\W/g;
  const [mouseIndex, setMouseIndex] = useState<number>(-1);

  const suggestions = writeGood(text);
  const flagged = [...new Array(text.length)].map(() => false);
  for (const {index, offset} of suggestions) {
    for (let i = 0; i < offset; ++i) {
      flagged[index+i] = true;
    }
  }

  return (
    <div className='flex flex-row w-full max-w-md flex-wrap'>
      {text.split("").map((c, index) => (
        <div
          key={index}
          className={`${WhitespaceRegex.test(c) ? "px-2" : ""} ${flagged[index] ? "text-red-500" : ""}`}
          onMouseOver={() => setMouseIndex(index)}
        >
          {c}
        </div>
      ))}
      <div className='fixed bg-white p-2 border border-black rounded-md text-black'>
        {suggestions.map(
          ({ reason, index, offset }, suggestionIndex) =>
            mouseIndex >= index &&
            mouseIndex <= index + offset && (
              <Issue label='!' description={reason} key={suggestionIndex} />
            ),
        )}
      </div>
    </div>
  );
}

export default AnnotatedText;
