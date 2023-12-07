import React from 'react';


function Login() {



  return (
    <>
      <div className="border border-danger rounded-5 w-50 m-auto my-3 p-2 bg-pink">
        <form method='post'>
          <h3 className='text-center mb-5'>Login Here</h3>


          <div className='inp'>
            <label className='inpLable' htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <div className='d-flex justify-content-center'>
            <button type='submit' id='login' className='btn btn-primary '>Login</button>
          </div>
          <div>
            <p className='mt-3 text-center'>Use :- Id - test@example.com & Password - test for login</p>
            <p className='mt-3 fw-bold text-center'>OR</p>
          </div>
          <div className='d-flex justify-content-center'>

            <button type='submit' id='login' className='btn btn-success '>Register</button>
          </div>

        </form>
      </div>
    </>
  );
}

export default Login;
