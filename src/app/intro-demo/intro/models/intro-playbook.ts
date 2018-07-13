import { IntroPlaybookOptions } from './intro-playbook-options';

export interface IntroPlaybook {
  entries: IntroPlaybookEntry[];
  activeEntry?: IntroPlaybookEntry;
  options?: IntroPlaybookOptions;
}

export interface IntroPlaybookEntry {
  id: string;
  description?: string;
  displayTimeMs?: number;
}
