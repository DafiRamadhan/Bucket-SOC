import { Text, StyleSheet, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { dummyPesanan } from '../../data'
import { ListOrders } from '../../components'
import { colors, fonts, responsiveHeight } from '../../utils'
import { RFValue } from 'react-native-responsive-fontsize'
import { heightMobileUI } from '../../utils/constant'

export default class Orders extends Component {
constructor(props) {
  super(props)

  this.state = {
     pesanan: dummyPesanan
  }
}

  render() {
    const {pesanan} = this.state
    const {navigation} = this.props
    return (
      <View style={styles.pages}>
        <Text style={styles.title}>Orders</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.listmenu}>
              <ListOrders daftarPesanan={pesanan} navigation={navigation}/>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    //flex: 1,
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
  listmenu: {
    //marginTop: responsiveHeight(7),
  },
});
