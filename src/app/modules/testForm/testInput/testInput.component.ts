import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { trackByFn } from 'Core/helpers';
import { FormModel } from 'Core/models';

@UntilDestroy()
@Component({
  selector: 'app-testInput',
  templateUrl: './testInput.component.html',
  styleUrls: ['./testInput.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputComponent implements OnInit {
  @Input() initData!: FormModel;
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  readonly trackByFn = trackByFn;
  constructor(private _fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initFrom();
  }

  private initFrom(): void {
    const controlName = this.initData.name;
    this.form = this._fb.group({
      [controlName]: this.initData.canAdd
        ? this._fb.array([null])
        : [
            this.initData.value! ? this.initData.value! : null,
            this.initData.required! ? [Validators.required] : [],
          ],
    });
    if (this.initData.canAdd && this.initData.value) {
      (this.initData.value as Array<string | number>).forEach(el => {
        (this.form.get(controlName)?.value as FormArray).push(
          this._fb.control([el])
        );
      });
    }
    if (this.initData.required) {
      this.emitValue(controlName, this.form.get(controlName)?.value);
    }

    this.form.get(controlName)?.valueChanges.subscribe(res => {
      this.emitValue(controlName, res);
    });
    this.cdRef.detectChanges();
  }

  addControl() {
    (<FormArray>this.form.controls[this.initData.name]).push(
      this._fb.control([null])
    );
    this.cdRef.detectChanges();
  }
  removeControl(index: number) {
    (<FormArray>this.form.controls[this.initData.name]).removeAt(index);
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
}
