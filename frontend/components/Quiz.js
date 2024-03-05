import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, postAnswer } from '../state/action-creators';

function Quiz(props) {
  const { quiz, message, fetchQuiz, postAnswer } = props;

  const [answer, setAnswer] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  function handleSelect( answerId) {
    setIsButtonDisabled(false)
    setAnswer({quiz_id: quiz.quiz.quiz_id, answer_id: answerId.answer_id});
  }

  function handleClick(evt) {
    evt.preventDefault();

    if (!answer) {
      return;
    }

    setIsButtonDisabled(true);
    postAnswer(answer);

    fetchQuiz()


  }

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz?.quiz ? (
          <>
            <h2>{quiz?.quiz.question}</h2>

            <div id="quizAnswers">
              {quiz?.quiz.answers?.map((data) => (
                <div key={data?.answer_id} className={`answer ${data.answer_id === answer?.answer_id ? 'selected' : ''}`}>
                  {data.text}
                  <button onClick={() => handleSelect( data)}>
                    {data.answer_id === answer?.answer_id ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))}
            </div>

            <button onClick={handleClick} disabled={isButtonDisabled} id="submitAnswerBtn">
              Submit answer
            </button>

            {quiz.message && <div className="success-message">{quiz.message}</div>}
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  answer: state.answer,
  message: state.message,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuiz: () => dispatch(fetchQuiz()),
  postAnswer: (answer) => dispatch(postAnswer(answer)),
  setIsButtonDisabled: (isDisabled) => dispatch({ type: 'SET_IS_BUTTON_DISABLED', payload: isDisabled }),
  setAnswer: (answer) => dispatch({ type: 'SET_ANSWER', payload: answer }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
