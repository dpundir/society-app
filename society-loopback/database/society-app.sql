CREATE DATABASE  IF NOT EXISTS `society` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `society`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: society
-- ------------------------------------------------------
-- Server version	5.7.9-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accesstoken`
--

DROP TABLE IF EXISTS `accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accesstoken` (
  `id` varchar(255) NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesstoken`
--

LOCK TABLES `accesstoken` WRITE;
/*!40000 ALTER TABLE `accesstoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl`
--

DROP TABLE IF EXISTS `acl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(512) DEFAULT NULL,
  `property` varchar(512) DEFAULT NULL,
  `accessType` varchar(512) DEFAULT NULL,
  `permission` varchar(512) DEFAULT NULL,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl`
--

LOCK TABLES `acl` WRITE;
/*!40000 ALTER TABLE `acl` DISABLE KEYS */;
INSERT INTO `acl` VALUES (1,'Member','*','*','DENY','ROLE','$unauthenticated'),(2,'MemberDeposit','*','*','DENY','ROLE','$unauthenticated'),(3,'Address','*','*','DENY','ROLE','$unauthenticated'),(4,'TransactionHistory','*','*','DENY','ROLE','$unauthenticated'),(5,'Loan','*','*','DENY','ROLE','$unauthenticated'),(6,'MemberLoan','*','*','DENY','ROLE','$unauthenticated'),(7,'SocietyConfig','*','*','DENY','ROLE','$unauthenticated'),(8,'SocietyExpense','*','*','DENY','ROLE','$unauthenticated'),(9,'Member','*','*','DENY','ROLE','$everyone'),(10,'Member','*','*','ALLOW','ROLE','admin');
/*!40000 ALTER TABLE `acl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `address3` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='address details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'C-1431','lal bagh','loni','ghaziabad','uttar pradesh','201102'),(2,'C-12','lal bagh','loni','ghaziabad','uttar pradesh','201102'),(3,'B-5','kronos development center, okaya center','sector 62','noida','uttar pradesh','201301'),(9,'C-143','lal bagh','loni','ghaziabad','uttar pradesh','201102'),(12,'flat-1101','crossing replublic',NULL,'ghaziabad','uttar pradesh','201101'),(13,'C-143 LAL BAGH','LONI','','op','UTTAR PRADESH','201102'),(14,'b-301','bhood bharat nagar','','vijaynagar','UTTAR PRADESH','201101');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `memberid` int(11) NOT NULL,
  `active` binary(0) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `closedate` datetime DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `remamount` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `loan_member_id_idx` (`memberid`),
  CONSTRAINT `loan_member_id` FOREIGN KEY (`memberid`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) DEFAULT NULL,
  `mname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `addressid` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `dob` date NOT NULL,
  `deposit_id` int(11) DEFAULT NULL,
  `ffname` varchar(45) DEFAULT NULL,
  `fmname` varchar(45) DEFAULT NULL,
  `flname` varchar(45) DEFAULT NULL,
  `sex` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_address_id_idx` (`addressid`),
  KEY `member_deposit_id_idx` (`deposit_id`),
  CONSTRAINT `member_address_id` FOREIGN KEY (`addressid`) REFERENCES `address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `member_deposit_id` FOREIGN KEY (`deposit_id`) REFERENCES `member_deposit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='member details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'deepak','singh1','pundir','8287536955',1,'2015-11-13 00:00:00','2015-11-13 00:00:00',1,'1983-11-14',NULL,'surbir','singh','pundir','m'),(2,'debashis',NULL,'mishra','8882227771',2,'2015-11-30 00:00:00','2015-11-30 00:00:00',1,'1988-11-01',NULL,'d',NULL,'mishra','m'),(3,'neeraj','a','kumar','1287536955',9,'2015-11-13 00:00:00','2015-11-13 00:00:00',1,'1981-11-14',NULL,NULL,NULL,NULL,'m'),(4,'usha','','rawat','8287536955',13,'2015-12-27 00:00:00',NULL,NULL,'2001-11-15',NULL,'deepak','singh','pundir','f'),(5,'isha','','rawateee','9650111463',14,'2015-12-27 00:00:00',NULL,NULL,'2001-11-15',NULL,'makan','singh','pundir','f');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `member_address_view`
--

DROP TABLE IF EXISTS `member_address_view`;
/*!50001 DROP VIEW IF EXISTS `member_address_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `member_address_view` AS SELECT 
 1 AS `mid`,
 1 AS `mfname`,
 1 AS `mmname`,
 1 AS `mlname`,
 1 AS `mphone`,
 1 AS `mcreate_date`,
 1 AS `mmodified_date`,
 1 AS `mstatus`,
 1 AS `mdob`,
 1 AS `mdeposit_id`,
 1 AS `mffname`,
 1 AS `mfmname`,
 1 AS `mflname`,
 1 AS `aid`,
 1 AS `aaddress1`,
 1 AS `aaddress2`,
 1 AS `aaddress3`,
 1 AS `acity`,
 1 AS `astate`,
 1 AS `apincode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `member_deposit`
--

DROP TABLE IF EXISTS `member_deposit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_deposit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `share_value` double DEFAULT NULL,
  `installment_value` double DEFAULT NULL,
  `installment_freq` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='member deposit configuration';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_deposit`
--

LOCK TABLES `member_deposit` WRITE;
/*!40000 ALTER TABLE `member_deposit` DISABLE KEYS */;
INSERT INTO `member_deposit` VALUES (1,100,10,12);
/*!40000 ALTER TABLE `member_deposit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_loan`
--

DROP TABLE IF EXISTS `member_loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_loan` (
  `memberid` int(11) NOT NULL,
  `memberrefid1` int(11) NOT NULL,
  `loanid` int(11) NOT NULL,
  `memberrefid2` int(11) NOT NULL,
  PRIMARY KEY (`loanid`),
  KEY `m2m_member_id_idx` (`memberid`),
  KEY `m2m_loan_id_idx` (`loanid`),
  KEY `m2m_member_ref_id1_idx` (`memberrefid1`),
  KEY `m2m_member_ref_id2_idx` (`memberrefid2`),
  CONSTRAINT `m2m_loan_id` FOREIGN KEY (`loanid`) REFERENCES `loan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `m2m_member_id` FOREIGN KEY (`memberid`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `m2m_member_ref_id1` FOREIGN KEY (`memberrefid1`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `m2m_member_ref_id2` FOREIGN KEY (`memberrefid2`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_loan`
--

LOCK TABLES `member_loan` WRITE;
/*!40000 ALTER TABLE `member_loan` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin','admin user','2015-12-27 00:00:00','2015-12-27 00:00:00');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolemapping`
--

DROP TABLE IF EXISTS `rolemapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolemapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolemapping`
--

LOCK TABLES `rolemapping` WRITE;
/*!40000 ALTER TABLE `rolemapping` DISABLE KEYS */;
INSERT INTO `rolemapping` VALUES (1,'USER','1',1);
/*!40000 ALTER TABLE `rolemapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `society_config`
--

DROP TABLE IF EXISTS `society_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `society_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `value` double NOT NULL,
  `create_date` datetime NOT NULL,
  `expire_date` datetime DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `value2` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='society rules configuration details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `society_config`
--

LOCK TABLES `society_config` WRITE;
/*!40000 ALTER TABLE `society_config` DISABLE KEYS */;
INSERT INTO `society_config` VALUES (1,1,8,'2015-11-19 00:00:00',NULL,'share value interest rate',NULL),(2,2,6,'2015-11-19 00:00:00',NULL,'installment value interest rate',NULL),(3,3,2500,'2015-11-19 00:00:00',NULL,'minimum and maximum share value',50000),(4,4,500,'2015-11-19 00:00:00',NULL,'minimum and maximum installment value',50000);
/*!40000 ALTER TABLE `society_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `society_expense`
--

DROP TABLE IF EXISTS `society_expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `society_expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='society expense details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `society_expense`
--

LOCK TABLES `society_expense` WRITE;
/*!40000 ALTER TABLE `society_expense` DISABLE KEYS */;
/*!40000 ALTER TABLE `society_expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_history`
--

DROP TABLE IF EXISTS `transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `deposit_amount` double DEFAULT NULL,
  `penalty_amount` double DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `loan_id` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id_idx` (`member_id`),
  KEY `dh_loan_id_idx` (`loan_id`),
  CONSTRAINT `dh_loan_id` FOREIGN KEY (`loan_id`) REFERENCES `loan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='transaction history details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
INSERT INTO `transaction_history` VALUES (1,1,100,0,'2015-12-14 00:00:00',NULL,1),(2,1,10,0,'2015-12-14 00:00:00',NULL,1),(3,2,150,0,'2015-12-14 00:00:00',NULL,1);
/*!40000 ALTER TABLE `transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `credentials` text,
  `challenges` text,
  `email` varchar(512) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  `status` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `lastUpdated` datetime DEFAULT NULL,
  `memberid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,NULL,'$2a$10$JpdOdM461ByX.ximEuTyh.hPZydVw3JyKT26qdYbG/3VPXvojqB9C','null','null','pundir.friend@gmail.com',1,'1f7258a4216b44af66797aa6fc0553a7a32be8412ea50ea7746a344a756671431daf6bb41575c3b73bedab936ac8e10ada26beb4e9a88af3137f9a9d329500c4',NULL,NULL,NULL,1),(2,NULL,NULL,'$2a$10$IRL48tyo8QlU/Ol/vqAEIOOod8JovqjMljouJS9Fn20fS3KZuNh6q',NULL,NULL,'deepak.pundir@abcd.com',1,'8fe533fe616cc9af0a2e491858a807ea7c65bace073da7128605a3ba420caa64a44a0e3a909e62de29f09a669df76426ed83abe6aed95c8761505a821395f35e',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `member_address_view`
--

/*!50001 DROP VIEW IF EXISTS `member_address_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `member_address_view` AS (select `m`.`id` AS `mid`,`m`.`fname` AS `mfname`,`m`.`mname` AS `mmname`,`m`.`lname` AS `mlname`,`m`.`phone` AS `mphone`,`m`.`create_date` AS `mcreate_date`,`m`.`modified_date` AS `mmodified_date`,`m`.`status` AS `mstatus`,`m`.`dob` AS `mdob`,`m`.`deposit_id` AS `mdeposit_id`,`m`.`ffname` AS `mffname`,`m`.`fmname` AS `mfmname`,`m`.`flname` AS `mflname`,`a`.`id` AS `aid`,`a`.`address1` AS `aaddress1`,`a`.`address2` AS `aaddress2`,`a`.`address3` AS `aaddress3`,`a`.`city` AS `acity`,`a`.`state` AS `astate`,`a`.`pincode` AS `apincode` from (`member` `m` join `address` `a` on((`m`.`addressid` = `a`.`id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-29 23:00:45
