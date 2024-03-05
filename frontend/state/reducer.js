// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM, POST_QUIZ_REQUEST, POST_QUIZ_SUCCESS, POST_QUIZ_FAILURE } from './action-types';

const initialWheelState = {
  activeCogIndex: 0
}
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return {
        ...state,
        activeCogIndex: (state.activeCogIndex + 1) % 6
      };
    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        activeCogIndex: (state.activeCogIndex + 5) % 6
      };
    default:
      return state;
  }
}

const initialQuizState = {
  quiz: null,
  answer: null,
  message: '',
  
}

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        quiz: action.payload,
        answer: null,
        message:""
      };
    case SET_SELECTED_ANSWER:
      return {
        ...state,
        answer:action.payload,
        message: action.payload,
      };
    case SET_INFO_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return action.payload;
      default:
        return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case RESET_FORM:
      return initialFormState;
    
      case POST_QUIZ_REQUEST:
        return {
          ...state,
          loading: true,
          successMessage: '',
          errorMessage: '',
        };
      case POST_QUIZ_SUCCESS:
        return {
          ...state,
          loading: false,
          successMessage: action.payload.message,
          newQuestion: '',
          newTrueAnswer: '',
          newFalseAnswer: '',
        };
      case POST_QUIZ_FAILURE:
        return {
          ...state,
          loading: false,
          errorMessage: action.payload,
        };
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
