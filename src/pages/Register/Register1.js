import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import {IconBack, Register1Img} from '../../assets';
import {Inputan} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';

export default class Register1 extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      nama: '',
      email: '',
      nomerHp: '',
      password: '',
      confirmPassword: '',
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
    this.props.navigation.replace('Login');
    return true;
  }

  validateEmail = email => {
    var validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(email);
  };

  validatePassword = password => {
    var validPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return validPassword.test(password);
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

  onContinue = () => {
    const {nama, email, nomerHp, password, confirmPassword} = this.state;
    if (nama && email && nomerHp && password && confirmPassword) {
      if (!this.validateEmail(email)) {
        Alert.alert('Error', 'Format Email salah!');
      } else if (!this.validatePassword(password)) {
        Alert.alert(
          'Error',
          'Password harus terdiri dari minimal 8 karakter, mengandung huruf kecil, huruf besar, dan angka!',
        );
      } else if (password !== confirmPassword) {
        Alert.alert('Error', 'Password dan Konfirmasi Password harus sama!');
      } else {
        this.props.navigation.navigate('Register2', this.state);
      }
    } else {
      Alert.alert('Error', 'Seluruh data harus diisi!');
    }
  };

  render() {
    const {nama, email, nomerHp, password, confirmPassword} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.replace('Login')}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.images}>
            <Register1Img />
          </View>
          <View style={styles.card}>
            <Text style={styles.titleText}>Register</Text>
            <View>
              <Inputan
                icon={'profile'}
                noLabel
                placeholder={'Nama Lengkap'}
                value={nama}
                onChangeText={nama => this.setState({nama})}
              />
              <Inputan
                icon={'email'}
                noLabel
                placeholder={'Email'}
                value={email}
                onChangeText={email => this.setState({email})}
              />
              <Inputan
                icon={'phone'}
                noLabel
                keyboardType="number-pad"
                placeholder={'Nomor HP'}
                value={nomerHp}
                onChangeText={this.validatePhone}
              />
              <Inputan
                icon={'password'}
                passwordNoLabel
                placeholder={'Password'}
                value={password}
                onChangeText={password => this.setState({password})}
              />
              <Inputan
                icon={'confirm-password'}
                passwordNoLabel
                placeholder={'Konfirmasi Password'}
                value={confirmPassword}
                onChangeText={confirmPassword =>
                  this.setState({confirmPassword})
                }
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.onContinue()}>
                <Text style={styles.btnText}>Selanjutnya</Text>
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
    height: responsiveHeight(220),
    width: responsiveWidth(227),
    marginTop: responsiveHeight(7),
    marginBottom: responsiveHeight(45),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(45),
  },
  titleText: {
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
});
