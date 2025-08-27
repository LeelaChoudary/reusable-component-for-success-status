import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-forms-sample-app',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-forms-sample-app.component.html',
  styleUrl: './dynamic-forms-sample-app.component.css'
})
export class DynamicFormsSampleAppComponent {
submitForm() {
console.log(this.dynamicForm.value);
}
  dynamicForm!: FormGroup;
  constructor(private fb:FormBuilder){
    this.dynamicForm=fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      fields:this.fb.array([])
    })
  }
  get fields():FormArray{
return this.dynamicForm.get("fields") as FormArray;
  }

  addField(){
    const fieldGroup=this.fb.group({
      label:[""],
      value:[""]
    })
    this.fields.push(fieldGroup)
  }

  removeField(index:number){
    this.fields.removeAt(index);
  }
}
