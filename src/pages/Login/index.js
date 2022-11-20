import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { LoginImg } from '../../assets';
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../utils/constant';
import { Inputan } from '../../components';

export default class Login extends Component {
  render() {
    const {navigation} = this.props
    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.images}>
            <LoginImg />
          </View>
          <View style={styles.card}>
            <Text style={styles.loginText}>Login</Text>
            <View>
              <Inputan icon={'email'} noLabel placeholder={'Email'} />
              <Inputan
                icon={'password'}
                passwordNoLabel
                placeholder={'Password'}
              />
              <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Lupa Password ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MainApp')}
                style={styles.loginBtn}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapRegister}>
            <Text style={styles.questionText}>Belum Punya Akun ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register1')}>
              <Text style={styles.daftarText}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  images: {
    alignSelf: 'center',
    height: responsiveHeight(325),
    width: responsiveWidth(358),
    marginTop: responsiveHeight(60),
    marginBottom: responsiveHeight(45),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(66),
  },
  loginText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(30, heightMobileUI),
  },
  forgotText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(16, heightMobileUI),
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(15),
    marginBottom: responsiveHeight(40),
  },
  loginBtn: {
    height: responsiveHeight(54),
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
  wrapRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionText: {
    color: '#676767',
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
  },
  daftarText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
  },
});