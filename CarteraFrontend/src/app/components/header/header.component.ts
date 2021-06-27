import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  metadata: any = JSON.parse(localStorage.getItem('metadata'));
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.metadata)
  }

  logout(){
    localStorage.removeItem('metadata');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/inicio');
    
  }

  goToProfile(){
    this.router.navigateByUrl('/profile');
  }

}
