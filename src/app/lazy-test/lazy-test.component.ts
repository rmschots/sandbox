import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LazyTestService } from '../shared/services/lazy-test.service';
import { LazyTest2Service } from './shared/services/lazy-test2.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sb-lazy-test',
  templateUrl: './lazy-test.component.html',
  styleUrls: ['./lazy-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyTestComponent implements OnInit {
  constructor(private _lazyTestService: LazyTestService, private _lazyTestService2: LazyTest2Service) {
  }

  ngOnInit(): void {
    this._lazyTestService2.call();
  }

  get proof() {
    return this._lazyTestService2.proof;
  }

  get serviceInitializedAmount() {
    return this._lazyTestService.timesInitialized;
  }

  get service2CalledTimes$(): Observable<number> {
    return this._lazyTestService2.calledTimes$;
  }

}


