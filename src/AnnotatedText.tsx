import React, { useState } from "react";
import writeGood from "write-good";
import { Issue } from "./Issue";

interface AnnotatedTextProps {
  /** text to annotate (input) */
  text: string;
}

function AnnotatedText({ text }: AnnotatedTextProps) {
  const WhitespaceRegex = /\w/g;
  const [mouseIndex, setMouseIndex] = useState<number>(-1);

  const suggestions = writeGood(text);

  return (
    <div>
      {text.split("").map((c, index) => (
        <div
          key={index}
          className={WhitespaceRegex.test(c) ? "w-4" : ""}
          onMouseOver={() => setMouseIndex(index)}
        >
          {c}
        </div>
      ))}
      <div className='fixed m-auto'>
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
