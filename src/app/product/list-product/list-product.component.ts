import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  list: Product[] = [];
  private productId = 0;
  constructor(private prodService: ProductService) { }


  ngOnInit(): void {  //initialize a view/page
    this.prodService.getList().subscribe(result => {
      console.log(result);
      this.list = result;
    }, err => {
      alert(err);
    })
  }


  delete() {
    console.log('product to delete:' + this.productId);
    this.prodService.delete(this.productId).subscribe(()=>{ //subscribe return type is void. so ()=> used
        alert('delete successful');
        this.ngOnInit(); //reloading that samepage without refreshing
    }, err=>{
      console.log(err);
      alert('error');
    })
  }

  setProductId(id: number) {
    this.productId = id;
  }



}
