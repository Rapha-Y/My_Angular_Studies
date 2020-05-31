import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  pagina = 0;
  readonly qtddPagina = 4;
  filtrosListagem: FormGroup;
  generos: Array<String>;

  constructor(private filmesService: FilmesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.generos = ["Ação", "Romance", "Aventura", "Terror", "Ficção Científica", "Comédia", "Drama"];

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtddPagina).subscribe(
      (filmes: Filme[]) => this.filmes.push(...filmes)
    );
  }

}
