import { Fragment, useState } from "react";
import { HasKey } from "./HasKey";
import Word from "./Word";
import IssueList from "./IssueList";

interface SentenceProps extends HasKey {
  sentence: string;
}
function Sentence({ sentence, key }: SentenceProps) {
  const [mouseOver, setMouseOver] = useState<number>(0);

  const issues = new IssueList();
  // .replace(/[-,:;]/g, "")
  const words = sentence.split(/[ ]+/g).filter((x) => x);
  if (words.length > 25) {
    issues.addIssue(
      "Extra Long sentence",
      `Length = ${words.length} words, Expected <= 25`,
      2,
    );
  } else if (words.length > 20) {
    issues.addIssue(
      "Long sentence",
      `Length = ${words.length} words, Expected <= 20`,
    );
  }
  // const severity = issues.getHighestSeverity();

  return (
    <Fragment key={key}>
      {words.map((word, index) => (
        <div
          onMouseOver={() => setMouseOver((x) => x + 1)}
          onMouseOut={() => setTimeout(() => setMouseOver((x) => x - 1))}
        >
          <Word
            word={word}
            key={index}
            className={`${issues.hasIssue() ? "border-b border-red-700" : ""} ${
              mouseOver > 0 ? "border-dashed" : ""
            }`}
            silentIssues={issues}
          />
        </div>
      ))}
      <Word word={"."} issues={issues} />
    </Fragment>
  );
}

export default Sentence;
