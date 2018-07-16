import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { INTRO_DIRECTION_LISTENER, INTRO_TEXT_DATA } from '../../services/intro.tokens';
import { Observable } from 'rxjs/Observable';
import { IntroDirection, IntroDirectionListener } from '../../services/intro-overlay.service';
import { map } from 'rxjs/operators';
import { IntroService } from '../../services/intro.service';

export interface IntroTextComponentData {
  text: string;
  automatic?: boolean;
}

@Component({
  selector: 'sb-intro-text',
  templateUrl: './intro-text.component.html',
  styleUrls: ['./intro-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroTextComponent {

  constructor(@Inject(INTRO_TEXT_DATA) public data: IntroTextComponentData,
              @Inject(INTRO_DIRECTION_LISTENER) private _directionListener: IntroDirectionListener,
              private _introService: IntroService) {
  }

  get direction$(): Observable<string> {
    return this._directionListener.positionChanged.pipe(map(direction => {
      switch (direction) {
        case IntroDirection.TOP:
          return 'bottom';
        case IntroDirection.BOTTOM:
          return 'top';
        case IntroDirection.LEFT:
          return 'right';
        case IntroDirection.RIGHT:
          return 'left';
        default:
          return 'unknown';
      }
    }));
  }

  get isLastStep$() {
    return this._introService.isLastStepActiveChanges$;
  }
}
