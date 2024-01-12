import { Fragment } from "react";
import { HasKey } from "./HasKey";
import Word from "./Word";
import IssueList from "./IssueList";

interface SentenceProps extends HasKey {
  sentence: string;
}
function Sentence({ sentence, key }: SentenceProps) {
  const issues = new IssueList();
  // .replace(/[-,:;]/g, "")
  const words = sentence.split(/[ ]+/g);
  if (words.length > 20) {
    issues.addIssue(
      "Long sentence",
      `Length = ${words.length} words, Expected <= 20`,
    );
  }
  if (words.length > 25) {
    issues.addIssue(
      "Extra Long sentence",
      `Length = ${words.length} words, Expected <= 25`,
      2,
    );
  }
  return (
    <Fragment key={key}>
      {words.map((word, index) => (
        <Word word={word} key={index} />
      ))}
    </Fragment>
  );
}

export default Sentence;
