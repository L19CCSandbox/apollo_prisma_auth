import React from 'react'
import useForm from 'react-hook-form';
import {useMutation} from '@apollo/react-hooks';
import LOGIN from '../graphql/login.mutation';

export default function Login() {
    const {register, handleSubmit, errors} = useForm();
    const [login, {loading, error}] = useMutation(LOGIN, {
            onCompleted({login}){
            console.log('info', login)
        }
    });
    const onSubmit = values => {
        login({variables: {...values}})
        .catch(err => {
            console.log(err);
        });
    }

    if(loading){
        return <p>...loading</p>
    }

  return (
    <div>
        <h1>Login</h1>
        <form className='flexColumn' onSubmit={handleSubmit(onSubmit)}>
            {error && <p style={{color: 'red'}}>Invalid username or password</p>}        
            <input name="username" placeholder="Username" ref={register({required: true})}/>
            {errors.username && 'Username is required'}
            <input name="password" type="password" placeholder="Password" ref={register({required: true})}/>
            {errors.password && 'Password is required'}
            <input className='button' type="submit"/>
        </form>
    </div>
  )
}
