import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: false
})
export class ConfigPage implements OnInit {

  pessoas: any[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const dadosSalvos = JSON.parse(localStorage.getItem('participantes') || '[]');

    this.pessoas = dadosSalvos.length > 0 ? dadosSalvos : [
      { nome: 'Adilson', vota: true, votado: true },
      { nome: 'Ana Júlia', vota: true, votado: true },
      { nome: 'Eliane', vota: true, votado: true },
      { nome: 'Evaldo', vota: true, votado: true },
      { nome: 'Gustavo', vota: true, votado: true },
      { nome: 'Marcelo', vota: true, votado: true },
      { nome: 'Marco', vota: true, votado: true },
      { nome: 'Sabrina', vota: true, votado: true },
      { nome: 'Samuel', vota: true, votado: true },
      { nome: 'Tatiane', vota: true, votado: true },
      { nome: 'Viviane', vota: true, votado: true },
      { nome: 'William', vota: true, votado: true },
    ];
  }

  salvar() {
    localStorage.setItem('participantes', JSON.stringify(this.pessoas));
    this.modalCtrl.dismiss();
  }

  fechar() {
    this.modalCtrl.dismiss();
  }
}
