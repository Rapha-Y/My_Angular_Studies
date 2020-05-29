import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      linkFoto: ['', [Validators.minLength(10)]],
      dataLancamento: ['', [Validators.required]],
      descricao: [''],
      notaIMDb: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      linkIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

  }

  salvar(): void {
    if(this.cadastro.invalid) {
      return;
    }
    alert('Sucesso!\n' + JSON.stringify(this.cadastro.value, null, 4));
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

}
