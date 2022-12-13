import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from 'Core/models';
import { environment } from 'Env';
import { map } from 'rxjs';

@Injectable()
export class DataService {
  data = environment.backendUrl;
  constructor(private http: HttpClient) {}
  getForm() {
    return this.http.get<Form>('/').pipe(map(res => {return res.form}));
  }
  postForm(editedFormValues: any) {
    const body = { ...editedFormValues };

    return this.http.post<any>('/testForm', body);
  }
}
