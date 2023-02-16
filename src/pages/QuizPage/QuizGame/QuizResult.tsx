import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GameStatus, IQuiz } from '../QuizPage';
import { IGameRunProps } from './QuizGame';
import ProgressBar from '../../../components/ProgressCircle/ProgressCircle';
import { IMissingTypeTask } from '../../MissingTypePage/MissingTypePage';

export interface IResultProps extends IGameRunProps {
  setQuiz: Dispatch<SetStateAction<IQuiz[]>> | Dispatch<SetStateAction<IMissingTypeTask[]>>;
}

export default function QuizResult({ answers, setAnswers, setQuiz, setStatus }: IResultProps) {
  const nextGame = useCallback(() => {
    setAnswers({ right: 0, wrong: 0, strike: 0, max: 0 });
    setQuiz([]);
    setStatus(GameStatus.SELECT);
  }, []);

  function getResultText(percent: number) {
    if (percent > 95) return "You're brilliant! I have nothing to teach you...";
    if (percent > 75) return 'You played very well! But there is still something to work on.';
    if (percent > 50) return 'You can do better! Repeat the lessons and come back! :)';
    return 'This time it was not successful, but keep practicing!';
  }

  return (
    <div className="results__container">
      <div className="results__wrapper">
        <h2 className="results__title title">Results</h2>
        <div className="results__content">
          <p className="result__description description">
            {getResultText((answers.right / (answers.right + answers.wrong)) * 100)}
          </p>
          <h3 className="results__subtitle subtitle">
            {answers.right} correct answers, {answers.wrong} wrong answers
          </h3>
          <ProgressBar
            percent={Math.ceil((answers.right / (answers.right + answers.wrong)) * 100)}
          />
          <div className="results__ations">
            <button className="results__button button" onClick={() => nextGame()}>
              Play again
            </button>
            <Link className="results__link button button_orange" to="/lessons">
              To lessons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
