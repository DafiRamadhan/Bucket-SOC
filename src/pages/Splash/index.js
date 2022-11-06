import { StyleSheet, View, Image } from 'react-native'
import React, { Component } from 'react'
import { Logo } from '../../assets'
import { responsiveHeight, responsiveWidth } from '../../utils'

export default class Splash extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('MainApp')
    }, 3000)
  }

  render() {
    return (
      <View style={styles.pages}>
        <Image source={Logo} style={styles.images} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6ECEA',
  },
  images: {
    height: responsiveHeight(350),
    width: responsiveWidth(350)
  },
});