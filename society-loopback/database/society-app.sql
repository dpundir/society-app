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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='address details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'C-1431','lal bagh','loni','ghaziabad','uttar pradesh','201102'),(2,'C-12','lal bagh','loni','ghaziabad','uttar pradesh','201102'),(3,'B-5','kronos development center, okaya center','sector 62','noida','uttar pradesh','201301'),(9,'C-143','lal bagh','loni','ghaziabad','uttar pradesh','201102'),(12,'flat-1101','crossing replublic',NULL,'ghaziabad','uttar pradesh','201101'),(13,'C-143 LAL BAGH','LONI','','op','UTTAR PRADESH','201102'),(14,'b-301','bhood bharat nagar','','vijaynagar','UTTAR PRADESH','201101'),(15,'B-201','sec-91','','faridabad','haryana','400101'),(16,'E-80 Munirka Village','munirka village','','Delhi','Delhi','110067');
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
  `active` int(11) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `closedate` datetime DEFAULT NULL,
  `amount` double NOT NULL,
  `interest` double NOT NULL,
  `amount_paid` double DEFAULT NULL,
  `interest_paid` double DEFAULT NULL,
  `memberrefid1` int(11) NOT NULL,
  `memberrefid2` int(11) NOT NULL,
  `last_installment` datetime DEFAULT NULL,
  `frequency` int(11) NOT NULL,
  `installment` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `loan_member_id_idx` (`memberid`),
  KEY `loan_member_ref_id1_idx` (`memberrefid1`),
  KEY `loan_member_ref_id2_idx` (`memberrefid2`),
  CONSTRAINT `loan_member_id` FOREIGN KEY (`memberid`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `loan_member_ref_id1` FOREIGN KEY (`memberrefid1`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `loan_member_ref_id2` FOREIGN KEY (`memberrefid2`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (1,1,1,'2016-01-01 00:00:00','2016-01-31 00:00:00',10000, NULL,5400, NULL,2,3, NULL, NULL, NULL),(2,1,0,'2015-12-01 00:00:00','2016-02-28 00:00:00',20000, NULL,1900, NULL,3,2, NULL, NULL, NULL),(3,2,1,'2016-01-01 00:00:00','2016-01-31 00:00:00',15000, NULL,1400, NULL,1,3, NULL, NULL, NULL);
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
  `create_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `deposit_id` int(11) DEFAULT NULL,
  `deposit` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `nominee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_deposit_id_idx` (`deposit_id`),
  KEY `member_person_id_idx` (`person_id`),
  KEY `member_nominee_id_idx` (`nominee_id`),
  CONSTRAINT `member_deposit_id` FOREIGN KEY (`deposit_id`) REFERENCES `member_deposit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `member_nominee_id` FOREIGN KEY (`nominee_id`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `member_person_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='member details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'deepak','singh1','pundir','8287536955','2015-11-13 00:00:00','2015-11-13 00:00:00',1,1,100,1,1),(2,'debashis',NULL,'mishra','8882227771','2015-11-30 00:00:00','2015-11-30 00:00:00',1,NULL,1000,2,2),(3,'neeraj','a','kumar','1287536955','2015-11-13 00:00:00','2015-11-13 00:00:00',1,2,20,3,3),(4,'usha','pundir','rawat','8287536951','2016-01-03 17:14:37','2016-01-03 17:14:37',NULL,NULL,NULL,4,3);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) DEFAULT NULL,
  `mname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `addressid` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `dob` date NOT NULL,
  `ffname` varchar(45) DEFAULT NULL,
  `fmname` varchar(45) DEFAULT NULL,
  `flname` varchar(45) DEFAULT NULL,
  `sex` char(1) NOT NULL,
  `marital_status` int(1) DEFAULT NULL,
  `relation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_address_id_idx` (`addressid`),
  CONSTRAINT `person_address_id` FOREIGN KEY (`addressid`) REFERENCES `address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='person details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'deepak','singh','pundir','8287536951',1,1,'2015-11-13 00:00:00','2015-11-13 00:00:00','1983-11-14','surbir','singh','pundir','m',1,NULL),(2,'debashis',NULL,'mishra','8882227771',1,2,'2015-11-30 00:00:00','2015-11-30 00:00:00','1988-11-01','d',NULL,'mishra','m',1,NULL),(3,'neeraj','a','kumar','1287536955',1,9,'2015-11-13 00:00:00','2015-11-13 00:00:00','1981-11-14',NULL,NULL,NULL,'m',NULL,NULL),(4,'usha','rawat','pundir','8287536951',NULL,16,'2016-01-03 17:14:35','2016-01-03 17:14:36','1988-01-15','deepak','singh','pundir','f',1,NULL);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
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
  `remarks` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id_idx` (`member_id`),
  KEY `dh_loan_id_idx` (`loan_id`),
  CONSTRAINT `dh_loan_id` FOREIGN KEY (`loan_id`) REFERENCES `loan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='transaction history details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
INSERT INTO `transaction_history` VALUES (1,1,100,0,'2015-12-14 00:00:00',NULL,1,NULL),(2,1,10,0,'2015-12-19 00:00:00',NULL,1,NULL),(3,2,150,0,'2015-12-24 00:00:00',NULL,1,NULL),(4,1,10,0,'2016-01-01 00:00:00',NULL,1,'deposit 1'),(5,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(6,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(7,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(8,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(9,1,100,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(10,1,1000,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(11,1,100,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(12,1,1000,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(13,1,10,0,'2016-01-01 00:00:00',NULL,1,'deposit'),(14,1,20,0,'2016-01-01 00:00:00',NULL,1,'deposit 3'),(15,1,40,0,'2016-01-01 00:00:00',NULL,1,'deposit4'),(16,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(17,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(18,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(19,1,101,0,'2016-01-02 00:00:00',NULL,1,'saving installment');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,NULL,'$2a$10$JpdOdM461ByX.ximEuTyh.hPZydVw3JyKT26qdYbG/3VPXvojqB9C','null','null','pundir.friend@gmail.com',1,'1f7258a4216b44af66797aa6fc0553a7a32be8412ea50ea7746a344a756671431daf6bb41575c3b73bedab936ac8e10ada26beb4e9a88af3137f9a9d329500c4',NULL,NULL,NULL,1),(2,NULL,NULL,'$2a$10$IRL48tyo8QlU/Ol/vqAEIOOod8JovqjMljouJS9Fn20fS3KZuNh6q',NULL,NULL,'deepak.pundir@abcd.com',1,'8fe533fe616cc9af0a2e491858a807ea7c65bace073da7128605a3ba420caa64a44a0e3a909e62de29f09a669df76426ed83abe6aed95c8761505a821395f35e',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-04  0:21:58
