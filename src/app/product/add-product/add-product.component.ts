import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form!:FormGroup;
  list: Category []=[]; //category array is initialized 

  constructor(private prodService:ProductService, private catService: CategoryService,
     private router:Router){}
  ngOnInit(): void {
  //initialize form
  this.form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',Validators.required),
    price : new FormControl(null,[Validators.min(1),Validators.required]),
    categoryId : new FormControl('',Validators.required),
    manufacturedDate : new FormControl(''),
    imageUrl: new FormControl('',Validators.required)
  })
  this.catService.getList().subscribe(result=>{
    console.log(result);
    this.list=result;
  },err=>{
    console.log(err);
    alert(err);
  })
  }

  submit(){
    console.group(this.form.value);
    this.prodService.add(this.form.value).subscribe(result=>{
      alert('added successfully');
      //redirect to product list
      this.router.navigate(['/products']);
    },err=>{
      alert('error');
      console.log(err);
    })
  }

}
