import { Component, input } from '@angular/core';
import { inQuestion } from '../../../../../../core/interfaces/question';

@Component({
  selector: 'app-game-options',
  imports: [],
  templateUrl: './game-options.html',
  styleUrl: './game-options.scss'
})
export class GameOptions {

  actualQuestion = input.required<inQuestion>();

  

}
