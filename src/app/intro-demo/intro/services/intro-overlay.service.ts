import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, } from '@angular/core';
import { IntroStepDirective } from '../intro-step/intro-step.directive';

@Injectable()
export class IntroOverlayService implements OnDestroy {
  private _containerElement: HTMLElement;
  private _highlightElement: HTMLElement;
  private _textElement: HTMLElement;

  private _currentHighlight: IntroStepDirective;

  constructor(@Inject(DOCUMENT) private _document: any) {
  }

  highlight(introStepDirective: IntroStepDirective) {
    this.cancelCurrentHighlight();
    this._currentHighlight = introStepDirective;
    const clientRect: ClientRect = introStepDirective.elementRef.nativeElement.getBoundingClientRect();
    introStepDirective.elementRef.nativeElement.classList.add('intro-front-element');

    this._highlightElement.style.width = `${clientRect.width + 10}px`;
    this._highlightElement.style.height = `${clientRect.height + 10}px`;
    this._highlightElement.style.top = `${clientRect.top - 5}px`;
    this._highlightElement.style.left = `${clientRect.left - 5}px`;

    this._textElement.style.top = `${clientRect.top + clientRect.height + 20}px`;
    this._textElement.style.left = `${clientRect.left}px`;
    this._textElement.style.visibility = 'visible';
  }

  cancelCurrentHighlight() {
    if (this._currentHighlight) {
      const highlightToCancel = this._currentHighlight;
      setTimeout(() => {
        if (highlightToCancel) {
          highlightToCancel.elementRef.nativeElement.classList.remove('intro-front-element');
        }
      }, 300);
      this._currentHighlight = undefined;
    }
  }

  ngOnDestroy() {
    this.hideOverlay();
  }

  showOverlay() {
    if (!this._containerElement) {
      this.createContainer();
    }
  }

  hideOverlay() {
    this.cancelCurrentHighlight();
    if (this._containerElement && this._containerElement.parentNode) {
      this._containerElement.parentNode.removeChild(this._containerElement);
      this._containerElement = undefined;
    }
    if (this._highlightElement && this._highlightElement.parentNode) {
      this._highlightElement.parentNode.removeChild(this._highlightElement);
      this._highlightElement = undefined;
    }
    if (this._textElement && this._textElement.parentNode) {
      this._textElement.parentNode.removeChild(this._textElement);
      this._textElement = undefined;
    }
  }

  protected createContainer(): void {
    const container = this._document.createElement('div');
    const highlight = this._document.createElement('div');
    const text = this._document.createElement('div');
    text.innerHTML = 'TEST CONTENT';

    container.classList.add('intro-overlay-container');
    highlight.classList.add('intro-overlay-highlight');
    text.classList.add('intro-overlay-text');
    this._document.body.appendChild(container);
    this._document.body.appendChild(highlight);
    this._document.body.appendChild(text);
    this._containerElement = container;
    this._highlightElement = highlight;
    this._textElement = text;
  }
}
