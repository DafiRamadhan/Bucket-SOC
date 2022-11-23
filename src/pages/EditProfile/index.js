import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import {dummyProfile} from '../../data';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {IconBack, IconMarker} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Inputan, Maps, Pilihan} from '../../components';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: -7.575667,
        longitude: 110.824239,
      },
      openMaps: false,
      nama: dummyProfile.nama,
      email: dummyProfile.email,
      nomerHp: dummyProfile.nomerHp,
      alamat: dummyProfile.alamat,
      detail_alamat: dummyProfile.detail_alamat,
      latitude: dummyProfile.latitude,
      longitude: dummyProfile.longitude,
      avatar: dummyProfile.avatar,
    };
  }

  clickMaps = () => {
    this.setState({
      openMaps: true,
    });
  };

  updateLocation = data => {
    this.setState({
      latitude: data.latitude,
      longitude: data.longitude,
      region: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      openMaps: false,
    });
  };

  updateAlamat = data => {
    this.setState({
      alamat: data,
    });
  };

  goBack = () => {
    this.setState({
      openMaps: false,
    });
  };

  render() {
    const {openMaps, region, nama, email, nomerHp, alamat, detail_alamat, latitude, longitude, avatar} = this.state;
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
            <Inputan label="Nama" value={nama} />
            <Inputan label="Email" value={email} />
            <Inputan label="No. Handphone" value={nomerHp} />
            <View style={styles.wrapAlamat}>
              <Text style={styles.alamatText}>Alamat :</Text>
              <TouchableOpacity onPress={() => this.clickMaps()}>
                <Text style={styles.changeText}>Ubah Alamat</Text>
              </TouchableOpacity>
            </View>
            <DropShadow style={dropshadow.kategoriCard}>
              <View style={styles.cardAlamat}>
                <IconMarker />
                <View style={styles.wrapInfo}>
                  <Text style={styles.infoText}>{alamat}</Text>
                  <View style={styles.wrapCoordinate}>
                    <Text numberOfLines={1} style={styles.coordinateText}>
                      {latitude}
                    </Text>
                    <Text style={styles.commaText}>, </Text>
                    <Text numberOfLines={1} style={styles.coordinateText}>
                      {longitude}
                    </Text>
                  </View>
                </View>
              </View>
            </DropShadow>
            <Inputan
              label="Detail Alamat / Acuan"
              value={detail_alamat}
            />
            <View style={styles.inputFoto}>
              <Text style={styles.fotoText}>Foto Profile</Text>
              <View style={styles.wrapperFoto}>
                <Image source={avatar} style={styles.foto} />
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
        <Modal
          visible={openMaps}
          onRequestClose={() => this.setState({openMaps: false})}>
          <Maps
            region={region}
            updateLocation={data => this.updateLocation(data)}
            updateAlamat={data => this.updateAlamat(data)}
            goBack={() => this.goBack()}
          />
        </Modal>
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
    marginTop: responsiveHeight(17),
  },
  fotoText: {
    color: colors.black,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(18, heightMobileUI),
    marginBottom: 7,
  },
  wrapAlamat: {
    flexDirection: 'row',
    marginTop: responsiveHeight(17),
    justifyContent: 'space-between',
  },
  alamatText: {
    color: colors.black,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(18, heightMobileUI),
  },
  changeText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
  },
  cardAlamat: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: responsiveHeight(7),
    flexDirection: 'row',
    padding: responsiveWidth(10),
  },
  wrapInfo: {
    flex: 1,
    marginLeft: responsiveWidth(10),
  },
  infoText: {
    color: colors.black,
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16, heightMobileUI),
    textAlign: 'justify',
    marginBottom: responsiveHeight(5),
  },
  wrapCoordinate: {
    flexDirection: 'row',
  },
  coordinateText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(16, heightMobileUI),
    flex: 1,
  },
  commaText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(16, heightMobileUI),
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
