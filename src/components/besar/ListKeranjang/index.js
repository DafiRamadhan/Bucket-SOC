import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardKeranjang from '../../kecil/CardKeranjang';

const ListKeranjang = ({getListKeranjangResult, getListKeranjangError}) => {
  return (
    
      <View>
        {getListKeranjangResult ? (
          Object.keys(getListKeranjangResult.item).map((key) =>
          {
            return <CardKeranjang item={getListKeranjangResult.item[key]} keranjang={getListKeranjangResult} key={key} id={key} />
          })
        ) : getListKeranjangError ? (
          <Text>{getListKeranjangError}</Text>
        ) : null}
      </View>
    
  );
};

export default ListKeranjang

const styles = StyleSheet.create({
})