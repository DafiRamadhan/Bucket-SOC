import { View } from 'react-native'
import React from 'react'
import { CardMenu } from '../../kecil'

//mengoper parameter pilihMenu dari halaman profile untuk dilakukan perulangan
const ListMenu = ({pilihMenu, admin, navigation}) => {
  return (
    <View>
      {pilihMenu.map((menu) => {
        return <CardMenu pilihan={menu} admin={admin} key={menu.id} navigation={navigation}/>
      })}
    </View>
  )
}

export default ListMenu