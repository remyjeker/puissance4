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

  numberColumns: number = 7;
  numberRows: number = 6;

  columns = new Array(this.numberColumns);
  rows = new Array(this.numberRows);

  board: Array<Array<number>>;
  height: Array<number>;
  moves: Array<number>;
  won: boolean;

  ngOnInit() {
    this.setLanguage();
    this.initGameValues();
  }

  setLanguage() {
    const { language } = window?.navigator
    this.currentLanguage = (language) ? language.split('-')[0] : this.translate.defaultLang
    this.switchLanguage();
  }

  initGameValues() {
    this.board = new Array();
    for (let index = 0; index < this.numberColumns; index++) {
      this.board.push(new Array(this.numberRows).fill(0));
    }
    this.height = new Array(this.numberColumns).fill(0);
    this.moves = new Array();
    this.won = false;
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
      this.won = true;
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
        this.won = true;
        return;
      }
    }
  }

  showWin(x: number, y: number, dx: number, dy: number) {
    alert(`WON at position : ${x}, ${y}, ${dx}, ${dy}`);
  }

  // template functions

  switchLanguage() {
    this.targetLanguage = this.currentLanguage
    this.currentLanguage = (this.currentLanguage == this.LANG_FR)
      ? this.LANG_EN
      : this.LANG_FR;

    this.translate.use(this.currentLanguage);
  }

  restartGame() {
    this.initGameValues();
  }

  setToken(col: number) {
    if (this.canPlay(col)) {
      this.play(col);
    } else {
      if (this.won) alert('Play again ?');
      else alert('Play in another column ;)');
    }
  }

  currentPlayer() {
    return this.moves.length % 2;
  }
}
