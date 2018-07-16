import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sb-intro-empty',
  templateUrl: './intro-empty.component.html',
  styleUrls: ['./intro-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroEmptyComponent {
}
