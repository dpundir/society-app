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
INSERT INTO `accesstoken` VALUES ('S8uT328O64haYYa1Os8QJp6Cgapz00pDaM73NSWpQ1YE8ZWcK180yI8bnP3iKtoe',600,'2016-12-18 13:52:14',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl`
--

LOCK TABLES `acl` WRITE;
/*!40000 ALTER TABLE `acl` DISABLE KEYS */;
INSERT INTO `acl` VALUES (1,'Address','*','*','DENY','ROLE','$unauthenticated'),(2,'Audit','*','*','DENY','ROLE','$unauthenticated'),(3,'Entity','*','*','DENY','ROLE','$everyone'),(4,'Entity','*','*','ALLOW','ROLE','admin'),(5,'Loan','*','*','DENY','ROLE','$unauthenticated'),(6,'Member','*','*','DENY','ROLE','$unauthenticated'),(7,'Member','*','*','DENY','ROLE','$everyone'),(8,'Member','*','*','ALLOW','ROLE','admin'),(9,'Member','*','*','ALLOW','ROLE','employee'),(10,'Member','count','*','ALLOW','ROLE','member'),(11,'Member','total','*','ALLOW','ROLE','member'),(12,'MemberDeposit','*','*','DENY','ROLE','$unauthenticated'),(13,'MemberNominee','*','*','DENY','ROLE','$unauthenticated'),(14,'Person','*','*','DENY','ROLE','$unauthenticated'),(15,'Role','*','*','DENY','ROLE','$unauthenticated'),(16,'RoleMapping','*','*','DENY','ROLE','$unauthenticated'),(17,'SocietyConfig','*','*','DENY','ROLE','$unauthenticated'),(18,'SocietyConfig','*','*','DENY','ROLE','$everyone'),(19,'SocietyConfig','*','*','ALLOW','ROLE','admin'),(20,'SocietyConfig','*','READ','ALLOW','ROLE','employee'),(21,'SocietyExpense','*','*','DENY','ROLE','$unauthenticated'),(22,'SocietyExpense','*','*','DENY','ROLE','$everyone'),(23,'SocietyExpense','*','*','ALLOW','ROLE','admin'),(24,'SocietyExpense','*','*','ALLOW','ROLE','employee'),(25,'TransactionHistory','*','*','DENY','ROLE','$unauthenticated'),(26,'user','*','*','DENY','ROLE','$everyone'),(27,'user','*','*','ALLOW','ROLE','admin');
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
INSERT INTO `address` VALUES (1,'C-143','lal bagh','loni','ghaziabad','uttar pradesh','201102'),(2,'B-303','lal bagh1111','loni','ghaziabad','uttar pradesh','201102'),(3,'B-5','kronos development center, okaya center','sector 62','noida','uttar pradesh','201301');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit`
--

DROP TABLE IF EXISTS `audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entity_id` int(11) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `context_id` int(11) DEFAULT NULL,
  `old_value` varchar(100) DEFAULT NULL,
  `new_value` varchar(100) DEFAULT NULL,
  `field_name` varchar(45) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entity_idx` (`entity_id`),
  CONSTRAINT `entity` FOREIGN KEY (`entity_id`) REFERENCES `entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `entity`
--

DROP TABLE IF EXISTS `entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entity` (
  `id` int(11) NOT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `entity_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='entity information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity`
--

LOCK TABLES `entity` WRITE;
/*!40000 ALTER TABLE `entity` DISABLE KEYS */;
INSERT INTO `entity` VALUES (1,1,'address'),(2,2,'loan'),(3,3,'member'),(4,4,'member_deposit'),(5,5,'member_nominee'),(6,6,'person'),(7,7,'role'),(8,8,'rolemapping'),(9,9,'society_config'),(10,10,'society_expense');
/*!40000 ALTER TABLE `entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `active` int(11) DEFAULT NULL,
  `interest_rate` double NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `close_date` datetime DEFAULT NULL,
  `amount` double NOT NULL,
  `interest` double NOT NULL DEFAULT '0',
  `amount_paid` double DEFAULT NULL,
  `interest_paid` double DEFAULT NULL,
  `member_refid1` int(11) NOT NULL,
  `member_refid2` int(11) NOT NULL,
  `last_installment` datetime DEFAULT NULL,
  `frequency` int(11) NOT NULL,
  `installment` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `loan_member_id_idx` (`member_id`),
  KEY `loan_member_ref_id1_idx` (`member_refid1`),
  KEY `loan_member_ref_id2_idx` (`member_refid2`),
  CONSTRAINT `loan_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `loan_member_ref_id1` FOREIGN KEY (`member_refid1`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `loan_member_ref_id2` FOREIGN KEY (`member_refid2`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
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
  `create_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `deposit_id` int(11) DEFAULT NULL,
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
INSERT INTO `member` VALUES (1,'2015-11-13 00:00:00','2016-09-29 15:21:30',1,1,1),(2,'2015-11-30 00:00:00','2016-12-07 17:26:04',1,3,2),(3,'2015-11-13 00:00:00','2016-08-16 18:09:37',1,2,3);
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
  `share_value` double DEFAULT '0',
  `installment_value` double DEFAULT '0',
  `installment_freq` int(11) DEFAULT NULL,
  `deposit` double DEFAULT '0',
  `kalyan_fund` double DEFAULT '0',
  `building_fund` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='member deposit configuration';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_deposit`
--

LOCK TABLES `member_deposit` WRITE;
/*!40000 ALTER TABLE `member_deposit` DISABLE KEYS */;
INSERT INTO `member_deposit` VALUES (1,1000,100,1,0,0,0),(2,500,500,2,0,0,0),(3,1000,1000,4,0,0,0);
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
  `first_name` varchar(45) DEFAULT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `status` int(1) DEFAULT NULL,
  `address_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `dob` date NOT NULL,
  `father_first_name` varchar(45) DEFAULT NULL,
  `father_middle_name` varchar(45) DEFAULT NULL,
  `father_last_name` varchar(45) DEFAULT NULL,
  `mother_first_name` varchar(45) DEFAULT NULL,
  `mother_middle_name` varchar(45) DEFAULT NULL,
  `mother_last_name` varchar(45) DEFAULT NULL,
  `sex` int(1) DEFAULT NULL,
  `marital_status` int(1) DEFAULT NULL,
  `profile_photo_name` varchar(45) DEFAULT NULL,
  `guardian_type` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_address_id_idx` (`address_id`),
  CONSTRAINT `person_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='person details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'deepak','singh','pundir','8287536955',1,1,'2015-11-13 00:00:00','2016-09-29 15:21:30','1983-06-17','surbir','singh','pundir',NULL,NULL,NULL,0,1,'userProfile.jpeg',1),(2,'Usha','','pundir','9910995165',1,2,'2015-11-30 00:00:00','2016-12-07 17:26:04','1983-06-17','Deepak','singh','pundir','Sushila',NULL,'Devi',1,1,NULL,2),(3,'Debashis','','Mishra','9910995165',1,3,'2015-11-13 00:00:00','2016-07-31 15:21:16','1983-06-17','D','K','Mishra',NULL,NULL,NULL,1,1,'userProfile_1480785686413.jpeg',1);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_identity`
--

DROP TABLE IF EXISTS `person_identity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person_identity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `identity_number` varchar(45) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_identity`
--

LOCK TABLES `person_identity` WRITE;
/*!40000 ALTER TABLE `person_identity` DISABLE KEYS */;
/*!40000 ALTER TABLE `person_identity` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='society rules configuration details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `society_config`
--

LOCK TABLES `society_config` WRITE;
/*!40000 ALTER TABLE `society_config` DISABLE KEYS */;
INSERT INTO `society_config` VALUES (1,'shareInterestRate',1,8,'2015-11-19 00:00:00',NULL,'share value interest rate'),(2,'depInterestRate',2,6,'2015-11-19 00:00:00',NULL,'installment value interest rate'),(3,'minShareValue',3,2500,'2015-11-19 00:00:00',NULL,'minimum share value'),(4,'minDepositValue',4,500,'2015-11-19 00:00:00',NULL,'minimum installment value'),(5,'maxShareValue',3,50000,'2015-11-19 00:00:00',NULL,'maximum share value'),(6,'maxDepositValue',4,50000,'2015-11-19 00:00:00',NULL,'maximum installment value'),(7,'loanInterestRate',5,13.2,'2015-11-19 00:00:00',NULL,'Loan interest rate'),(8,'maxRunningLoan',1,3,'2015-11-19 00:00:00',NULL,'maximum running loan for member'),(9,'maxReferLoan',1,2,'2015-11-19 00:00:00',NULL,'maximum number of loan a member can refer');
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
  `interest_amount` double DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='transaction history details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
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
INSERT INTO `user` VALUES (1,NULL,'dpundir','$2a$10$JpdOdM461ByX.ximEuTyh.hPZydVw3JyKT26qdYbG/3VPXvojqB9C','null','null','pundir.friend@gmail.com',1,'1f7258a4216b44af66797aa6fc0553a7a32be8412ea50ea7746a344a756671431daf6bb41575c3b73bedab936ac8e10ada26beb4e9a88af3137f9a9d329500c4','1',NULL,NULL,1,1),(2,NULL,'irawat','$2a$10$chnrD2/JMeex4XxxX2blCudoG1EefqrvL/D6DAfunweqDSwHAQ2F6',NULL,NULL,'isharawat88@gmail.com',1,'48d5bbb5ff0bcb82d9caee8d78c0dee8f0baf43c873be3dd9be3d253f5c2d5503ef9156b608026fa8da158b33986b24a866181d21212786c38a0b0b04a325672','1',NULL,NULL,21,2),(3,NULL,'dmishra','$2a$10$Env9w6ZgIvCoJbUPY7EKYOheQ//Hcy1a5edeUiIuEIGi944szwBMC',NULL,NULL,'jitu.debashis@gmail.com',1,'a360d1b1b6ce67bf962e0222251c959a1b1a6b0d9140eda776b8246176f717fcdfab147c79674c340c34f1ad66f9234745fa4086f204e7c69bbd0426e317e89b','2',NULL,NULL,NULL,14);
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

-- Dump completed on 2016-12-18 19:28:06
