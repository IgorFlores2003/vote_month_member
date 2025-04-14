import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
  standalone: false
})
export class ResultadoPage implements OnInit {

  votos: any[] = [];
  mulheresOrdenadas: any[] = [];
  homensOrdenados: any[] = [];
  vencedora: string = '';
  vencedor: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.tocarMusiquinha();

    const votos = JSON.parse(localStorage.getItem('votos') || '[]') as {
      quemVotou: string;
      votado: string;
      pontos: number;
    }[];

    const contagem: Record<string, number> = {};

    votos.forEach(({ votado, pontos }) => {
      const nome = votado.trim().toLowerCase();
      contagem[nome] = (contagem[nome] || 0) + (pontos || 1);
    });

    const participantes = JSON.parse(localStorage.getItem('participantes') || '[]') as {
      nome: string;
      vota: boolean;
      votado: boolean;
    }[];

    const mulheres = participantes
      .filter((p: any) => p.votado && this.eMulher(p.nome) && p.nome !== 'Patrícia')
      .map((p: any) => p.nome);

    const homens = participantes
      .filter((p: any) => p.votado && !this.eMulher(p.nome) && p.nome !== 'Heliezer')
      .map((p: any) => p.nome);

    this.mulheresOrdenadas = this.ordenarPorPontos(mulheres, contagem);
    this.homensOrdenados = this.ordenarPorPontos(homens, contagem);

    this.vencedora = this.mulheresOrdenadas[0]?.nome || '';
    this.vencedor = this.homensOrdenados[0]?.nome || '';
  }

  private ordenarPorPontos(nomes: string[], contagem: Record<string, number>) {
    return nomes.map(nome => ({
      nome,
      pontos: contagem[nome.trim().toLowerCase()] || 0
    }))
      .sort((a: { pontos: number }, b: { pontos: number }) => b.pontos - a.pontos);
  }

  private eMulher(nome: string): boolean {
    const mulheres = ['Ana Júlia', 'Eliane', 'Sabrina', 'Tatiane', 'Viviane', 'Patrícia'];
    return mulheres.map(n => n.trim().toLowerCase()).includes(nome.trim().toLowerCase());
  }

  tocarMusiquinha() {
    const audio = new Audio('assets/audio/crowd-applauding-198627.mp3');
    audio.volume = 0.6;
    audio.play().catch((e) => {
      console.warn('Não foi possível tocar o áudio automaticamente:', e);
    });

    setTimeout(() => {
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          clearInterval(fadeInterval);
          audio.pause();
          audio.currentTime = 0;
        }
      }, 200);
    }, 7000);
  }

  voltarInicio() {
    localStorage.removeItem('votos');
    localStorage.removeItem('jaVotaram');
    localStorage.removeItem('quemEstaVotando');
    this.router.navigateByUrl('/identificar');
  }
}