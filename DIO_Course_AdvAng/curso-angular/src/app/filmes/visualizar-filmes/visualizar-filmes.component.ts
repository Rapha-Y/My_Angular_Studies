import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { Alert } from 'src/app/shared/models/alert';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semfoto = "https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg";
  filme: Filme;
  id: number;

  constructor(
    public dialog: MatDialog,
    private activedRoute: ActivatedRoute,
    private router: Router, 
    private filmesService: FilmesService
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Tem certeza que deseja excluir este filme?',
        descricao: 'Caso tenha certeza que deseja excluir o filme, clique em OK.',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuiBtnFechar: true
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if(opcao) {
        this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }

}
