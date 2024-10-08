import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {ListOrders} from '../../components';
import {colors, fonts, getData, responsiveHeight} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {connect} from 'react-redux';
import {getListHistory} from '../../actions/HistoryAction';
import { RefreshControl } from 'react-native';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    getData('user').then(res => {
      const data = res;
      if (data) {
        this.setState({
          profile: data,
        });
        this.props.dispatch(getListHistory(data.uid));
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };

  handleRefresh = () => {
    this.setState({refreshing: true});
    // Setelah tindakan refresh selesai, set state refreshing menjadi false.
    // Ini akan memicu pemanggilan loadData untuk menjalankan ulang tindakan saat komponen dimuat ulang.
    this.setState({refreshing: false});
    this.loadData();
  };

  render() {
    const {profile} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <Text style={styles.title}>Orders</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              colors={[colors.primary]}
            />
          }>
          <View style={styles.container}>
            <View style={styles.listmenu}>
              {profile ? (
                <ListOrders navigation={navigation} />
              ) : (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect()(Orders);

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: RFValue(32, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: 'white',
    alignSelf: 'center',
    marginVertical: responsiveHeight(30),
    position: 'absolute',
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingBottom: 120,
    marginTop: responsiveHeight(100),
  },
  loading: {
    marginTop: responsiveHeight(350),
  },
});
