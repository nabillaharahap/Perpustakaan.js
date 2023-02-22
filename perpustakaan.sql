-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2023 at 06:48 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_buku`
--

CREATE TABLE `data_buku` (
  `id_buku` int(11) NOT NULL,
  `judul_buku` varchar(255) NOT NULL,
  `jumlah_halaman_buku` int(11) NOT NULL,
  `keterangan_kondisi_buku` enum('Rusak','Baru') NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_buku`
--

INSERT INTO `data_buku` (`id_buku`, `judul_buku`, `jumlah_halaman_buku`, `keterangan_kondisi_buku`, `image`) VALUES
(2, 'bulan', 123, 'Baru', ''),
(4, 'malam', 912, 'Rusak', ''),
(7, 'Hello Cello', 876, 'Baru', 'image-1676949413199.jpeg'),
(8, 'Hello Cello', 700, 'Baru', 'image-1676949406809.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `data_siswa`
--

CREATE TABLE `data_siswa` (
  `id_siswa` int(11) NOT NULL,
  `nama_siswa` varchar(255) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `no_absen` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_siswa`
--

INSERT INTO `data_siswa` (`id_siswa`, `nama_siswa`, `kelas`, `no_absen`, `email`, `password`) VALUES
(1, 'biwla', 'xir6', 10, '', ''),
(7, 'lilali', '12r6', 10, 'lilahitaalla@.com', '81dc9bdb52d04dc20036dbd8313ed055'),
(8, 'Aurora', '11r1', 5, 'auroras@.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(9, 'Nuevida', '11r3', 23, 'Nuenue@.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(10, 'daniel', 'xir3', 5, 'daniel@.com', '827ccb0eea8a706c4c34a16891f84e7b');

-- --------------------------------------------------------

--
-- Table structure for table `detail_peminjaman`
--

CREATE TABLE `detail_peminjaman` (
  `id_peminjaman` int(11) NOT NULL,
  `id_buku` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_peminjaman`
--

INSERT INTO `detail_peminjaman` (`id_peminjaman`, `id_buku`) VALUES
(27, 2),
(27, 3),
(28, 2),
(28, 3),
(29, 3),
(29, 4),
(30, 3),
(30, 4),
(31, 3),
(31, 4),
(32, 2),
(32, 4),
(33, 2),
(33, 4),
(35, 2),
(35, 4),
(36, 4),
(36, 4),
(37, 4),
(37, 4);

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id_peminjaman` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_petugas` int(11) NOT NULL,
  `tgl_peminjaman` date NOT NULL,
  `tgl_pengembalian` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `peminjaman`
--

INSERT INTO `peminjaman` (`id_peminjaman`, `id_siswa`, `id_petugas`, `tgl_peminjaman`, `tgl_pengembalian`) VALUES
(25, 1, 1, '2023-02-09', '2023-02-11'),
(26, 1, 1, '2023-02-09', '2023-02-11'),
(27, 1, 1, '2023-02-09', '2023-02-11'),
(28, 1, 1, '2023-02-09', '2023-02-11'),
(29, 1, 1, '2023-02-09', '2023-02-11'),
(30, 1, 1, '2023-02-09', '2023-02-13'),
(31, 1, 1, '2023-02-09', '2023-02-14'),
(32, 1, 1, '2023-02-14', '2023-02-14'),
(33, 1, 1, '2023-02-15', '2023-02-14'),
(35, 6, 1, '2023-02-16', '2023-02-17'),
(36, 6, 1, '2023-02-16', '2023-02-17'),
(37, 7, 1, '2023-02-21', '2023-02-17');

-- --------------------------------------------------------

--
-- Table structure for table `petugas`
--

CREATE TABLE `petugas` (
  `id_petugas` int(11) NOT NULL,
  `nama_petugas` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(2002) NOT NULL,
  `no_telp` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `petugas`
--

INSERT INTO `petugas` (`id_petugas`, `nama_petugas`, `username`, `password`, `no_telp`) VALUES
(1, 'biya', 'biyayaya', '827ccb0eea8a706c4c34a16891f84e7b', '08812345678'),
(3, 'milo', 'milooooo', '827ccb0eea8a706c4c34a16891f84e7b', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_buku`
--
ALTER TABLE `data_buku`
  ADD PRIMARY KEY (`id_buku`);

--
-- Indexes for table `data_siswa`
--
ALTER TABLE `data_siswa`
  ADD PRIMARY KEY (`id_siswa`);

--
-- Indexes for table `detail_peminjaman`
--
ALTER TABLE `detail_peminjaman`
  ADD KEY `id_peminjaman` (`id_peminjaman`),
  ADD KEY `id_buku` (`id_buku`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id_peminjaman`),
  ADD KEY `id_siswa` (`id_siswa`),
  ADD KEY `id_petugas` (`id_petugas`);

--
-- Indexes for table `petugas`
--
ALTER TABLE `petugas`
  ADD PRIMARY KEY (`id_petugas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_buku`
--
ALTER TABLE `data_buku`
  MODIFY `id_buku` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `data_siswa`
--
ALTER TABLE `data_siswa`
  MODIFY `id_siswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id_peminjaman` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `petugas`
--
ALTER TABLE `petugas`
  MODIFY `id_petugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
