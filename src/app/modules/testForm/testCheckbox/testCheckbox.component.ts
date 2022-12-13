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

@Component({
  selector: 'app-testCheckbox',
  templateUrl: './testCheckbox.component.html',
  styleUrls: ['./testCheckbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCheckboxComponent implements OnInit {
  // @Input() filter!: AvailableFiltersModel;
  @Input() initData!: FormModel;
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  allComplete: boolean = false;
  constructor(private _fb: FormBuilder, public cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initFrom();
  }

  private initFrom(): void {
    const controlName = this.initData.name;
    this.form = this._fb.group({
      [controlName]: this._fb.group({}),
    });

    if (this.initData.inputs!) {
      this.initData.inputs!.forEach(input => {
        (this.form.get(controlName) as FormGroup).addControl(
          input.name,
          this._fb.control(input.completed! ? input.completed : false)
        );
      });
    }
    if (this.initData.required) {
      this.emitValue(controlName, this.form.get(controlName)?.value);
    }

    this.form.get(controlName)?.valueChanges.subscribe(res => {
      this.emitValue(
        controlName,
        Object.keys(res).filter(el => res[el])
      );
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

  someComplete(): boolean {
    if (!this.initData.inputs) {
      return false;
    }
    return (
      Object.values(
        (this.form.get(this.initData.name) as FormGroup).controls
      ).filter(t => t.value).length > 0 && !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (!this.initData.inputs) {
      return;
    }
    this.initData.inputs.forEach(t =>
      (this.form.get(this.initData.name) as FormGroup).controls[
        t.name
      ].setValue(completed)
    );
    this.cdRef.detectChanges();
  }
}
