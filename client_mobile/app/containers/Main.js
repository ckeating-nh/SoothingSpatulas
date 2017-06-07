import React, { Component } from 'react';
import { 
  Alert, 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  PermissionsAndroid, 
  Platform, 
  TextInput 
} from 'react-native';
import { connect } from 'react-redux';

import { getTextComments } from '../Network.js';

/* ----------------------------------
       Import Redux Actions
---------------------------------- */
import {
  updateLogout,
  updateUsername,
  updateUserid,
  openCheckIn,
  closeCheckIn,
  updateTextCommentsDB
} from '../Actions.js';

/* ----------------------------------
         Import Components
---------------------------------- */
import Map from './Map';
import CheckInFooter from './CheckInFooter';
import SearchMain from './SearchMain';
import { NavigationIcon }  from '../components';

/* ----------------------------------
    Mapping Redux Store States
---------------------------------- */
const mapStateToProps = ({
  loginReducer,
  usernameReducer,
  useridReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer
}) => ({
  loginReducer,
  usernameReducer,
  useridReducer,
  checkInOpenReducer,
  textCommentsReducer,
  audioCommentsReducer
});

/* ----------------------------------
     Mapping Redux Store Actions
---------------------------------- */
const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => {
    dispatch(updateLogout());
    dispatch(updateUsername(''));
    dispatch(updateUserid(0));
  },
  toggleCheckIn: (checkInOpenReducer) => {
    if (checkInOpenReducer) {
      dispatch(closeCheckIn());
    }
    else {
      dispatch(openCheckIn());
    }
  },
  updateTextCommentsFromDB: (comments) => {
    dispatch(updateTextCommentsDB(comments));
  }
});

/* ----------------------------------
                Class
---------------------------------- */
class Main extends Component  {

  componentDidMount () {
    getTextComments(comments => this.props.updateTextCommentsFromDB(comments));
  }

  render() {
    const {
      usernameReducer,
      onLogoutClick,
      checkInOpenReducer,
      toggleCheckIn,
      textCommentsReducer,
      audioCommentsReducer,
      updateTextCommentsFromDB
    } = this.props;

    console.log('Main props: ', this.props);
    console.log('------> comments: ', this.props.textCommentsReducer)
    return (
      <View style={styles.container}>
        <NavigationIcon 
          icon={checkInOpenReducer ? 'arrow-left' : 'hamburger'}
          checkInOpenReducer={checkInOpenReducer}
          onPress={toggleCheckIn}
        />
        <SearchMain style={styles.searchBar}/>
        <Map style={styles.map}/>  
        <CheckInFooter />
        {/*<Button onPress={onLogoutClick} title="Logout" />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    // marginTop: "5%",
    // height:  "100%",
  },
  searchBar: {
    flex: 1,
    // width: "100%",
    zIndex: 10
  },
  map: {
    flex: 1,
    zIndex: -1
    // height: "85.22%",
    // width: "100%"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);