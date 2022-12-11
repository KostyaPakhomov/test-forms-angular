import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormModel } from 'Core/models';
// import { AvailableFiltersModel } from 'Core/models';
// import { DashboardsService } from 'Core/services';

@Component({
  selector: 'app-testCheckbox',
  templateUrl: './testCheckbox.component.html',
  styleUrls: ['./testCheckbox.component.scss'],
})
export class TestCheckboxComponent implements OnInit {
  // @Input() filter!: AvailableFiltersModel;
  @Input() initData!: FormModel;
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  allComplete: boolean = false;
  constructor(
    private _fb: FormBuilder,
    // private _dashboardsService: DashboardsService
  ) {}

  ngOnInit(): void {
    this.initFrom();

    // this._dashboardsService.reset$.subscribe((res) => {
    //   this.reset();
    // });
  }

  private initFrom(): void {
    const controlName = this.initData.name;
    this.form = this._fb.group({
      [controlName]: this._fb.group({})
      
      // [
      //   this.initData ? this.initData[controlName]?.value : false,
      // ],
    });

    if(this.initData.inputs!){
      this.initData.inputs!.forEach(input => {
      (this.form.get(controlName) as FormGroup).addControl(
        input.name,
        this._fb.control(null)
      );
    });
  }

    if(this.initData.inputs!){
      this.initData.inputs!.forEach(el => {
        (<FormArray>this.form.controls[controlName]).push(new FormControl(el.completed ? true : false));
      });
      }


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

  someComplete(): boolean {
    if (!this.initData.inputs) {
      return false;
    }
    return this.initData.inputs.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (!this.initData.inputs) {
      return;
    }
    this.initData.inputs.forEach(t => (t.completed = completed));
  }
}
