import React, { useState } from "react";
import { HasKey } from "./HasKey";
import IssueList from "./IssueList";

export type Severity = 0 | 1 | 2 | 3;
interface IssueProps extends HasKey {
  label: string;
  description: string;
  severity?: Severity;
}

const BG_COLORS: Record<Severity, string> = {
  0: "bg-yellow-100",
  1: "bg-orange-100",
  2: "bg-red-100",
  3: "bg-red-100",
};

function Issue({ label, description, severity = 0, key }: IssueProps) {
  const [active, setActive] = useState(true);
  return (
    <div
      className={`flex flex-col p-1 rounded-sm ${active ? "" : "opacity-50"}`}
      key={key}
    >
      <div className={`font-semibold text-xl ${BG_COLORS[severity]}`}>
        {label}
      </div>
      <div>
        <div className='text-black/80 text-base'>{description}</div>
        {active && (
          <button
            className='border border-black'
            onClick={() => {
              setActive(false);
            }}
          >
            dismiss
          </button>
        )}
      </div>
    </div>
  );
}

interface IssueListingProps {
  issues: IssueList;
  maxSeverityHandler?: (arg0: Severity) => void;
}
function IssueListing({ issues }: IssueListingProps) {
  return (
    <>
      {issues.getIssues().map(({ label, description, severity }, index) => (
        <Issue
          label={label}
          description={description}
          key={index}
          severity={severity}
        />
      ))}
    </>
  );
}

export default Issue;
export { Issue, IssueListing };
