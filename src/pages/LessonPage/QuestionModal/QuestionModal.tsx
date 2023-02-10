import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserStatistics } from '../../../API/statistics';
import { ILesson } from '../Theory/Theory';

export default function QuestionModal({
  setShowModal,
  setLessonId,
  lesson,
  urlId,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setLessonId: Dispatch<SetStateAction<string>>;
  lesson: ILesson;
  urlId: number;
}) {
  const [answer, setAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState(false);

  async function sendLessonStatistic() {
    const userId = JSON.parse(localStorage.getItem('userData') as string).userId;
    getUserStatistics(userId).then(console.log);
  }

  useEffect(() => {
    if (answer === lesson.answer) {
      setShowModal(false);
      sendLessonStatistic();
    }
  }, [answer]);

  return (
    <div className="lesson__question">
      <div className="lesson__question-window">
        <span className="lesson__question-window-close" onClick={() => setShowModal(false)}>
          ✖
        </span>
        <p className="lesson__question-window-question">{lesson.question}</p>
        <ul className="lesson__question-window-list">
          {lesson.options.map((item, i) => {
            if (item !== lesson.answer) {
              return (
                <li
                  className="lesson__question-window-list-item"
                  key={i}
                  onClick={() => {
                    setAnswer(item);
                    setAnswerStatus(true);
                  }}
                >
                  <Link to={`/lessons/${urlId}`}>{item}</Link>
                </li>
              );
            } else {
              return (
                <li
                  className="lesson__question-window-list-item"
                  key={i}
                  onClick={() => setAnswer(item)}
                >
                  <Link
                    to={`/lessons/${urlId + 1}`}
                    onClick={() => setLessonId(`${+lesson.id + 1}`)}
                  >
                    {item}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <div className="lesson__question-window-answer-status">
          {answerStatus && 'Wrong answer'}
        </div>
      </div>
    </div>
  );
}
