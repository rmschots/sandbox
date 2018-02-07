import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LazyTest2Service } from '../shared/services/lazy-test2.service';

@Component({
  selector: 'sb-lazy-shared-sub2',
  templateUrl: './lazy-test-sub2.component.html',
  styleUrls: ['./lazy-test-sub2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyTestSub2Component implements OnInit {

  constructor(private _lazyTestService2: LazyTest2Service) {
  }

  ngOnInit(): void {
    this._lazyTestService2.call();
  }

  get proof() {
    return this._lazyTestService2.proof;
  }

}
