import { useEffect } from 'react';
import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const {
    formState,
    formState: { errors },
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

  const calculateScore = React.useCallback((data) => {
    let questionScore = 0;
    if (data.question) {
      for (let i = 1; i <= 5; i += 1) {
        const score = data.question[i]?.score;
        if (score) {
          questionScore += Number(score);
        }
      }
    }
    return questionScore;
  }, []);

  const calculateRisk = React.useCallback((data) => {
    if (data.question) {
      const score = calculateScore(data);

      if (score === 0 || score === 1) {
        return `Low`;
      } else if (score === 2 || score === 3) {
        return `Medium`;
      } else if (score >= 4) {
        return `High`;
      }
    }

    return `Low`;
  }, [ calculateScore ]);

  const instrumentType = `Cat Behavioral Instrument`;
  const watchedFields = watch();

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [ formState, reset ]);

  useEffect(() => {
    register(`score`);
    setValue(`score`, calculateScore(watchedFields));
    register(`riskLevel`);
    setValue(`riskLevel`, calculateRisk(watchedFields));
    setValue(`instrumentType`, instrumentType);
  }, [ register, setValue, watchedFields, calculateScore, calculateRisk, instrumentType ]);

  const inlineStyles = {
    formGroup: {
      backgroundColor: `#F7FAFC`,
      borderRadius: `5px`,
      marginBottom: `10px`,
      padding: `15px`,
    },
    formText: {
      color: `#2D3748`,
      fontFamily: `Arial, sans-serif`,
      fontSize: `16px`,
      marginBottom: `10px`,
    },
    submitButton: {
      backgroundColor: `#3182CE`,
      border: `none`,
      borderRadius: `5px`,
      color: `#FFFFFF`,
      cursor: `pointer`,
      marginTop: `10px`,
      padding: `10px 20px`,
    },
  };

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Text {...register(`instrumentType`)} style={inlineStyles.formText}>{instrumentType}</Form.Text>

    <Form.Text {...register(`score`)} style={inlineStyles.formText}>{calculateScore(getValues())}</Form.Text>
    <Form.Text {...register(`riskLevel`)} style={inlineStyles.formText}>{calculateRisk(getValues())}</Form.Text>

    <Form.Group className="mb-3" controlId="formCatName" style={inlineStyles.formGroup}>
      <Form.Label>Cat's Name</Form.Label>
      <Form.Control placeholder="Cat's name" name="catName" {...register(`catName`, { required: true })} />
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
        name="question[1].score"
        label="No (score = 0)"
        value="0"
        {...register(`question[1].score`)}
      />
      <Form.Check
        type="radio"
        id="question-1-score-1"
        name="question[1].score"
        label="Yes (score = 1)"
        value="1"
        {...register(`question[1].score`)}
      />
    </Form.Group>

    <Form.Group>
      <Form.Text>2. Physical altercations with other cats</Form.Text>
      <Form.Check
        type="radio"
        id="question-2-score-0"
        name="question[2].score"
        label="0-3 altercations (score = 0)"
        value="0"
        {...register(`question[2].score`)}
      />
      <Form.Check
        type="radio"
        id="question-2-score-1"
        name="question[2].score"
        label="3+ altercations (score = 1)"
        value="1"
        {...register(`question[2].score`)}
      />
    </Form.Group>

    <Form.Group>
      <Form.Text>3. Physical altercations with owner (scratching, biting, etc...)</Form.Text>
      <Form.Check
        type="radio"
        id="question-3-score-0"
        name="question[3].score"
        label="0-10 altercations (score = 0)"
        value="0"
        {...register(`question[3].score`)}
      />
      <Form.Check
        type="radio"
        id="question-3-score-1"
        name="question[3].score"
        label="10+ altercations (score = 1)"
        value="1"
        {...register(`question[3].score`)}
      />
    </Form.Group>

    <Form.Group>
      <Form.Text>4. Plays well with dogs</Form.Text>
      <Form.Check
        type="radio"
        id="question-4-score-0"
        name="question[4].score"
        label="Yes (score = 0)"
        value="0"
        {...register(`question[4].score`)}
      />
      <Form.Check
        type="radio"
        id="question-4-score-1"
        name="question[4].score"
        label="No (score = 1)"
        value="1"
        {...register(`question[4].score`)}
      />
    </Form.Group>

    <Form.Group>
      <Form.Text>5. Hisses at strangers</Form.Text>
      <Form.Check
        type="radio"
        id="question-5-score-0"
        name="question[5].score"
        label="No (score = 0)"
        value="0"
        {...register(`question[5].score`)}
      />
      <Form.Check
        type="radio"
        id="question-5-score-1"
        name="question[5].score"
        label="Yes (score = 1)"
        value="1"
        {...register(`question[5].score`)}
      />
    </Form.Group>

    <Button variant="primary" type="submit" >Submit</Button>
  </Form>;

};
