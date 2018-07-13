import { Component, OnInit, ViewChild } from '@angular/core';
import { Message, Tree, TreeNode } from 'primeng/primeng';

@Component({
  selector: 'sb-dossier-navigation',
  templateUrl: './dossier-navigation.component.html',
  styleUrls: ['./dossier-navigation.component.scss']
})
export class DossierNavigationComponent implements OnInit {
  msgs: Message[];

  @ViewChild('expandingTree')
  expandingTree: Tree;

  treeNode: TreeNode = {
    label: 'Backup',
    data: 'Backup Folder',
    expandedIcon: 'fa fa-fw fa-folder-open',
    collapsedIcon: 'fa fa-fw fa-folder'
  };

  treeNode2: TreeNode = {
    label: 'fdsqfsqd',
    data: 'Backup Folder',
    expandedIcon: 'fa fa-fw fa-folder-open',
    collapsedIcon: 'fa fa-fw fa-folder'
  };

  filesTree2: TreeNode[] = [this.treeNode, this.treeNode2];

  selectedFile: TreeNode;

  loading: boolean;

  ngOnInit() {
    this.loading = false;
  }

  nodeSelect(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
  }

  nodeUnselect(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
  }
}
