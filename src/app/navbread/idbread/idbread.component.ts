import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribable } from '../../shared/util/Unsubscribable';

@Component({
  selector: 'sb-idbread',
  templateUrl: './idbread.component.html',
  styleUrls: ['./idbread.component.scss']
})
export class IdbreadComponent extends Unsubscribable {

  private id: string;

  constructor(private _activatedRoute: ActivatedRoute) {
    super();
    this._activatedRoute.parent.paramMap.takeUntil(this.ngUnsubscribe$)
      .subscribe(params => this.id = params.get('id'));
  }

}
