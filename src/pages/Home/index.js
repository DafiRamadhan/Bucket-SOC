import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { BannerSlider, HeaderComponent, ListBuket, ListKategori } from '../../components';
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils';
import { dummyBuket, dummyKategori } from '../../data';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../utils/constant';

export default class Home extends Component {

  //konstanta untuk mengambil data dari JSON
  constructor(props) {
    super(props);

    //state akan dioper ke ListKategori
    this.state = {
      kategori: dummyKategori,
      buket: dummyBuket,
    };
  }

  render() {
    //membuat konstanta 'pilihKategori' dan 'pilihBuket'
    const {kategori, buket} = this.state
    const {navigation} = this.props
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderComponent navigation={navigation} />
          <View style={styles.banner}>
            <BannerSlider />
          </View>
          <View style={styles.body}>
            <View style={styles.pilihKategori}>
              <Text style={styles.label}>Pilih Kategori Buket</Text>
              <ListKategori pilihKategori={kategori} />
            </View>
            <View style={styles.pilihBuket}>
              <Text style={styles.label}>Pilih Buket Yang Anda Inginkan</Text>
              <ListBuket pilihBuket={buket} navigation={navigation} />
            </View>
            <TouchableOpacity
              style={styles.containerTombol}
              onPress={() => navigation.navigate('Bouquet')}>
              <View style={styles.tombol}>
                <Text style={styles.textTombol}>Lihat Lebih Banyak</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  banner: {
    backgroundColor: colors.primary,
    paddingBottom: 20,
  },
  body: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  pilihKategori: {
    marginTop: 20,
  },
  pilihBuket: {
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.regular,
    marginHorizontal: 20,
    color: 'black',
  },
  containerTombol: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tombol: {
    backgroundColor: colors.primary,
    width: responsiveWidth(300),
    height: responsiveHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textTombol: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    marginHorizontal: 10,
    color: 'white',
  },
});