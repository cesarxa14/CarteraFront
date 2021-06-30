import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-resultado-total',
  templateUrl: './modal-resultado-total.component.html',
  styleUrls: ['./modal-resultado-total.component.css']
})
export class ModalResultadoTotalComponent implements OnInit {

  recibidoTotal: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalResultadoTotalComponent>
  ) { }

  ngOnInit() {
    
    console.log('hola', this.data)
    this.recibidoTotal = this.data.value_received_total;
    this.recibidoTotal = parseFloat(this.recibidoTotal.toFixed(2))
  }

  close(){
    this.dialogRef.close();
  }

}
