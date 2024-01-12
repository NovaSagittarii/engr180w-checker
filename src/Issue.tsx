import { useState } from "react";
import { HasKey } from "./HasKey";
import IssueList from "./IssueList";

export type Severity = 0 | 1 | 2 | 3;
interface IssueProps extends HasKey {
  label: string;
  description: string;
  severity: Severity;
}

function Issue({ label, description, severity, key }: IssueProps) {
  const [active, setActive] = useState(true);
  return (
    <div className='flex flex-col' key={key}>
      <div className='font-semibold text-xl'>{label}</div>
      <div>
        <div className='text-black/80 text-base'>{description}</div>
        <div>sev{severity}</div>
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
