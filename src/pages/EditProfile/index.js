import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {Component} from 'react';
import {dummyProfile, Lokasi} from '../../data';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {IconBack} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Inputan, Pilihan} from '../../components';
import Maps from '../Maps';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataKota: [],
      dataKecamatan: [],
      dataKelurahan: [],
      profile: dummyProfile,
    };
  }

  render() {
    const {dataKota, dataKecamatan, dataKelurahan, profile} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <DropShadow style={dropshadow.footer}>
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.titleText}>Edit Profile</Text>
          </View>
        </DropShadow>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Inputan label="Nama" value={profile.nama} />
            <Inputan label="Email" value={profile.email} />
            <Inputan label="No. Handphone" value={profile.nomerHp} />
            <Inputan label="Alamat Lengkap" value={profile.alamat} textarea />
            <Pilihan label="Kabupaten / Kota" datas={dataKota} />
            <Pilihan label="Kecamatan" datas={dataKecamatan} />
            <Pilihan label="Kelurahan / Desa" datas={dataKelurahan} />
            <Text style={styles.koordinatText}>Titik Koordinat Alamat :</Text>
            <View style={styles.koordinat}>
              <Text style={styles.titikText}>
                {profile.latitude}, {profile.longitude}
              </Text>
              <TouchableOpacity>
                <Text
                  style={styles.ubahKoordinat}
                  onPress={() => navigation.navigate('Maps')}>
                  Ubah
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputFoto}>
              <Text style={styles.fotoText}>Foto Profile</Text>
              <View style={styles.wrapperFoto}>
                <Image source={profile.avatar} style={styles.foto} />
                <TouchableOpacity style={styles.ubahFoto}>
                  <Text style={styles.ubahText}>Ubah Foto</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.simpan}>
              <Text style={styles.simpanText}>Simpan</Text>
            </TouchableOpacity>
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
  container: {
    marginHorizontal: 30,
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
  titleText: {
    color: colors.black,
    fontFamily: fonts.primary.medium,
    fontSize: RFValue(22, heightMobileUI),
  },
  inputFoto: {
    marginTop: 17,
  },
  fotoText: {
    color: colors.black,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(18, heightMobileUI),
    marginBottom: 7,
  },
  koordinatText: {
    color: colors.black,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(18, heightMobileUI),
    marginTop: 17,
  },
  foto: {
    height: responsiveHeight(124),
    width: responsiveWidth(124),
    borderRadius: 10,
  },
  wrapperFoto: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ubahFoto: {
    height: responsiveHeight(40),
    width: responsiveWidth(150),
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: responsiveWidth(50),
    flex: 1,
  },
  ubahText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
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
  simpan: {
    height: responsiveHeight(54),
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveWidth(40),
  },
  simpanText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
});
