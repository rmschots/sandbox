import { Injectable } from '@angular/core';
import { IntroPlaybook, IntroPlaybookEntry } from '../models/intro-playbook';
import { IntroStepDirective } from '../intro-step/intro-step.directive';
import { concatMap, last } from 'rxjs/operators';
import { from } from 'rxjs/internal/observable/from';
import { timer } from 'rxjs/internal/observable/timer';
import { IntroOverlayService } from './intro-overlay.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class IntroService {

  stepMap: Map<string, IntroStepDirective> = new Map<string, IntroStepDirective>();

  private _activePlaybook: IntroPlaybook;
  private _canDoPreviousChanges$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isLastStepActiveChanges$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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

  stopIntro() {
    this.stopPlaybook();
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
    this._canDoPreviousChanges$.next(currentIndex > 0);
    this._isLastStepActiveChanges$.next(currentIndex === this._activePlaybook.entries.length - 1);
    if (this._activePlaybook.activeEntry.component) {
      nextStep.activate(this._activePlaybook.activeEntry.component, this._activePlaybook.activeEntry.data);
    } else if (this._activePlaybook.activeEntry.templateRef && this._activePlaybook.activeEntry.viewContainerRef) {
      nextStep.activateTemplate(this._activePlaybook.activeEntry.templateRef, this._activePlaybook.activeEntry.viewContainerRef);
    } else {
      console.error('must set component or both templateRef and viewContainerRef');
      this.stopPlaybook();
    }
  }

  previousStep() {
    if (!this._activePlaybook) {
      console.error('No active playbook');
      return;
    }
    if (!this.canDoPrevious) {
      console.error('Cannot go to previous step');
      return;
    }
    let currentIndex = this._activePlaybook.entries.indexOf(this._activePlaybook.activeEntry);
    let previousStep: IntroStepDirective = null;
    while (!previousStep && currentIndex - 1 >= 0) {
      currentIndex--;
      const previousEntry = this._activePlaybook.entries[currentIndex];
      previousStep = this.stepMap.get(previousEntry.id);
    }
    if (!previousStep) {
      console.error('No existing available steps');
      return;
    }
    this._activePlaybook.activeEntry = this._activePlaybook.entries[currentIndex];
    this._canDoPreviousChanges$.next(currentIndex > 0);
    this._isLastStepActiveChanges$.next(currentIndex === this._activePlaybook.entries.length - 1);
    if (this._activePlaybook.activeEntry.component) {
      previousStep.activate(this._activePlaybook.activeEntry.component, this._activePlaybook.activeEntry.data);
    } else if (this._activePlaybook.activeEntry.templateRef && this._activePlaybook.activeEntry.viewContainerRef) {
      previousStep.activateTemplate(this._activePlaybook.activeEntry.templateRef, this._activePlaybook.activeEntry.viewContainerRef);
    } else {
      console.error('must set component or both templateRef and viewContainerRef');
      this.stopPlaybook();
    }
  }

  get isLastStepActive() {
    return this._isLastStepActiveChanges$.getValue();
  }

  get isLastStepActiveChanges$() {
    return this._isLastStepActiveChanges$.asObservable();
  }

  get canDoPrevious() {
    return this._canDoPreviousChanges$.getValue();
  }

  get canDoPreviousChanges$() {
    return this._canDoPreviousChanges$.asObservable();
  }

  private doAutoplay() {
    from(this._activePlaybook.entries)
      .pipe(
        concatMap((playbookEntry: IntroPlaybookEntry<any>) => {
          const step = this.stepMap.get(playbookEntry.id);
          if (!step) {
            console.warn(`trying to run that that doesn't exist: ${playbookEntry.id}`);
            return timer(0);
          }
          console.log('running step', step);
          this._activePlaybook.activeEntry = playbookEntry;
          if (this._activePlaybook.activeEntry.component) {
            step.activate(this._activePlaybook.activeEntry.component, this._activePlaybook.activeEntry.data);
          } else if (this._activePlaybook.activeEntry.templateRef && this._activePlaybook.activeEntry.viewContainerRef) {
            step.activateTemplate(this._activePlaybook.activeEntry.templateRef, this._activePlaybook.activeEntry.viewContainerRef);
          } else {
            console.error('must set component or both templateRef and viewContainerRef');
            this.stopPlaybook();
          }
          return timer(playbookEntry.displayTime ? playbookEntry.displayTime : 1000);
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
    this._introOverlayService.showOverlay();
    this._activePlaybook = playbook;
  }

  private stopPlaybook() {
    this._introOverlayService.hideOverlay();
    this._activePlaybook.activeEntry = undefined;
    this._activePlaybook = undefined;
  }
}
