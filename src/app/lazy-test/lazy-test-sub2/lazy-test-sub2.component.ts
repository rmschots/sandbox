import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LazyTest2Service } from '../shared/services/lazy-test2.service';
import { NonLazyTestService } from '../shared/services/non-lazy-test.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'sb-lazy-shared-sub2',
  templateUrl: './lazy-test-sub2.component.html',
  styleUrls: ['./lazy-test-sub2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyTestSub2Component implements OnInit {

  constructor(private _lazyTestService2: LazyTest2Service, private _nonLazyTestService: NonLazyTestService) {
  }

  ngOnInit(): void {
    this._lazyTestService2.call();
    this._nonLazyTestService.call();
  }

  get proof() {
    return this._lazyTestService2.proof;
  }

  get proofNonLazy() {
    return this._nonLazyTestService.proof;
  }

  get service2CalledTimes$(): Observable<number> {
    return this._lazyTestService2.calledTimes$;
  }

  get nonLazyServiceCalledTimes$(): Observable<number> {
    return this._nonLazyTestService.calledTimes$;
  }

}
