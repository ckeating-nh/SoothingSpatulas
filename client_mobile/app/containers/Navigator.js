import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';

import Main from './Main';
import Login from './Login';
import Profile from './Profile'

const mapStateToProps = ({ loginReducer }) => ({ loginReducer });

class Navigator extends Component {
  render() {
    const {loginReducer} = this.props;
    // console.log('Navigator props: ', this.props);

    return (
      loginReducer ? <Main /> : <Login />
       // <Main />
       // loginReducer ? <Profile /> : <Login />
       // <Profile />
    );
  }
}

export default connect(mapStateToProps, {})(Navigator);
