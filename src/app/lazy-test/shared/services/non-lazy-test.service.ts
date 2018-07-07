import { Injectable } from '@angular/core';
import { LazyTestService } from '../../../shared/services/lazy-test.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class NonLazyTestService {

  private _proof = 'non-lazy test service called';
  private _calledTimes$ = new BehaviorSubject<number>(0);

  constructor(private _lazyTestService: LazyTestService) {
    console.log('non-lazy-test-service init');
    _lazyTestService.timesInitialized2++;
  }

  get calledTimes$(): Observable<number> {
    return this._calledTimes$.asObservable();
  }

  call() {
    this._calledTimes$.next(this._calledTimes$.getValue() + 1);
  }

  get proof() {
    return this._proof;
  }

}
