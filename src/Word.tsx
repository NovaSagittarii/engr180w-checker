import { useEffect, useState } from "react";
import { syllableCount } from "syllable-count-english";

import { WORD_BAN_LIST } from "./AnnotatedText";
import { HasKey } from "./HasKey";
import { IssueListing } from "./Issue";
import IssueList from "./IssueList";

interface WordProps extends HasKey {
  word: string;
  issues?: IssueList;
  className?: string;
}

function Word({ word, key, issues, className = "" }: WordProps) {
  const [severity, setSeverity] = useState(-1);
  const [issueList, setIssueList] = useState(new IssueList());
  useEffect(() => {
    if (!issues) issues = new IssueList();

    const syllables = syllableCount(word);
    if (syllables > 3) {
      issues.addIssue(
        "Very long word",
        `Word might be able to be replaced with a simpler word. Syllable count = ${syllables}, Expected <= 2`,
        2,
      );
    } else if (syllables > 2) {
      issues.addIssue(
        "Long word",
        `Word might be able to be replaced with a simpler word. Syllable count = ${syllables}, Expected <= 2`,
        1,
      );
    }
    if (WORD_BAN_LIST[word]) {
      issues.addIssue("Word issue", WORD_BAN_LIST[word]);
    }
    setSeverity(issues.getHighestSeverity());
    setIssueList(issues);
  }, [word, issues, syllableCount]);
  return (
    <div
      className={`group p-1 w-fit ${className} ${
        severity > 0 ? "text-red-700 hover:bg-red-700 hover:text-white" : ""
      }`}
      key={key}
    >
      {word}
      {issueList.getIssues().length > 0 && (
        <div className='absolute bg-white p-2 border border-black rounded-md text-black group-hover:block hidden'>
          <IssueListing issues={issueList} />
        </div>
      )}
    </div>
  );
}

export default Word;
