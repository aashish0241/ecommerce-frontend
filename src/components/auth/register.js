import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImg from '../../assets/register.png';
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice';
import Card from '../card/Card';
import style from './auth.module.scss';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const {  isError, isSuccess , isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password, cpassword } = formData;

  const registerUser = async (e) => {
    e.preventDefault();
    window.localStorage.setItem("login" , true)

    if (!isEmailValid(email)) {
      return toast.error('Please enter a valid email address', { toastStyle: { fontSize: '20px' } });
    }

    if (!password || password.length < 8 || password !== cpassword) {
      return toast.error('Password must be at least 8 characters and match the confirm password', { toastStyle: { fontSize: '20px' } });
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      await dispatch(register(userData));

     
    } catch (error) {
      toast.error('Registration failed', { toastStyle: { fontSize: '20px' } });
    }
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/');
      window.localStorage.setItem("isLoggedIn", true);
      toast.success('Registration successfully', { toastStyle: { fontSize: '20px' } });
    }
    dispatch(RESET_AUTH());
    
  }, [isSuccess, isLoggedIn, dispatch, navigate]);
  useEffect(()=>{
    if (isError) {
      toast.error('Registration Fail , Try Again', { toastStyle: { fontSize: '20px' } });
      
  }
  },[isError ])
  


  return (
    <>
      <section className={`container ${style.auth}`}>
        <ToastContainer toastStyle={{ fontSize: '20px' }} bodyStyle={{ fontSize: '20px' }} />
        <div className="flex justify-center items-center h-screen bg-slate-100">
  <div className="container p-6 rounded-md shadow-2xl">

        <Card className="ml-0">
          <div className={style.form}>
            <h2 className='text-2xl font-bold mb-4'>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Enter your Name"
                required
                value={name}
                name="name"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Enter your Email"
                required
                value={email}
                name="email"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                name="password"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Confirm your password"
                required
                value={cpassword}
                name="cpassword"
                onChange={handleInputChange}
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
            Register
          </button>
            </form>
            <span className={style.register}>
              Already have an Account? <Link to="/login">Login Here</Link>
            </span>
          </div>
        </Card>
        </div></div>
        <div className={style.img}>
          <img src={loginImg} alt="image" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
