import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/primeng';
import { Unsubscribable } from '../shared/util/Unsubscribable';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sb-double-click-tree',
  templateUrl: './double-click-tree.component.html',
  styleUrls: ['./double-click-tree.component.scss']
})
export class DoubleClickTreeComponent extends Unsubscribable implements OnInit {
  filesTree: TreeNode[];
  selectedFile: TreeNode;

  constructor(private _http: HttpClient) {
    super();
  }

  ngOnInit() {
    this.fetchTreeNodes()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(treeNodes => {
        this.filesTree = treeNodes;
      });
  }

  fetchTreeNodes() {
    return this._http.get<TreeNode[]>('assets/tree-data.json');
  }

  onNodeDoubleClick(dblClickedNode: TreeNode) {
    dblClickedNode.expanded = !dblClickedNode.expanded;
  }
}
