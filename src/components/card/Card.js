import React from 'react';
import styles from './Card.module.scss';
import Orderplace from '../Orderplace/Ortderplace';

const Card = ( {children , cardClass}) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>
                  {children}

    </div>
  )
}

export default Card