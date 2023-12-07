import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddressInp from './AddressInp';

function SignUp() {
  const navigate = useNavigate();

  const initFormValue = {
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    password: "",
    position: "",
  };

  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  // console.log(selectedAddress);

  // console.log(selectedPosition);
  const onSelectAddress = (address, position) => {
    setSelectedAddress(address);
    setSelectedPosition(position);
  };

  const [formValue, setFormValue] = useState(initFormValue);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value, address: selectedAddress, position: selectedPosition });
    // setFormValue({ ...formValue, address: selectedAddress });
  };

  const signUp = async (e) => {
    e.preventDefault();

    // Fetch existing user emails
    const existingUsersResponse = await fetch('http://localhost:3005/user');

    const isInitFormValueEmpty = Object.values(formValue).some(value => value === '');

    if (!existingUsersResponse.ok) {
      console.error('Error fetching existing users');
      return;
    }

    try {
      const existingUsers = await existingUsersResponse.json();

      // Check if the email in formValue already exists
      const isEmailTaken = Array.isArray(existingUsers) && existingUsers.some(user => user.email === formValue.email);

      // Handle the case where the email already exists
      if (isEmailTaken) {
        console.error('Email is already taken');
      }
      else if (isInitFormValueEmpty) {
        console.error('Empty value is not valid');
      }
      else {
        // Email is not taken, proceed to send data to the API
        const response = await fetch('http://localhost:3005/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValue),
        });

        if (response.ok) {
          // Data sent successfully
          // const responseData = await response.json();
          // console.log(responseData.email);
          console.log('Registered successfully');
          navigate('/');

          // Handle responseData...
        } else {
          // Handle other error cases
          console.error('Error sending data to the API');
        }
      }
    } catch (error) {
      console.error('Error parsing existing user data', error);
    }
  };

  return (
    <>
      <div className="border border-dark rounded-5 w-50 mx-auto my-3 p-2 bg-pink">
        <form onSubmit={signUp}>
          <h3 className='text-center mb-3'>Sign-Up Here</h3>
          <div className='inp'>
            <label className='inpLable' htmlFor="name">Name</label>
            <input onChange={onChange} autoComplete='on' type="text" name="name" id="name" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="email">Email</label>
            <input onChange={onChange} autoComplete='on' type="email" name="email" id="email" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="phoneNo">Phone No.</label>
            <input onChange={onChange} autoComplete='on' type="tel" name="phoneNo" id="phoneNo" />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="address">Address</label>
            <AddressInp onSelectAddress={onSelectAddress} />
          </div>

          <div className='inp'>
            <label className='inpLable' htmlFor="password">Password</label>
            <input onChange={onChange} autoComplete='on' type="password" name="password" id="password" />
          </div>

          <div className='d-flex justify-content-center'>
            <button type='submit' id='signUp' className='btn btn-primary '>Sign-Up</button>
          </div>

          <p className='text-dark mt-3 fw-bold text-center'>Already Registered ?</p>
          <div className='d-flex justify-content-center'>
            <Link to="/">Login Here</Link>
          </div>

        </form>
      </div>
    </>
  );
}

export default SignUp;