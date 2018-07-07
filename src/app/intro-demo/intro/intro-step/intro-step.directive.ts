import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { IntroService } from '../services/intro.service';
import { IntroOverlayService } from '../services/intro-overlay.service';

@Directive({
  selector: '[sbIntroStep]'
})
export class IntroStepDirective implements OnDestroy {
  private _stepName: string;

  constructor(public elementRef: ElementRef, private _introService: IntroService, private _overlayContainer: IntroOverlayService) {

  }

  @Input()
  set sbIntroStep(stepName: string) {
    this._introService.removeStep(this);
    this._stepName = stepName;
    this._introService.addStep(this);
  }

  ngOnDestroy(): void {
    this._introService.removeStep(this);
  }

  get stepName() {
    return this._stepName;
  }

  activate() {
    this._overlayContainer.highlight(this);
  }
}