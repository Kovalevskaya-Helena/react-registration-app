import React from 'react';
import ReactDOM  from 'react-dom';
import css from './modal.module.css'
import PropTypes from "prop-types";
import { RegistrationDataCtx } from '../Ctx';

export class Modal extends React.Component{
  static contextType=RegistrationDataCtx;
  
  render(){
    
    const body = document.querySelector('body');
    const Modal = (
    <div className={css.modal} >
      <p>Confirm your details:</p>
        <p >Login:{this.context.login}</p>
        <p >Password:{this.context.password}</p>
        <p >Gender:{this.props.gender}</p>
    
        <button className={css.button} type="button" onClick={this.props.modalCloseHandler}>OK</button>
    </div>);
    return ReactDOM.createPortal(Modal,body);
  }

}

Modal.propTypes={
  login:PropTypes.string,
  password:PropTypes.number
}