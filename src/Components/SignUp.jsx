import React from "react";

function SignUp() {

  return (
    <>
      <div className="border border-danger rounded-5 w-50 mx-auto my-3 p-2 bg-pink">
        <form>
          <h3 className='text-center mb-3'>Sign-Up Here</h3>
          <div className='inp'>
            <label className='inpLable' htmlFor="name">Name</label>
            <input autoComplete='on' type="text" name="name" id="name" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="phoneNo">Phone No.</label>
            <input type="tel" name="phoneNo" id="phoneNo" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="address">Address</label>
            <input type="text" name="address" id="address" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="password">Password</label>
            <input type="text" name="password" id="password" />
          </div>

          <div className='d-flex justify-content-center'>
            <button type='submit' id='signUp' className='btn btn-primary '>Sign-Up</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
