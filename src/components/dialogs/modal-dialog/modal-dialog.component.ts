import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

/**
 * Provides template for modal dialog with sections for title, subtitle, body and footer for which contents can be attached
 *
 * @example
 * <tf-modal-dialog  (canceled)="close(false)">
 <section title>Demo Modal dialog</section>
 <section subtitle>Sub title</section>
 <div body>
 <div class="flex-row">
 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

 Why do we use it?
 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

 </div>
 </div>
 <div footer>
 <button class="btn btn-secondary" (click)="close(false)"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
 <button class="btn btn-primary" (click)="close(true)"><span class="glyphicon glyphicon-ok"></span> Save</button>
 </div>
 </tf-modal-dialog>
 */
@Component({
  selector: 'tf-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent {
  @Input() canCancel: boolean = true;
  @Input() showHeaderLogo : boolean = false;
  @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  close(save : boolean) : void {
    this.canceled.emit(save);
  }
}

