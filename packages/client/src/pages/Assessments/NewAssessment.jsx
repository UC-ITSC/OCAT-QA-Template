import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  const calculateScore = (data) => {
    let questionScore = 0;
    if (data.question) {
      data.question.forEach((_question) => {
        _question.score.forEach((_score, index) => {
          if (_score === `on`) {
            questionScore += index;
          }
        });
      });

      return questionScore.toString();
    }

    return `0`;

  };

  // TODO figure out scoring
  // TODO figure out clearing values on submit
  return <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Text>Cat Behavioral Instrument</Form.Text>

    <Form.Group className="mb-3" controlId="formCatName">
      <Form.Label>Cat's Name</Form.Label>
      <Form.Control placeholder="Cat's name"
        name="catName"
        {...register(`catNameRequired`, { required: true })} />
      {errors.catNameRequired && <span>This field is required</span>}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formCatBirth">
      <Form.Label>Cat's Date of Birth</Form.Label>
      <Form.Control placeholder="Cat's date of birth" {...register(`catBirthRequired`, { required: true })} />
      {errors.catBirthRequired && <span>This field is required</span>}
    </Form.Group>

    <Form.Group>
      <Form.Text>1. Previous contact with the Cat Judicial System</Form.Text>
      <Form.Check
        type="radio"
        id="question-1-score-0"
        name="question-1"
        label="No (score = 0)"
        value="1"
        {...register(`question.1.score.0`)}
      />
      <Form.Check
        type="radio"
        id="question-1-score-1"
        name="question-1"
        label="Yes (score = 1)"
        {...register(`question.1.score.1`)}
      />
    </Form.Group>

    <Form.Group>
      <Form.Text>2. Physical altercations with other cats</Form.Text>
      <Form.Check
        type="radio"
        id="question-2-score-0"
        name="question-2"
        label="0-3 altercations (score = 0)"
        {...register(`question.2.score.0`)}
      />
      <Form.Check
        type="radio"
        id="question-2-score-1"
        name="question-2"
        label="3+ altercations (score = 1)"
        {...register(`question.2.score.1`)}
      />
    </Form.Group>

    <Form.Group>
      <Form.Text>3. Physical altercations with owner (scratching, biting, etc...)</Form.Text>
      <Form.Check
        type="radio"
        id="question-3-score-1"
        name="question-3"
        label="10+ altercations (score = 1)"
        {...register(`question.3.score.1`)}
      />
      <Form.Check
        type="radio"
        id="question-3-score-0"
        name="question-3"
        label="0-10 altercations (score = 0)"
        {...register(`question.3.score.0`)}
      />
    </Form.Group>

    <Form.Group>
      <Form.Text>4. Plays well with dogs</Form.Text>
      <Form.Check
        type="radio"
        id="question-4-score-1"
        name="question-4"
        label="No (score = 1)"
        {...register(`question.4.score.1`)}
      />
      <Form.Check
        type="radio"
        id="question-4-score-0"
        name="question-4"
        label="Yes (score = 0)"
        {...register(`question.4.score.0`)}
      />
    </Form.Group>

    <Form.Group>
      <Form.Text>5. Hisses at strangers</Form.Text>
      <Form.Check
        type="radio"
        id="question-5-score-0"
        name="question-5"
        label="No (score = 0)"
        {...register(`question.5.score.0`)}
      />
      <Form.Check
        type="radio"
        id="question-5-score-1"
        name="question-5"
        label="Yes (score = 1)"
        {...register(`question.5.score.1`)}
      />
    </Form.Group>

    <Button {...register(`scoreRequired`)} onClick={() => {
      <span>{calculateScore(getValues())}</span>; }}>Get Score</Button>

    <Button variant="primary" type="submit" >Submit</Button>
  </Form>;
};
