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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl`
--

LOCK TABLES `acl` WRITE;
/*!40000 ALTER TABLE `acl` DISABLE KEYS */;
INSERT INTO `acl` VALUES (1,'Member','*','*','DENY','ROLE','$unauthenticated'),(2,'MemberDeposit','*','*','DENY','ROLE','$unauthenticated'),(3,'Address','*','*','DENY','ROLE','$unauthenticated'),(4,'TransactionHistory','*','*','DENY','ROLE','$unauthenticated'),(5,'Loan','*','*','DENY','ROLE','$unauthenticated'),(6,'MemberLoan','*','*','DENY','ROLE','$unauthenticated'),(7,'SocietyConfig','*','*','DENY','ROLE','$unauthenticated'),(8,'SocietyExpense','*','*','DENY','ROLE','$unauthenticated'),(9,'Member','*','*','DENY','ROLE','$everyone'),(10,'Member','*','*','ALLOW','ROLE','admin'),(11,'Member','*','*','ALLOW','ROLE','employee'),(12,'Member','count','*','ALLOW','ROLE','member'),(13,'Member','total','*','ALLOW','ROLE','member'),(14,'SocietyConfig','*','*','DENY','ROLE','$everyone'),(15,'SocietyConfig','*','*','ALLOW','ROLE','admin'),(16,'SocietyExpense','*','*','DENY','ROLE','$everyone'),(17,'SocietyExpense','*','*','ALLOW','ROLE','admin'),(18,'SocietyExpense','*','*','ALLOW','ROLE','employee'),(19,'SocietyConfig','*','READ','ALLOW','ROLE','employee');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='address details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'C-143','lal bag','loni','ghaziabad','uttar pradesh','201102'),(2,'C-12','lal bagh1111','loni','ghaziabad','uttar pradesh','201102'),(3,'B-5','kronos development center, okaya center','sector 62','noida','uttar pradesh','201301');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit`
--

DROP TABLE IF EXISTS `audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit` (
  `id` int(11) NOT NULL,
  `entity` int(11) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `entityId` int(11) DEFAULT NULL,
  `oldValue` varchar(45) DEFAULT NULL,
  `newValue` varchar(45) DEFAULT NULL,
  `fieldName` varchar(45) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='audit information for all entities';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit`
--

LOCK TABLES `audit` WRITE;
/*!40000 ALTER TABLE `audit` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entities`
--

DROP TABLE IF EXISTS `entities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entities` (
  `id` int(11) NOT NULL,
  `entityId` int(11) DEFAULT NULL,
  `entityName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='entity information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entities`
--

LOCK TABLES `entities` WRITE;
/*!40000 ALTER TABLE `entities` DISABLE KEYS */;
INSERT INTO `entities` VALUES (1,NULL,NULL),(2,NULL,NULL),(3,NULL,NULL),(4,NULL,NULL),(5,NULL,NULL),(6,NULL,NULL),(7,NULL,NULL),(8,NULL,NULL),(9,NULL,NULL),(10,NULL,NULL);
/*!40000 ALTER TABLE `entities` ENABLE KEYS */;
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
  `interest` double NOT NULL DEFAULT '0',
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (1,1,1,'2016-01-01 00:00:00','2016-01-31 00:00:00',10000,0,5400,NULL,2,3,NULL,1,0),(2,1,0,'2015-12-01 00:00:00','2016-02-28 00:00:00',20000,0,1900,NULL,3,2,NULL,6,0),(3,2,1,'2016-01-01 00:00:00','2016-01-31 00:00:00',15000,0,1400,NULL,1,3,NULL,3,0),(4,1,NULL,'2016-04-02 18:30:00','2016-12-01 18:30:00',10000,0,NULL,NULL,1,2,NULL,12,833.3333333333334),(5,1,NULL,'2016-04-21 18:30:00','2016-10-07 18:30:00',1800,0,NULL,NULL,2,3,NULL,12,150),(6,2,NULL,'2016-07-15 18:30:00','2016-09-09 18:30:00',190,0,NULL,NULL,3,1,NULL,12,15.833333333333334);
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
  `create_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `deposit_id` int(11) DEFAULT NULL,
  `deposit` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_deposit_id_idx` (`deposit_id`),
  KEY `member_person_id_idx` (`person_id`),
  CONSTRAINT `member_deposit_id` FOREIGN KEY (`deposit_id`) REFERENCES `member_deposit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `member_person_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='member details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2015-11-13 00:00:00','2016-08-21 08:07:00',1,1,120,1),(2,'2015-11-30 00:00:00','2016-08-21 08:07:42',1,3,1000,2),(3,'2015-11-13 00:00:00','2016-08-16 18:09:37',1,2,30,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='member deposit configuration';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_deposit`
--

LOCK TABLES `member_deposit` WRITE;
/*!40000 ALTER TABLE `member_deposit` DISABLE KEYS */;
INSERT INTO `member_deposit` VALUES (1,1000,100,12),(2,1000,100,3),(3,100,100,1),(4,1000,100,1);
/*!40000 ALTER TABLE `member_deposit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_nominee`
--

DROP TABLE IF EXISTS `member_nominee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_nominee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` int(11) DEFAULT NULL,
  `nomineeId` int(11) DEFAULT NULL,
  `relation` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nominee_memberId_idx` (`memberId`),
  KEY `nominee_nomineeId_idx` (`nomineeId`),
  CONSTRAINT `nominee_memberId` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `nominee_nomineeId` FOREIGN KEY (`nomineeId`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='member nominee relations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_nominee`
--

LOCK TABLES `member_nominee` WRITE;
/*!40000 ALTER TABLE `member_nominee` DISABLE KEYS */;
INSERT INTO `member_nominee` VALUES (1,1,2,3),(2,2,1,2);
/*!40000 ALTER TABLE `member_nominee` ENABLE KEYS */;
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
  `status` int(1) DEFAULT NULL,
  `addressid` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `dob` date NOT NULL,
  `ffname` varchar(45) DEFAULT NULL,
  `fmname` varchar(45) DEFAULT NULL,
  `flname` varchar(45) DEFAULT NULL,
  `sex` int(1) DEFAULT NULL,
  `marital_status` int(1) DEFAULT NULL,
  `profile_photo_name` varchar(45) DEFAULT NULL,
  `guardian_type` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_address_id_idx` (`addressid`),
  CONSTRAINT `person_address_id` FOREIGN KEY (`addressid`) REFERENCES `address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='person details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'deepak','singh','pundir','9910995165',1,1,'2015-11-13 00:00:00','2016-08-21 08:07:00','1983-06-17','surbir','singh','pundir',0,1,'userProfile.jpeg',1),(2,'Usha','Deepak','pundir','9910995165',1,2,'2015-11-30 00:00:00','2016-08-21 08:07:42','1983-06-17','Deepak','singh','pundir',1,1,'userProfile.jpeg',2),(3,'Neeraj','A','Kumar','9910995165',1,3,'2015-11-13 00:00:00','2016-07-31 15:21:16','1983-06-17','Neeraj','J','Kumar',1,1,NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin','user as admin','2015-12-27 00:00:00','2015-12-27 00:00:00'),(2,'employee','user as employee','2015-12-27 00:00:00','2015-12-27 00:00:00'),(3,'member','user as member','2015-12-27 00:00:00','2015-12-27 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolemapping`
--

LOCK TABLES `rolemapping` WRITE;
/*!40000 ALTER TABLE `rolemapping` DISABLE KEYS */;
INSERT INTO `rolemapping` VALUES (1,'USER','1',1),(2,'USER','2',2),(3,'USER','3',3);
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
  `name` varchar(45) NOT NULL,
  `type` int(11) NOT NULL,
  `value` double NOT NULL,
  `create_date` datetime NOT NULL,
  `expire_date` datetime DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `history_remark` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='society rules configuration details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `society_config`
--

LOCK TABLES `society_config` WRITE;
/*!40000 ALTER TABLE `society_config` DISABLE KEYS */;
INSERT INTO `society_config` VALUES (1,'shareInterestRate',1,8,'2015-11-19 00:00:00',NULL,'share value interest rate',''),(2,'depInterestRate',2,6,'2015-11-19 00:00:00',NULL,'installment value interest rate',''),(3,'minShareValue',3,2500,'2015-11-19 00:00:00',NULL,'minimum share value',''),(4,'minDepositValue',4,500,'2015-11-19 00:00:00',NULL,'minimum installment value',''),(5,'maxShareValue',3,50000,'2015-11-19 00:00:00',NULL,'maximum share value',''),(6,'maxDepositValue',4,50000,'2015-11-19 00:00:00',NULL,'maximum installment value',''),(7,'loanInterestRate',5,10,'2015-11-19 00:00:00',NULL,'Loan interest rate','');
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
  `debit_amount` double DEFAULT NULL,
  `credit_amount` double DEFAULT NULL,
  `description` varchar(50) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='society expense details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `society_expense`
--

LOCK TABLES `society_expense` WRITE;
/*!40000 ALTER TABLE `society_expense` DISABLE KEYS */;
INSERT INTO `society_expense` VALUES (1,10,NULL,'expense 1','2016-04-08 00:00:00'),(2,NULL,10,'income 1','2016-04-08 00:00:00'),(3,NULL,10,'income 1','2016-04-08 00:00:00'),(4,NULL,100,'income 1','2016-04-08 00:00:00'),(5,NULL,110,'income 2','2016-04-08 00:00:00'),(6,103,NULL,'expense 3','2016-04-08 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='transaction history details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
INSERT INTO `transaction_history` VALUES (1,1,100,0,'2015-12-14 00:00:00',NULL,1,NULL),(2,1,10,0,'2015-12-19 00:00:00',NULL,1,NULL),(3,2,150,0,'2015-12-24 00:00:00',NULL,1,NULL),(4,2,10,0,'2016-01-01 00:00:00',NULL,1,'deposit 1'),(5,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(6,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(7,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(8,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(9,1,100,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(10,1,1000,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(11,1,100,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(12,1,1000,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(13,1,10,0,'2016-01-01 00:00:00',NULL,1,'deposit'),(14,1,20,0,'2016-01-01 00:00:00',NULL,1,'deposit 3'),(15,1,40,0,'2016-01-01 00:00:00',NULL,1,'deposit4'),(16,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(17,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(18,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(19,1,101,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(20,1,10,0,'2016-03-08 00:00:00',NULL,2,'saving installment'),(21,1,10,0,'2016-03-08 00:00:00',NULL,1,'saving installment'),(22,3,10,1,'2016-07-31 00:00:00',NULL,1,'saving installment');
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
  `member_id` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'dpundir','$2a$10$JpdOdM461ByX.ximEuTyh.hPZydVw3JyKT26qdYbG/3VPXvojqB9C','null','null','pundir.friend@gmail.com',1,'1f7258a4216b44af66797aa6fc0553a7a32be8412ea50ea7746a344a756671431daf6bb41575c3b73bedab936ac8e10ada26beb4e9a88af3137f9a9d329500c4','1',NULL,NULL,1,1),(2,NULL,'irawat','$2a$10$chnrD2/JMeex4XxxX2blCudoG1EefqrvL/D6DAfunweqDSwHAQ2F6',NULL,NULL,'isharawat88@gmail.com',1,'48d5bbb5ff0bcb82d9caee8d78c0dee8f0baf43c873be3dd9be3d253f5c2d5503ef9156b608026fa8da158b33986b24a866181d21212786c38a0b0b04a325672','1',NULL,NULL,NULL,2),(3,NULL,'dmishra','$2a$10$Env9w6ZgIvCoJbUPY7EKYOheQ//Hcy1a5edeUiIuEIGi944szwBMC',NULL,NULL,'jitu.debashis@gmail.com',1,'a360d1b1b6ce67bf962e0222251c959a1b1a6b0d9140eda776b8246176f717fcdfab147c79674c340c34f1ad66f9234745fa4086f204e7c69bbd0426e317e89b',NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2016-09-24 21:53:40
