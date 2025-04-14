import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.page.html',
  styleUrls: ['./votacao.page.scss'],
  standalone: false
})
export class VotacaoPage {
  quemVota: string = '';
  votoHomem: string | null = null;
  votoMulher: string | null = null;

  mulheres: string[] = [];
  homens: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const votante = localStorage.getItem('quemEstaVotando');
    if (!votante) {
      this.router.navigateByUrl('/identificar');
      return;
    }

    this.quemVota = votante;

    const dados = JSON.parse(localStorage.getItem('participantes') || '[]');

    this.mulheres = dados
      .filter((p: any) => p.votado && this.eMulher(p.nome))
      .map((p: any) => p.nome)
      .sort();

    this.homens = dados
      .filter((p: any) => p.votado && !this.eMulher(p.nome))
      .map((p: any) => p.nome)
      .sort();
  }

  eMulher(nome: string): boolean {
    const nomesMulheres = ['Ana Júlia', 'Eliane', 'Patrícia', 'Sabrina', 'Tatiane', 'Viviane'];
    return nomesMulheres.includes(nome);
  }

  votar(nome: string, genero: 'masculino' | 'feminino') {
    if (genero === 'masculino') {
      this.votoHomem = nome;
    } else {
      this.votoMulher = nome;
    }
  }

  finalizarVotacao() {
    if (!this.quemVota) {
      alert('Erro: Nome do votante não encontrado!');
      this.router.navigateByUrl('/identificar');
      return;
    }

    const votos = JSON.parse(localStorage.getItem('votos') || '[]');

    const nomeNormalizado = this.quemVota.trim().toLowerCase();
    const votanteEspecial = ['patrícia', 'heliezer'].includes(nomeNormalizado);
    const peso = votanteEspecial ? 2 : 1;

    votos.push({
      quemVotou: this.quemVota,
      votado: this.votoHomem,
      pontos: peso,
    });

    votos.push({
      quemVotou: this.quemVota,
      votado: this.votoMulher,
      pontos: peso,
    });

    localStorage.setItem('votos', JSON.stringify(votos));

    const jaVotaram = JSON.parse(localStorage.getItem('jaVotaram') || '[]');
    if (!jaVotaram.includes(this.quemVota)) {
      jaVotaram.push(this.quemVota);
      localStorage.setItem('jaVotaram', JSON.stringify(jaVotaram));
    }

    localStorage.removeItem('quemEstaVotando');
    this.router.navigateByUrl('/identificar');
  }
}