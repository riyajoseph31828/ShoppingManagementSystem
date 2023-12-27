import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private authServ:AuthService,private router:Router){}
  
  ngOnInit(): void {
    this.form=new FormGroup({
      id: new FormControl(0),
      email : new FormControl('',[Validators.email,Validators.required]),
      password : new FormControl('',Validators.required)
    })
  }



  submit() {
    this.authServ.login(this.form.value).subscribe(result=>{
      console.log(result);
      //alert('Login Successful')
      //navigate to products
      this.router.navigate(['/products']);
    },err=>{
      alert('error');
      console.log(err);
    })

  }
}

