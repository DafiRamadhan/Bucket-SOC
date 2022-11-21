import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {IconBack, Register2Img} from '../../assets';
import {Inputan, Pilihan} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';

export default class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataKota: [],
      dataKecamatan: [],
      dataKelurahan: [],
    };
  }
  render() {
    const {dataKota, dataKecamatan, dataKelurahan} = this.state;
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
            <Register2Img />
          </View>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.dataText}>Data </Text>
              <Text style={styles.alamatText}>Alamat</Text>
            </View>
            <View>
              <Inputan label="Alamat Lengkap" textarea />
              <Pilihan label="Kabupaten / Kota" datas={dataKota} />
              <Pilihan label="Kecamatan" datas={dataKecamatan} />
              <Pilihan label="Kelurahan / Desa" datas={dataKelurahan} />
              <Text style={styles.koordinatText}>Titik Koordinat Alamat :</Text>
              <View style={styles.koordinat}>
                <Text style={styles.titikText}></Text>
                <TouchableOpacity>
                  <Text
                    style={styles.ubahKoordinat}
                    onPress={() => navigation.navigate('Maps')}>
                    Pilih
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.btnText}>Daftar</Text>
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
    height: responsiveHeight(216),
    width: responsiveWidth(267),
    marginTop: responsiveHeight(7),
    marginBottom: responsiveHeight(45),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(45),
  },
  title: {
    flexDirection: 'row',
  },
  dataText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(30, heightMobileUI),
  },
  alamatText: {
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
  koordinatText: {
    color: colors.black,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(18, heightMobileUI),
    marginTop: 17,
  },
  koordinat: {
    height: responsiveHeight(43),
    borderBottomWidth: 1,
    borderColor: colors.borderInput,
    paddingHorizontal: 10,
    marginTop: responsiveHeight(7),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titikText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16, heightMobileUI),
  },
  ubahKoordinat: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(16, heightMobileUI),
  },
});
