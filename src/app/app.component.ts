import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en'); 
  }

  LANG_FR: string = 'fr';
  LANG_EN: string = 'en';
  currentLanguage: string = '';
  targetLanguage: string = '';

  title: string = 'Puissance 4';

  playerYellow: number = 1;
  playerRed: number = 2;
  winning: number = 3;

  numberColumns: number = 7;
  numberRows: number = 6;

  columns = new Array(this.numberColumns);
  rows = new Array(this.numberRows);

  board: Array<Array<number>>;
  height: Array<number>;
  moves: Array<number>;
  won: boolean;
  winningPlayerLocalizedColor: string;

  ngOnInit() {
    this.setLanguage();
    this.initGameValues();
  }

  setLanguage() {
    const { language } = window?.navigator
    this.currentLanguage = (language) ? language.split('-')[0] : this.translate.defaultLang
    this.switchLanguage(this.currentLanguage);
  }

  initGameValues() {
    this.board = new Array();
    for (let index = 0; index < this.numberColumns; index++) {
      this.board.push(new Array(this.numberRows).fill(0));
    }
    this.height = new Array(this.numberColumns).fill(0);
    this.moves = new Array();
    this.won = false;
    this.winningPlayerLocalizedColor = '';
  }

  canPlay(col: number) {
    return (!this.won && (this.height[col] < this.numberRows));
  }

  play(col: number) {
    this.board[col][this.height[col]] = 1 + (this.moves.length % 2);
    this.height[col]++;
    this.moves.push(col);
    if (this.moves.length < 7) return;
    this.checkWin();
  }

  checkWin() {
    var x = this.moves[this.moves.length - 1];
    var y = this.height[x] - 1;
  
    if (y >= 3 && this.board[x][y - 3] == this.board[x][y] && this.board[x][y - 2] == this.board[x][y] && this.board[x][y - 1] == this.board[x][y]) {
      this.showWin(x, y, 0, -1);
      return;
    }

    for (var dy = -1; dy <= 1; dy++) {
      var nb = 0;
      for (var dx = 1; x + dx < 7 && y + dx * dy < 6 && y + dx * dy >= 0; dx++)
        if (this.board[x + dx][y + dx * dy] == this.board[x][y]) nb++;
        else break;
      for (var dx = -1; x + dx >= 0 && y + dx * dy < 6 && y + dx * dy >= 0; dx--)
        if (this.board[x + dx][y + dx * dy] == this.board[x][y]) nb++;
        else break;
      if (nb >= 3) {
        this.showWin(x + dx + 1, y + (dx + 1) * dy, 1, dy);
        return;
      }
    }
  }

  showWin(x: number, y: number, dx: number, dy: number) {
    for (var i = 0; i < 4; i++) {
      this.board[x + i * dx][y + i * dy] = this.winning;
    }
    this.winningPlayerLocalizedColor = this.translate.instant(`players.${this.getWinningPlayerColor()}`);
    this.won = true;
  }

  // template functions

  switchLanguage(lang: string = 'reverse') {
    this.targetLanguage = this.currentLanguage

    if (lang == 'reverse') {
      this.currentLanguage = (this.currentLanguage == this.LANG_FR)
        ? this.LANG_EN
        : this.LANG_FR;
    }

    this.translate.use(this.currentLanguage);
  }

  restartGame() {
    this.initGameValues();
  }

  setToken(col: number) {
    if (this.canPlay(col)) {
      this.play(col);
    } else {
      alert(this.translate.instant('indications.playInAnotherColumn'));
    }
  }

  getCurrentPlayerClass() {
    const currentPlayer = this.moves.length % 2;

    return {
      'player-yellow': (currentPlayer == 0),
      'player-red': (currentPlayer == 1)
    }
  }

  getWinningPlayerColor() {
    const winningPlayerIndex = this.moves[this.moves.length - 1] % 2;

    return (winningPlayerIndex === 0)
      ? 'yellow'
      : 'red';
  }

  getTokenClass(col: number, row: number) {
    const tokenValue = this.board[col][5 - row]

    return {
      'player-yellow': (tokenValue == this.playerYellow),
      'player-red': (tokenValue == this.playerRed),
      'winning': (tokenValue == this.winning)
    }
  }
}
