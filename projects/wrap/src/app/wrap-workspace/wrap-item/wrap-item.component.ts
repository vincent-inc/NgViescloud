import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mode } from '../wrap-workspace.component';
import { Link, Wrap } from 'projects/viescloud-utils/src/lib/model/Wrap.model';
import { TrackByIndex } from 'projects/viescloud-utils/src/lib/directive/TrackByIndex';
import { MatDialog } from '@angular/material/dialog';
import { WrapDialog } from 'projects/viescloud-utils/src/lib/dialog/wrap-dialog/wrap-dialog.component';
import { ConfirmDialog } from 'projects/viescloud-utils/src/lib/dialog/confirm-dialog/confirm-dialog.component';
import { WrapLinkDialog } from 'projects/viescloud-utils/src/lib/dialog/wrap-link-dialog/wrap-link-dialog.component';

@Component({
  selector: 'app-wrap-item',
  templateUrl: './wrap-item.component.html',
  styleUrls: ['./wrap-item.component.scss']
})
export class WrapItemComponent extends TrackByIndex implements OnInit {

  @Input()
  wrap!: Wrap;

  @Output()
  wrapChange: EventEmitter<Wrap> = new EventEmitter();

  @Input()
  mode!: Mode;

  @Output()
  modeChange: EventEmitter<Mode> = new EventEmitter();

  @Output()
  onMoveLeft: EventEmitter<void> = new EventEmitter();

  @Output()
  onMoveRight: EventEmitter<void> = new EventEmitter();

  @Output()
  onDelete: EventEmitter<void> = new EventEmitter();

  constructor(private matDialog: MatDialog) { 
    super();
  }

  ngOnInit() {
    if(!this.wrap.children)
      this.wrap.children = [];
  }

  open(wrap: Wrap) {
    if(this.mode === Mode.Edit)
      this.edit(wrap);
    else if(wrap.links.length <= 0) {
      return;
    }
    else if(wrap.links.length > 1) {
      let dialog = this.matDialog.open(WrapLinkDialog, {
        data: {
          wrap: wrap
        },
        width: 'max-content'
      })

      dialog.afterClosed().subscribe({
        next: result => {
          if(result) {
            dialog.close();
          }
        }
      })
    }
    else {
      this.openLink(wrap.links[0]);
    }
  }

  edit(wrap: Wrap) {
    if(this.mode === Mode.Edit) {
      var dialog = this.matDialog.open(WrapDialog, {
        data: {
          wrap: wrap,
          title: 'Edit Wrap'
        },
        width: '100%'
      })
  
      dialog.afterClosed().subscribe({
        next: result => {
          if(result) {
            this.wrap = result;
            this.wrapChange.emit(result);
          }
        }
      })
    }
  }

  openLink(link: Link) {
    window.open(link.serviceUrl);
  }

  getGroupTooltip(wrap: Wrap) {
    return `\tTitle: ${wrap.title}
    \tProvider: ${wrap.provider || 'None'}
    \tDescription: ${wrap.description}
    \tTags: ${wrap.tags.join(', ')}
    \tColor: ${wrap.color}
    \tChildren: ${wrap.children.length} items`;
  }

  getItemTooltip(wrap: Wrap) {
    return `\tTitle: ${wrap.title}
    \tProvider: ${wrap.provider || 'None'}
    \tDescription: ${wrap.description}
    \tTags: ${wrap.tags.join(', ')}
    \tHot Key: ${wrap.hotKey}
    \t${this.getItemLinkTooltip(wrap)}
    \tColor: ${wrap.color}`;
  }

  getItemLinkTooltip(wrap: Wrap) {
    let link: string = 'Links: ';
    wrap.links.forEach((e, i) => {
      link += `\n\t${i + 1}. ${e.label}: ${e.serviceUrl}`
      link += `\n\t\t- Enable Status Check: ${e.enableStatusCheck ? 'Enabled' : 'Disabled'}`
      if(e.statusCheckUrl)
        link += `\n\t\t- Status Check Url: ${e.statusCheckUrl}`
      if(e.statusCheckHeaders) {
        e.statusCheckHeaders.forEach((header, j) => {
          link += `\n\t\t- Status Check Header ${j + 1}: ${header.name}: ${header.value}`
        })
      }
      if(e.statusCheckAcceptResponseCode)
        link += `\n\t\t- Status Check Accept Response Code: ${e.statusCheckAcceptResponseCode}`
    })
    return link;
  }

  displayTooltip(message: string) {
    let dialog = this.matDialog.open(ConfirmDialog, {
      data: {
        message: message,
        title: 'Wrap Info',
        yes: 'Close',
        no: ''
      },
      width: '100%'
    })

    dialog.afterClosed().subscribe({
      next: result => {
        if(result) {
          dialog.close();
        }
      }
    })
  }

  displayGroupTooltip(wrap: Wrap) {
    this.displayTooltip(this.getGroupTooltip(wrap));
  }

  displayItemTooltip(wrap: Wrap) {
    this.displayTooltip(this.getItemTooltip(wrap));
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
          this.wrap.children.splice(index, 1);
          this.wrapChange.emit(this.wrap);
        }
      }
    })
  }

  moveLeft(index: number) {
    let toIndex = index - 1;
    if(toIndex < 0)
      toIndex = this.wrap.children.length - 1;
    this.swap(this.wrap, index, toIndex);
  }

  moveRight(index: number) {
    let toIndex = index + 1;
    if(toIndex > this.wrap.children.length - 1)
      toIndex = 0;
    this.swap(this.wrap, index, toIndex);
  }

  swap(wrap: Wrap, fromIndex: number, toIndex: number) {
    if(toIndex < 0 || toIndex >= wrap.children.length)
      return;
    
    let temp = wrap.children[fromIndex];
    wrap.children[fromIndex] = wrap.children[toIndex];
    wrap.children[toIndex] = temp;
    this.wrapChange.emit(this.wrap);
  }
}