import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {ForgotPassImg, IconBack, Register1Img} from '../../assets';
import {Inputan} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';

export default class ForgotPassword extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.images}>
            <ForgotPassImg />
          </View>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.lupaText}>Lupa </Text>
              <Text style={styles.passwordText}>Password ?</Text>
            </View>
            <Text style={styles.desc}>
              Silakan masukkan alamat email yang terhubung dengan akun Anda.
            </Text>
            <View>
              <Inputan icon={'email'} noLabel placeholder={'Email'} />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
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
  tombolBack: {
    marginTop: responsiveHeight(10),
    marginLeft: responsiveWidth(10),
    zIndex: 1,
    padding: 5,
    alignSelf: 'flex-start',
  },
  images: {
    alignSelf: 'center',
    height: responsiveHeight(226),
    width: responsiveWidth(339),
    marginTop: responsiveHeight(100),
    marginBottom: responsiveHeight(90),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(45),
  },
  title: {
    flexDirection: 'row',
  },
  lupaText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(30, heightMobileUI),
  },
  passwordText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(30, heightMobileUI),
  },
  desc: {
    marginTop: responsiveHeight(15),
    color: colors.desc,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(15, heightMobileUI),
    textAlign: 'justify',
  },
  btn: {
    height: responsiveHeight(54),
    marginTop: responsiveHeight(60),
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
});
