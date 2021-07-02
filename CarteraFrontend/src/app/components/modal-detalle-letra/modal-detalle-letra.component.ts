import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle-letra',
  templateUrl: './modal-detalle-letra.component.html',
  styleUrls: ['./modal-detalle-letra.component.css']
})
export class ModalDetalleLetraComponent implements OnInit {

  
  constructor(@Inject(MAT_DIALOG_DATA) public letter: any) { }

  ngOnInit() {
    console.log('letter', this.letter)
  }

}
