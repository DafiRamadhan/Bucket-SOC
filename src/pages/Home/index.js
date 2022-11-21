import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {
  BannerSlider,
  HeaderComponent,
  ListBuket,
  ListKategori,
} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {dummyBuket, dummyKategori, dummyProfile} from '../../data';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';

export default class Home extends Component {
  //konstanta untuk mengambil data dari JSON
  constructor(props) {
    super(props);

    //state akan dioper ke ListKategori
    this.state = {
      kategori: dummyKategori,
      buket: dummyBuket,
      profile: dummyProfile,
    };
  }

  render() {
    //membuat konstanta 'pilihKategori' dan 'pilihBuket'
    const {kategori, buket, profile} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.wrapTitle}>
              {profile.nama ? (
                <Text numberOfLines={3} style={styles.titleText}>
                  Halo, {profile.nama}
                </Text>
              ) : (
                <Text numberOfLines={3} style={styles.titleText}>
                  Halo, Silakan Login
                </Text>
              )}
              <Text style={styles.descText}>Selamat Datang</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.fotoBtn}>
              <Image style={styles.image} source={profile.avatar} />
            </TouchableOpacity>
          </View>
          <HeaderComponent navigation={navigation} />
          <View style={styles.body}>
            <View style={styles.pilihKategori}>
              <Text style={styles.label}>Pilih Kategori Buket</Text>
              <ListKategori pilihKategori={kategori} />
            </View>
            <View>
              <BannerSlider />
            </View>
            <View style={styles.pilihBuket}>
              <Text style={styles.label}>Pilih Buket Favorit Anda</Text>
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
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: responsiveWidth(20),
    paddingTop: responsiveHeight(20),
    //paddingBottom: responsiveHeight(5),
  },
  wrapTitle: {
    flex: 1,
    marginRight: responsiveWidth(10),
  },
  titleText: {
    fontSize: RFValue(22, heightMobileUI),
    fontFamily: fonts.primary.extrabold,
    color: colors.primary,
    marginBottom: responsiveHeight(5),
  },
  descText: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: 'black',
  },
  fotoBtn: {
    paddingRight: 15,
  },
  image: {
    height: responsiveHeight(50),
    width: responsiveWidth(50),
    borderRadius: 30,
  },
  body: {
    backgroundColor: colors.white,
    paddingBottom: responsiveHeight(80),
  },
  pilihKategori: {
    //marginTop: responsiveHeight(10),
    paddingBottom: responsiveHeight(25),
  },
  pilihBuket: {
    marginTop: responsiveHeight(25),
    marginBottom: responsiveHeight(25),
  },
  label: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    marginHorizontal: responsiveWidth(20),
    color: 'black',
  },
  containerTombol: {
    alignItems: 'center',
    marginBottom: responsiveHeight(25),
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
