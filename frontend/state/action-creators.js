import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE,  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE, POST_QUIZ_REQUEST, POST_QUIZ_SUCCESS, POST_QUIZ_FAILURE, INPUT_CHANGE, RESET_FORM } from "./action-types";
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer() { }

export function setMessage() { }

export function setQuiz() { }

export function inputChange(name, value) {
  return {
    type: INPUT_CHANGE,
    payload: { name, value },
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch(err => console.log(err));
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', answer)
      .then(res => {
        dispatch({ type: SET_SELECTED_ANSWER, payload: res.data });
        dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message });
      })
      .catch(() => {
        dispatch({ type: SET_INFO_MESSAGE, payload: 'Incorrect answer submitted!' });
      });
  }
}


export function postQuiz(newForm) {
  return function (dispatch) {
    // Dispatch request action
    dispatch({ type: POST_QUIZ_REQUEST });

    // Make the POST request
    axios.post('http://localhost:9000/api/quiz/new', {
      question_text: newForm.newQuestion,
      true_answer_text: newForm.newTrueAnswer,
      false_answer_text: newForm.newFalseAnswer,
    })
      .then((response) => {
        // Dispatch success action with response data
        dispatch({ type: POST_QUIZ_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        // Dispatch failure action with error message
        dispatch({ type: POST_QUIZ_FAILURE, payload: error.message });
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
