import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {IconBack, Register1Img} from '../../assets';
import {Inputan} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';

export default class Register1 extends Component {
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
            <Register1Img />
          </View>
          <View style={styles.card}>
            <Text style={styles.titleText}>Register</Text>
            <View>
              <Inputan icon={'profile'} noLabel placeholder={'Nama Lengkap'} />
              <Inputan icon={'email'} noLabel placeholder={'Email'} />
              <Inputan
                icon={'phone'}
                noLabel
                keyboardType="number-pad"
                placeholder={'Nomor HP'}
              />
              <Inputan
                icon={'password'}
                passwordNoLabel
                placeholder={'Password'}
              />
              <Inputan
                icon={'confirm-password'}
                passwordNoLabel
                placeholder={'Konfirmasi Password'}
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Register2')}>
                <Text style={styles.btnText}>Selanjutnya</Text>
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
    height: responsiveHeight(220),
    width: responsiveWidth(227),
    marginTop: responsiveHeight(7),
    marginBottom: responsiveHeight(45),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(45),
  },
  titleText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(30, heightMobileUI),
  },
  btn: {
    height: responsiveHeight(54),
    marginTop: responsiveHeight(40),
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
