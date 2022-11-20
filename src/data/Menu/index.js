import React from 'react';
import {Linking} from 'react-native';
import { IconKontakKami, IconEditProfile, IconPassword, IconLogout } from '../../assets';

export const Menu = [
  {
    id: 1,
    nama: 'Kontak Kami',
    gambar: <IconKontakKami />,
    halaman: 'whatsapp://send?phone=6288225276534',
    // "whatsapp://send?text=" + msg + "&phone=" + mobile
  },
  {
    id: 2,
    nama: 'Edit Profile',
    gambar: <IconEditProfile />,
    halaman: 'EditProfile',
  },
  {
    id: 3,
    nama: 'Edit Password',
    gambar: <IconPassword />,
    halaman: 'EditPassword',
  },
  {
    id: 4,
    nama: 'Keluar',
    gambar: <IconLogout />,
    halaman: 'Login',
  },
];
