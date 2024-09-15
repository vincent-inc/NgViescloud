import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wrap, WrapWorkspace } from 'projects/viescloud-utils/src/lib/model/Wrap.model';
import { Mode } from '../wrap-workspace.component';
import { TrackByIndex } from 'projects/viescloud-utils/src/lib/directive/TrackByIndex';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'projects/viescloud-utils/src/lib/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-wrap',
  templateUrl: './wrap.component.html',
  styleUrls: ['./wrap.component.scss']
})
export class WrapComponent extends TrackByIndex implements OnInit {

  @Input()
  wrapWorkspace!: WrapWorkspace;

  @Output()
  wrapWorkspaceChange: EventEmitter<WrapWorkspace> = new EventEmitter();

  @Input()
  mode!: Mode

  @Output()
  modeChange: EventEmitter<Mode> = new EventEmitter();

  constructor(private matDialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  moveLeft(index: number) {
    let toIndex = index - 1;
    if(toIndex < 0)
      toIndex = this.wrapWorkspace.wraps.length - 1;
    this.swap(index, toIndex);
  }

  moveRight(index: number) {
    let toIndex = index + 1;
    if(toIndex > this.wrapWorkspace.wraps.length - 1)
      toIndex = 0;
    this.swap(index, toIndex);
  }

  swap(fromIndex: number, toIndex: number) {
    if(toIndex < 0 || toIndex >= this.wrapWorkspace.wraps.length)
      return;
    
    let temp = this.wrapWorkspace.wraps[fromIndex];
    this.wrapWorkspace.wraps[fromIndex] = this.wrapWorkspace.wraps[toIndex];
    this.wrapWorkspace.wraps[toIndex] = temp;
    this.wrapWorkspaceChange.emit(this.wrapWorkspace);
  }

  deleteWrap(index: number) {
    let dialog = this.matDialog.open(ConfirmDialog, {
      data: {
        message: 'Are you sure you want to delete this wrap?',
        title: 'Confirm Delete',
        yes: 'Delete',
        no: 'Cancel'
      },
      width: '100%'
    })

    dialog.afterClosed().subscribe({
      next: result => {
        if(result) {
          this.wrapWorkspace.wraps.splice(index, 1);
          this.wrapWorkspaceChange.emit(this.wrapWorkspace);
        }
      }
    })
  }

}