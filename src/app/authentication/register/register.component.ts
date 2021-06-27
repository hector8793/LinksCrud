import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/core/service/apis.service';
import { StoreService } from 'src/app/core/service/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public register: FormGroup;

  constructor(private route: Router,
    private storeService:StoreService,
    private fb: FormBuilder,
    private apisService: ApisService) { 
    this.register = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
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

  ngOnInit(): void {
  }

  sendRegister(){
    console.log("enviando register");
    let body = {
      "name": this.register.controls.name.value,
      "email": this.register.controls.email.value,
      "password": this.register.controls.password.value
    }
    this.apisService.sendRegister(body).subscribe((resp: any)=>{
      if(resp["id"] != null || resp["id"] != undefined){
        this.route.navigate(['login'])
      }
    })
  }

  goLogin(){
    this.route.navigate(['login'])
  }

}
