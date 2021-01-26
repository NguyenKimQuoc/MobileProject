-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2020 at 12:12 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mygarden`
--

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `id` tinyint(2) NOT NULL,
  `name` varchar(20) COLLATE utf8_vietnamese_ci NOT NULL,
  `stt` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`id`, `name`, `stt`) VALUES
(1, 'light1', 0),
(2, 'pump1', 1),
(3, 'fan', 1);

-- --------------------------------------------------------

--
-- Table structure for table `plant`
--

CREATE TABLE `plant` (
  `id` tinyint(2) NOT NULL,
  `name` varchar(20) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `datebegin` date DEFAULT NULL,
  `dateend` date DEFAULT NULL,
  `wateringtime1` tinyint(2) DEFAULT NULL,
  `wateringtime2` tinyint(2) DEFAULT NULL,
  `wateringtime3` tinyint(2) DEFAULT NULL,
  `wateringoff` tinyint(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `plant`
--

INSERT INTO `plant` (`id`, `name`, `datebegin`, `dateend`, `wateringtime1`, `wateringtime2`, `wateringtime3`, `wateringoff`) VALUES
(1, 'Cây nào', '2020-05-17', '2020-05-18', 3, 1, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `id` tinyint(2) NOT NULL,
  `name` varchar(20) COLLATE utf8_vietnamese_ci NOT NULL,
  `value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`id`, `name`, `value`) VALUES
(1, 'temp', 37),
(2, 'humi', 101),
(3, 'groundhumi', 100);

-- --------------------------------------------------------

--
-- Table structure for table `wateringtimecheck`
--

CREATE TABLE `wateringtimecheck` (
  `id` tinyint(5) NOT NULL,
  `time` tinyint(5) NOT NULL,
  `checktime1` tinyint(1) NOT NULL,
  `checktime2` tinyint(1) NOT NULL,
  `checktime3` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `wateringtimecheck`
--

INSERT INTO `wateringtimecheck` (`id`, `time`, `checktime1`, `checktime2`, `checktime3`) VALUES
(1, 4, 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plant`
--
ALTER TABLE `plant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wateringtimecheck`
--
ALTER TABLE `wateringtimecheck`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device`
--
ALTER TABLE `device`
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `plant`
--
ALTER TABLE `plant`
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sensor`
--
ALTER TABLE `sensor`
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wateringtimecheck`
--
ALTER TABLE `wateringtimecheck`
  MODIFY `id` tinyint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
