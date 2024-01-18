import React, { useEffect, useState } from "react";
import writeGood from "write-good";
import { Issue } from "./Issue";

interface AnnotatedTextProps {
  /** text to annotate (input) */
  text: string;
}

function AnnotatedText({ text }: AnnotatedTextProps) {
  const WhitespaceRegex = /\s/g;
  const [mouseIndex, setMouseIndex] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<writeGood.Problem[]>([]);
  const [issueCount, setIssueCount] = useState<number[]>([]);

  useEffect(() => {
    const suggestions = writeGood(text);

    function addSuggestion(index: number, offset: number, reason: string) {
      suggestions.push({
        index,
        offset,
        reason,
      });
    }

    const paragraphRegex = /\n[^\n]+|[^\n]+\n/gi;
    let match: RegExpExecArray;
    while ((match = paragraphRegex.exec(text)) as unknown as boolean) {
      const paragraph = match[0];
      const paragraphStart = match.index;
      // suggestions.push({
      //   index: match.index,
      //   offset: match[0].length,
      //   reason: "this is a paragraph",
      // });
      const sentenceRegex = /[^.]+./gi;
      while ((match = sentenceRegex.exec(paragraph)) as unknown as boolean) {
        const sentence = match[0];
        const sentenceStart = match.index + paragraphStart;
        const sentenceOffset = sentence.length;
        console.log(sentence, sentence.split(" ").length);
        const wordCount = sentence.split(" ").length;
        if (wordCount > 20) {
          addSuggestion(sentenceStart, sentenceOffset, `Long sentence! Words = ${wordCount}, Expected <= 20`);
        }
        if (wordCount > 25) {
          addSuggestion(sentenceStart, sentenceOffset, `Very long sentence! Words = ${wordCount}, Expected <= 25`);
        }
      }
    }

    const issueCount = [...new Array(text.length)].map(() => 0);
    for (const { index, offset } of suggestions) {
      for (let i = 0; i < offset; ++i) {
        issueCount[index + i] += 1;
      }
    }

    setSuggestions(suggestions);
    setIssueCount(issueCount);
  }, [text]);

  function issueCountToColor(issues: number) {
    if (issues >= 5) return "text-red-500";
    else {
      return [
        "",
        "text-yellow-500",
        "text-yellow-800",
        "text-orange-500",
        "text-orange-800",
      ][issues];
    }
  }

  return (
    <div className='flex flex-row w-full max-w-md flex-wrap font-mono'>
      {text.split("").map((c, index) => (
        <div
          key={index}
          className={`${
            WhitespaceRegex.test(c) ? "px-2" : ""
          } ${issueCountToColor(issueCount[index])} ${
            index === mouseIndex ? "bg-slate-500" : ""
          }`}
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
