import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private authServ:AuthService,private router:Router){}

  ngOnInit(): void {
      //form-group initialisation
      this.form = new FormGroup({
        id: new FormControl(0),
        name: new FormControl('',Validators.required),
        email : new FormControl('',[Validators.email,Validators.required]),
        password : new FormControl('',Validators.required),
        dateOfBirth: new FormControl('',Validators.required),
        role: new FormControl(1,Validators.required)
      })
  }
 



  submit() {
    this.authServ.register(this.form.value).subscribe(result=>{
      console.log(result);
      //navigate to login
      this.router.navigate(['']);
    },err=>{
      alert('error');
      console.log(err);
    })

  }

}
