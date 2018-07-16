import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IntroService } from './intro/services/intro.service';
import { IntroTextComponent, IntroTextComponentData } from './intro/overlay/intro-text/intro-text.component';
import { Unsubscribable } from '../shared/util/Unsubscribable';
import { IntroPlaybookEntry } from './intro/models/intro-playbook';
import { IntroPlaybookOptions } from './intro/models/intro-playbook-options';

@Component({
  selector: 'sb-intro-demo',
  templateUrl: './intro-demo.component.html',
  styleUrls: ['./intro-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroDemoComponent extends Unsubscribable {

  @ViewChild('introTextTemplate') introTextTemplate: TemplateRef<any>;

  private _playbookEntriesAutomatic: IntroPlaybookEntry<any>[] = [
    {
      id: 'step1',
      data: {text: 'this is the first automatic step', automatic: true} as IntroTextComponentData,
      component: IntroTextComponent
    },
    {
      id: 'step2',
      data: {text: 'this is the second automatic step', automatic: true} as IntroTextComponentData,
      displayTime: 500,
      component: IntroTextComponent
    },
    {
      id: 'step2.5',
      data: {text: 'this is a nonexisting automatic step', automatic: true} as IntroTextComponentData,
      displayTime: 1000,
      component: IntroTextComponent
    },
    {
      id: 'step3',
      data: {text: 'this is the third automatic step', automatic: true} as IntroTextComponentData,
      displayTime: 1500,
      component: IntroTextComponent
    }
  ];

  private _playbookEntriesManual: IntroPlaybookEntry<any>[] = [
    {id: 'step1', data: {text: 'this is the first step'} as IntroTextComponentData},
    {id: 'step2', data: {text: 'this is the second step'} as IntroTextComponentData, component: IntroTextComponent},
    {id: 'step2.5', data: {text: 'this a nonexisting step'} as IntroTextComponentData, component: IntroTextComponent},
    {id: 'step3', data: {text: 'this is the third step'} as IntroTextComponentData, component: IntroTextComponent}
  ];

  private _playbookOptionsAutomatic: IntroPlaybookOptions = {
    autoplay: true
  };
  private _playbookOptionsManual: IntroPlaybookOptions = {
    autoplay: false
  };

  constructor(private _introService: IntroService, private _viewContainerRef: ViewContainerRef) {
    super();
  }

  startIntroManual() {
    this._playbookEntriesManual[0].templateRef = this.introTextTemplate;
    this._playbookEntriesManual[0].viewContainerRef = this._viewContainerRef;
    this._introService.startIntro({entries: this._playbookEntriesManual, options: this._playbookOptionsManual});
  }

  startIntroAutomatic() {
    this._introService.startIntro({entries: this._playbookEntriesAutomatic, options: this._playbookOptionsAutomatic});
  }
}
