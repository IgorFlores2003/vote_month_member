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
    const dados = JSON.parse(localStorage.getItem('votos') || '[]');
    this.tocarMusiquinha();

    const contagem: Record<string, number> = {};

    for (const voto of dados) {
      const nomeNormalizado = voto.votado.trim().toLowerCase();

      if (!contagem[nomeNormalizado]) {
        contagem[nomeNormalizado] = 0;
      }

      contagem[nomeNormalizado] += voto.pontos || 1;
    }


    const mulheres = ['Ana Júlia', 'Eliane', 'Sabrina', 'Tatiane', 'Viviane'];
    const homens = ['Adilson', 'Evaldo', 'Gustavo', 'Marcelo', 'Marco', 'Samuel', 'William'];

    this.mulheresOrdenadas = mulheres
      .map(nomeOriginal => {
        const nomeNormalizado = nomeOriginal.trim().toLowerCase();
        return {
          nome: nomeOriginal,
          pontos: contagem[nomeNormalizado] || 0
        };
      })
      .sort((a, b) => b.pontos - a.pontos);


    this.homensOrdenados = homens
      .map(nomeOriginal => {
        const nomeNormalizado = nomeOriginal.trim().toLowerCase();
        return {
          nome: nomeOriginal,
          pontos: contagem[nomeNormalizado] || 0
        };
      })
      .sort((a, b) => b.pontos - a.pontos);



    this.vencedora = this.mulheresOrdenadas[0].nome;
    this.vencedor = this.homensOrdenados[0].nome;
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