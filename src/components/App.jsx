import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import List from './List';
import EmptyPage from './EmptyPage';
import TabBar from './TabBar';
import ItemShow from './ItemShow';
import Info from './Info';
import AnimatedSwitch from './AnimatedSwitch';

class App extends Component {
  state = {
    wines: [],
    isOnline: null,
  };

  componentDidMount() {
    this.getData();
    this.setListenerOnlineStatus(); //в момент рендера устанавливаем обработчики, которые проверяют статус (онлайн/офлайн)
    this.updateOnlineStatus(); //проверить и установить статус (онлайн/офлайн)
  }

  getData = () => {
    fetch('https://api-wine.herokuapp.com/api/v2/wines')
      .then(res => res.json())
      .then(data => {
        this.setState({ wines: data });
      })
  };

  setListenerOnlineStatus() {
    window.addEventListener('online', this.updateOnlineStatus); //обработчик переключения на онлайн
    window.addEventListener('offline', this.updateOnlineStatus); //обработчик переключения на офлайн
  }

  updateOnlineStatus = () => {
    this.setState({ isOnline: navigator.onLine });
  };

  renderContent() {
    if (!this.state.wines.length) {
      return <div />;
    }
    return (
      <Fragment>
        <AnimatedSwitch>
          <Route exact path="/" component={() => <List items={this.state.wines} />} />
          <Route path="/wine/:id" component={() => <ItemShow items={this.state.wines} />} />
          <Route path="/wishlist" component={EmptyPage} />
          <Route path="/cellar" component={EmptyPage} />
          <Route path="/articles" component={EmptyPage} />
          <Route path="/profile" component={EmptyPage} />
        </AnimatedSwitch>
        <TabBar />
      </Fragment>
    );

  }

  render() {
    return (
      <Router>
        <Fragment>
          {!this.state.isOnline ? <Info text='Is offline'></Info> : null}
          {this.renderContent()}
        </Fragment>
      </Router>
    );
  }
}

export default App;
