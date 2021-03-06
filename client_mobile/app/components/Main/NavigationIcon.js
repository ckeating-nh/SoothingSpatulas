import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import AssetMap from '../../config/AssetMap';

// Expand the touch target around the icon
const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

/* ----------------------------------
                Class
---------------------------------- */
export default class NavigationIcon extends Component {

  static defaultProps = {
    toggleCheckIn: () => {}
  }

  render() {
    /* ---------------------------------------------
       Currently, this onPress is a testing function
       It will open the checkInFooter
       Need to change it to open the Menu
    --------------------------------------------- */
    const {toggleCheckIn, icon, checkInOpenReducer} = this.props
    
    return (
      <TouchableOpacity
        style={styles.container}
        hitSlop={hitSlop}
        onPress={() => {toggleCheckIn(checkInOpenReducer)}}
      >
        <Image
          style={styles.icon}
          source={AssetMap[icon]}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 36,
    left: 22,
    zIndex: 10,
  },
  icon: {
    width: 21,
    height: 21,
  },
})