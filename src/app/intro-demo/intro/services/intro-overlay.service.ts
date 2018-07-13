import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, } from '@angular/core';
import { IntroStepDirective } from '../intro-step/intro-step.directive';
import { IntroOverlayComponent } from '../overlay/intro-overlay/intro-overlay.component';
import { OverlayConfig } from '@angular/cdk/overlay/typings/overlay-config';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { IntroEmptyComponent } from '../intro-empty/intro-empty.component';

@Injectable()
export class IntroOverlayService implements OnDestroy {
  private _overlayRef: OverlayRef;

  private _highlightOverlayRef: OverlayRef;
  private _textOverlayRef: OverlayRef;

  private _currentHighlight: IntroStepDirective;

  constructor(@Inject(DOCUMENT) private _document: any, private _overlay: Overlay) {
  }

  highlight(introStepDirective: IntroStepDirective, textComponent: any) {
    this.cancelCurrentHighlight();
    this._currentHighlight = introStepDirective;

    const elementRef = introStepDirective.elementRef;
    const positionStrategy = this._overlay.position()
      .flexibleConnectedTo(elementRef)
      .withPositions([{
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top'
      }])
      .withPush(false)
      .withDefaultOffsetX(-5)
      .withDefaultOffsetY(-5);
    const clientRect: ClientRect = elementRef.nativeElement.getBoundingClientRect();
    elementRef.nativeElement.classList.add('intro-front-element');
    const overlayConfig: OverlayConfig = {
      hasBackdrop: false,
      backdropClass: 'cdk-backdrop',
      panelClass: 'cdk-panel',
      width: `${clientRect.width + 10}px`,
      height: `${clientRect.height + 10}px`,
      positionStrategy: positionStrategy
    };
    this._highlightOverlayRef = this._overlay.create(overlayConfig);
    const introPortal = new ComponentPortal(IntroOverlayComponent);
    this._highlightOverlayRef.attach(introPortal);

    // text
    const positionStrategy2 = this._overlay.position()
      .flexibleConnectedTo(elementRef)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      }])
      .withDefaultOffsetX(10)
      .withDefaultOffsetY(10);
    const overlayConfig2: OverlayConfig = {
      hasBackdrop: false,
      positionStrategy: positionStrategy2
    };
    this._textOverlayRef = this._overlay.create(overlayConfig2);
    const introPortal2 = new ComponentPortal(textComponent);
    this._textOverlayRef.attach(introPortal2);
  }

  cancelCurrentHighlight() {
    if (this._currentHighlight) {
      const highlightToCancel = this._currentHighlight;
      this._highlightOverlayRef.detach();
      this._textOverlayRef.detach();
      if (highlightToCancel) {
        highlightToCancel.elementRef.nativeElement.classList.remove('intro-front-element');
      }
      this._highlightOverlayRef = undefined;
      this._textOverlayRef = undefined;
      this._currentHighlight = undefined;
    }
  }

  ngOnDestroy() {
    this.hideOverlay();
  }

  showOverlay() {
    if (!this._overlayRef) {
      const overlayConfig: OverlayConfig = {
        hasBackdrop: true,
        backdropClass: 'cdk-backdrop',
        scrollStrategy: this._overlay.scrollStrategies.block(),
        panelClass: 'cdk-panel',
        width: `100px`,
        height: `100px`,
        positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically()
      };
      this._overlayRef = this._overlay.create(overlayConfig);
      this._overlayRef.attach(new ComponentPortal(IntroEmptyComponent));
    }
  }

  hideOverlay() {
    this.cancelCurrentHighlight();
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._overlayRef = undefined;
    }
  }
}
