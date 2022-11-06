import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {CardKategori2} from '../../kecil';

//pilihKateogri dikirim dari halaman Home
const ListKategori2 = ({pilihKategori}) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {pilihKategori.map(buket => {
          return <CardKategori2 kategori={buket} key={buket.id} />;
        })}
      </View>
    </ScrollView>
  );
};

export default ListKategori2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
