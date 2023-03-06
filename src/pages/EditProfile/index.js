import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {} from '../../data';
import {
  colors,
  dropshadow,
  fonts,
  getData,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {
  defaultProfile,
  IconBack,
  IconClearText,
  IconMarker,
} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Inputan, Loading, Maps} from '../../components';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateProfile} from '../../actions/ProfileAction';
import {connect} from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMaps: false,
      search: false,
      uid: '',
      nama: '',
      email: '',
      nomerHp: '',
      alamat: '',
      detail_alamat: '',
      latitude: '',
      longitude: '',
      status: '',
      avatar: '',
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {updateProfileResult} = this.props;
    if (
      updateProfileResult &&
      prevProps.updateProfileResult !== updateProfileResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      Alert.alert('Sukses', 'Update Profile Berhasil!');
      this.props.navigation.goBack();
    }
  }

  //mendapatkan userData dari Async Storage
  getUserData = () => {
    //mendapatkan data dari parameter 'user'
    getData('user').then(res => {
      const data = res;
      this.setState({
        uid: data.uid,
        nama: data.nama,
        email: data.email,
        nomerHp: data.nomerHp,
        alamat: data.alamat,
        detail_alamat: data.detail_alamat,
        latitude: data.latitude,
        longitude: data.longitude,
        status: data.status,
        avatar: data.avatar,
      });
    });
  };

  getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 500, maxHeight: 500, includeBase64: true},
      response => {
        if (response.didCancel || response.errorMessage || response.errorCode) {
          Alert.alert('Error', 'Anda belum memilih foto!');
        } else {
          const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
          this.setState({
            avatar: fileString,
          });
        }
      },
    );
  };

  clearImage = () => {
    this.setState({
      avatar: '',
    });
  };
  
  validatePhone = phone => {
    // cek apakah teks hanya mengandung karakter angka
    if (/^\d*$/.test(phone)) {
      // cek apakah nomor telepon diawali dengan "08"
      if (phone.startsWith('08')) {
        // ganti "08" dengan "628"
        phone = '628' + phone.substr(2);
      }
      this.setState({
        nomerHp: phone,
      });
    }
  };

  clickMaps = () => {
    this.setState({
      openMaps: true,
    });
  };

  updateLocation = data => {
    this.setState({
      alamat: data.address,
      latitude: data.region.latitude,
      longitude: data.region.longitude,
      openMaps: false,
    });
  };

  goBack = () => {
    this.setState({
      openMaps: false,
    });
  };

  onSubmit = () => {
    const {
      uid,
      nama,
      email,
      nomerHp,
      alamat,
      detail_alamat,
      latitude,
      longitude,
      status,
      avatar,
    } = this.state;
    const data = {
      uid: uid,
      nama: nama,
      email: email,
      nomerHp: nomerHp,
      alamat: alamat,
      detail_alamat: detail_alamat,
      latitude: latitude,
      longitude: longitude,
      status: status,
      avatar: avatar,
    };
    if (nama && nomerHp && alamat && detail_alamat && latitude && longitude) {
      this.props.dispatch(updateProfile(data));
    } else {
      Alert.alert('Error', 'Seluruh data bertanda * harus diisi!');
    }
  };

  render() {
    const {
      openMaps,
      search,
      nama,
      email,
      nomerHp,
      alamat,
      detail_alamat,
      latitude,
      longitude,
      avatar,
    } = this.state;
    const {navigation, updateProfileLoading} = this.props;
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Inputan
              label="Nama *"
              value={nama}
              onChangeText={nama => this.setState({nama})}
            />
            <Inputan label="Email *" value={email} disabled />
            <Inputan
              label="No. Handphone *"
              value={nomerHp}
              onChangeText={this.validatePhone}
              keyboardType="number-pad"
            />
            <View style={styles.wrapAlamat}>
              <Text style={styles.alamatText}>Alamat * :</Text>
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
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'clip'}
                      style={styles.latitudeText}>
                      {latitude}
                    </Text>
                    <Text style={styles.commaText}>, </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'clip'}
                      style={styles.longitudeText}>
                      {longitude}
                    </Text>
                  </View>
                </View>
              </View>
            </DropShadow>
            <Inputan
              label="Detail Alamat *"
              value={detail_alamat}
              onChangeText={detail_alamat => this.setState({detail_alamat})}
            />
            <View style={styles.inputFoto}>
              <Text style={styles.fotoText}>Foto Profile :</Text>
              <View style={styles.wrapperFoto}>
                <View>
                  <Image
                    source={avatar ? {uri: avatar} : defaultProfile}
                    style={styles.foto}
                  />
                  {avatar ? (
                    <TouchableOpacity
                      style={styles.iconClearImage}
                      onPress={() => this.clearImage()}>
                      <IconClearText />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={styles.ubahFoto}
                  onPress={() => this.getImage()}>
                  <Text style={styles.ubahText}>Ubah Foto</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.simpan}
              onPress={() => this.onSubmit()}>
              <Text style={styles.simpanText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          visible={openMaps}
          onRequestClose={() => this.setState({openMaps: false})}>
          <Maps
            address={alamat}
            latitude={latitude}
            longitude={longitude}
            search={search}
            updateLocation={data => this.updateLocation(data)}
            goBack={() => this.goBack()}
          />
        </Modal>
        {updateProfileLoading ? <Loading /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  updateProfileLoading: state.ProfileReducer.updateProfileLoading,
  updateProfileResult: state.ProfileReducer.updateProfileResult,
  updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStateToProps, null)(EditProfile);

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
    fontSize: RFValue(20, heightMobileUI),
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
    fontSize: RFValue(15, heightMobileUI),
    textAlign: 'justify',
    marginBottom: responsiveHeight(5),
  },
  wrapCoordinate: {
    flexDirection: 'row',
  },
  latitudeText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(14, heightMobileUI),
    width: responsiveWidth(66),
  },
  longitudeText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(14, heightMobileUI),
    width: responsiveWidth(76),
  },
  commaText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(14, heightMobileUI),
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
  iconClearImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
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
