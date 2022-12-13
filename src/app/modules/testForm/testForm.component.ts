import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormModel } from 'Core/models';
import { DataService } from 'Core/services';

@UntilDestroy()
@Component({
  selector: 'app-testForm',
  templateUrl: './testForm.component.html',
  styleUrls: ['./testForm.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestFormComponent implements OnInit {
  formData: FormModel[] = [];
  formValues: any;
  disableSubmitting = false;

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.getForm().subscribe(form => {
      this.formData = form;
      this.cdRef.detectChanges();
    });
  }

  changeData(body: any): void {
    this.formValues = { ...this.formValues, ...body };
    this.disableSubmitting = !!Object.values(this.formValues).find(
      (el: any) => !el.value && el.errorStatus
    );
    this.cdRef.detectChanges();
  }

  submit(): void {
    const editedFormValues = {
      testForm: {
        ...this.formValues,
      },
    };

    this.dataService.postForm(editedFormValues).subscribe(
      () => {
        this.dataService.openSnackbar('Анкета отправлена', 'success-snackbar');
        // this.close();
      },
      err => {
        if (err.status === 422) {
          this.dataService.openSnackbar(
            'Проверьте правильность введенных данных',
            'error-snackbar'
          );
        } else if (err.status === 404) {
          this.dataService.openSnackbar(
            'В данный момент анкета не может быть отправлена',
            'error-snackbar'
          );
        }
      }
    );
    this.cdRef.detectChanges();
  }
}
