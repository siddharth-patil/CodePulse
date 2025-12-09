import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CateoryService } from '../services/cateory-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {

  private categoryService = inject(CateoryService);
  private router = inject(Router);

// 1. Import Reactive forms module
// 2. FormGroups -> FomrControls

constructor(){
  effect(()=>{
    if (this.categoryService.addCategoryStatus() === 'success') {
      // console.log('Success');
      //Redirect back to category list page
      this.categoryService.addCategoryStatus.set('idle');
      this.router.navigate(['/admin/categories']);
    }

    if (this.categoryService.addCategoryStatus() === 'error') {
      console.error('Add Category Request Failed');
      
    }
  });
}


addCategoryFormGroup = new FormGroup({
  name: new FormControl<string>('',{nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
  urlHandle: new FormControl<string>('',{nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]}),
});

get nameFormControl(){
  // return this.addCategoryFormGroup.get('name');
  return this.addCategoryFormGroup.controls.name;
}

get urlHandleFormControl(){
  // return this.addCategoryFormGroup.get('urlHandle');
  return this.addCategoryFormGroup.controls.urlHandle;
}

onSubmit(){
  const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();
  
  const addCategoryRequestDto: AddCategoryRequest = {
    name: addCategoryFormValue.name,
    urlHandle: addCategoryFormValue.urlHandle,
  };

  this.categoryService.addCategory(addCategoryRequestDto);

  
}


}
