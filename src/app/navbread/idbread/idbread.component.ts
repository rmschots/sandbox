import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribable } from '../../shared/util/Unsubscribable';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sb-idbread',
  templateUrl: './idbread.component.html',
  styleUrls: ['./idbread.component.scss']
})
export class IdbreadComponent extends Unsubscribable {

  private id: string;

  constructor(private _activatedRoute: ActivatedRoute) {
    super();
    this._activatedRoute.parent.paramMap.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(params => this.id = params.get('id'));
  }

}
