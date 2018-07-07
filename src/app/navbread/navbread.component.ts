import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Unsubscribable } from '../shared/util/Unsubscribable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sb-navbread',
  templateUrl: './navbread.component.html',
  styleUrls: ['./navbread.component.scss']
})
export class NavbreadComponent extends Unsubscribable implements OnInit {
  private _id$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  private _shouldListShow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    super();
    _activatedRoute.paramMap.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(params => {
        this._id$.next(params.get('id'));
        this._shouldListShow$.next(_router.routerState.snapshot.url.endsWith(params.get('id')));
      });
    _router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe((value: NavigationEnd) => {
      console.log(value.url, '===', this._id$.getValue());
      this._shouldListShow$.next(value.url.endsWith(this._id$.getValue()));
    });

  }

  get id$() {
    return this._id$.pipe(filter(id => id !== 'list'));
  }

  get shouldListShow$(): Observable<boolean> {
    return this._shouldListShow$.asObservable();
  }

  ngOnInit(): void {
    console.log('init');
  }

}
