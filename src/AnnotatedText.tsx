import React, { useEffect, useState } from "react";
import writeGood from "write-good";
import { Issue } from "./Issue";
import { syllable } from "syllable";
import { WORD_BAN_LIST } from "./BannedWords";

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

    const paragraphRegex = /\n[^\n]+|[^\n]+\n|([^\n]+$)/gi;
    let match: RegExpExecArray;
    while ((match = paragraphRegex.exec(text)) as unknown as boolean) {
      const paragraph = match[0];
      const paragraphStart = match.index;
      const paragraphOffset = match[0].length;
      // suggestions.push({
      //   index: match.index,
      //   offset: match[0].length,
      //   reason: "this is a paragraph",
      // });
      const sentenceRegex = /[^.]+./gi;
      const sentences = paragraph.split(". ").length;
      if (sentences < 3 || sentences > 5) {
        // prettier-ignore
        addSuggestion(paragraphStart, paragraphOffset, `Paragraph sentence count = ${sentences}, Expected >= 3 and <= 5`);
      }
      while ((match = sentenceRegex.exec(paragraph)) as unknown as boolean) {
        const sentence = match[0];
        const sentenceStart = match.index + paragraphStart;
        const sentenceOffset = sentence.length;
        // console.log(sentence, sentence.split(" ").length);
        const wordCount = sentence.split(" ").length;
        if (wordCount > 20) {
          // prettier-ignore
          addSuggestion(sentenceStart, sentenceOffset, `Long sentence! Words = ${wordCount}, Expected <= 20`);
        }
        if (wordCount > 25) {
          // prettier-ignore
          addSuggestion(sentenceStart, sentenceOffset, `Very long sentence! Words = ${wordCount}, Expected <= 25`);
        }
        const wordRegex = / [^ ]+|[^ ]+ /gi;
        while ((match = wordRegex.exec(sentence)) as unknown as boolean) {
          const word = match[0].trim();
          const wordStart = match.index + sentenceStart;
          const wordOffset = match[0].length;
          const syllables = syllable(word);
          if (syllables > 2) {
            // prettier-ignore
            addSuggestion(wordStart, wordOffset, `Long word! Syllables = ${syllables}, Expected <= 2`);
          }
          if (syllables > 3) {
            // prettier-ignore
            addSuggestion(wordStart, wordOffset, `Very long word! Syllables = ${syllables}, Expected <= 3`);
          }
          if (WORD_BAN_LIST[word]) {
            // prettier-ignore
            addSuggestion(wordStart, wordOffset, `"${word}": ${WORD_BAN_LIST[word]}`);
          }
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
    <div className='p-4 m-4 w-full flex flex-row gap-4 h-full'>
      <div className='p-4 flex flex-row w-1/2 flex-wrap font-mono rounded-lg bg-white border border-black/20 overflow-y-scroll max-h-[90vh]'>
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
      </div>
      <div className='p-4 bg-white border border-black/20 rounded-md text-black w-full'>
        {text.split(/\w+/g).length + " words"}
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
