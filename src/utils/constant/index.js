//ukuran lebar dan tinggi HP dari desain UI
export const heightMobileUI = 896;
export const widthMobileUI = 414;

export const API_TIMEOUT = 120000;

export const BITESHIP_API_KEY =
  'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGluZyIsInVzZXJJZCI6IjYzODc5NjViNTcyNGJjMjUwODRiYTAxZSIsImlhdCI6MTY2OTgzMDQxM30.l_aayhOYhf3AM7m6_BIUT0ETNzQMsSJmCEvbJj-Whdo';
export const BITESHIP_API_URL = 'https://api.biteship.com/v1/';
export const BITESHIP_API_HEADER = {
  'Authorization': BITESHIP_API_KEY,
  'Content-Type': 'application/json',
};

//SANDBOX
export const URL_MIDTRANS_SNAP = "https://app.sandbox.midtrans.com/snap/v1/"
export const URL_MIDTRANS_STATUS = "https://api.sandbox.midtrans.com/v2/"

//PRODUCTION
//export const URL_MIDTRANS_SNAP = "https://app.midtrans.com/snap/v1/transactions"
//export const URL_MIDTRANS_STATUS = "https://api.midtrans.com/v2/"

export const HEADER_MIDTRANS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Basic U0ItTWlkLXNlcnZlci1XV19XODdST2tGbnRKeUZlcllqN2VqY1Q=',
};

export var custom_bulan = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
export var custom_hari = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];