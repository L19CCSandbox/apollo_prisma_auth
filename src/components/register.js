import React from 'react';
import useForm from 'react-hook-form';
import {useMutation} from '@apollo/react-hooks';
import REGISTER from '../graphql/registerUser.mutation';

export default function Register() {
    const {register, handleSubmit, errors} = useForm();
    const [registerUser, {loading, error}] = useMutation(REGISTER, {
          onCompleted({register}){
          console.log(register)
      }
    });
    const onSubmit = values => {
        registerUser({variables: {...values}})
        .catch(err => {
            console.log(err);
        });
    }

    if(loading){
        return <p>...loading</p>
    }

  return (
    <div>
      <h1>Register</h1>
      <form className='flexColumn' onSubmit={handleSubmit(onSubmit)}>
          {error && <p style={{color: 'red'}}>An error occured while registering</p>}
          <input name="username" placeholder="Username" ref={register({required: true})}/>
          {errors.username && 'Username is required'}
          <input name="name" placeholder="Name" ref={register({required: true})}/>
          {errors.name && 'Name is required'}
          <input name="password" type="password" placeholder="Password" ref={register({required: true})}/>
          {errors.password && 'Password is required'}
          <input className='button' type="submit"/>
      </form>
    </div>
  )
}
