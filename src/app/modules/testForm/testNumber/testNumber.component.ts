import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormModel } from 'Core/models';

@Component({
  selector: 'app-testNumber',
  templateUrl: './testNumber.component.html',
  styleUrls: ['./testNumber.component.scss'],
})
export class TestNumberComponent implements OnInit {
  @Input() initData!: FormModel;
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.initFrom();
  }

  private initFrom(): void {
    const controlName = this.initData.name;
    this.form = this._fb.group({
      [controlName]: [
        this.initData.value! ? this.initData.value! : null,
        this.initData.required! ? [Validators.required] : [],
      ],
    });
    if (this.initData.required) {
      this.emitValue(controlName, this.form.get(controlName)?.value);
    }

    this.form.get(controlName)?.valueChanges.subscribe(res => {
      this.emitValue(controlName, res);
    });
  }

  emitValue(controlName: string, value: any) {
    const obj = {
      [controlName]: {
        value: value,
        type: this.initData.type,
      },
    };

    this.changes.emit(obj);
  }
}
