-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2020 at 06:20 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthcarems`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctorID` int(12) NOT NULL,
  `doctorCode` varchar(15) NOT NULL,
  `doctorName` varchar(20) NOT NULL,
  `doctorSpec` varchar(20) NOT NULL,
  `doctorCont` int(12) NOT NULL,
  `doctorAdd` varchar(30) NOT NULL,
  `doctorEmail` varchar(30) NOT NULL,
  `doctorHospital` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctorID`, `doctorCode`, `doctorName`, `doctorSpec`, `doctorCont`, `doctorAdd`, `doctorEmail`, `doctorHospital`) VALUES
(1, '001', 'U.M. Ekanayake', 'Pediatrician', 716552076, 'school lane, opanayaka', 'induwara@gmail.com', 'Ratnapura'),
(2, '002', 'L. Prabhashwara', 'Surgeon', 771459245, 'Main sterrt, Horana', 'prabhashwara@gmail.com', 'Horana'),
(5, '005', 'L. Dinusha', 'Radiologist', 714527862, 'Thalahena, Malabe', 'dinusha@gmail.com', 'Balangoda'),
(7, '006', 'K. Hansachandra', 'Oncologist', 784514785, 'Main street, Badulla.', 'ansachandra@gmail.com', 'Badula'),
(8, '007', 'P. Suran', 'Nephrologist', 717445717, 'Main street, Pelmadulla.', 'suran@gmail.com', 'Pelmadulla');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctorID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctorID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
