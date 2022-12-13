import { Component, OnInit } from '@angular/core';
import { FormModel } from 'Core/models';
import { DataService } from 'Core/services';

export interface DataSource {
  id: number;
  key: string;
  title: string;
  global_filters: any[][];
}

@Component({
  selector: 'app-testForm',
  templateUrl: './testForm.component.html',
  styleUrls: ['./testForm.component.scss'],
  providers: [DataService],
})
export class TestFormComponent implements OnInit {
  formData: FormModel[] = [];
  formValues: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getForm().subscribe(form => {
      this.formData = form;
    });
  }

  changeData(body: any): void {
    this.formValues = { ...this.formValues, ...body };
  }

  submit(): void {
    const editedFormValues = {
      testForm: {
        ...this.formValues,
      },
    };

    this.dataService
      .postForm(editedFormValues)
      // .pipe(
      //   tap((data: DashboardModel) => {
      //     this.dashboardsService.gridSubs.next(data);
      //   }),
      //   mergeMap((data: DashboardModel) => {
      //     return forkJoin([
      //       data.reports.map((el) =>
      //         this.filterService.confirmFilters(
      //           this.filters,
      //           this.dashboard.id,
      //           el.id,
      //           '',
      //           true
      //         )
      //       ),
      //     ]);
      //   })
      // )
      .subscribe
      // (res) => {
      //   this.navigationService.openSnackbar(
      //     'Условия выбора обновлены',
      //     'success-snackbar'
      //   );
      //   this.close();
      // },
      // (err) => {
      //   if (err.status === 422) {
      //     this.navigationService.openSnackbar(
      //       'Проверьте правильность введенных данных',
      //       'error-snackbar'
      //     );
      //   }
      // }
      ();
  }
}
