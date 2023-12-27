import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { Category } from '../category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  form!:FormGroup;
  

  constructor(private catService:CategoryService, 
    private router:Router){}
  ngOnInit(): void {
    //initialize form
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('',Validators.required)
    })
  }

  submit(){
    console.group(this.form.value);
    this.catService.add(this.form.value).subscribe(result=>{
      alert('added successfully');
      //redirect to category list
      this.router.navigate(['/categories']);
    },err=>{
      alert('error');
      console.log(err);
    })
  }
}
