import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormModel } from 'Core/models';

@Component({
  selector: 'app-testInput',
  templateUrl: './testInput.component.html',
  styleUrls: ['./testInput.component.scss']
})
export class TestInputComponent implements OnInit {
  @Input() initData!: FormModel;
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;

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
      [controlName]: [
        this.initData ? this.initData[controlName]?.value : false,
      ],
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
