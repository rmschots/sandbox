import { Component } from '@angular/core';
import { IntroService } from '../../services/intro.service';

@Component({
  selector: 'sb-intro-text',
  templateUrl: './intro-text.component.html',
  styleUrls: ['./intro-text.component.scss']
})
export class IntroTextComponent {

  constructor(private _introService: IntroService) {
  }

  nextStep() {
    this._introService.nextStep();
  }
}
