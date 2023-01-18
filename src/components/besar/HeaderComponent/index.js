import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {fonts, getData, responsiveHeight, responsiveWidth} from '../../../utils';
import {IconClearText, IconSearch} from '../../../assets';
import {KeranjangIcon} from '../../kecil';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {changeFocus, deleteSearchFilter, searchProduk} from '../../../actions/ProdukAction';
import {connect} from 'react-redux';
import { getListKeranjang } from '../../../actions/KeranjangAction';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      getData('user').then(res => {
        //cek data user untuk mengambil jumlah produk di keranjang
        if (res) {
          //masuk ke KeranjangAction
          this.props.dispatch(getListKeranjang(res.uid));
        }
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onSubmit = keyword => {
    const {dispatch} = this.props;
    dispatch(searchProduk(keyword.search));
  };

  //dijalankan ketika icon clear diklik
  clearText = () => {
    const {dispatch} = this.props;
    this.setState({
      search: '',
    });
    dispatch(deleteSearchFilter());
  };

  //dijalankan ketika mengkilk form search dari halaman Home agar focus aktif
  focus = () => {
    const {dispatch} = this.props;
    dispatch(changeFocus());
  };

  render() {
    const {search} = this.state;
    const {navigation, page, isFocus, getListKeranjangResult} = this.props;
    let totalKeranjang;
    if (getListKeranjangResult) {
      //mengambil jumlah item dalam keranjang
      totalKeranjang = Object.keys(getListKeranjangResult.item).length;
    }
    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          {/* search bar */}
          <View style={styles.searchBar}>
            <IconSearch />
            {page === 'Bouquet' ? (
              <TextInput
                placeholder="Cari..."
                style={styles.input}
                value={search}
                autoFocus={isFocus === true ? true : false}
                onChangeText={search => {
                  this.setState({search});
                  this.onSubmit({search});
                }}
              />
            ) : (
              <TouchableOpacity
                style={styles.bar}
                onPress={() => {
                  navigation.navigate('Bouquet');
                  this.focus();
                }}>
                <TextInput
                  placeholder="Cari..."
                  style={styles.input}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            {/* Tombol Hapus Pencarian */}
            {search ? (
              <TouchableOpacity
                style={styles.iconClear}
                onPress={() => this.clearText()}>
                <IconClearText />
              </TouchableOpacity>
            ) : null}
          </View>
          {/* Tombol Keranjang */}
          <KeranjangIcon
            icon="keranjang2"
            totalKeranjang={totalKeranjang}
            onPress={() => navigation.navigate('Keranjang')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFocus: state.ProdukReducer.isFocus,
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
});

export default connect(mapStateToProps, null)(HeaderComponent);

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(90),
  },
  wrapperHeader: {
    marginTop: responsiveHeight(20),
    marginLeft: responsiveHeight(20),
    marginRight: responsiveHeight(30),
    marginBottom: responsiveHeight(20),

    flexDirection: 'row',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    paddingLeft: 12,
    borderRadius: 40,
    alignItems: 'center',
  },
  input: {
    fontSize: RFValue(18, heightMobileUI),
    width: responsiveWidth(250),
    fontFamily: fonts.primary.regular,
  },
  iconClear: {
    padding: 5,
  },
  bar: {
    flex: 1,
    height: '100%',
    borderRadius: 40,
  },
});
