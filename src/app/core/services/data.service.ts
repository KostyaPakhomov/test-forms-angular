import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormModel } from 'Core/models';

@Injectable()
export class DataService{
  constructor(private http: HttpClient){}
  getForm(){
    return this.http.get<FormModel[]>(
      '/form'
    );
  }
  postForm(editedFormValues: any){
    const body = { ...editedFormValues };

    return this.http.post<any>(
      '/testForm', body
    )
  }
}
