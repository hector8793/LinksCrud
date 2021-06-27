import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/core/service/apis.service';
import { StoreService } from 'src/app/core/service/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public login: FormGroup;

  constructor(private route: Router,
    private storeService:StoreService,
    private fb: FormBuilder,
    private apisService: ApisService) { 
    this.login = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])
    });
  }

  sendLogin(){
    console.log("enviando login");
    let body = {
      "email": this.login.controls.email.value,
      "password": this.login.controls.password.value
    }
    this.apisService.getLogin(body).subscribe((resp: any)=>{
      if(resp["token"] != null || resp["token"] != undefined){
        let token = resp["token"]
        this.storeService.set("isLoggedIn", token)
        this.route.navigate(['home'])
      }
    })
  }

  goRegister(){
    this.route.navigate(['register'])
  }

  ngOnInit(): void {

  }

}
