import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  title: string;
  content: string;
  handleAccept: () => {};

  template = {
    button: {
      cancel: 'Retour',
      accept: 'Continuer'
    }
  };

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.title = data.title;
    this.content = data.content;
    this.handleAccept = data.handleAccept;
  }

  handleClick(): void {
    this.handleAccept();
  }
}
