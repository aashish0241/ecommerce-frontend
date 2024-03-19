import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Loader.module.scss';
import loaderImg from '../../assets/loader.gif';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        
      </div>
    </div>,
    document.getElementById('loader')
  );
};
export const Spinner = () =>{
  return(
    <div className='--center-all'>
      <img src={loaderImg} alt='loading...'   width={50}   />

    </div>
  )
}

export default Loader;
