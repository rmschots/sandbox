import { Injectable } from '@angular/core';
import { LazyTestService } from '../../../shared/services/lazy-test.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LazyTest2Service {

  private _proof = 'lazy test service 2 called';
  private _calledTimes$ = new BehaviorSubject<number>(0);

  constructor(private _lazyTestService: LazyTestService) {
    console.log('lazy-test-service 2 init');
    _lazyTestService.timesInitialized++;
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
