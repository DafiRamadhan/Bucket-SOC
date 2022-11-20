import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {Intro4Img} from '../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Jarak} from '../../components';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class Intro4 extends Component {
  render() {
    const {navigation} = this.props;
    const selanjutnya = 'Lanjut >';
    const sebelumnya = '< Kembali';
    return (
      <View style={styles.pages}>
        <GestureRecognizer
          onSwipeLeft={() => navigation.navigate('Intro5')}
          onSwipeRight={() => navigation.goBack()}>
          <Text style={styles.number}>4 / 5</Text>
          <View style={styles.images}>
            <Intro4Img />
          </View>
          <View style={styles.card}>
            <View style={styles.wrapTitle}>
              <Text style={styles.titleLeft}>Terima Buket </Text>
              <Text style={styles.titleRight}>Pesanan Anda</Text>
            </View>
            <Text style={styles.desc}>
              Pesanan akan dikirim ke alamat Anda atau dapat juga diambil di
              toko kami.
            </Text>
            <View style={styles.wrapperCircle}>
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circlePrimary}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
            </View>
          </View>
          <View style={styles.wrapBtn}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>{sebelumnya}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Intro5')}>
              <Text style={styles.btnText}>{selanjutnya}</Text>
            </TouchableOpacity>
          </View>
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
    height: responsiveHeight(240),
    width: responsiveWidth(365),
    marginTop: responsiveHeight(110),
    marginBottom: responsiveHeight(98),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(160),
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
  wrapBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveWidth(15),
  },
  btnText: {
    color: colors.desc,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    padding: 10,
  },
});
