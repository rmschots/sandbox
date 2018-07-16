import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sb-intro-overlay',
  templateUrl: './intro-overlay.component.html',
  styleUrls: ['./intro-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroOverlayComponent {
}
