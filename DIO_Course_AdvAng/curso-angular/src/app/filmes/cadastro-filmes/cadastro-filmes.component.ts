import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog, 
    private fb: FormBuilder, 
    private filmesService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.criarFormulario(filme))
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }

    this.generos = ["Ação", "Romance", "Aventura", "Terror", "Ficção Científica", "Comédia", "Drama"];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      linkFoto: [filme.linkFoto, [Validators.minLength(10)]],
      dataLancamento: [filme.dataLancamento, [Validators.required]],
      descricao: [filme.descricao],
      notaIMDb: [filme.notaIMDb, [Validators.required, Validators.min(0), Validators.max(10)]],
      linkIMDb: [filme.linkIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dataLancamento: null,
      linkFoto: null,
      descricao: null,
      notaIMDb: null,
      linkIMDb: null,
      genero: null
    } as Filme;
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar novo filme',
            corBtnCancelar: 'primary',
            possuiBtnFechar: true
          } as Alert
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if(opcao) {
            this.router.navigateByUrl('filmes');
          } else {
            this.reiniciarForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            titulo: "Erro ao salvar o registro",
            descricao: "Não foi possível salvar seu registro, tente novamente mais tarde",
            corBtnSucesso: "warn",
            btnSucesso: "Fechar",
          } as Alert
        };
        this.dialog.open(AlertComponent, config);
      }
    );
  }

}
