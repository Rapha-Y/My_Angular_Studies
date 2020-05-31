import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Alert } from '../../models/alert';

@Component({
  selector: 'dio-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerta = {
    titulo: "Sucesso!",
    descricao: "Seu registro foi realizado com sucesso!",
    btnSucesso: "OK",
    btnCancelar: "Cancelar",
    corBtnSucesso: "accent",
    corBtnCancelar: "warn",
    possuiBtnFechar: false
  } as Alert;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert
  ) { }

  ngOnInit() {
    if(this.data) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar;
      this.alerta.corBtnSucesso = this.data.corBtnSucesso || this.alerta.corBtnSucesso;
      this.alerta.corBtnCancelar = this.data.corBtnCancelar || this.alerta.corBtnCancelar;
      this.alerta.possuiBtnFechar = this.data.possuiBtnFechar || this.alerta.possuiBtnFechar;
    }
  }

}
