import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImg from '../../assets/login.png';
import { RESET_AUTH, login } from '../../redux/features/auth/authSlice';
import Card from '../card/Card';
import style from './auth.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, isSuccess, isLoggedIn } = useSelector((state) => state.auth);

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  

  const loginUser = async (e) => {
    e.preventDefault();


    if (!email || !password) {
      return toast.error('Please fill in all fields', { toastStyle: { fontSize: '20px' } });
    }

    if (!isEmailValid(email)) {
      return toast.error('Please enter a valid email address', { toastStyle: { fontSize: '20px' } });
    }

    const userData = {
      email,
      password,
    };
    

    try {
      await dispatch(login(userData));
      
      // Call Check only when the login is unsuccessful
      if (!isSuccess && !isLoggedIn) {
      
        toast.error('Login failed', { toastStyle: { fontSize: '20px' } });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Incorrect email or password', { toastStyle: { fontSize: '20px' } });
      } else {
        toast.error('Login failed', { toastStyle: { fontSize: '20px' } });
      }
    }

  };
   
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/');
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("login" , true);
      toast.success('Login successfully', { toastStyle: { fontSize: '20px' } });
    }
    dispatch(RESET_AUTH);
    
  }, [isSuccess, isLoggedIn, dispatch, navigate]);
  useEffect(()=>{
    if (isError && !isLoggedIn) {
      toast.error('Please Check Your Pasword and email', { toastStyle: { fontSize: '20px' } });
      
  }
  },[isError ])
 

  return (
    <section className={`container ${style.auth}`}>
      <ToastContainer toastStyle={{ fontSize: '20px' }} />
      <div className={style.img}>
        <img src={loginImg} alt="image" width="400" />
      </div>
      <div className="flex justify-center items-center h-screen pt-4 bg-slate-100">
  <div className="container p-6 rounded-md shadow-2xl">
    <Card style={{ fontSize: '18px' }}>
      <div className={style.form}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
            Login
          </button>
        </form>
        <span className={`${style.register} mt-4 block`}>
          Don't Have an account? <Link to="/register" className="text-blue-500">Register Here</Link>
        </span>
      </div>
    </Card>
  </div>
</div>



    </section>
  );
};

export default Login;
