import { Component, input, OnInit, output, signal, effect } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export interface inQuestion {
    id:            number;
    question:      string;
    alternatives:  inAnswer[];
    correctAnswer: inAnswer;
    points:        number;
}

export interface inAnswer {
    id:          number;
    description: string;
    color:       string;
}

@Component({
  selector: 'app-game-question',
  imports: [CommonModule, NgClass],
  templateUrl: './game-question.html',
  styleUrl: './game-question.scss'
})
export class GameQuestion implements OnInit {
  actualQuestion = input.required<inQuestion>();
  skipQuestion = output<void>();
  
  isNew = signal<boolean>(true);
  isMinimized = signal<boolean>(false);
  displayedText = signal<string>('');
  isTyping = signal<boolean>(false);
  
  // Velocidad configurable (milisegundos por carácter)
  typingSpeed = 50;
  
  private currentText = '';
  private typingInterval: any;
  
  onSelectAnswer = output<inAnswer>();
  setNextQuestion = output<inQuestion>();
  
  welcomeMessage = "Hola soy Frank tu asistente en este juego llamado Puzzle Maker, ¿quieres empezar?";
  
  constructor() {
    // Effect para detectar cambios en actualQuestion
    effect(() => {
      const question = this.actualQuestion();
      if (question && !this.isNew()) {
        this.typeText(question.question);
      }
    });
  }
  
  ngOnInit(): void {
    if (this.isNew()) {
      this.typeText(this.welcomeMessage);
    }
    console.log(this.actualQuestion())
  }
  
  typeText(text: string): void {
    // Limpiar intervalo anterior si existe
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
    
    this.currentText = text;
    this.displayedText.set('');
    this.isTyping.set(true);
    
    let index = 0;
    this.typingInterval = setInterval(() => {
      if (index < this.currentText.length) {
        this.displayedText.update(current => current + this.currentText[index]);
        index++;
      } else {
        clearInterval(this.typingInterval);
        this.isTyping.set(false);
      }
    }, this.typingSpeed);
  }
  
  toggleMinimize(): void {
    this.isMinimized.update(val => !val);
  }
  
  handleStart(): void {
    if (this.isNew()) {
      this.isNew.set(false);
      if (this.actualQuestion()) {
        this.typeText(this.actualQuestion().question);
      }
    }
    localStorage.setItem('isNew',"false")
  }
  
  selectAnswer(answer: inAnswer): void {
    if (!this.isTyping()) {
      this.onSelectAnswer.emit(answer);
    }
  }
  
  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }
}

