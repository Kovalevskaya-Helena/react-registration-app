import React from 'react';
import css from './errorboundary.module.css'

export class ErrorBoundary extends React.Component{
  state={
    hasError:false,
  }
  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  render(){
    if (!this.state.hasError) {
      
      return this.props.children; 
    }
    return <div className={css.face}>
<div className={css.band}>
		<div className={css.red}></div>
		<div className={css.white}></div>
		<div className={css.blue}></div>
	</div>
	<div className={css.eyes}></div>
	<div className={css.dimples}></div>
	<div className={css.mouth}></div>
  <h1 className={css.desc}>Oops! Something went wrong!</h1>;
</div>
  }

}