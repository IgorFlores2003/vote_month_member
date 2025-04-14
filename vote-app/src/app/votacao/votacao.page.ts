import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.page.html',
  styleUrls: ['./votacao.page.scss'],
  standalone: false
})
export class VotacaoPage {

  membros: string[] = ['Yasmim', 'Murilo', 'Letícia', 'João', 'Ana'];

  constructor() {}

  registrarVoto(membro: string) {
    const votos = this.getVotos();
    if (!votos.includes(membro)) {
      votos.push(membro);
      localStorage.setItem('votos', JSON.stringify(votos));
    }
  }

  jaVotou(membro: string): boolean {
    return this.getVotos().includes(membro);
  }

  private getVotos(): string[] {
    const dados = localStorage.getItem('votos');
    return dados ? JSON.parse(dados) : [];
  }
}