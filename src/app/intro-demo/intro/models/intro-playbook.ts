export interface IntroPlaybook {
  entries: IntroPlaybookEntry[];
}

export interface IntroPlaybookEntry {
  id: string;
  description?: string;
  displayTimeMs?: number;
}
