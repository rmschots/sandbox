import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector, NgZone, OnDestroy, } from '@angular/core';
import { IntroStepDirective } from '../intro-step/intro-step.directive';
import { IntroOverlayComponent } from '../overlay/intro-overlay/intro-overlay.component';
import { OverlayConfig } from '@angular/cdk/overlay/typings/overlay-config';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { IntroEmptyComponent } from '../overlay/intro-empty/intro-empty.component';
import { INTRO_DIRECTION_LISTENER, INTRO_TEXT_DATA } from './intro.tokens';
import { ComponentType } from '@angular/cdk/portal/typings/portal';
import { Observable } from 'rxjs/Observable';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay/typings/position/connected-position';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const textOffset = 20;
export const positionLeft: ConnectedPosition = {
  originX: 'start',
  originY: 'center',
  overlayX: 'end',
  overlayY: 'center',
  offsetX: -textOffset
};
export const positionRight: ConnectedPosition = {
  originX: 'end',
  originY: 'center',
  overlayX: 'start',
  overlayY: 'center',
  offsetX: textOffset
};
export const positionBottom: ConnectedPosition = {
  originX: 'center',
  originY: 'bottom',
  overlayX: 'center',
  overlayY: 'top',
  offsetY: textOffset
};
export const positionTop: ConnectedPosition = {
  originX: 'center',
  originY: 'top',
  overlayX: 'center',
  overlayY: 'bottom',
  offsetY: -textOffset
};

export enum IntroDirection {
  LEFT, RIGHT, TOP, BOTTOM, UNKNOWN
}

export interface IntroDirectionListener {
  positionChanged: Observable<IntroDirection>;
}

@Injectable()
export class IntroOverlayService implements OnDestroy {
  private _overlayRef: OverlayRef;

  private _highlightOverlayRef: OverlayRef;
  private _textOverlayRef: OverlayRef;

  private _currentHighlight: IntroStepDirective;

  constructor(@Inject(DOCUMENT) private _document: any,
              private _overlay: Overlay,
              private _injector: Injector,
              private _zone: NgZone) {
  }

  highlight(introStepDirective: IntroStepDirective, textComponent: ComponentType<any>, introTextData: any) {
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
    const positionStrategy2: FlexibleConnectedPositionStrategy = this._overlay.position()
      .flexibleConnectedTo(elementRef)
      .withPositions([positionBottom, positionTop, positionRight, positionLeft]);
    const overlayConfig2: OverlayConfig = {
      hasBackdrop: false,
      positionStrategy: positionStrategy2,
      panelClass: 'cdk-panel',
    };
    this._textOverlayRef = this._overlay.create(overlayConfig2);

    const injector = this.createInjector(introTextData, this.createIntroDirectionListener(positionStrategy2));
    const introPortal2 = new ComponentPortal(textComponent, null, injector);
    this._textOverlayRef.attach(introPortal2);
    this._textOverlayRef.getDirection();
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
        width: `0px`,
        height: `0px`,
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

  private createInjector(config: any, introDirectionListener: IntroDirectionListener): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(INTRO_TEXT_DATA, config);
    injectionTokens.set(INTRO_DIRECTION_LISTENER, introDirectionListener);

    // Instantiate new PortalInjector
    return new PortalInjector(this._injector, injectionTokens);
  }

  private createIntroDirectionListener(positionStrategy: FlexibleConnectedPositionStrategy) {
    const subject = new BehaviorSubject<IntroDirection>(IntroDirection.UNKNOWN);
    positionStrategy.positionChanges.pipe(take(1), map(this.positionResolver))
      .subscribe(val => this._zone.run(() => subject.next(val)));
    return {positionChanged: subject.asObservable()};
  }

  private positionResolver: (ConnectedOverlayPositionChange) => (IntroDirection)
    = (change: ConnectedOverlayPositionChange) => {
    switch (change.connectionPair) {
      case positionLeft:
        return IntroDirection.LEFT;
      case positionRight:
        return IntroDirection.RIGHT;
      case positionTop:
        return IntroDirection.TOP;
      case positionBottom:
        return IntroDirection.BOTTOM;
      default:
        return IntroDirection.UNKNOWN;
    }
  };


}
