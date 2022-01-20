import { Card, CardHeader } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UseRegister from '../../hooks/UseRegister';

const Register = () => {

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  const { error, sendRegPostRequest } = UseRegister()

  const [err, setErr] = useState('')

  const errHandeler = () => {
    console.log(error);
    if (error !== null)
      error.includes('"') ? setErr(error.replace(/["]+/g, '')) : setErr(error)
  }

  const themeSlice = useSelector(state => state.theme)

  const dynamicText = { color: themeSlice === false ? 'white' : 'black' }

  const firstnameRef = useRef('')
  const lastnameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const verifypasswordRef = useRef('')

  const loginHandler = (e) => {
    e.preventDefault()
    if (passwordRef.current.value.length < 10 || verifypasswordRef.current.value.length < 10){
      setErr('Short password!')
    }
    if (passwordRef.current.value !== verifypasswordRef.current.value){
      setErr('Passwords must equal!')
    }
    if (!emailRef.current.value.match(emailReg)){
      setErr('Email is not valid!')
    }
      if (firstnameRef.current.value &&
        lastnameRef.current.value &&
        emailRef.current.value &&
        passwordRef.current.value &&
        verifypasswordRef.current.value) {

        const enteredFirstName = firstnameRef.current.value;
        const enteredLastName = lastnameRef.current.value;
        const enteredEmail = emailRef.current.value;
        const enteredpassword = passwordRef.current.value;
        const enteredverifyPassword = verifypasswordRef.current.value;
        sendRegPostRequest({
          first_name: enteredFirstName,
          last_name: enteredLastName,
          email: enteredEmail,
          password: enteredpassword,
          verifyPassword: enteredverifyPassword,
          country: 'Israel',
        })
      } else {
        // setErr('You must feel all the fields!')
      }
  }

  useEffect(() => errHandeler(), [error]);

  return (
    <div className='pokemon-container animate__animated animate__backInLeft'>
      <div className='layout'>
        <Card style={{ backgroundColor: themeSlice === false ? 'rgb(12, 12, 12)' : 'rgb(227, 236, 243)' }} className='card auth'>
          <CardHeader
            title={
              <img className='imgAuth' src="https://fontmeme.com/permalink/220107/83e50e863259698fe2cf590b7b9e9d16.png" alt="pokemon-font" />} />

          <section>

            <form onSubmit={loginHandler} onBlur={errHandeler}>
              <div className='wrapper inp'>
                <p style={dynamicText}>*Make sure that your password is at least 10 characters</p>
                <label className='first labl' style={dynamicText} htmlFor='firstname'>First Name</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={firstnameRef} type='text' id='firstname' />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='lastname'>Last Name</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={lastnameRef} type='text' id='lastname' />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='email'>Your Email</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={emailRef} type='email' id='email' />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='password'>Your Password</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={passwordRef} type='password' />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='password'>Verify Password</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={verifypasswordRef} type='password' />
              </div>
              <div>
                <p style={{ color: 'red' }}>{err}</p>
                <button style={{ zIndex: '999' }} className='btn btn-danger buttn'>Register</button>
              </div>
              <div>
                <Link to='/login'>
                  <p className='newhere buttn' style={dynamicText}>Already here? Log in with an existing account</p>
                </Link>
              </div>
            </form>
          </section>

        </Card>
      </div>
    </div>
  );
}

export default Register;