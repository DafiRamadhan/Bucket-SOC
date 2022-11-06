import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CardBuket } from '../../kecil'

const ListBuket = ({pilihBuket, navigation}) => {
  return (
    <View style={styles.container}>
      {pilihBuket.map((item) => {
        return (
            <CardBuket buket={item} key={item.id} navigation={navigation}/>
        )
      })}
    </View>
  )
}

export default ListBuket

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});