import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CardOrders } from '../../kecil'

const ListOrders = ({daftarPesanan, navigation}) => {
  return (
    <View>
      {daftarPesanan.map((items) => {
        return (
          <CardOrders pesanan={items} key={items.id} navigation={navigation} />
        );
      })}
    </View>
  )
}

export default ListOrders

const styles = StyleSheet.create({})