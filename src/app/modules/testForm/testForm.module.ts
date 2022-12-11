import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { NgxMaskModule } from 'ngx-mask';
// import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from 'Shared/shared.module';
import { TestCheckboxComponent } from './testCheckbox/testCheckbox.component';
import { TestSelectComponent } from './testSelect/testSelect.component';
import { TestFormComponent } from './testForm.component';
import { TestInputComponent } from './testInput/testInput.component';
import { TestNumberComponent } from './testNumber/testNumber.component';

@NgModule({
  declarations: [
    TestFormComponent,
    TestCheckboxComponent,
    TestSelectComponent,
    TestInputComponent,
    TestNumberComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [TestFormComponent],
})
export class TestFormModule {}
