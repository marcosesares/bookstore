import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../categoria/categoria.service';
import { Livro } from '../livro.module';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css'],
})
export class LivroReadAllComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];
  id_cat: String = '';
  nome_cat: String = '';
  livros: Livro[] = [];
  categoria: String = '';

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router,
    private catService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.findCategriaById();
    this.findAll();
  }

  findCategriaById(): void {
    this.catService.findById(this.id_cat).subscribe((resposta => {
      this.nome_cat = resposta.nome;
    }));
  }
  
  findAll(): void {
      this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta;
      console.log(this.livros);
    });
  }

  navegarLivroCreate() {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`]);
  }
}
