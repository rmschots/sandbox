import { Injectable } from '@angular/core';

@Injectable()
export class LazyTestService {
  timesInitialized = 0;

  constructor() {
    console.log('lazy-test-service 1 init');
  }

}
