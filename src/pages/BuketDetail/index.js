import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {IconAddCart, IconBack} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import Inputan from '../../components/kecil/Inputan';
import DropShadow from 'react-native-drop-shadow';
import Counter from 'react-native-counters';
import BuketSlider from '../../components/besar/BuketSlider';

export default class BuketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buket: this.props.route.params.buket,
      images: this.props.route.params.buket.gambar,
      value: 1,
    };
  }

  render() {
    const {navigation} = this.props;
    const {buket, images} = this.state;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <BuketSlider images={images} />
          <View style={styles.container}>
            <View style={styles.desc}>
              <Text style={styles.harga}>
                Rp{buket.harga.toLocaleString('id-ID')}
              </Text>
              <Text style={styles.nama}>{buket.nama}</Text>
              <View style={styles.garis} />
              <Text style={styles.subtitle}>Deskripsi Produk : </Text>
              <Text style={styles.deskripsi}>{buket.deskripsi}</Text>
              <Text style={styles.subtitle}>
                Kategori Buket : {buket.kategori.nama}
              </Text>
              <Inputan
                label="Catatan"
                textarea
                labelfontSize={RFValue(18, heightMobileUI)}
                formfontSize={RFValue(14, heightMobileUI)}
                placeholder="Isi jika ingin melakukan kustomisasi terhadap pesanan Anda (jenis, warna, ucapan, dll) sesuai ketentuan pada deskripsi produk ini."
              />
            </View>
          </View>
        </ScrollView>
        <DropShadow style={dropshadow.footer}>
          <View style={styles.footer}>
            <View style={styles.counter}>
              <Counter
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
                countTextStyle={styles.countText}
                start={1}
                min={1}
                max={20}
                value={this.state.value}
                onChange={value => this.setState({value})}
              />
            </View>
            <TouchableOpacity
              style={styles.tombolKeranjang}
              onPress={() => navigation.navigate('Keranjang')}>
              <IconAddCart />
              <Text style={styles.keranjangText}>Keranjang</Text>
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
    backgroundColor: '#F6ECEA',
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: responsiveHeight(40),
  },
  tombolBack: {
    marginTop: responsiveHeight(10),
    marginLeft: responsiveWidth(10),
    padding: 5,
  },
  desc: {
    marginHorizontal: responsiveWidth(25),
    marginTop: responsiveHeight(15),
  },
  harga: {
    fontSize: RFValue(22, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    marginBottom: 3,
  },
  nama: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
    textAlign: 'justify',
  },
  garis: {
    height: 0.5,
    backgroundColor: colors.borderInput,
    marginTop: responsiveHeight(10),
  },
  subtitle: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
    marginTop: responsiveHeight(20),
  },
  deskripsi: {
    fontSize: RFValue(14, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.desc,
    marginTop: responsiveHeight(7),
    textAlign: 'justify',
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
  counter: {
    borderColor: colors.borderInput,
    borderWidth: 1,
    borderRadius: 5,
    height: responsiveHeight(36),
  },
  button: {
    borderColor: colors.borderInput,
    borderWidth: 0,
  },
  buttonText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(22, heightMobileUI),
  },
  countText: {
    color: 'black',
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(16, heightMobileUI),
  },
  tombolKeranjang: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: responsiveWidth(165),
    height: responsiveHeight(54),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(16),
  },
  keranjangText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    paddingLeft: 10,
  },
});
