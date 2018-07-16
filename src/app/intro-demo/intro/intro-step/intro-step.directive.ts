import { Directive, ElementRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { IntroService } from '../services/intro.service';
import { IntroOverlayService } from '../services/intro-overlay.service';
import { ComponentType } from '@angular/cdk/portal/typings/portal';

@Directive({
  selector: '[sbIntroStep]'
})
export class IntroStepDirective implements OnDestroy {
  private _stepName: string;

  constructor(public elementRef: ElementRef,
              private _introService: IntroService,
              private _introOverlayService: IntroOverlayService) {
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

  activate(textComponent: ComponentType<any>, introTextData: any) {
    this._introOverlayService.highlight(this, textComponent, introTextData);
  }

  activateTemplate(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    this._introOverlayService.highlightTemplate(this, templateRef, viewContainerRef);
  }
}
