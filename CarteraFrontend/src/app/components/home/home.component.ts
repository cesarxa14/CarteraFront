import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../service/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  USER_NAME: string;
  carteras: any[];
  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  items = ['tretr','543543','543','4','fdfd', 'fdfds']
  constructor(private router: Router,
              private generalService: GeneralService) { }

  ngOnInit() {
    this.USER_NAME = this.metadata[0].nombres; 

    this.generalService.getCarterasByUser(this.metadata[0].id).subscribe((res:any)=>{
      console.log(res);
      this.carteras = res;
    })
  }


  goToCard(i){
    console.log(i);
    this.router.navigateByUrl(`/cartera/${i}`)
  }

}
