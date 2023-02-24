import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CardKeranjang from '../../kecil/CardKeranjang';

const ListKeranjang = ({
  getListKeranjangResult,
  getListKeranjangError,
  getListProdukResult,
  getListProdukError,
  produkList,
}) => {
  //mengambil jumlah item dalam keranjang
  let totalKeranjang = Object.keys(getListKeranjangResult.item).length;
  return (
    <View>
      {getListKeranjangResult && getListProdukResult ? (
        Object.keys(getListKeranjangResult.item).map((key) => {
          return (
            <CardKeranjang
              item={getListKeranjangResult.item[key]}
              keranjang={getListKeranjangResult}
              produkList={produkList}
              totalKeranjang={totalKeranjang}
              key={key}
              id={key}
            />
          );
        })
      ) : getListKeranjangError || getListProdukError ? (
        <Text>
          {getListKeranjangError && getListProdukError
            ? getListKeranjangError + ' ' + getListProdukError
            : getListKeranjangError
            ? getListKeranjangError
            : getListProdukError
            ? getListProdukError
            : null}
        </Text>
      ) : null}
    </View>
  );
};

export default ListKeranjang;

const styles = StyleSheet.create({});
