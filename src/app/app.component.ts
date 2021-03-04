import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Puissance 4';

  numberColumns = 7;
  numberRows = 6;

  columns = new Array(this.numberColumns);
  rows = new Array(this.numberRows);

  setToken(colNum, rowNum) {
    console.log('setToken', colNum, rowNum)
  }
}
