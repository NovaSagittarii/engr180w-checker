import { useEffect, useState } from "react";
import { syllableCount } from "syllable-count-english";

import { WORD_BAN_LIST } from "./AnnotatedText";
import { HasKey } from "./HasKey";
import { IssueListing } from "./Issue";
import IssueList from "./IssueList";

interface WordProps extends HasKey {
  word: string;
  issues?: IssueList;
  /** append additional issues without changing severity (such as showing sentence level issues on the word) */
  silentIssues?: IssueList;
  className?: string;
}

const HOVER_COLORS: Record<number, string> = {
  0: "text-yellow-500 hover:bg-yellow-500 hover:text-white",
  1: "text-orange-500 hover:bg-orange-500 hover:text-white",
  2: "text-red-500 hover:bg-red-500 hover:text-white",
  3: "text-red-700 hover:bg-red-700 hover:text-white",
};

function Word({ word, key, issues, silentIssues, className = "" }: WordProps) {
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
        0,
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
      className={`group p-1 w-fit ${className} ${HOVER_COLORS[severity]}`}
      key={key}
    >
      {word}
      {(issueList.hasIssue() || silentIssues?.hasIssue()) && (
        <div className='absolute bg-white p-2 border border-black rounded-md text-black group-hover:block hidden'>
          <IssueListing issues={issueList} />
          {silentIssues?.hasIssue() && <IssueListing issues={silentIssues} />}
        </div>
      )}
    </div>
  );
}

export default Word;
