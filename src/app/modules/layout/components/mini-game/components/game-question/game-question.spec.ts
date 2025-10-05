import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameQuestion } from './game-question';

describe('GameQuestion', () => {
  let component: GameQuestion;
  let fixture: ComponentFixture<GameQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
