// import { ConnectionPositionPair } from '@angular/cdk/overlay';
// import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormModel } from 'Core/models';
// import { MatDialog } from '@angular/material/dialog';
// import { FederalOkrug, federal_okrug } from 'Core/constants';
// import { AvailableFiltersModel, FilterValues, FormModel } from 'Core/models';
// import { DashboardsService } from 'Core/services';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { finalize } from 'rxjs/operators';
// import { MultiSelectModalComponent } from './components/multi-select-modal/multi-select-modal.component';
// import { MultiSelectStorageService } from './multi-select-storage.service';

@Component({
  selector: 'app-testSelect',
  templateUrl: './testSelect.component.html',
  styleUrls: ['./testSelect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestSelectComponent implements OnInit {
  // @Input() filter!: AvailableFiltersModel;
  @Input() initData!: FormModel;
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  // data!: FilterValues[];
  // isHover!: boolean;
  // isHoverWindow = false;
  form!: FormGroup;
  // timerSelect!: ReturnType<typeof setTimeout>;
  // tooltipDelay = 500;
  // timer!: ReturnType<typeof setTimeout>;
  // hoveredNameFilter = '';
  // positions = [
  //   new ConnectionPositionPair(
  //     { originX: 'start', originY: 'bottom' },
  //     { overlayX: 'end', overlayY: 'top' },
  //     0,
  //     0,
  //     'tooltip-body-top'
  //   ),
  //   new ConnectionPositionPair(
  //     { originX: 'start', originY: 'top' },
  //     { overlayX: 'end', overlayY: 'bottom' },
  //     0,
  //     0,
  //     'tooltip-body-bottom'
  //   ),
  // ];

  constructor(
    // private _dashboardsService: DashboardsService,
    private _fb: FormBuilder,
    // private ngxService: NgxUiLoaderService,
    // public dialog: MatDialog,
    // public platform: Platform,
    private cdRef: ChangeDetectorRef,
    // private _multiSelectStorageService: MultiSelectStorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    // this.getItems();

    // this._dashboardsService.reset$.subscribe((res) => {
    //   this.reset();
    // });

    // if (this.filter.name === 'region') {
    //   this._multiSelectStorageService.checkRegion$.subscribe((res) => {
    //     this.manageRegions(res);
    //   });
    // }

    // if (this.filter.name === 'federalny_okrug') {
    //   this._multiSelectStorageService.checkOkrug$.subscribe((res) => {
    //     this.manageOkrug(res);
    //   });
    // }
  }

  // hover(filterName: string): void {
  //   if (this.timer) {
  //     clearTimeout(this.timer);
  //   }
  //   this.hoveredNameFilter = filterName;
  //   const ids = this.data.filter((el) => el.checked);
  //   this.isHover = ids?.length > 0 ? true : false;
  //   this.cdRef.detectChanges();
  // }

  // checkFieldLeave() {
  //   this.timer = setTimeout(() => {
  //     this.isHoverWindow
  //       ? (this.isHover = true)
  //       : ((this.isHover = false), clearTimeout(this.timer));
  //     this.cdRef.detectChanges();
  //   }, 200);
  // }

  // tooltipLeave() {
  //   this.isHover = false;
  //   this.isHoverWindow = false;
  //   if (this.timer) {
  //     clearTimeout(this.timer);
  //   }
  // }

  // getValueName(value: string | number) {
  //   return this.data.find((elem) => elem.id === value)?.name;
  // }

  // open(): void {
  //   const dialogRef = this.dialog.open(MultiSelectModalComponent, {
  //     minWidth: window.innerWidth <= 700 ? '90vw' : '600px',
  //     maxWidth: window.innerWidth <= 700 ? '90vw' : '600px',
  //     panelClass: 'no-padding',
  //     data: { items: this.data, filter: this.filter },
  //   });

  //   dialogRef.afterClosed().subscribe((result: FilterValues[]) => {
  //     if (result?.length) {
  //       this.data = result;
  //     }
  //     this.setData();
  //   });
  // }

  // private getItems(): void {
  //   // this.ngxService.startLoader(this.filter.name);
  //   this._dashboardsService
  //     .getFilterValues(
  //       this.filter.available_values.endpoint as string,
  //       undefined
  //     )
  //     .pipe(
  //       finalize(() => {
  //         this.ngxService.stopLoader('mainLoader');
  //         this.ngxService.stopLoader(this.filter.name);
  //       })
  //     )
  //     .subscribe((res) => {
  //       this.data = res;
  //       this.initFrom();
  //     });
  // }

  private initForm(): void {
    const controlName = this.initData.name;
    this.form = this._fb.group({
      [controlName]: [this.initData ? this.initData[controlName]?.value : null],
    });


    this.form.get(controlName)?.valueChanges.subscribe((res) => {
      const obj = {
        [controlName]: {
          value: res,
          type: this.initData.type,
        },
      };

      this.changes.emit(obj);
    });
  }
}
