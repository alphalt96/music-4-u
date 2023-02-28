import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io'

import backgroundVideo from '../assets/background.mp4'

type FormErrors = {
  emailError: string | null;
  passwordError: string | null;
}

const inputStyleNormal = 'font-poppins text-white outline-none font-bold font-semibold py-1 px-2 my-3 rounded-sm focus:outline-green2 bg-zinc-800'
const inputStyleError = 'font-poppins text-white outline-none font-bold font-semibold py-1 px-2 my-3 rounded-sm bg-zinc-800 border-red-500 border-2'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({
    emailError: null,
    passwordError: null
  });

  const onChangeFieldInputs = (e: any) => {
    if (e.target.name === 'email') {
      const value = e.target.value;
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if (!regex.test(value)) {
        setErrors({
          ...errors,
          emailError: 'Email is invalid.'
        });
      } else {
        setErrors({
          ...errors,
          emailError: null
        });
      }
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleLoginSubmit = (e: any) => {
    const existingUser = localStorage.getItem('user');

    if (existingUser) localStorage.removeItem('user');

    const isValid = false;

    localStorage.setItem('user', JSON.stringify({
      email
    }));

    navigate('/')

    e.preventDefault();
  }

  return (
    <div className="flex relative h-full w-full justify-center items-center">
      <div className="w-full h-full absolute">
        <video className="w-full h-full object-cover" src={backgroundVideo} autoPlay muted loop />
      </div>
      <div className="absolute top-5 left-5">
        <Link to={'/'} >
          <IoMdArrowBack className="text-gray4" fontSize={30} />
        </Link>
      </div>
      <div className="w-2/5 z-10 px-6 py-10 rounded-lg backdrop-blur-2xl">
        <form
          className="flex flex-col w-400"
          onSubmit={handleLoginSubmit}
        >
          <label className="font-poppins text-gray4">Email</label>
          <input
            name="email"
            type="text"
            value={email}
            className={(email && errors.emailError) ? inputStyleError : inputStyleNormal}
            onChange={onChangeFieldInputs}
          />
          {(email && errors.emailError) && (
            <p
              className="text-red-500"
            >{errors.emailError}</p>
          )}
          <label className="font-poppins text-gray4">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            className={(password && errors.passwordError) ? inputStyleError : inputStyleNormal}
            onChange={onChangeFieldInputs}
          />
          <button
            type="submit"
            className="font-poppins bg-green2 text-gray4 py-1 mt-5 hover:shadow-md hover:text-white hover:bg-green-600 rounded-sm"
          >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
