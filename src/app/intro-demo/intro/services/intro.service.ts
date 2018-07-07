import { Injectable } from '@angular/core';
import { IntroPlaybook } from '../models/intro-playbook';
import { IntroStepDirective } from '../intro-step/intro-step.directive';
import { concatMap, last } from 'rxjs/operators';
import { IntroOverlayService } from './intro-overlay.service';
import { IntroPlaybookOptions } from '../models/intro-playbook-options';
import { from } from 'rxjs/internal/observable/from';
import { timer } from 'rxjs/internal/observable/timer';

@Injectable()
export class IntroService {

  private _activePlaybook: IntroPlaybook;

  stepMap: Map<string, IntroStepDirective> = new Map<string, IntroStepDirective>();

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

  startIntro(playbook: IntroPlaybook, options?: IntroPlaybookOptions) {
    options = options || {autoplay: false};
    if (this.isPlaybookRunning()) {
      console.error('a playbook is already running');
      return;
    }
    this.activatePlaybook(playbook);
    const steps = playbook.entries.filter(playbookEntry => {
      const stepAvailable = this.stepMap.has(playbookEntry.id);
      if (!stepAvailable) {
        console.warn(`trying to run that that doesn't exist: ${playbookEntry.id}`);
      }
      return stepAvailable;
    }).map(playbookEntry => this.stepMap.get(playbookEntry.id));
    if (options.autoplay) {
      this.doAutoplay(steps);
    } else {
      this.doManual(steps);
    }
  }

  private doManual(steps: IntroStepDirective[]) {
    steps[0].activate();
    // from(steps)
    //   .pipe(
    //     concatMap((step: IntroStepDirective) => {
    //       console.log('running step', step);
    //       step.activate();
    //       return timer(1000);
    //     }),
    //     last()
    //   )
    //   .subscribe(() => {
    //     this.stopPlaybook();
    //   });
  }

  private doAutoplay(steps: IntroStepDirective[]) {
    from(steps)
      .pipe(
        concatMap((step: IntroStepDirective) => {
          console.log('running step', step);
          step.activate();
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
    this._introOverlayService.showOverlay();
    this._activePlaybook = playbook;
  }

  private stopPlaybook() {
    this._introOverlayService.hideOverlay();
    this._activePlaybook = undefined;
  }
}
