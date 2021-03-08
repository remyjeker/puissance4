import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})

export class SplashComponent {
  @Input() playerColor: string;
  @Output() restartGameHandler: EventEmitter<any> = new EventEmitter();

  constructor(private translate: TranslateService) {}

  localizedWinningPlayer: string;

  ngOnInit() {
    this.localizedWinningPlayer = this.translate.instant(`players.${this.playerColor}`);
  }

  handleRestartGame() {
    this.restartGameHandler.emit();
  }
}
