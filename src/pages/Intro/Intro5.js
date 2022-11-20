import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component, useEffect} from 'react';
import {Intro5Img} from '../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Jarak} from '../../components';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class Intro5 extends Component {
  render() {
    const {navigation} = this.props;
    const sebelumnya = '< Kembali';
    return (
      <View style={styles.pages}>
        <GestureRecognizer onSwipeRight={() => navigation.goBack()}>
          <Text style={styles.number}>5 / 5</Text>
          <View style={styles.images}>
            <Intro5Img />
          </View>
          <View style={styles.card}>
            <View style={styles.wrapTitle}>
              <Text style={styles.titleLeft}>Mulai dengan </Text>
              <Text style={styles.titleRight}>Akun Anda</Text>
            </View>
            <Text style={styles.desc}>
              Silakan masuk dengan akun Anda atau daftar akun baru untuk
              memulai.
            </Text>
            <View style={styles.wrapperCircle}>
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circlePrimary}></View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>Masuk Ke Akun Anda</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register1')}
              style={styles.registerBtn}>
              <Text style={styles.registerText}>Daftar Akun Baru</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.prevBtn}>
            <Text style={styles.prevText}>{sebelumnya}</Text>
          </TouchableOpacity>
        </GestureRecognizer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  number: {
    marginTop: responsiveHeight(30),
    color: colors.desc,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    textAlign: 'center',
  },
  images: {
    alignSelf: 'center',
    height: responsiveHeight(306),
    width: responsiveWidth(307),
    marginTop: responsiveHeight(45),
    marginBottom: responsiveHeight(50),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(40),
    alignItems: 'center',
  },
  wrapTitle: {
    flexDirection: 'row',
  },
  titleLeft: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(26, heightMobileUI),
  },
  titleRight: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(26, heightMobileUI),
  },
  desc: {
    marginTop: responsiveHeight(27),
    color: colors.desc,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(15, heightMobileUI),
    textAlign: 'center',
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: responsiveHeight(30),
  },
  circlePrimary: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.borderInput,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  prevBtn: {
    alignSelf: 'flex-start',
    marginLeft: responsiveWidth(15),
  },
  prevText: {
    color: colors.desc,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    padding: 10,
  },
  loginBtn: {
    height: responsiveHeight(54),
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(30),
    marginBottom: responsiveHeight(27),
  },
  loginText: {
    color: colors.white,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(24, heightMobileUI),
  },
  registerBtn: {
    height: responsiveHeight(54),
    width: '100%',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: colors.black,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(24, heightMobileUI),
  },
});
