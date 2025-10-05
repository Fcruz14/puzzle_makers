import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { GameQuestion } from './components/game-question/game-question';
import { GamePoints } from './components/game-points/game-points';
import { GameOptions } from './components/game-options/game-options';
import { inAnswer, inQuestion } from '../../../../core/interfaces/question';


@Component({
  selector: 'app-mini-game',
  imports: [CommonModule, GameQuestion,GamePoints,GameOptions],
  templateUrl: './mini-game.html',
  styleUrl: './mini-game.scss'
})
export class MiniGame implements OnInit{

  questions = signal<inQuestion[]>(
    [
      {
        "id": 101,
        "question": "¿Cuál es la capital de Francia?",
        "alternatives": [
          {
            "id": 1,
            "description": "Berlín",
            "color": "#001c51"
          },
          {
            "id": 2,
            "description": "Madrid",
            "color": "#009e79"
          },
          {
            "id": 3,
            "description": "París",
            "color": "#098adb"
          },
          {
            "id": 4,
            "description": "Roma",
            "color": "#9adf3a"
          }
        ],
        "correctAnswer": {
          "id": 3,
          "description": "París",
          "color": "#9adf3a"
        },
        "points": 20
      },
      {
        "id": 102,
        "question": "¿Qué lenguaje de programación es más usado para desarrollo web frontend?",
        "alternatives": [
          {
            "id": 1,
            "description": "Python",
            "color": "#red"
          },
          {
            "id": 2,
            "description": "Java",
            "color": "#blue"
          },
          {
            "id": 3,
            "description": "C#",
            "color": "#green"
          },
          {
            "id": 4,
            "description": "JavaScript",
            "color": "#yellow"
          }
        ],
        "correctAnswer": {
          "id": 4,
          "description": "JavaScript",
          "color": "#yellow"
        },
        "points": 30
      },
      {
        "id": 103,
        "question": "¿Cuántos lados tiene un hexágono?",
        "alternatives": [
          {
            "id": 1,
            "description": "Cinco",
            "color": "#blue"
          },
          {
            "id": 2,
            "description": "Seis",
            "color": "#red"
          },
          {
            "id": 3,
            "description": "Siete",
            "color": "#green"
          },
          {
            "id": 4,
            "description": "Cuatro",
            "color": "#yellow"
          }
        ],
        "correctAnswer": {
          "id": 2,
          "description": "Seis",
          "color": "#red"
        },
        "points": 15
      }
    ]
  )

  actualQuestion = signal<inQuestion>({} as inQuestion);
  showGame = signal<boolean>(false);

  constructor(){}

  ngOnInit(): void {
   
    setTimeout(() => {
      this.showGame.set(true)
    }, 5000);
    this.actualQuestion.set(this.questions()[0])
    // #region GET QUESTIONS
    
  }

  changeShowGame(state:boolean){

  }



  onSelectAnswer(answer:any){
    console.log("seleccionaste: ", answer);

  }

  onCorrectAnsWer(){

  }

  onIncorrectAnswer(){

  }

  setNextQuestion(question:any){
    this.actualQuestion.set(question);
    
    // wee need to reaload te components (animation)
    // region RELOAD OPIONS
    // region RELOAD QUESTION
    

    
  }


}
