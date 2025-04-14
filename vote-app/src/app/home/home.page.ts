import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonContent, IonButton } from "@ionic/angular/standalone";
import { ConfigPage } from '../config/config.page'; // ajuste o caminho

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  constructor(private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    if (!localStorage.getItem('participantes')) {
      localStorage.setItem('participantes', JSON.stringify([
        { nome: 'Adilson', vota: true, votado: true },
        { nome: 'Ana Júlia', vota: true, votado: true },
        { nome: 'Eliane', vota: true, votado: true },
        { nome: 'Evaldo', vota: true, votado: true },
        { nome: 'Gustavo', vota: true, votado: true },
        { nome: 'Heliezer', vota: true, votado: false },
        { nome: 'Marcelo', vota: true, votado: true },
        { nome: 'Marco', vota: true, votado: true },
        { nome: 'Patrícia', vota: true, votado: false },
        { nome: 'Sabrina', vota: true, votado: true },
        { nome: 'Samuel', vota: true, votado: true },
        { nome: 'Tatiane', vota: true, votado: true },
        { nome: 'Viviane', vota: true, votado: true },
        { nome: 'William', vota: true, votado: true }
      ]));
    }
  }
  irParaVotacao() {
    this.router.navigateByUrl('/identificar');
  }

  async abrirConfiguracoes() {
    const modal = await this.modalCtrl.create({
      component: ConfigPage,
      breakpoints: [0, 0.3, 0.6, 0.9, 1],
      initialBreakpoint: 0.6,
      handle: true,
      backdropBreakpoint: 0.3
    });

    await modal.present();

    const { role } = await modal.onWillDismiss();

    this.carregarParticipantes();
  }
  carregarParticipantes() {
    const dados = JSON.parse(localStorage.getItem('participantes') || '[]');
  }

}
