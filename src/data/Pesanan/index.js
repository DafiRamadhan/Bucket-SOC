import {Balon, Bunga, Uang, GiftBox} from '../../assets';
import {
  BuketBunga,
  BuketUang,
  BuketBalon,
  GiftSnack,
  GiftSnack2,
  BuketFlorist,
} from '../../assets';

export const dummyPesanan = [
  {
    id: 1,
    orderId: 'TEST-1665344489862-WVNecOR3xyVF8egAMAv4jtRNy0h1',
    tanggalPemesanan: 'Senin, 24 Oktober 2022',
    status: 'Selesai',
    totalHarga: 485000,
    ongkir: 15000,
    tanggalKirim: 'Rabu, 26 Oktober 2022',
    metodeKirim: 'Go-Send Instant',
    profile: {
      nama: 'Caerel Steven Chandra Ardhana',
      email: 'muhammaddafiramadhan@yahoo.com',
      nomerHp: '085886839034',
      alamat:
        'Gg. Delima VIII No.21, Jajar, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57144',
      detail_alamat: 'Samping warung Bu Tri',
      latitude: -7.575667,
      longitude: 110.824239,
    },
    items: [
      {
        id: 1,
        product: {
          id: 3,
          nama: 'Buket Bunga Mawar Asli',
          gambar: [BuketBunga],
          kategori: {
            id: 1,
            nama: 'Bunga',
            gambar: Bunga,
          },
          harga: 125000,
          deskripsi: 'Buket Bunga Mawar Asli',
          ready: true,
        },
        jumlahPesan: 1,
        totalHarga: 125000,
        catatan:
          'Mohon dikirim besok lusa tanggal 26 jam 9 pagi. Tolong sertakan kartu ucapan juga.',
      },
      {
        id: 2,
        product: {
          id: 5,
          nama: 'GiftBox Isi Snack Merah 10 Jenis',
          gambar: [GiftSnack, GiftSnack2],
          kategori: {
            id: 5,
            nama: 'GiftBox',
            gambar: GiftBox,
          },
          harga: 80000,
          deskripsi: 'GiftBox isi Snack Merah 10 Jenis Bebas Pilih',
          ready: true,
        },
        jumlahPesan: 2,
        totalHarga: 160000,
        catatan: null,
      },
      {
        id: 3,
        product: {
          id: 4,
          nama: 'Buket Balon Isi Florist Merah Replika',
          gambar: [BuketBalon],
          kategori: {
            id: 4,
            nama: 'Balon',
            gambar: Balon,
          },
          harga: 200000,
          deskripsi: 'Buket Balon dengan florist merah replika',
          ready: true,
        },
        jumlahPesan: 1,
        totalHarga: 200000,
        catatan: 'Tolong sertakan kartu ucapan kosong warna merah muda.',
      },
    ],
  },
  {
    id: 2,
    orderId: 'TEST-1665344489862-WVNecOR3xyVF8egAMAv4jtRNy0h1',
    tanggalPemesanan: 'Selasa, 25 Oktober 2022',
    status: 'Diproses',
    totalHarga: 810000,
    ongkir: 0,
    tanggalKirim: 'Rabu, 26 Oktober 2022',
    metodeKirim: 'Ambil di Toko',
    profile: {
      nama: 'Caerel Steven Chandra Ardhana',
      email: 'muhammaddafiramadhan@yahoo.com',
      nomerHp: '085886839034',
      alamat:
        'Gg. Delima VIII No.21, Jajar, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57144',
      detail_alamat: 'Samping warung Bu Tri',
      latitude: -7.575667,
      longitude: 110.824239,
    },
    items: [
      {
        id: 1,
        product: {
          id: 1,
          nama: 'Buket Uang Biru Muda 50 Ribu 10 Lembar',
          gambar: [BuketUang],
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
        jumlahPesan: 1,
        totalHarga: 550000,
        catatan: 'Isi Ucapan : Selamat atas keberhasilan Anda.',
      },
    ],
  },
  {
    id: 3,
    orderId: 'TEST-1665344489862-WVNecOR3xyVF8egAMAv4jtRNy0h1',
    tanggalPemesanan: 'Sabtu, 29 Oktober 2022',
    status: 'Menunggu Pembayaran',
    totalHarga: 420000,
    ongkir: 20000,
    tanggalKirim: 'Rabu, 2 November 2022',
    metodeKirim: 'GrabExpress Instant',
    profile: {
      nama: 'Caerel Steven Chandra Ardhana',
      email: 'muhammaddafiramadhan@yahoo.com',
      nomerHp: '085886839034',
      alamat:
        'Gg. Delima VIII No.21, Jajar, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57144',
      detail_alamat: 'Samping warung Bu Tri',
      latitude: -7.575667,
      longitude: 110.824239,
    },
    items: [
      {
        id: 1,
        product: {
          id: 5,
          nama: 'GiftBox Isi Snack Merah 10 Jenis',
          gambar: [GiftSnack, GiftSnack2],
          kategori: {
            id: 5,
            nama: 'GiftBox',
            gambar: GiftBox,
          },
          harga: 80000,
          deskripsi: 'GiftBox isi Snack Merah 10 Jenis Bebas Pilih',
          ready: true,
        },
        jumlahPesan: 2,
        totalHarga: 160000,
        catatan: null,
      },
      {
        id: 2,
        product: {
          id: 6,
          nama: 'Buket Florist Warna Warni Replika',
          gambar: [BuketFlorist],
          kategori: {
            id: 1,
            nama: 'Bunga',
            gambar: Bunga,
          },
          harga: 130000,
          deskripsi: 'Buket Florist',
          ready: true,
        },
        jumlahPesan: 2,
        totalHarga: 260000,
        catatan: 'Kirim besok rabu jam 10 pagi.',
      },
    ],
  },
];
