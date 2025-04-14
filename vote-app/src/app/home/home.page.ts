import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  constructor(private router: Router) {}

  irParaVotacao() {
    this.router.navigateByUrl('/votacao');
  }
}
