import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, MatModule],
})
export class ModulesModule {}
