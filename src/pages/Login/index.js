import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import {IconBack, LoginImg} from '../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Inputan, Loading} from '../../components';
import { loginUser } from '../../actions/AuthAction';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: '',
      password: '',
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
    this.props.navigation.replace('MainApp');
    return true;
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {loginResult} = this.props;
    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.navigation.replace('MainApp');
    }
  }

  onSubmit = () => {
    const {email, password} = this.state;
    if (email && password) {
      this.props.dispatch(loginUser(email, password));
    } else {
      Alert.alert('Error', 'Email dan Password harus diisi!');
    }
  };

  render() {
    const {email, password} = this.state;
    const {navigation, loginLoading} = this.props;
    return (
      <View style={styles.pages}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.replace('MainApp')}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.images}>
            <LoginImg />
          </View>
          <View style={styles.card}>
            <Text style={styles.loginText}>Login</Text>
            <View>
              <Inputan
                icon={'email'}
                noLabel
                placeholder={'Email'}
                value={email}
                onChangeText={email => this.setState({email})}
              />
              <Inputan
                icon={'password'}
                passwordNoLabel
                placeholder={'Password'}
                value={password}
                onChangeText={password => this.setState({password})}
              />
              <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Lupa Password ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onSubmit()}
                style={styles.loginBtn}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapRegister}>
            <Text style={styles.questionText}>Belum Punya Akun ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register1')}>
              <Text style={styles.daftarText}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {loginLoading ? <Loading /> : null}
      </View>
    );
  }
}

//mengambil data dari AuthReducer dan mengubah menjadi props
const mapStatetoProps = state => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStatetoProps, null)(Login)

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
    height: responsiveHeight(325),
    width: responsiveWidth(358),
    marginTop: responsiveHeight(30),
    marginBottom: responsiveHeight(45),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(35),
  },
  loginText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(30, heightMobileUI),
  },
  forgotText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(16, heightMobileUI),
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(15),
    marginBottom: responsiveHeight(40),
  },
  loginBtn: {
    height: responsiveHeight(54),
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
  wrapRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionText: {
    color: '#676767',
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
  },
  daftarText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
  },
});
