import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/core/service/apis.service';
import { StoreService } from 'src/app/core/service/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public Links: any = [

  ]
  public User: any
  public linkForm: FormGroup;

  constructor(private route: Router,
    private storeService:StoreService,
    private fb: FormBuilder,
    private apisService: ApisService) { 
    this.linkForm = this.fb.group({
      url: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])
    });
  }

  
  ngOnInit(): void {
    this.getLinks()
    this.getUser()
  }
  
  addLink(){
    if(this.linkForm.valid){
      console.log("enviando link");
      let body = {
        "url": this.linkForm.controls.url.value,
        "name": this.linkForm.controls.name.value
      }
      this.apisService.createLink(body).subscribe((resp: any)=>{
        this.Links.push(body)
        this.linkForm.controls.url.setValue("")
        this.linkForm.controls.name.setValue("")
      },error=>{
        this.Links.push(body)
        this.linkForm.controls.url.setValue("")
        this.linkForm.controls.name.setValue("")
      })
    }
  }
  
  deleteLink(id: any){
    this.apisService.deleteLink("21").subscribe((resp: any)=>{

    },error=>{

    })
    let array = []
    for (let i = 0; i < this.Links.length; i++) {
      if(i != id){
        array.push(this.Links[i])
      }
    }
    this.Links = array
  }
  
  getLinks(){
    this.apisService.listLinks().subscribe((resp: any)=>{
      console.log(JSON.stringify(resp));
    },error=>{
      console.log(error.error.text);
      if(error.error.text != undefined){
        let text = error.error.text
        let newtext = text.replace("name", "").replace("[","").replace("]","").replace(" ","")
        newtext = newtext.trim()
        let data = JSON.stringify(newtext)
        data = JSON.parse(data)
        let array = data.split("},")
        for (const iterator of array) {
          let t = JSON.parse(iterator + "}")
          this.Links.push(t);
        }
      }
    })
  }
  
  getUser(){
    this.apisService.getUser("1").subscribe((resp: any)=>{
      this.User = resp
    })
  }

  logout(){
    this.storeService.logout()
  }
}
