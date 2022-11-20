import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {dummyPesanan} from '../../data';
import {ListKeranjang} from '../../components';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {IconBack, IconCheckout} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';

export default class Keranjang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pesanan: dummyPesanan[0],
    };
  }

  render() {
    const {pesanan} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <DropShadow style={dropshadow.footer}>
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.titleText}>Keranjang</Text>
          </View>
        </DropShadow>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListKeranjang daftarKeranjang={pesanan.items}></ListKeranjang>
        </ScrollView>
        <DropShadow style={dropshadow.footer}>
          <View style={styles.footer}>
            <View style={styles.totalHarga}>
              <Text style={styles.totalText}>Total Harga :</Text>
              <Text style={styles.hargaText}>
                Rp{pesanan.totalHarga.toLocaleString('id-ID')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.tombolCheckout}
              onPress={() => navigation.navigate('Checkout')}>
              <IconCheckout />
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </DropShadow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tombolBack: {
    position: 'absolute',
    marginTop: 12,
    marginLeft: 10,
    zIndex: 1,
    padding: 5,
  },
  header: {
    height: responsiveHeight(70),
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(13),
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footer: {
    height: responsiveHeight(85),
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tombolCheckout: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: responsiveWidth(165),
    height: responsiveHeight(54),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(16),
  },
  titleText: {
    color: colors.black,
    fontFamily: fonts.primary.medium,
    fontSize: RFValue(22, heightMobileUI),
  },
  checkoutText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    paddingLeft: 10,
  },
  totalText: {
    color: colors.black,
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16, heightMobileUI),
  },
  hargaText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
});
