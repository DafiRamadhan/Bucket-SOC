import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { colors, dropshadow, fonts, responsiveHeight, responsiveWidth } from '../../utils'
import DropShadow from 'react-native-drop-shadow';
import { IconBack } from '../../assets';
import { heightMobileUI } from '../../utils/constant';
import { RFValue } from 'react-native-responsive-fontsize';
import { CardAlamat, Header, Jarak } from '../../components/kecil';
import { dummyProfile } from '../../data';

export default class Checkout extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       profile: dummyProfile,
    }
  }
  render() {
    const {profile} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <Header
          title="Checkout"
          goBack={() => navigation.navigate('Keranjang')}
        />
        <View style={styles.container}>
          <CardAlamat profile={profile} />
          <Jarak width={'100%'} height={responsiveHeight(7)} backgroundColor={colors.line}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
});