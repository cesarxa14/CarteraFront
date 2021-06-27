import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-tipo-cambio',
  templateUrl: './tipo-cambio.component.html',
  styleUrls: ['./tipo-cambio.component.css']
})
export class TipoCambioComponent implements OnInit {

  tipoCambio: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getTipoCambio().subscribe(res=>{
      console.log('tipoCambio', res)
      this.tipoCambio = res;
    })
  }

}
