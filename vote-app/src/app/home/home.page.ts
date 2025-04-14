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

    // Espera o fechamento do modal
    const { role } = await modal.onWillDismiss();

    // Atualiza localStorage ou estado se necessário
    this.carregarParticipantes(); // ← Crie esse método se necessário
  }
  carregarParticipantes() {
    const dados = JSON.parse(localStorage.getItem('participantes') || '[]');
    // você pode armazenar em uma variável local, se quiser
    console.log(dados); // ou atualizar a UI
  }

}
