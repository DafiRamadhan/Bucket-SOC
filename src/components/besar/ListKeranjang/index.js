import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardKeranjang from '../../kecil/CardKeranjang';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const ListKeranjang = ({daftarKeranjang}) => {
  return (
    
      <View>
        {daftarKeranjang.map(items => {
          return <CardKeranjang keranjang={items} key={items.id} />;
        })}
      </View>
    
  );
};

export default ListKeranjang

const styles = StyleSheet.create({
})