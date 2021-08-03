import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.module';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl('', [Validators.minLength(3), Validators.maxLength(100), Validators.required]);
  nome_autor = new FormControl('', [Validators.minLength(3), Validators.maxLength(100), Validators.required]);
  texto = new FormControl('', [Validators.minLength(10), Validators.maxLength(2000000), Validators.required]);
  id_cat: String = '';
  livro: Livro = {
    id: '',
    autor: '',
    titulo: '',
    texto: ''
  }

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((result) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro criado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem(`Error ao criar novo livro! Tente mais tarde!`);
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if(this.titulo.invalid) {
      return 'O campo Titulo deve conter entre 3 e 100 caracteres';
    }
    if(this.nome_autor.invalid) {
      return 'O campo Titulo deve conter entre 3 e 100 caracteres';
    }
    if(this.texto.invalid) {
      return 'O campo Titulo deve conter entre 3 e 2000000 caracteres';
    }
    return false;
  }

}
