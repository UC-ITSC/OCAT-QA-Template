import { useEffect } from 'react';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const {
    formState,
    formState: { errors, isSubmitSuccessful },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
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

      return questionScore;
    }

    return <span>{questionScore}</span>;

  };

  const calculateRisk = (data) => {
    if (data.question) {
      const score = calculateScore(data);

      if (score === 0 || score === 1) {
        return `Low`;
      }
      else if (score === 2 || score === 3) {
        return `Medium`;
      }

      else if (score >= 4) {
        return `High`;
      }

    }

    return `Low`;

  };

  const instrumentType = `Cat Behavioral Instrument`;
  const watchQuestionChecks = watch(`question`);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [ formState, reset ]);

  useEffect(() => {
    if (watchQuestionChecks) {
      register(`score`);
      setValue(`score`, calculateScore(getValues()));
      register(`riskLevel`);
      setValue(`riskLevel`, calculateRisk(getValues()));
      setValue(`instrumentType`, instrumentType);
    }
  }, [ calculateRisk, calculateScore, getValues, register, setValue, watchQuestionChecks ]);

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Text {...register(`instrumentType`)}>{instrumentType}</Form.Text>

    <Form.Text {...register(`score`)}>{calculateScore(getValues())}</Form.Text>
    <Form.Text {...register(`riskLevel`)}>{calculateRisk(getValues())}</Form.Text>

    <Form.Group className="mb-3" controlId="formCatName">
      <Form.Label>Cat's Name</Form.Label>

      <Form.Control placeholder="Cat's name"
        name="catName"
        {...register(`catName`, { required: true })} />
      {errors.catName && <span>This field is required</span>}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formCatBirth">
      <Form.Label>Cat's Date of Birth</Form.Label>
      <input type="date" placeholder="Cat's date of birth" {...register(`catBirth`,
        { required: true, valueAsDate: true })} />
      {errors.catBirth && <span>This field is required</span>}
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

    <Button variant="primary" type="submit" >Submit</Button>
  </Form>;
};
