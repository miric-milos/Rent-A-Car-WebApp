-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2020 at 12:59 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentacar_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `automobili`
--

CREATE TABLE `automobili` (
  `id_auto` int(10) UNSIGNED NOT NULL,
  `model` varchar(23) COLLATE utf8_unicode_ci NOT NULL,
  `marka` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `godiste` int(4) NOT NULL,
  `kubikaza` int(4) NOT NULL,
  `karoserija` enum('Limuzina','Karavan','Hečbek','Kupe','Kabriolet','MiniVan','Džip','Pickup') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Limuzina',
  `gorivo` enum('Dizel','Benzin','Benzin+Gas (TNG)','Metan CNG','Električni pogon','Hibridni pogon') COLLATE utf8_unicode_ci NOT NULL,
  `pogon` enum('Prednji','Zadnji','','') COLLATE utf8_unicode_ci NOT NULL,
  `menjac` enum('Manualni','Automatik','','') COLLATE utf8_unicode_ci NOT NULL,
  `broj_vrata` int(8) NOT NULL,
  `putanja_slike` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cena_po_danu` int(11) NOT NULL,
  `obrisan` enum('0','1') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `automobili`
--

INSERT INTO `automobili` (`id_auto`, `model`, `marka`, `godiste`, `kubikaza`, `karoserija`, `gorivo`, `pogon`, `menjac`, `broj_vrata`, `putanja_slike`, `cena_po_danu`, `obrisan`) VALUES
(1, 'R8', 'Audi', 2009, 1969, 'Limuzina', 'Dizel', 'Prednji', 'Automatik', 5, 'audiR8.jpg', 75, '1'),
(2, 'Stilo', 'Fiat', 2003, 1623, 'Karavan', 'Benzin+Gas (TNG)', 'Prednji', 'Automatik', 5, 'fiatStiloJTD.jpg', 35, '1'),
(4, 'Duster', 'Dacia ', 2003, 1659, 'Karavan', 'Benzin+Gas (TNG)', 'Prednji', 'Manualni', 4, 'alfaGT.jpg', 40, '1'),
(6, 'Twingo', 'Renault', 2015, 999, 'Hečbek', 'Benzin', 'Prednji', 'Manualni', 3, 'renaultTwingo.jpg', 55, '0'),
(7, 'Citigo', 'Škoda', 2015, 999, 'Hečbek', 'Benzin', 'Prednji', 'Automatik', 5, 'skodaCitago.jpg', 60, '0'),
(8, 'up!', 'Volkswagen', 2016, 998, 'Hečbek', 'Benzin', 'Prednji', 'Automatik', 5, 'volkswagenUp.jpg', 50, '0'),
(9, 'i10', 'Hyundai', 2020, 1248, 'Hečbek', 'Benzin', 'Prednji', 'Automatik', 5, 'hyundaiI10.jpg', 75, '0'),
(10, 'Grande Punto', 'Fiat', 2009, 1368, 'Limuzina', 'Metan CNG', 'Prednji', 'Manualni', 5, 'fiatGrandePunto.jpg', 55, '0'),
(11, 'Sandero', 'Dacia', 2018, 898, 'Hečbek', 'Dizel', 'Prednji', 'Automatik', 5, 'daciaSandero.jpg', 70, '0'),
(12, 'Clio', 'Renault', 2010, 1461, 'Limuzina', 'Dizel', 'Prednji', 'Automatik', 5, 'renaultClio.jpg', 60, '0'),
(13, 'darko', 'mica', 2013, 668, 'Limuzina', 'Dizel', 'Prednji', 'Manualni', 3, 'fiat500.jpg', 65, '1'),
(14, 'Sandero', 'Dacia', 2018, 898, 'Hečbek', 'Dizel', 'Prednji', 'Automatik', 5, 'daciaSandero.jpg', 70, '1');

-- --------------------------------------------------------

--
-- Table structure for table `lokacije`
--

CREATE TABLE `lokacije` (
  `id_lokacije` int(10) UNSIGNED NOT NULL,
  `adresa` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `telefon` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `obrisan` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lokacije`
--

INSERT INTO `lokacije` (`id_lokacije`, `adresa`, `email`, `telefon`, `obrisan`) VALUES
(1, 'Ustanicka 23', 'ustanicka38@gmail.com', '3946562', '0'),
(2, 'Resavska 55', 'resavska@gmail.com', '3956265', '0'),
(3, 'Tekeriska 6', 'tekeriska@gmail.com', '3265154', '0'),
(4, 'Jovana Bjelica 69', 'bjelic@gmail.com', '54', '1'),
(5, 'Jovana Bjelica 69', 'bjelic@gmail.com', '5456998', '1');

-- --------------------------------------------------------

--
-- Table structure for table `nalozi`
--

CREATE TABLE `nalozi` (
  `id_naloga` int(10) UNSIGNED NOT NULL,
  `status` enum('korisnik','administrator') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'korisnik',
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `email_ad` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ime` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `prezime` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dat_rodj` date NOT NULL,
  `telefon` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `br_voz_dozvole` int(10) UNSIGNED NOT NULL,
  `obrisan` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nalozi`
--

INSERT INTO `nalozi` (`id_naloga`, `status`, `username`, `password`, `email_ad`, `ime`, `prezime`, `dat_rodj`, `telefon`, `br_voz_dozvole`, `obrisan`) VALUES
(1, 'korisnik', '', '', 'djurcicrudo@gmail.com', 'Marko', 'Markovic', '2020-01-15', '0632164998', 26356426, '0'),
(2, 'administrator', 'MileDizna123', '54150847', 'miledizna123@gmail.com', 'Mile', 'Diznanić', '1980-01-15', '060628632', 63251459, '0'),
(3, 'administrator', 'JocaKarburator123', '-745733994', 'jocakarbu@gmail.com', 'Joca', 'Karburatović', '1989-06-28', '062356655', 0, '0'),
(4, 'korisnik', '', '', 'jovanmaric@gmail.com', 'Jovan', 'Marić', '1966-02-26', '00626132668', 51234982, '0'),
(5, 'korisnik', 'AcaLukas123', '-849933571', 'acalukas@gmail.com', 'Aca', 'Lukas', '1967-06-28', '0623266595', 0, '1'),
(6, 'korisnik', '', '', 'dasdas@gmail.com', 'adasd', 'asdasdas', '1966-12-06', '00626656565', 23565475, '0'),
(8, 'korisnik', 'Darko321', '-590175503', 'djuricicrudo@gmail.com', 'Darko', 'Djuricic', '1991-02-04', '0653266598', 10000020, '0'),
(9, 'korisnik', 'Mitar123', '778326791', 'mitarmiric@gmail.com', 'Milos', 'Miric', '1991-10-16', '0653355626', 23554985, '0'),
(10, 'korisnik', 'Mitar123', '778326791', 'mitarmiric@gmail.com', 'Milos', 'Miric', '1991-10-16', '0653355626', 23554985, '0'),
(11, 'korisnik', 'Mitar123', '778326791', 'mitarmiric@gmail.com', 'Milos', 'Miric', '1991-10-16', '0653355626', 23554985, '0'),
(12, 'korisnik', 'Mitar123', '778326791', 'mitarmiric@gmail.com', 'Milos', 'Miric', '1991-10-16', '0653355626', 23554985, '0'),
(13, 'korisnik', 'Mitar123', '778326791', 'mitarmiric@gmail.com', 'Milos', 'Miric', '1991-10-16', '0653355626', 23554985, '0');

-- --------------------------------------------------------

--
-- Table structure for table `rezervacija`
--

CREATE TABLE `rezervacija` (
  `id_rezervacije` int(10) UNSIGNED NOT NULL,
  `id_auto` int(10) UNSIGNED NOT NULL,
  `id_naloga` int(10) UNSIGNED NOT NULL,
  `datum_od` date NOT NULL,
  `datum_do` date NOT NULL,
  `cena` decimal(10,0) UNSIGNED NOT NULL,
  `obrisan` enum('0','1') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rezervacija`
--

INSERT INTO `rezervacija` (`id_rezervacije`, `id_auto`, `id_naloga`, `datum_od`, `datum_do`, `cena`, `obrisan`) VALUES
(2, 2, 4, '2020-01-21', '2020-01-24', '105', '0'),
(3, 11, 6, '2020-01-22', '2020-01-29', '490', '0'),
(6, 10, 8, '2020-02-20', '2020-02-22', '110', '0'),
(11, 9, 8, '2020-02-20', '2020-02-22', '150', '0'),
(13, 11, 2, '2020-03-03', '2020-03-06', '210', '1'),
(14, 9, 2, '2020-02-26', '2020-02-29', '150', '1'),
(15, 6, 8, '2020-03-02', '2020-03-06', '220', '0'),
(16, 12, 9, '2020-02-27', '2020-02-29', '120', '0'),
(17, 11, 2, '2020-03-03', '2020-03-06', '210', '1'),
(18, 10, 2, '2020-02-24', '2020-02-25', '55', '0'),
(19, 9, 2, '2020-02-24', '2020-02-24', '75', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `automobili`
--
ALTER TABLE `automobili`
  ADD PRIMARY KEY (`id_auto`);

--
-- Indexes for table `lokacije`
--
ALTER TABLE `lokacije`
  ADD PRIMARY KEY (`id_lokacije`);

--
-- Indexes for table `nalozi`
--
ALTER TABLE `nalozi`
  ADD PRIMARY KEY (`id_naloga`);

--
-- Indexes for table `rezervacija`
--
ALTER TABLE `rezervacija`
  ADD PRIMARY KEY (`id_rezervacije`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `automobili`
--
ALTER TABLE `automobili`
  MODIFY `id_auto` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `lokacije`
--
ALTER TABLE `lokacije`
  MODIFY `id_lokacije` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `nalozi`
--
ALTER TABLE `nalozi`
  MODIFY `id_naloga` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `rezervacija`
--
ALTER TABLE `rezervacija`
  MODIFY `id_rezervacije` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
