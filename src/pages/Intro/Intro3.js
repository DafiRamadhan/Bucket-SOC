import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {Intro3Img} from '../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Jarak} from '../../components';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class Intro3 extends Component {
  render() {
    const {navigation} = this.props;
    const selanjutnya = 'Lanjut >';
    const sebelumnya = '< Kembali';
    return (
      <View style={styles.pages}>
        <GestureRecognizer
          onSwipeLeft={() => navigation.navigate('Intro4')}
          onSwipeRight={() => navigation.goBack()}>
          <Text style={styles.number}>3 / 5</Text>
          <View style={styles.images}>
            <Intro3Img />
          </View>
          <View style={styles.card}>
            <View style={styles.wrapTitle}>
              <Text style={styles.titleLeft}>Lakukan </Text>
              <Text style={styles.titleRight}>Pembayaran</Text>
            </View>
            <Text style={styles.desc}>
              Lakukan pembayaran dengan berbagai pilihan metode pembayaran yang
              tersedia.
            </Text>
            <View style={styles.wrapperCircle}>
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circlePrimary}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
            </View>
          </View>
          <View style={styles.wrapBtn}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>{sebelumnya}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Intro4')}>
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
    height: responsiveHeight(339),
    width: responsiveWidth(335),
    marginTop: responsiveHeight(65),
    marginBottom: responsiveHeight(44),
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
