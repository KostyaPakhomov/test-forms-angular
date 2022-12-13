import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Form } from 'Core/models';
import { map } from 'rxjs';

@Injectable()
export class DataService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 1;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  getForm() {
    return this.http.get<Form>('/').pipe(
      map(res => {
        return res.form;
      })
    );
  }
  postForm(editedFormValues: any) {
    const body = { ...editedFormValues };
    return this.http.post<any>('/testForm', body);
  }
  openSnackbar(text: string, className: string) {
    this._snackBar.open(text, undefined, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: className,
    });
  }
}
