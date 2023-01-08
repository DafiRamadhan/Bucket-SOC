import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {fonts, getData, responsiveHeight, responsiveWidth} from '../../../utils';
import {IconClearText, IconSearch} from '../../../assets';
import {KeranjangIcon} from '../../kecil';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {changeFocus, deleteProdukFilter, searchProduk} from '../../../actions/ProdukAction';
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
    const {dispatch} = this.props;
    getData('user').then(res => {
      //cek apakah user sudah Login
      if (res) {
        //masuk ke KeranjangAction
        dispatch(getListKeranjang(res.uid));
      }
    });
  }

  onSubmit = keyword => {
    const {dispatch} = this.props;

    //jalankan agar jika ada kategori terfliter sebelumnya dapat direset
    dispatch(deleteProdukFilter());

    //jika keyword yang dimasukkan tidak kosong
    if (keyword.search) {
      //jalankan fungsi pada Action
      dispatch(searchProduk(keyword.search));
    } else {
      dispatch(deleteProdukFilter());
    }
  };

  //dijalankan ketika form search diklik
  changeSearch = () => {
    const {dispatch} = this.props;

    //menghapus props 'keyword' agar tidak aktif
    dispatch(deleteProdukFilter());
  };

  //dijalankan ketika icon clear diklik
  clearText = () => {
    const {dispatch} = this.props;
    this.setState({
      search: '',
    });
    dispatch(deleteProdukFilter());
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
    if(getListKeranjangResult) {
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
                onFocus={() => this.changeSearch()}
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
