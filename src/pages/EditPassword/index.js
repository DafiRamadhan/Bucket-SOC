import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, getData, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Header, Inputan, Loading} from '../../components';
import {connect} from 'react-redux';
import { changePassword } from '../../actions/ProfileAction';

class EditPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {changePasswordResult} = this.props;
    if (
      changePasswordResult &&
      prevProps.changePasswordResult !== changePasswordResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      Alert.alert('Sukses', 'Update Password Berhasil!');
      this.props.navigation.goBack();
    }
  }

  validatePassword = password => {
    var validPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return validPassword.test(password);
  };

  onSubmit = () => {
    const {password, newPassword, newPasswordConfirm} = this.state;
    const {dispatch} = this.props;
    //cek jika seluruh form sudah diisi
    if (password && newPassword && newPasswordConfirm) {
      //cek jika password baru != confirm password baru
      if (newPassword !== newPasswordConfirm) {
        Alert.alert(
          'Error',
          'Password Baru dan Konfirmasi Password Baru harus sama!',
        );
        //jika format password baru tidak sesuai ketentuan
      } else if (!this.validatePassword(newPassword)) {
        Alert.alert(
          'Error',
          'Password harus terdiri dari minimal 8 karakter, mengandung huruf kecil, huruf besar, dan angka!',
        );
      } else {
        //Ambil data email dari AsyncStorage
        getData('user').then(res => {
          const data = {
            email: res.email,
            password: password,
            newPassword: newPassword,
          };
          //masuk ke changePassword Action
          dispatch(changePassword(data));
        });
      }
    } else {
      Alert.alert('Error', 'Seluruh data harus diisi!');
    }
  };

  render() {
    const {password, newPassword, newPasswordConfirm} = this.state;
    const {navigation, changePasswordLoading} = this.props;
    return (
      <View style={styles.pages}>
        <Header
          title="Edit Password"
          goBack={() => navigation.navigate('Profile')}
        />
        <View style={styles.container}>
          <View>
            <Inputan
              password
              label="Password Lama"
              value={password}
              onChangeText={password => this.setState({password})}
            />
            <Inputan
              password
              label="Password Baru"
              value={newPassword}
              onChangeText={newPassword => this.setState({newPassword})}
            />
            <Inputan
              password
              label="Konfirmasi Password Baru"
              value={newPasswordConfirm}
              onChangeText={newPasswordConfirm =>
                this.setState({newPasswordConfirm})
              }
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.simpan}
              onPress={() => this.onSubmit()}>
              <Text style={styles.simpanText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
        {changePasswordLoading ? <Loading /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  changePasswordLoading: state.ProfileReducer.changePasswordLoading,
  changePasswordResult: state.ProfileReducer.changePasswordResult,
  changePasswordError: state.ProfileReducer.changePasswordError,
});

export default connect(mapStateToProps, null)(EditPassword);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    marginHorizontal: responsiveWidth(25),
    flex: 1,
    justifyContent: 'space-between',
  },
  simpan: {
    height: responsiveHeight(54),
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveHeight(40),
  },
  simpanText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
});
