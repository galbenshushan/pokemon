import { Card, CardHeader } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UseLogin from '../../hooks/UseLogin';
import './auth.css'

const Login = () => {

  const { error, sendPostRequest } = UseLogin()

  const [err, setErr] = useState('')

  const errHandeler = () => {
    if (error !== null)
      error.includes('"') ? setErr(error.replace(/["]+/g, '')) : setErr(error)
  }

  const themeSlice = useSelector(state => state.theme)

  const dynamicText = { color: themeSlice === false ? 'white' : 'black' }

  const emailRef = useRef('')

  const passwordRef = useRef('')

  const loginHandler = (e) => {
    e.preventDefault()
    if (emailRef.current.value && passwordRef.current.value) {
      const enteredEmail = emailRef.current.value;
      const enteredpassword = passwordRef.current.value;
      sendPostRequest({
        email: enteredEmail,
        password: enteredpassword
      })
    }
  }

  useEffect(() => errHandeler(), [error]);

  return (
    <div className='pokemon-container animate__animated animate__backInLeft'>
      <div className='layout'>
        <Card style={{ backgroundColor: themeSlice === false ? 'rgb(12, 12, 12)' : 'rgb(227, 236, 243)' }} className='card auth'>
          <CardHeader
            title={
              <img className='imgAuth' src="https://fontmeme.com/permalink/220107/260098703c02964d6483fed739f59028.png" alt="pokemon-font" />} />
          <section >
            <form onSubmit={loginHandler}>
              <div className='wrapper inp'>
                <label className='first labl' htmlFor='email' style={dynamicText} >Your Email</label>
                <input
                  style={{
                    backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                    color: themeSlice === false ? 'white' : 'black'
                  }}
                  className='second  float-input'
                  ref={emailRef}
                  type='email'
                  placeholder='email'
                  onBlur={errHandeler}
                />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' htmlFor='password' style={dynamicText} >Your Password</label>
                <input
                  style={{
                    backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                    color: themeSlice === false ? 'white' : 'black'
                  }}
                  className='second float-input'
                  ref={passwordRef}
                  type='password'
                  placeholder='password'
                  onBlur={errHandeler}
                />
              </div>
              <div>
                <p style={{ color: 'red' }}>{err}</p>
                <button style={{ zIndex: '999' }} className='btn btn-danger buttn'>Login</button>
              </div>
              <div>
                <Link to='/register'>
                  <p className='newhere buttn' style={dynamicText}>New here? Create a new account</p>
                </Link>
              </div>
            </form>
          </section>
        </Card>
      </div>
    </div>

  );
}

export default Login;