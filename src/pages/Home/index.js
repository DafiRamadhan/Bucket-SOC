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
  ListKategori,
  ListProduk,
} from '../../components';
import {
  colors,
  fonts,
  getData,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {defaultProfile} from '../../assets';
import {connect} from 'react-redux';
import {getListKategori} from '../../actions/KategoriAction';
import {getListBanner} from '../../actions/BannerAction';
import {getListLimitProduk} from '../../actions/ProdukAction';

class Home extends Component {
  //konstanta untuk mengambil data dari JSON
  constructor(props) {
    super(props);

    //state akan dioper ke List
    this.state = {
      profile: false,
    };
  }

  //Dijalankan ketika komponen/halaman pertama kali di buka / di load
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.dispatch(getListKategori());
      this.props.dispatch(getListBanner());
      this.props.dispatch(getListLimitProduk());
      this.getUserData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //mendapatkan userData dari Async Storage
  getUserData = () => {
    //mendapatkan data dari parameter 'user'
    getData('user').then(res => {
      const data = res;
      //jika datanya ada
      if (data) {
        this.setState({
          profile: data,
        });
      } else {
        this.getUser();
      }
    });
  };

  getUser = () => {
    //mendapatkan data dari parameter 'user'
    getData('user').then(res => {
      const data = res;
      //jika datanya ada
      if (data) {
        this.setState({
          profile: data,
        });
      }
    });
  };

  render() {
    const {profile} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
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
              <Image
                style={styles.image}
                source={profile.avatar ? {uri: profile.avatar} : defaultProfile}
              />
            </TouchableOpacity>
          </View>
          <HeaderComponent navigation={navigation} page="Home" />
          <View style={styles.body}>
            <View style={styles.pilihKategori}>
              <Text style={styles.label}>Pilih Kategori Buket</Text>
              <ListKategori navigation={navigation} />
            </View>
            <View>
              <BannerSlider />
            </View>
            <View style={styles.pilihBuket}>
              <Text style={styles.label}>Pilih Buket Favorit Anda</Text>
              <ListProduk navigation={navigation} />
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

export default connect()(Home);

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
    marginBottom: responsiveHeight(25),
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
