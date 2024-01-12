import { Severity } from "./Issue";

interface IssueItem {
  label: string;
  description: string;
  severity: Severity;
}

class IssueList {
  private issues: IssueItem[] = [];
  constructor() {}
  public getIssues(): IssueItem[] {
    return this.issues;
  }
  public addIssue(label: string, description: string, severity: Severity = 1) {
    const newIssue = {
      label,
      description,
      severity,
    } as IssueItem;
    this.issues.push(newIssue);
  }
  public hasIssue(): boolean {
    return this.issues.length > 0;
  }
}

export default IssueList;
