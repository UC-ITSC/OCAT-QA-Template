import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { UserService } from '../../services/UserService';

export const Login = () => {
  const {
    formState,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }

  }, [ formState, reset ]);

  const onSubmit = async (data) => {
    await UserService.login(data);

  };

  return <div>
    <h1>Login</h1>
    <hr />
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control placeholder="username"
          {...register(`username`, { required: true })} />
        {errors.username && <span>Username required</span>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control placeholder="password"
          {...register(`password`, { required: true })} />
        {errors.password && <span>Password required</span>}
      </Form.Group>

      <Button variant="primary" type="submit" >Submit</Button>

    </Form>
  </div>;
};
