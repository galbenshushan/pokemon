import { Card, CardHeader } from '@mui/material';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UseRegister from '../../hooks/UseRegister';

const Register = () => {

  const themeSlice = useSelector(state => state.theme)

  const dynamicText = { color: themeSlice === false ? 'white' : 'black' }

  const { sendRegPostRequest } = UseRegister()
  const firstnameRef = useRef('')
  const lastnameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const verifypasswordRef = useRef('')

  const loginHandler = (e) => {
    e.preventDefault()
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
      country: 'placeholder',
    })
  }

  return (

    <div className='pokemon-container'>
      <div className='layout'>
        <Card style={{ backgroundColor: themeSlice === false ? 'rgb(12, 12, 12)' : 'rgb(227, 236, 243)' }} className='card auth'>
          <CardHeader
            title={
              <img className='imgAuth' src="https://fontmeme.com/permalink/220107/83e50e863259698fe2cf590b7b9e9d16.png" alt="pokemon-font" />} />

          <section>

            <form onSubmit={loginHandler}>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='firstname'>First Name</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={firstnameRef} type='text' id='firstname' required />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='lastname'>Last Name</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={lastnameRef} type='text' id='lastname' required />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='email'>Your Email</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={emailRef} type='email' id='email' required />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='password'>Your Password</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={passwordRef} type='password' id='password' required />
              </div>
              <div className='wrapper inp'>
                <label className='first labl' style={dynamicText} htmlFor='password'>Verify Password</label>
                <input className='second  float-input' style={{
                  backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
                  color: themeSlice === false ? 'white' : 'black'
                }}
                  ref={verifypasswordRef} type='password' id='password' required />
              </div>
              <div>
                <button className='btn btn-danger buttn'>Register</button>
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