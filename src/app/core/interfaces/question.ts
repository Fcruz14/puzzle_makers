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
