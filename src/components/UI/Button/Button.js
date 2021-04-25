import React from 'react';

import tree from '../../../assets/images/tree.svg';

import styles from './Button.module.css';

const Button = props => {
  const mouseEventHandler = e => {
    const btnContainer = e.target.closest(`.${styles['button-container']}`);
    const iconTree = btnContainer.querySelector(
      `.${styles['button-container__tree']}`
    );
    iconTree.classList.toggle(`${styles['shaking-animation']}`);
  };

  return (
    <div
      className={styles['button-container']}
      onClick={props.onClick}
      onMouseEnter={mouseEventHandler}
      onMouseLeave={mouseEventHandler}
    >
      <button type="button" className={styles['button-container__button']}>
        <span>Shake the </span>
      </button>
      <img
        src={tree}
        alt="icon-tree"
        className={styles['button-container__tree']}
      />
    </div>
  );
};

export default Button;
