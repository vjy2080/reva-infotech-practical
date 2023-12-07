import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

function Login() {

  const initFormValue = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [formValue, setFormValue] = useState(initFormValue);



  const simulateError = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    const { email, password } = formValue;


    const url = `http://localhost:3005/user?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        // console.log(data.length);
        (data.length > 0) ? navigate('/home') : setErrorMessage("Check email or password");
        localStorage.setItem('data', JSON.stringify(data));

      } else {
        // Handle the error
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <>
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <div className="border border-dark rounded-5 w-50 m-auto my-3 p-2 bg-pink">
        <form onSubmit={login} method='post'>
          <h3 className='text-center mb-5'>Login Here</h3>


          <div className='inp'>
            <label className='inpLable' htmlFor="email">Email</label>
            <input onChange={onChange} type="email" name="email" id="email" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="password">Password</label>
            <input onChange={onChange} type="password" name="password" id="password" />
          </div>

          <div className='d-flex justify-content-center'>
            <button type='submit' id='login' className='btn btn-primary' onClick={simulateError}>Login</button>
          </div>
          <div>
            <p className='mt-3 text-center'>Use :- Id - test@example.com & Password - test for login</p>
            <p className='mt-3 fw-bold text-center'>OR</p>
          </div>
          <div className='d-flex justify-content-center'>


            <Link to="/signUp" className='btn btn-info text-dark' id='login'>Register</Link>
          </div>

        </form>
      </div>
    </>
  );
}

export default Login;
