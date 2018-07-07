import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

export abstract class Unsubscribable implements OnDestroy {

  protected ngUnsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
