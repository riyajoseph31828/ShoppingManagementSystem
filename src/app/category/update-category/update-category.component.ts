import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  categoryId: number = 0;
  category1!: Category;
  form!: FormGroup;
  list: Category[] = []; //category array is initialized


  constructor(private catService:CategoryService,private route: ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id']; 

    console.log(this.categoryId);

    //initialize form
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', Validators.required)
    });


    this.catService.getList().subscribe(result => { //Here we are storing the data from the category component to the initialised list
      //it is done by the object of the service class
      console.log(result);
      this.list = result;
    }, err => {
      console.log(err);
      alert(err);
    })

    //service method
    this.catService.getById(this.categoryId).subscribe(result => {
      console.log(result);
      this.category1 = result;

      //this.form.patchValue(this.product1);
      this.form.setValue({
        id: this.category1.id,
        name: this.category1.name,

      });
    }, err => {
      console.log(err);
      alert('error');
    });
    
  }
  submit() {
    this.catService.update(this.form.value).subscribe(()=>{   //observable is returning void,==> ()
      alert('updated successfully');
      //navigate to category list
      this.router.navigate(['\categories']);
  },err=>{
    console.log(err);
    alert('error');
  })

}

}
