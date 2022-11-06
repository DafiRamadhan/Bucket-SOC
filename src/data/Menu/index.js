import React from 'react';
import { IconKontakKami, IconEditProfile, IconPassword, IconLogout } from '../../assets';

export const dummyMenu = [
  {
    id: 1,
    nama: 'Kontak Kami',
    gambar: <IconKontakKami />,
    halaman: 'KontakKami',
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
