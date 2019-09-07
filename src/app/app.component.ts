import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MyapiService } from './services/myapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular8blog';
  navtitle:string;
  isconnected:boolean = false;
  showadmin:boolean = false;
  constructor(private router:Router,private myapi:MyapiService){
    this.myapi.checkConnection();
    this.isconnected = this.myapi.isconnected$.getValue()[0];
    this.showadmin = this.myapi.showadmin$.getValue()[0];
  }
  ngOnInit() {
    this.myapi.isconnected$.subscribe((data)=>{
      this.isconnected = data[0];
    });

    this.myapi.showadmin$.subscribe((data)=>{
      this.showadmin = data[0];
    });
  }
  logout(){
    this.myapi.deleteCookie("user");
    this.myapi.isconnected$.next([false]);
    this.myapi.showadmin$.next([false]);
    this.router.navigate(['/']);
  }
}
