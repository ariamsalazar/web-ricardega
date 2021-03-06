import React, { Fragment } from 'react';
import propTypes from 'prop-types';

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center'
  },
  btn: {
    width: '90%',
    height: '30px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    font: '16px/30px sans-serif',
    color: 'rgba(255,255,255,0.8)',
    
  },
  left: {
    left: '0'
  },
  right: {
    right: '0'
  }
}

export default function Buttons (props) {
  const { index, total, loop, prevHandler, nextHandler } = props;
  return (
    <Fragment>
      { (loop || index !== total - 1) && (
        <div className="logo-fixed no-mobile"></div>
      )}
      { (loop || index !== 0) && (
        <div className="logo-fixed white no-mobile"></div>
      )}
      <div style={styles.wrapper}>
        { (loop || index !== 0) && (
          <Fragment>
            {/* <span> {leng('home.title')}</span>  */}
            <div className="fixed-right">About / Contact   </div>
            <div className="line-right"></div>
            <div className="prev-style" onClick={prevHandler}>Work </div>
          </Fragment>
        )}
        { (loop || index !== total - 1) && (
          <Fragment>
              <div className="fixed-left">Work </div>
              <div className="line-left"></div>
              <div className="next-style" onClick={nextHandler}>About / Contact</div>
          </Fragment>
          
        )}
      </div>
    </Fragment>
  )
}

Buttons.propTypes = {
  index: propTypes.number.isRequired,
  total: propTypes.number.isRequired,
  prevHandler: propTypes.func,
  nextHandler: propTypes.func
}