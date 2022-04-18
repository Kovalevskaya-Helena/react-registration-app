import React from 'react';
import { CheckboxGroup } from '../Checkbox';
import {genderOptions, FILTER_STATUSES} from '../options'
import css from './form.module.css'
import {Modal} from '../Modal';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { RegistrationDataCtx } from '../Ctx';



export class Form extends React.Component{
  state={
    values:{
      login:'',
      password:''},
    gender:FILTER_STATUSES.FEMALE,
    checked:true,
    isModalVisible:false,
    errors:{
      errorLogin:'',
      errorPassword:''}
  }
  

  inputChangeHandler=(event)=>{
    this.setState((prevState)=>({
      values:{
        ...prevState.values,[event.target.name]: event.target.value
      }, errors:{
        ...prevState.errors,[event.target.name]: ''
      }
    }))
  }

  changeRadioHandler=(event)=>{this.setState({gender:event.target.value})}
  handleCheckboxChange=(event)=>{this.setState({ checked: event.currentTarget.checked })}
  modalCloseHandler = () => { this.setState({ isModalVisible: !this.state.isModalVisible}) };
 clickHandler=()=>{
    const isValid=this.state.values.login>4&&this.state.values.password>5
    this.setState((prevState)=>({isModalVisible:isValid,
    errors:{
      login:this.state.values.login>4?'':"Минимальная длинна 5 символов",
      password:this.state.values.password>4?'':"Минимальная длинна 5 символов"
    }}))
  }
  keyPressHandler=(event)=>{
    if(event.keyCode===27){
      this.modalCloseHandler()
    }
  }
  componentDidMount() {
    const body = document.querySelector("body");
    body.addEventListener("keyup", this.keyPressHandler);
  }
  componentWillUnmount() {
    const body = document.querySelector("body");
    body.removeEventListener("keyup", this.keyPressHandler);
  }


  

  render(){
    const {values,gender,checked,isModalVisible,errors}=this.state;
    return(
      <div className={css.form}>
        <RegistrationDataCtx.Provider value={this.state.values}>
        <div className={css.wrapper}>
          <header className={css.header}>
          <h1 className={css.headering}>Hello there!</h1>
         <span className={css.subheadering}>Want to sign up fill out to form!</span>
          </header>
          <div className={css.inputcontainer}>
            <input className={css.input} name='login' type='text'placeholder="Login" value={values.login} onChange={this.inputChangeHandler}/>
           {errors.login&& <div>{errors.login}</div>}
          <input className={css.input} name='password' type='password'placeholder="Password" value={values.password} onChange={this.inputChangeHandler}/>
         {errors.password&& <div>{errors.password}</div>}
          </div>
          
          <label>
            <div className={css.radio}>
        <CheckboxGroup options={genderOptions} value={gender} onChange={this.changeRadioHandler} />
      </div>
      </label>
      <label>
        <input className={css.radio} type="checkbox" checked={checked} onChange={this.handleCheckboxChange}/>
        <span className={css.checkbox}>I wish to subscribe to the newsletter</span>
      </label>
      <button type='button' className={css.button} onClick={this.clickHandler} >Sign in</button>
     <ErrorBoundary>{isModalVisible && (<Modal  gender={gender}
     modalCloseHandler={this.modalCloseHandler} />)}</ErrorBoundary>
        </div>
        </RegistrationDataCtx.Provider>
      </div>
    )
  }
}