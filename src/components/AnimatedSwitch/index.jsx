import React from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group"; // БИБЛОТЕКА ДЛЯ ПЛАВНЫХ АНИМАЦИЙ
import { Switch, withRouter } from 'react-router-dom';
import './style.scss';

export const withAnimatedWrapper = (WrappedComponent, componentProps = {}) => {
  return class extends Component {
    render() {
      return (
        <div className="AnimatedWrapper">
          <WrappedComponent {...this.props} {...componentProps} />
        </div>
      );
    }
  };
};

const AnimatedSwitch = withRouter(({ children, location }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500}
        classNames="fade"
      >
        <Switch location={location}>
          {children}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
});

export default AnimatedSwitch;
