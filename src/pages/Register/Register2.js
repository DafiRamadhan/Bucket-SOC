import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import {IconBack, IconMarker, Register2Img} from '../../assets';
import {Inputan, Loading, Maps} from '../../components';
import {colors, dropshadow, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import DropShadow from 'react-native-drop-shadow';
import { registerUser } from '../../actions/AuthAction';
import { connect } from 'react-redux';

class Register2 extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      alamat: '',
      detail_alamat: '',
      latitude: -7.575667,
      longitude: 110.824239,
      openMaps: false,
      search: true,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Register1');
    return true;
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {registerResult} = this.props; //dari false menjadi newData

    if (registerResult && prevProps.registerResult !== registerResult) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      Alert.alert('Pendaftaran Akun Berhasil', 'Silakan lakukan verifikasi akun melalui tautan yang dikirimkan ke email Anda!');
      this.props.navigation.replace('Login');
    }
  }

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
      search: false,
    });
  };

  goBack = () => {
    this.setState({
      openMaps: false,
    });
  };

  onSubmit = () => {
    const {alamat, detail_alamat, latitude, longitude} = this.state;
    if (alamat && detail_alamat && latitude && longitude) {
      const data = {
        nama: this.props.route.params.nama,
        email: this.props.route.params.email,
        nomerHp: this.props.route.params.nomerHp,
        alamat: alamat,
        detail_alamat: detail_alamat,
        latitude: latitude,
        longitude: longitude,
        status: 'user',
        avatar: '',
      };
      //Ke Auth Action
      this.props.dispatch(registerUser(data, this.props.route.params.password));
    } else {
      Alert.alert('Error', 'Silahkan Isi Alamat dan Detail Alamat Anda!');
    }
  };

  render() {
    const {openMaps, search, alamat, detail_alamat, latitude, longitude} =
      this.state;
    const {navigation, registerLoading} = this.props;
    return (
      <View style={styles.pages}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
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
              <View style={styles.wrapAlamat}>
                <TouchableOpacity onPress={() => this.clickMaps()}>
                  <Text style={styles.changeText}>Tentukan Alamat</Text>
                </TouchableOpacity>
              </View>
              <DropShadow style={dropshadow.kategoriCard}>
                <View style={styles.cardAlamat}>
                  <IconMarker />
                  {alamat ? (
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
                  ) : (
                    <Text style={styles.placeholderAlamat}>
                      Alamat Lengkap Anda (wilayah Kota Surakarta dan
                      sekitarnya.)
                    </Text>
                  )}
                </View>
              </DropShadow>
              <Inputan
                icon={'building'}
                noLabel
                placeholder={'Detail Alamat (nomor, blok, lantai, dll)'}
                value={detail_alamat}
                onChangeText={detail_alamat => this.setState({detail_alamat})}
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.onSubmit()}>
                <Text style={styles.btnText}>Daftar</Text>
              </TouchableOpacity>
            </View>
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
        {registerLoading ? <Loading /> : null}
      </View>
    );
  }
}

//mengubah state yang didapat dari redux (Reducer) menjadi props
const mapStatetoProps = state => ({
  registerLoading: state.AuthReducer.registerLoading,
  registerResult: state.AuthReducer.registerResult,
  registerError: state.AuthReducer.registerError,
});

export default connect(mapStatetoProps, null)(Register2);

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
  wrapAlamat: {
    marginTop: responsiveHeight(30),
    alignSelf: 'flex-end',
    padding: 5,
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
  placeholderAlamat: {
    fontSize: RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.navmenu,
    marginLeft: responsiveWidth(12),
    textAlign: 'justify',
    flex: 1,
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
});
