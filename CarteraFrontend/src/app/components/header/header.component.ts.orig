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
  }

  logout(){
    localStorage.removeItem('metadata');
    this.router.navigateByUrl('/inicio');
    
  }

}
