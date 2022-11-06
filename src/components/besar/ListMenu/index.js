import { View } from 'react-native'
import React from 'react'
import { CardMenu } from '../../kecil'

//mengoper parameter pilihMenu dari halaman profile untuk dilakukan perulangan
const ListMenu = ({pilihMenu}) => {
  return (
    <View>
      {pilihMenu.map((menu) => {
        return <CardMenu pilihan={menu} key={menu.id} />
      })}
    </View>
  )
}

export default ListMenu