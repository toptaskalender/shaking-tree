import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FALLING_DURATION, WAITING_DURATION } from '../../../../shared/config'; // I use these times for calculating the 'collectingDelay' for each apple
import apple from '../../../../assets/images/apple.svg';
import * as actions from '../../../../store/actionCreators';

import styles from './Apple.module.css';

class Apple extends Component {
  // I did check this equality to ensure that unexpected behaviours are not going to happen.
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.didFall !== nextProps.didFall;
  }

  // onFall event happens when one of the apples has been updated and has 'true' value for didFall property. In actionCreators, I use the 'id' and 'collectingDelay' in an asynchronous way for removing the apples from the ground and putting them into the basket
  componentDidUpdate() {
    const collectingDelay =
      this.props.fallingDelay + FALLING_DURATION + WAITING_DURATION;
    if (this.props.didFall) {
      this.props.onFall(this.props.id, collectingDelay);
    }
  }

  render() {
    const didFall = this.props.didFall ? styles['falling-animation'] : '';

    return (
      <img
        src={apple}
        alt="apple"
        className={`${styles.apple} ${didFall}`}
        style={{
          left: this.props.left,
          top: this.props.top,
          animationDuration: `${FALLING_DURATION}s`,
          animationDelay: `${this.props.fallingDelay}s`,
          position: this.props.inBasket ? 'static' : 'absolute', // I implemented this for positioning the apples in basket easily.
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFall: (id, collectingDelay) =>
      dispatch(actions.startCollectingTheApples(id, collectingDelay)),
  };
};

export default connect(null, mapDispatchToProps)(Apple);
