import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {ForgotPassImg, IconBack} from '../../assets';
import {Inputan, Loading} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {forgotPassword} from '../../actions/ProfileAction';
import {connect} from 'react-redux';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {forgotPasswordResult} = this.props;
    if (
      forgotPasswordResult &&
      prevProps.forgotPasswordResult !== forgotPasswordResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      Alert.alert(
        'Sukses',
        'Tautan Reset Password telah dikirimkan ke ' + this.state.email + '!',
      );
      this.props.navigation.goBack();
    }
  }

  validateEmail = email => {
    var validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(email);
  };

  onSubmit = () => {
    const {email} = this.state;
    if (email) {
      if (!this.validateEmail(email)) {
        Alert.alert('Error', 'Format Email salah!');
      } else {
        this.props.dispatch(forgotPassword(email));
      }
    } else {
      Alert.alert('Error', 'Email harus diisi!');
    }
  };

  render() {
    const {email} = this.state;
    const {navigation, forgotPasswordLoading} = this.props;
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
            <ForgotPassImg />
          </View>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.lupaText}>Lupa </Text>
              <Text style={styles.passwordText}>Password ?</Text>
            </View>
            <Text style={styles.desc}>
              Silakan masukkan alamat email yang terhubung dengan akun Anda.
            </Text>
            <View>
              <Inputan
                icon={'email'}
                noLabel
                placeholder={'Email'}
                value={email}
                onChangeText={email => this.setState({email})}
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.onSubmit()}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {forgotPasswordLoading ? <Loading /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  forgotPasswordLoading: state.ProfileReducer.forgotPasswordLoading,
  forgotPasswordResult: state.ProfileReducer.forgotPasswordResult,
  forgotPasswordError: state.ProfileReducer.forgotPasswordError,
});

export default connect(mapStateToProps, null)(ForgotPassword);

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
    height: responsiveHeight(226),
    width: responsiveWidth(339),
    marginTop: responsiveHeight(100),
    marginBottom: responsiveHeight(90),
  },
  card: {
    marginHorizontal: responsiveWidth(28),
    marginBottom: responsiveHeight(45),
  },
  title: {
    flexDirection: 'row',
  },
  lupaText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(30, heightMobileUI),
  },
  passwordText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(30, heightMobileUI),
  },
  desc: {
    marginTop: responsiveHeight(15),
    color: colors.desc,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(15, heightMobileUI),
    textAlign: 'justify',
  },
  btn: {
    height: responsiveHeight(54),
    marginTop: responsiveHeight(60),
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
