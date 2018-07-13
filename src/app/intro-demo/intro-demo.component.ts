import { Component } from '@angular/core';
import { IntroService } from './intro/services/intro.service';
import { IntroTextComponent } from './intro/overlay/intro-text/intro-text.component';
import { Unsubscribable } from '../shared/util/Unsubscribable';

@Component({
  selector: 'sb-intro-demo',
  templateUrl: './intro-demo.component.html',
  styleUrls: ['./intro-demo.component.scss']
})
export class IntroDemoComponent extends Unsubscribable {

  private _playbookEntries = [
    {id: 'step1', description: 'this is the first step'},
    {id: 'step2', description: 'this is the second step'},
    {id: 'step3', description: 'this is the third step'},
    {id: 'step4', description: 'this is the fourth step'}
  ];

  private _playbookOptionsAutomatic = {
    autoplay: true,
    textComponent: IntroTextComponent
  };
  private _playbookOptionsManual = {
    autoplay: false,
    nextText: 'next',
    textComponent: IntroTextComponent
  };

  constructor(private _introService: IntroService) {
    super();
  }

  startIntroManual() {
    this._introService.startIntro({entries: this._playbookEntries, options: this._playbookOptionsManual});
  }

  startIntroAutomatic() {
    this._introService.startIntro({entries: this._playbookEntries, options: this._playbookOptionsAutomatic});
  }
}
