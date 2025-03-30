import { Component, Inject } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
