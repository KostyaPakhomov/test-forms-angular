import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormModel } from 'Core/models';

@UntilDestroy()
@Component({
  selector: 'app-testNumber',
  templateUrl: './testNumber.component.html',
  styleUrls: ['./testNumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestNumberComponent implements OnInit {
  @Input() initData!: FormModel;
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private _fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

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
      if (res === '0' || res === 0) {
        this.form.get(this.initData.name)?.setValue(1);
      }
      this.emitValue(controlName, res);
    });
    this.cdRef.detectChanges();
  }

  emitValue(controlName: string, value: any) {
    const obj = {
      [controlName]: {
        value: value,
        type: this.initData.type,
        errorStatus: this.form.get(controlName)?.hasError('required'),
      },
    };

    this.changes.emit(obj);
  }
  changeValue(increase: boolean) {
    let currentValue = this.form.get(this.initData.name)?.value
      ? this.form.get(this.initData.name)?.value
      : 0;
    this.form
      .get(this.initData.name)
      ?.setValue(
        increase ? ++currentValue : currentValue > 1 ? --currentValue : 1
      );
    this.cdRef.detectChanges();
  }
}
