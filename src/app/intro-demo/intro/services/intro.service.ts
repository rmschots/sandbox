import { Injectable } from '@angular/core';
import { IntroPlaybook, IntroPlaybookEntry } from '../models/intro-playbook';
import { IntroStepDirective } from '../intro-step/intro-step.directive';
import { concatMap, filter, last } from 'rxjs/operators';
import { from } from 'rxjs/internal/observable/from';
import { timer } from 'rxjs/internal/observable/timer';
import { IntroOverlayService } from './intro-overlay.service';

@Injectable()
export class IntroService {

  stepMap: Map<string, IntroStepDirective> = new Map<string, IntroStepDirective>();

  private _activePlaybook: IntroPlaybook;

  constructor(private _introOverlayService: IntroOverlayService) {
  }

  addStep(stepDirective: IntroStepDirective) {
    if (this.stepMap.has(stepDirective.stepName)) {
      console.error('duplicate step name', stepDirective.stepName);
      return;
    }
    this.stepMap.set(stepDirective.stepName, stepDirective);
  }

  removeStep(stepDirective: IntroStepDirective) {
    this.stepMap.delete(stepDirective.stepName);
  }

  startIntro(playbook: IntroPlaybook) {
    if (this.isPlaybookRunning()) {
      console.error('a playbook is already running');
      return;
    }
    this.activatePlaybook(playbook);
    if (playbook.options.autoplay) {
      this.doAutoplay();
    } else {
      this.nextStep();
    }
  }

  nextStep() {
    if (!this._activePlaybook) {
      console.error('No active playbook');
      return;
    }
    let currentIndex = this._activePlaybook.entries.indexOf(this._activePlaybook.activeEntry);
    let nextStep: IntroStepDirective = null;
    while (!nextStep && currentIndex + 1 < this._activePlaybook.entries.length) {
      currentIndex++;
      const nextEntry = this._activePlaybook.entries[currentIndex];
      nextStep = this.stepMap.get(nextEntry.id);
    }
    if (!nextStep) {
      this.stopPlaybook();
      return;
    }
    this._activePlaybook.activeEntry = this._activePlaybook.entries[currentIndex];
    nextStep.activate(this._activePlaybook.options.textComponent);
  }

  private doAutoplay() {
    from(this._activePlaybook.entries)
      .pipe(
        filter(playbookEntry => {
          const stepAvailable = this.stepMap.has(playbookEntry.id);
          if (!stepAvailable) {
            console.warn(`trying to run that that doesn't exist: ${playbookEntry.id}`);
          }
          return stepAvailable;
        }),
        concatMap((playbookEntry: IntroPlaybookEntry) => {
          const step = this.stepMap.get(playbookEntry.id);
          console.log('running step', step);
          this._activePlaybook.activeEntry = playbookEntry;
          step.activate(this._activePlaybook.options.textComponent);
          return timer(1000);
        }),
        last()
      )
      .subscribe(() => {
        this.stopPlaybook();
      });
  }

  private isPlaybookRunning() {
    return this._activePlaybook;
  }

  private activatePlaybook(playbook: IntroPlaybook) {
    // this._introOverlayService.showOverlay();
    this._introOverlayService.showOverlay();
    this._activePlaybook = playbook;
  }

  private stopPlaybook() {
    // this._introOverlayService.hideOverlay();
    this._introOverlayService.hideOverlay();
    this._activePlaybook.activeEntry = undefined;
    this._activePlaybook = undefined;
  }
}
