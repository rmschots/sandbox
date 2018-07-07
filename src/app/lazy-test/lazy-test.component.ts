import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LazyTestService } from '../shared/services/lazy-test.service';
import { LazyTest2Service } from './shared/services/lazy-test2.service';
import { NonLazyTestService } from './shared/services/non-lazy-test.service';
import { ExtraService } from './shared/services/extra.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'sb-lazy-test',
  templateUrl: './lazy-test.component.html',
  styleUrls: ['./lazy-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyTestComponent implements OnInit {
  constructor(private _lazyTestService: LazyTestService,
              private _lazyTestService2: LazyTest2Service,
              private _nonLazyTestService: NonLazyTestService,
              private _extraService: ExtraService) {
  }

  ngOnInit(): void {
    this._lazyTestService2.call();
    this._nonLazyTestService.call();
  }

  get proofNonLazy() {
    return this._nonLazyTestService.proof;
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

  get serviceInitializedAmountNonLazy() {
    return this._lazyTestService.timesInitialized2;
  }

  get nonLazyServiceCalledTimes$(): Observable<number> {
    return this._nonLazyTestService.calledTimes$;
  }

}


