import { Component, OnInit } from '@angular/core';
import { FormModel } from 'Core/models';
// import { DashboardModel, DashboardsGroupModel } from 'Core/models';
import {
  DataService
  // DashboardsService,
  // HttpService,
  // NavigationService,
} from 'Core/services';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { forkJoin, Observable, Subject } from 'rxjs';
// import { mergeMap, tap } from 'rxjs/operators';
// import { FilterService } from './../../../core/services/filter.service';

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
})
export class TestFormComponent implements OnInit {
  formData!: FormModel[];

  // get dashboard$(): Observable<DashboardsGroupModel[]> {
  //   return this.dataService.getForm;
  // }

  // get gridSubs(): Observable<DashboardsGroupModel[]> {
  //   return this.dashboardsService.dashboardsGroupsSubject;
  // }

  // get config(): any {
  //   return this.dashboard?.config;
  // }

  formValues: any;

  constructor(
    private dataService: DataService,
    // private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.dataService.getForm().subscribe(res => {
      this.formData = res;
    })
    // setTimeout(() => {
    //   this.ngxService.stopLoader('mainLoader');
    // }, 100);
  }


  changeData(body: any): void {
    this.formValues = { ...this.formValues, ...body };
  }

  submit(): void {

    const initFormValues: any = this.formData
      ? this.formData
      : {};

    const editedFormValues = {
      testForm: {
        values: { ...initFormValues, ...this.formData },
      },
    };

    // delete this.filters?.isTrusted;
    // delete editedDashboardInfo?.config?.filters?.isTrusted;

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
      .subscribe(
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
      );
  }
}
