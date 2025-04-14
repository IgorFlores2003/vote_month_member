import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificar',
  templateUrl: './identificar.page.html',
  styleUrls: ['./identificar.page.scss'],
  standalone: false
})
export class IdentificarPage {
  todos = [
    'Adilson', 'Ana Júlia', 'Eliane', 'Evaldo', 'Gustavo', 'Heliezer',
    'Marcelo', 'Marco', 'Patrícia', 'Sabrina', 'Samuel', 'Tatiane', 'Viviane', 'William'
  ].sort();

  constructor(private router: Router) { }

  selecionarPessoa(nome: string) {
    localStorage.setItem('quemEstaVotando', nome);
    this.router.navigateByUrl('/votacao');
  }

  jaVotou(nome: string): boolean {
    const jaVotaram = JSON.parse(localStorage.getItem('jaVotaram') || '[]');
    return jaVotaram.includes(nome);
  }

  todosVotaram(): boolean {
    const jaVotaram = JSON.parse(localStorage.getItem('jaVotaram') || '[]');
    return jaVotaram.length === this.todos.length;
  }
  

  limparVotacoes() {
    localStorage.removeItem('jaVotaram');
    localStorage.removeItem('votos');
    localStorage.removeItem('quemEstaVotando');
    location.reload();
  }

  verResultado() {
    this.router.navigateByUrl('/resultado');
  }
}
