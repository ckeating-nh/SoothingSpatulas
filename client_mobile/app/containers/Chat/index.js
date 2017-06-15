import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
import ChatList from './ChatList'

class ChatMain extends Component {
  constructor (props){
    super(props);
  }

  render() {

    console.log('in index.js', this.props.userId);
      return (
        <NavigatorIOS
          initialRoute={{
            component: ChatList,
            title:'',
            passProps: { userId: this.props.userId }
          }}
        navigationBarHidden={false}
        style={{width: 375, height: 800}}
         />
      )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    },
    text: {
      fontSize: 24,
      marginTop: 300,
      color: 'black',
      alignSelf: 'center'
  }
});

module.exports = ChatMain;