import { Balon, Bunga, Snack, Uang, GiftBox } from '../../assets';
import { BuketBunga, BuketUang, BuketSnack, BuketBalon, GiftSnack, BuketFlorist } from '../../assets';

export const dummyBuket = [
  {
    id: 1,
    nama: 'Buket Uang Biru Muda 50 Ribu 10 Lembar',
    gambar: BuketUang,
    kategori: {
      id: 2,
      nama: 'Uang',
      gambar: Uang,
    },
    harga: 550000,
    deskripsi:
      'Buket uang 500 ribu 10 lembar warna biru muda dengan replika bunga dan tambahan pita. Pemesanan minimal dilakukan H-1. Terima pengiriman kurir atau ambil sendiri di toko kami. SIlakan tulis di catatan untuk isi kartu ucapan.',
    ready: true,
  },
  {
    id: 2,
    nama: 'Buket Snack Merah 6 Jenis',
    gambar: BuketSnack,
    kategori: {
      id: 3,
      nama: 'Snack',
      gambar: Snack,
    },
    harga: 75000,
    deskripsi: 'Bebas Pilih 6 snack merah silahkan tulis  di notes',
    ready: true,
  },
  {
    id: 3,
    nama: 'Buket Bunga Mawar Asli',
    gambar: BuketBunga,
    kategori: {
      id: 1,
      nama: 'Bunga',
      gambar: Bunga,
    },
    harga: 125000,
    deskripsi: 'Buket Bunga Mawar Asli',
    ready: true,
  },
  {
    id: 4,
    nama: 'Buket Balon Isi Florist Merah Replika',
    gambar: BuketBalon,
    kategori: {
      id: 4,
      nama: 'Balon',
      gambar: Balon,
    },
    harga: 200000,
    deskripsi: 'Buket Balon dengan florist merah replika',
    ready: true,
  },
  {
    id: 5,
    nama: 'GiftBox Isi Snack Merah 10 Jenis',
    gambar: GiftSnack,
    kategori: {
      id: 5,
      nama: 'GiftBox',
      gambar: GiftBox,
    },
    harga: 80000,
    deskripsi: 'GiftBox isi Snack Merah 10 Jenis Bebas Pilih',
    ready: true,
  },
  {
    id: 6,
    nama: 'Buket Florist Warna Warni Replika',
    gambar: BuketFlorist,
    kategori: {
      id: 1,
      nama: 'Bunga',
      gambar: Bunga,
    },
    harga: 130000,
    deskripsi: 'Buket Florist',
    ready: true,
  },
];
