import { Component, OnInit } from '@angular/core';
import { IntroService } from './intro/services/intro.service';
import { IntroPlaybook } from './intro/models/intro-playbook';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { IntroOverlayComponent } from './intro/overlay/intro-overlay/intro-overlay.component';
import { OverlayConfig } from '@angular/cdk/overlay/typings/overlay-config';
import { IntroTextComponent } from './intro/overlay/intro-text/intro-text.component';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '../shared/util/Unsubscribable';

@Component({
  selector: 'sb-intro-demo',
  templateUrl: './intro-demo.component.html',
  styleUrls: ['./intro-demo.component.scss']
})
export class IntroDemoComponent extends Unsubscribable implements OnInit {

  private _playbook: IntroPlaybook =
    {
      entries: [
        {id: 'step1', description: 'this is the first step'},
        {id: 'step2', description: 'this is the second step'},
        {id: 'step3', description: 'this is the third step'},
        {id: 'step4', description: 'this is the fourth step'}
      ]
    };

  constructor(private _introService: IntroService, private _overlay: Overlay) {
    super();
  }

  ngOnInit() {
  }

  startIntro() {
    this._introService.startIntro(this._playbook);
  }

  openOverlay() {
    const elementRef = this._introService.stepMap.get('step2').elementRef;
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
      .withDefaultOffsetY(-5)
    ;
    const clientRect: ClientRect = elementRef.nativeElement.getBoundingClientRect();
    elementRef.nativeElement.classList.add('intro-front-element');
    const overlayConfig: OverlayConfig = {
      hasBackdrop: true,
      backdropClass: 'cdk-backdrop',
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      panelClass: 'cdk-panel',
      width: `${clientRect.width + 10}px`,
      height: `${clientRect.height + 10}px`,
      positionStrategy: positionStrategy
    };
    const overlayRef = this._overlay.create(overlayConfig);
    const introPortal = new ComponentPortal(IntroOverlayComponent);
    overlayRef.attach(introPortal);

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
      .withDefaultOffsetY(10)
    ;
    const overlayConfig2: OverlayConfig = {
      hasBackdrop: false,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: positionStrategy2
    };
    const overlayRef2 = this._overlay.create(overlayConfig2);
    const introPortal2 = new ComponentPortal(IntroTextComponent);
    overlayRef2.attach(introPortal2);
    overlayRef.backdropClick().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      overlayRef.detach();
      overlayRef2.detach();
    });

  }
}
