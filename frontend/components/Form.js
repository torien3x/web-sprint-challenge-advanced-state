import React from 'react';
import { connect } from 'react-redux';
import { inputChange, resetForm, postQuiz } from '../state/action-creators';

export function Form(props) {
  const { form, inputChange, postQuiz } = props;

  const onChange = (evt) => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    // Dispatch postQuiz action with form data
    postQuiz(form);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        name="newQuestion"
        value={form.newQuestion}
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        name="newTrueAnswer"
        value={form.newTrueAnswer}
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        name="newFalseAnswer"
        value={form.newFalseAnswer}
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
     <button
  id="submitNewQuizBtn"
  disabled={
    !form.newQuestion.trim() ||
    !form.newTrueAnswer.trim() ||
    !form.newFalseAnswer.trim()
  }
>
  Submit new quiz
</button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  form: state.form,
});

const mapDispatchToProps = {
  inputChange,
  resetForm,
  postQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
