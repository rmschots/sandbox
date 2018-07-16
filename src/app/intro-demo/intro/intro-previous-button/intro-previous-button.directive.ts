import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IntroService } from '../services/intro.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Directive({
  selector: '[sbIntroPreviousButton]'
})
export class IntroPreviousButtonDirective {

  @HostBinding('style.display') private _display = '';
  private _stopHiding$ = new Subject<void>();

  @Input('sbHideWhenDisabled')
  set hideWhenDisabled(hideWhenDisabled: boolean) {
    if (hideWhenDisabled) {
      this._introService.canDoPreviousChanges$
        .pipe(takeUntil(this._stopHiding$))
        .subscribe(canDoPrevious => this._display = canDoPrevious ? '' : 'none');
    } else {
      this._stopHiding$.next(undefined);
    }
  }

  constructor(private _introService: IntroService) {
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this._introService.previousStep();
  }
}
