import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { CardKategori } from '../../kecil'
import { responsiveWidth } from '../../../utils';

//pilihKateogri dikirim dari halaman Home
const ListKategori = ({pilihKategori}) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {pilihKategori.map(buket => {
          return <CardKategori kategori={buket} key={buket.id} />;
        })}
      </View>
    </ScrollView>
  );
}

export default ListKategori

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveWidth(20),
  },
});