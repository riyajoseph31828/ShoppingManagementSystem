import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productId: number = 0;
  product1!: Product;
  form!: FormGroup;
  list: Category[] = []; //category array is initialized 


  constructor(private prodService: ProductService,
              private catService: CategoryService, 
              private route: ActivatedRoute,
              private dtPipe:DatePipe,//injected the datepipe(step 2 of dependency injection)
              private router:Router) { }  

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id']; //routing with parameter //this will allow us to fetch the route parameter in the target component UpdateProduct
    //['id'] should match with the path mentioned in the routing module
    console.log(this.productId);



    //initialize form
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', Validators.required),
      price: new FormControl(null, [Validators.min(1), Validators.required]),
      categoryId: new FormControl(null, Validators.required),
      manufacturedDate: new FormControl(''),
      imageUrl: new FormControl('', Validators.required)
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
    this.prodService.getById(this.productId).subscribe(p => {
      console.log(p);
      this.product1 = p;

      //this.form.patchValue(this.product1);
      this.form.setValue({
        id: this.product1.id,
        name: this.product1.name,
        price: this.product1.price,
        categoryId: this.product1.categoryId,
        manufacturedDate: this.dtPipe.transform(this.product1.manufacturedDate,'yyyy-MM-dd'), //third step of DI transform
        imageUrl: this.product1.imageUrl
      });
    }, err => {
      console.log(err);
      alert('error');
    });



  }



  submit() {
    this.prodService.update(this.form.value).subscribe(()=>{   //observable is returning void,==> ()
        alert('updated successfully');
        //navigate to product list
        this.router.navigate(['\products']);
    },err=>{
      console.log(err);
      alert('error');
    })

  }

}
