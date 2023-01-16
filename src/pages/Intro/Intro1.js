import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {IconBack, Intro1Img} from '../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Jarak} from '../../components';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class Intro1 extends Component {
  render() {
    const {navigation} = this.props;
    const selanjutnya = 'Lanjut >';
    return (
      <View style={styles.pages}>
        <GestureRecognizer onSwipeLeft={() => navigation.navigate('Intro2')}>
          <Text style={styles.number}>1 / 5</Text>
          <View style={styles.images}>
            <Intro1Img />
          </View>
          <View style={styles.card}>
            <View style={styles.wrapTitle}>
              <Text style={styles.titleLeft}>Cari Berbagai </Text>
              <Text style={styles.titleRight}>Pilihan Buket</Text>
            </View>
            <Text style={styles.desc}>
              Temukan berbagai kategori dan pilihan buket yang tersedia di toko
              kami.
            </Text>
            <View style={styles.wrapperCircle}>
              <View style={styles.circlePrimary}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
              <Jarak width={responsiveWidth(18)} />
              <View style={styles.circleDisabled}></View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => navigation.navigate('Intro2')}>
            <Text style={styles.nextText}>{selanjutnya}</Text>
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
    height: responsiveHeight(380),
    width: responsiveWidth(350),
    marginTop: responsiveHeight(24),
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
  nextBtn: {
    alignSelf: 'flex-end',
    marginRight: responsiveWidth(15),
  },
  nextText: {
    color: colors.desc,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    padding: 10,
  },
});
