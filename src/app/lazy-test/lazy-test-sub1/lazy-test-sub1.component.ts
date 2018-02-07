import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LazyTest2Service } from '../shared/services/lazy-test2.service';

@Component({
  selector: 'sb-lazy-test-sub1',
  templateUrl: './lazy-test-sub1.component.html',
  styleUrls: ['./lazy-test-sub1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyTestSub1Component implements OnInit {

  constructor(private _lazyTestService2: LazyTest2Service) {
  }

  ngOnInit(): void {
    this._lazyTestService2.call();
  }

  get proof() {
    return this._lazyTestService2.proof;
  }

}
