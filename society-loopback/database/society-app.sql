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
INSERT INTO `accesstoken` VALUES ('0d3TVhkDYiTbGu2AsMhzz7e1mP7dyMznMS95rGaw8WhI0P1IrerwTrvlBQn77cqR',600,'2016-03-08 17:02:55',1),('1WtpRmOEHAEOB6trF0WGLxKQr6ytB0YKSA9dc9CCwZdDmlGMsExhroHDWEAvCwNn',600,'2016-03-10 06:50:03',1),('2i9UPF7qDErHwntiSQv2XjYKypx2G50EyeDtxJs04Pj3C0KviWtqxgpx1loMQBle',600,'2016-02-08 15:35:12',1),('2wt9OmohesAAPMQr9qFVBdCQmaRc7Ei1RtBM16vAkYKRbjTYR3Y2cTjDh1kWs2Vz',600,'2016-02-21 17:26:48',1),('2xuCBvZ9ZWWqTfoyGQ35iYNzwLOTSeTsNWqJw8XurJFjzjWRFCMaMr5IJeMBCnss',600,'2016-03-10 18:16:25',1),('450DxgH3HWnGrT3AKLc9DYVuOWQkPjZcV8lXEnLkpJXKwFbTag7X2EIeKjXBU8QP',600,'2016-02-21 18:19:58',1),('4SZSKGFyqF67h4RiRu4nk3s4pA1moWd36ri5lsl6HESiMl33Ls99CqUQuDF8Zboe',600,'2016-02-02 17:19:11',1),('5epLWIRGsoOwAk5gQA6k8vp9yFm3OIGgFXTHS0Ee8DCS3eEJAjBwXcIddyhaVPCj',600,'2016-03-24 15:41:05',1),('5gE6pgssaLHHeVGTk1ZiCqccJU5I0TVzqpS8Fp3b69SY7xuljeODxx8qZPy5eH5E',600,'2016-02-04 06:26:54',1),('5hUOlp8gYq74M2WBur95o2hvbhTXAP2dE1qP30ka6hvHI75goREjwBIAgl9V4RGe',600,'2016-03-24 16:12:40',1),('5xxDWEOK2Ow1NXBmRUlzxAzhQN67GDvRGEHwZR10KotA3uvtpPdOhK278DtQK98i',600,'2016-02-22 07:08:25',1),('64cBFqz0FeQ9GkCZYbcgnASoX7VP3vsyox2KUuE7wHxWCcNt9YgZt1ECcdv6doer',600,'2016-03-25 06:34:25',1),('6BOedJ4cId4tSPPkkLDCCZbWyit4aMTSVzzwzkENBHFlwuwbXoiTtNHckSOQPK53',600,'2016-02-22 11:18:59',1),('6PvN5zrM5x6hcZjiC266usXDrkOPprCMxMPO4iqWyeYtFP8KxIEHWvPIOY2iO1ub',600,'2016-02-02 18:22:47',1),('9n5eNgS7gHiICroIxFA32gC7k7FpwkvJz50ajECxcrsnCO2Jy8l3asIMDEywuoW1',600,'2016-03-25 14:47:30',1),('9sE3gRvjBdbAr2nBPdv5ODFmu6s5o6MI93Hp4pMMjYWsjSOYCOCLSu9d15ISbyb3',600,'2016-03-26 09:13:13',1),('A9mf3eDseg6PfqkoV2YZPzbeJVtI4kyYWJVQAHVDWjkoQ1Doh5a1VpkIY2kpQsaC',600,'2016-03-25 06:11:44',1),('aEOQ3AZpizDAVhZ2XZpnLvhhJp3BLYOQoY9sHcnLAgweDpR5dx9qnDDcU1xDAFSb',600,'2016-03-25 07:31:27',1),('aGEoUK9ur3UoX9BZ3jarxHGuzCwNyvysLOa7rF7jCYChBDHHcSABFPOUUtM6rG1x',600,'2016-03-25 15:23:07',1),('AXz3jA7CfPBOj6IvB1kM1XiDU47F485QmbKaIeCgkPObpS3MUbnYXTjtHHqk1xol',600,'2016-01-21 16:35:42',1),('B5DqnoFGO9cvwZNx55THRCdMe0H9p26frx1GtLFawJZ1hPYdzyskBPwOB42TXPCM',600,'2016-03-10 17:03:48',1),('BGz5Vt6G4DrqkXIOi43l4rhJyqW3xTLaCV9A3x98DuBXrWpneNzxOaJBMIxQatUo',600,'2016-03-10 18:04:25',1),('bJanlwjGcVbw6bFoyJ0i0yUUn2Oy2craRG8ktoL4vlnaArk7yu0NJrXN47HpXMS0',600,'2016-02-21 18:49:28',1),('BLOgJVq2uiNEGDiUjXGxruiAwtaYWXSBj2cNDgjNmovAn73q4NR30YqvbDxEGRzR',600,'2016-03-10 06:39:26',1),('BvuKvAYKglPeKbmuMILWGOV0g7Dltl6q8daKhcRuiHKAZ41rP4b22sTK1YCF4cdq',600,'2016-02-24 18:01:22',1),('CgUwGuIpxgy2nOfSD2dsIUumS54Iz4j67JPJ5joZwiGmbprzWuZIl5NoIiHCoawF',600,'2016-03-16 17:41:56',2),('CoaVYR3Dk9BcXznL16qtPIrzwRW335XoZe9yBFPsa2qYH5mBPG7L0wqraImzQo61',600,'2016-03-25 07:06:41',1),('cQwjDRDNCVPl8yjeckz5CqEDdVXRRTBKxI1zDBtza1TEbTEQYyE9cHlTWbDcvhzR',600,'2016-03-25 07:17:17',1),('CRAWmonEf3fK8k1TnU3t1CZWTBjN5gHF2GqLawp67TAUYkXQ3ffZL0PEimlmGIRc',600,'2016-03-07 05:47:20',1),('D8WCh5oTNCavq060vMaA5E4mrLW9nhxC8o6412KRAOuakSEbBb5Dsula79AFHalO',600,'2016-03-25 08:00:16',1),('DfBsjpt6nXCzXMvB6whkHEKzNWAI5PVimesOmFUVuD47QnhjYrGtPbIDEUgCxmwB',600,'2016-03-08 16:10:57',1),('dGCmiWiYxje1uBpB4V9HTcOmjbjevE3GrSljRHEgSYomnPtKOJ8sYiYbc7ARApZQ',600,'2016-02-18 16:52:08',1),('EEnwiQXlyJR89lXIiDEPA0D4dnU6wWNtt3v0DGAJLexlptbYadUgrKzWDDr18YF1',600,'2016-02-17 15:49:19',1),('EgWoq9Rz5Fu5kRNbbrsM9OyOsMWuFQPcklukF14WNLRuG9ozvPoV2Mi1N5NJtfUh',600,'2016-03-10 17:31:18',1),('ehv9DdOxGtjq7bAnBW5PI7mmEeasL5EkqmiOcaibIioncXSDsgooEmOnYCOFDuBS',600,'2016-03-25 08:11:43',1),('etHOIyD7TKmDx0EZ9PbfPXnY8p6NfT8U0DrNN9lRhHaVJTT2P4KkQW6viQHhcXL9',600,'2016-02-04 05:55:19',1),('EwHHvTiZ6SXsNMwsR0iVWMeoPNvrHAuv5OW9nP0OIPzyTiGRGqXfHghmJ2gJF1M6',600,'2016-02-04 07:04:51',1),('EZPyS1pfhlOilrf9U7KmTXdFtCg4GG0P8C65vVS49gFAfL0tGZ4q9x4qJ8vcwxpk',600,'2016-02-22 06:19:17',1),('F0o4M3wUz5GH0LkYKj4l5dcFkUkgNdixoqP0wex93RYlTzpijpLChyf6HvzzBQMF',600,'2016-02-21 18:09:23',1),('f328pbUjIDPDlwSHssmAncfGhn2eFUN4Kz2X3tUApEpm6oWYSIYHK0JnO6IFCWkv',600,'2016-02-18 15:28:52',1),('FQsbevpd3KFuouCiwn9qih4xqYG5YNgFXJYdMHRDeR0D8nrc4I2R3gnsxEv4ZJZz',600,'2016-02-22 11:57:37',1),('gkvHUCDgkl0IGwU3eAcKtK679ixBbRoagGwv2VHgdI9zzZnNJ1X8BHWt9jXHMmFz',600,'2016-03-26 09:32:50',1),('gnGTD2vHNu38o8VfV9RGnEvJfqPUz465lTcbsliBLjjOR5d2BAFUrHrk4gS9Aht6',600,'2016-02-17 17:08:51',1),('GuTiDS0jnD4FeXifuCEYhSdBv1wRSxAdnn3japSkmFJs4PI2Yx2jy3EEAM1aMSlK',600,'2016-02-02 16:53:36',1),('h68tqf1ztlJl3Ha85N1fVvNbeAG0z6QUoU7ACChsse63Rc4kCS8NPADOE1yB9bao',600,'2016-03-26 09:32:37',1),('h9QAEvvwpSmbEDTRnaMQVXabkOt4ThlFWjrVrkZqtfF0c3zWxRofiMqNqJzzZGvs',600,'2016-02-08 15:58:45',1),('HB3a3Dk4PdBufrQFmOPe28s9hjHQi92NynhxFFSeeOh6FHXcDQXjyxGDNL26YPH7',600,'2016-02-21 15:24:24',1),('ixg1HNioHEToYi8pQMnMxkS763ZYenfav4B6kvb0YK1Wj1QijwGuqvP8xdBbCoj7',600,'2016-03-25 07:45:45',1),('jt8QLifgK0e8nuLIj0Sb53jASfo20LjWAGqCCmSxp7h6tkW7jf6uSFlHqxgLHYl2',600,'2016-03-25 15:07:38',1),('KFA9mjrdcD1bd5ui8jL4DoSGe1Iu9oEzmANlfKK7YHICPSavAufEpC2m9yZfbLWb',600,'2016-01-21 17:14:36',1),('KGsXwaVJFzmDkidSba28DvAFFBoQ0oxIdqiYqXX65H9DmthbbYroLtq41lCznMFR',600,'2016-03-11 05:52:41',1),('L7saFtJEqPNiO7YlhpItk2ZnX5egHDOYvtbcO2LEweJ330nyCzVf22BJwnJNm9JT',600,'2016-02-17 16:56:40',1),('L9NVWvQ1JXBPAgF7MMyIrtWbzlXXjP0GwttqUk3KEq4Nu9vwJUbN1IbfOJcY2iTC',600,'2016-03-18 06:24:22',1),('lBzBx31WO2BEiRn3qgeTcOHQ1DEKTXXVTtZmasJV2EyLF5UYjXT6ePCSWUS5u8NM',600,'2016-02-02 18:11:06',1),('LoUVEDQyRhYJgNCFId94NwAGw5esIdXlCwxSq7GKkuxUDEotsAyVDkH5v1E9Txly',600,'2016-02-22 07:07:36',1),('lsaOE7uXsugTDD2FqupAxcP6Ip4yVCYdwuUtfa2EWJcCy9ZfUczgaPBlXYzRlFxx',600,'2016-02-24 15:02:00',1),('LUS9DKI85xB2i1hWCrFtAzrH4B0LpE86LZWOCNGOzhGDYx1wAB5bPjjirMUzZy5i',600,'2016-02-08 15:12:40',1),('nPTdQbCrbKoJ94iwGhCZkjerfA7BWCw6sxarXIwOtHXGZTTz6SDPNTixPZIMVA8U',600,'2016-02-04 06:53:45',1),('OKRCuisGOuoK9BNTVIQdl0EsunJ889D1KBFkSxAYQPzP4bCns672UVYEi4ghheHD',600,'2016-02-04 06:13:03',1),('OUFcPVvYmSyu7QlIrKL7QpQkoeEDBOaTMaFc8cBii64kuGZAlPSt5epvfUnszD1I',600,'2016-02-22 12:20:25',1),('P6oEVuJxR5O8RXKKPgvDzmbmZZgPbQEQ87vZEpEGPhIYqD2hN6Y37FGYLw51ZYVm',600,'2016-03-26 09:43:30',1),('PTszyrz1sUq85jJQhDQNkLNMHbi2HLTkPqDwj5PrROFnwLN0JRYluXBT8WCfEyuG',600,'2016-03-24 16:32:20',1),('puMRxmlI5mmKEc3l1dHiqYjctE2a6vKjsmIdZkBuT8aBYuFgj8ojuLk8Yi78MBeT',600,'2016-02-17 16:26:50',1),('PVc362Un2EEgBlqBg5AKMMysglbz03J3nP06C7JtLaUNH036VqXk47BtlnBW3eTl',600,'2016-03-23 16:30:02',1),('q0KId6gE7TGd0fEyGPccvO7Q6MINFFmFP3pHED3bbUcCZDBWA68BGzxRGW7iSHSE',600,'2016-03-16 17:03:16',1),('qbTHohA7SZtmok2QVHXnhTCb5qsuZZIx8wp5bmtoU0FUBOgcz5sHnDDVNhf7Qsbf',600,'2016-02-18 16:37:31',1),('qIbUwJTiSSxjOcGRekZZzjwaLd2HyWBvi8ZmGdJZDkf8BYIi6BCMWnhVEenw3jBL',600,'2016-02-08 15:33:48',1),('qmU7jSj68sXav3WLBrfcYbHjDIlj5C1cIq5OnLXpSAoBJqtfLudp7Ky76iqU50GD',600,'2016-03-25 06:23:03',1),('qTwLxD0khL7xJ9HOx1ztthQwp2fxQX39Suv8MoTQRsymnoVFEGhUWi3dfUaHC60T',600,'2016-02-02 17:52:14',1),('RdnMxwCjXHqjXMydPv16eAbu5oDHrKZAtbR2H78Pw3UsNEh68tAcc8S439PJAC28',600,'2016-02-21 17:38:14',1),('rNORpa9Ib3iWkQoFG0iZz0CZ6yo7xXn6ypKIRGsgFUmCqOdP3FFNFiiA2Nj0sv3h',600,'2016-03-11 06:36:46',1),('RpkJoesUcdza3IZ41gGyUAYMDTCjiLrCtzsTQgHFqyel7tFpL75s1AfMnNmjsNGm',600,'2016-02-24 17:20:52',1),('RVKFm3dRmOFvDPKWxWyGqu3Ur6WDqCWPD18HpH9erVI6m3T8fMajDtOSVfQDcldO',600,'2016-02-02 17:35:00',1),('TGCI21noA8TS2dCKQ1Z4BgvBWRbA8FysEka7W0NKiFOSCueZTC6AzwXGES4so2L5',600,'2016-03-08 16:37:38',1),('ThYKHfPBAyhxnCVnCfOgiFUQ0Gq6IclG1PEyZqoUbkwvxRsiGqc4FyuGrJFuO3AD',600,'2016-02-22 16:07:30',1),('TjnHfwQvKGyrloyAQOEWmycmX27XVsCAdxE11nByVWcQQQeJXoORCXRB3uLGGGf9',600,'2016-02-18 17:05:37',1),('tmBAAHxfyGFaceE1ogWxlzSd0wHIUIPsc3yk1lTUoVgPbAkTSuWPhp86gFCJ1kLJ',600,'2016-03-25 14:10:41',1),('tQb1MGvvBGJkip3M9yjHVpxTUKD3U8mNwRdU0kvWIzJU9H1F22UNPepbvXQkCA8Q',600,'2016-03-08 16:00:10',1),('U9NelZBsHhJY8eoGl76uGwtbkgqZqXsjXex77KMBpNM7rhrFmXDm0biHv2YcYE8w',600,'2016-02-21 18:29:51',1),('UGkzB7nalXAm0MMpCPBC4lmMYRawmqm7GbUYV7Y2rtJEf0Nj4w4QJRHjGlr0QNEC',600,'2016-03-13 15:49:00',1),('UQlYccr0K0dDFxPMDAr5fYe1k1qzs9UcPZruSJNGmeGvsb2WIr7HqWhMEVSWxDwr',600,'2016-01-17 17:11:16',1),('usYy7RafH3y7SnIRNU2IHlIdkWWBQNU1o0muyd1w5AXFYRPz8JpqZPSM1yXm2IVg',600,'2016-03-13 17:38:02',2),('uvXLqRrqtxP3ekuPHRx865yt8vc4aX69XEwo7pnCakyJRq29NZYjhS9CjLDijbMl',600,'2016-02-02 17:04:47',1),('VcVgPXQCQyiCt6XHGOH2hCwcPdKEBye2GX2BCmCNxnRJUPRyIzyG1hC148mOi9QC',600,'2016-03-24 15:53:13',1),('VHN1QB9lChATD2usg0OTWgDNCt1eg3WzhSPdVG7wJfAsARGuSjzTqLEu50R9O09x',600,'2016-03-08 16:21:59',1),('vqf2ZcfkM9d3AdFjd4zXI4lMKLoVArIGtDFe7grxKj83jtUGmH4JtTQvx7xFrAN1',600,'2016-02-18 17:32:11',1),('Wd6EICTavMgXZORF2wibcAlvNBJPeG9lfN76H2DbufIqZNPusLjTJik113fH7ocv',600,'2016-03-25 06:56:31',1),('wf3SfB7GlgUxygs4jKIywIh46Iq4pSy48NlCvk5HaxtKLKccmCDkDJFnHEzwVI0X',600,'2016-02-17 16:42:29',1),('XdZeJIP1KwxjZQDE3pym8Tv99ga96yucAdqxbgahMeDPjvGFpAE1yHfSy5DOdFSu',600,'2016-02-02 17:05:34',1),('XfgHGvIVGd2eAx446Ngx5nxwGMo2eW9JFeIJK3QzUWZ7Iak3Xe2FeNRbFamSmt0l',600,'2016-02-18 16:08:51',1),('XJlfg7ZWByfC4VBP0a1CG0ODGbuArL9taVZl50ukoHF80VWXJkwzrikfrw41MsTK',600,'2016-03-08 16:50:51',1),('XoETj1MKiPQlbkwObCzzQVhfNxqRfRwYzZg4DY2jhjXaTBZUXnXKApcFmJZVTmZP',600,'2016-02-17 17:41:46',1),('xoodORGzUK8ABUQoPjiNGv3AMYMJLIPQEu5zb6sx0xiQEtyoAOwputEbp6P3qozQ',600,'2016-03-11 06:26:22',1),('ylcmIqe1LEfsQNAS8wHJfpMV4IWfN0Lw2m1GhSzQa3urzqDxqgQUZyBkvrZYcOhX',600,'2016-02-21 18:45:02',1),('ynI7qvBBsQLRvzpLRRboKCkDdaCJMtnHEsFnIRPhsNGGRzPwKjWqOIuOv4AtTKfh',600,'2016-03-10 17:42:34',1),('ywByQaKg1jP4lV2ygDnVQg5UpgxBThgwtDJJ2XI6JJwTVTnSPytb2Kxp6agYz3xv',600,'2016-02-21 15:13:33',1),('zABrtBLOvpKE8IlyuYazsuGWewyZG2Q02EyOAaIRcFwvFqRbmP4luQhc9C6gLGkh',600,'2016-02-21 16:45:52',1),('ZlMuAVKaJEbjL8cgHBK0m9GQhR6GBsiByuVsBdgtAX8CEc80GTelzqoUs3gPbuMY',600,'2016-02-17 17:24:17',1),('ZloecNvPd4aSDVcVJl4gSmPvu7A5HQKbLvVyJqZNptBOkfDJuKCRTwctlKcxQ1KW',600,'2016-02-17 16:11:46',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='address details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'C-143','lal bag','loni','ghaziabad','uttar pradesh','201102'),(2,'C-12','lal bagh1111','loni','ghaziabad','uttar pradesh','201102'),(3,'B-5','kronos development center, okaya center','sector 62','noida','uttar pradesh','201301'),(9,'C-143','lal bagh','loni','ghaziabad','uttar pradesh','201102'),(12,'flat-1101','crossing replublic',NULL,'ghaziabad','uttar pradesh','201101'),(13,'C-143 LAL BAGH','LONI','','op','UTTAR PRADESH','201102'),(14,'b-301','bhood bharat nagar','','vijaynagar','UTTAR PRADESH','201101'),(15,'B-201','sec-91','','faridabad','haryana','400101'),(16,'E-80 Munirka Village','munirka village','','Delhi','Delhi','110067'),(20,'C-143','lal bagh',NULL,'loni','ghaziabad','201102'),(21,'F164, 400 E Remington Dr','Sunnyvale','','San Jose','California','94087'),(22,'E-80 Munirka Village','munirka village3','','Delhi','Delhi','110067'),(26,'c','143','','lal','up','201102'),(27,'c','143','','lal','up','201102'),(28,'c','143','','l','l','201102'),(29,'c','143','','ll','up','201012'),(30,'c','143','','ll','bp','100201'),(31,'c','143','','ll','up','201011'),(32,'c','001','','lala','up','201012');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `data` mediumblob,
  `status` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_member_id_fk_idx` (`member_id`),
  CONSTRAINT `document_member_id_fk` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='documents uploaded for identification';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (1,1,1,'2016-01-01 00:00:00','2016-01-31 00:00:00',10000,0,5400,NULL,2,3,NULL,0,0),(2,1,0,'2015-12-01 00:00:00','2016-02-28 00:00:00',20000,0,1900,NULL,3,2,NULL,0,0),(3,2,1,'2016-01-01 00:00:00','2016-01-31 00:00:00',15000,0,1400,NULL,1,3,NULL,0,0);
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
INSERT INTO `member` VALUES (1,'deepak','singh1','pundir','8287536955','2015-11-13 00:00:00','2015-11-13 00:00:00',1,1,120,1,1),(2,'debashis',NULL,'mishra','8882227771','2015-11-30 00:00:00','2015-11-30 00:00:00',1,NULL,1000,2,2),(3,'neeraj','a','kumar','1287536955','2015-11-13 00:00:00','2015-11-13 00:00:00',1,2,20,3,3),(4,'usha','pundir','rawat','8287536951','2016-01-03 17:14:37','2016-01-03 17:14:37',NULL,NULL,NULL,4,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='person details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'deepak','singh','pundir','8287536951',1,1,'2015-11-13 00:00:00','2016-03-25 07:21:25','1983-11-14','surbir','singh','pundir','m',1,NULL),(2,'debashis','s','mishra','8882227771',1,2,'2015-11-30 00:00:00','2015-11-30 00:00:00','1981-11-01','d','e','mishra','m',1,NULL),(3,'neeraj','a','kumar','1287536955',1,9,'2015-11-13 00:00:00','2015-11-13 00:00:00','1981-11-14',NULL,NULL,NULL,'m',NULL,NULL),(4,'usha','rawat','pundir','8287536951',NULL,16,'2016-01-03 17:14:35','2016-01-03 17:14:36','1988-01-15','deepak','singh','pundir','f',1,NULL),(5,'dee','','pun','8282',0,26,'2016-03-25 00:00:00','2016-03-25 07:34:34','2001-01-10','sur','','pun','m',0,NULL),(6,'dee','','pun','82828',0,27,'2016-03-25 00:00:00','2016-03-25 07:48:13','2001-09-15','sur','','pun','m',0,NULL),(7,'dee','','pun','828282',0,28,'2016-03-25 00:00:00','2016-03-25 07:51:22','2002-02-05','sur','','pun','m',0,NULL),(8,'dee','','pun','981918',0,29,'2016-03-25 00:00:00','2016-03-25 07:53:10','2016-03-08','sur','','pun','m',0,NULL),(9,'dee','','pun','91',0,30,'2016-03-25 00:00:00','2016-03-25 07:55:07','2016-03-01','sur','','pun','m',0,NULL),(10,'dee','','pun','18191',0,31,'2016-03-25 00:00:00','2016-03-25 08:01:05','2016-03-02','sur','','pun','m',0,NULL),(11,'dee','','pun','82828',0,32,'2016-03-25 00:00:00','2016-03-25 08:04:44','2016-03-03','sur','','pun','m',0,NULL);
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
  `name` varchar(45) NOT NULL,
  `type` int(11) NOT NULL,
  `value` double NOT NULL,
  `create_date` datetime NOT NULL,
  `expire_date` datetime DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `history_remark` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='society rules configuration details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `society_config`
--

LOCK TABLES `society_config` WRITE;
/*!40000 ALTER TABLE `society_config` DISABLE KEYS */;
INSERT INTO `society_config` VALUES (1,'shareInterestRate',1,8,'2015-11-19 00:00:00',NULL,'share value interest rate',''),(2,'depInterestRate',2,6,'2015-11-19 00:00:00',NULL,'installment value interest rate',''),(3,'minShareValue',3,2500,'2015-11-19 00:00:00',NULL,'minimum share value',''),(4,'minDepositValue',4,500,'2015-11-19 00:00:00',NULL,'minimum installment value',''),(5,'maxShareValue',3,50000,'2015-11-19 00:00:00',NULL,'maximum share value',''),(6,'maxDepositValue',4,50000,'2015-11-19 00:00:00',NULL,'maximum installment value','');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='transaction history details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
INSERT INTO `transaction_history` VALUES (1,1,100,0,'2015-12-14 00:00:00',NULL,1,NULL),(2,1,10,0,'2015-12-19 00:00:00',NULL,1,NULL),(3,2,150,0,'2015-12-24 00:00:00',NULL,1,NULL),(4,1,10,0,'2016-01-01 00:00:00',NULL,1,'deposit 1'),(5,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(6,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(7,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(8,1,11,0,'2016-01-01 00:00:00',NULL,1,'deposit 11'),(9,1,100,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(10,1,1000,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(11,1,100,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(12,1,1000,0,'2016-01-01 00:00:00',NULL,1,'deposit amount'),(13,1,10,0,'2016-01-01 00:00:00',NULL,1,'deposit'),(14,1,20,0,'2016-01-01 00:00:00',NULL,1,'deposit 3'),(15,1,40,0,'2016-01-01 00:00:00',NULL,1,'deposit4'),(16,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(17,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(18,1,100,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(19,1,101,0,'2016-01-02 00:00:00',NULL,1,'saving installment'),(20,1,10,0,'2016-03-08 00:00:00',NULL,2,'saving installment'),(21,1,10,0,'2016-03-08 00:00:00',NULL,1,'saving installment');
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
INSERT INTO `user` VALUES (1,NULL,'dpundir','$2a$10$JpdOdM461ByX.ximEuTyh.hPZydVw3JyKT26qdYbG/3VPXvojqB9C','null','null','pundir.friend@gmail.com',1,'1f7258a4216b44af66797aa6fc0553a7a32be8412ea50ea7746a344a756671431daf6bb41575c3b73bedab936ac8e10ada26beb4e9a88af3137f9a9d329500c4','1',NULL,NULL,1,11),(2,NULL,NULL,'$2a$10$IRL48tyo8QlU/Ol/vqAEIOOod8JovqjMljouJS9Fn20fS3KZuNh6q',NULL,NULL,'deepak.pundir@abcd.com',1,'8fe533fe616cc9af0a2e491858a807ea7c65bace073da7128605a3ba420caa64a44a0e3a909e62de29f09a669df76426ed83abe6aed95c8761505a821395f35e','1',NULL,NULL,NULL,2),(3,NULL,'irawat','$2a$10$chnrD2/JMeex4XxxX2blCudoG1EefqrvL/D6DAfunweqDSwHAQ2F6',NULL,NULL,'isharawat88@gmail.com',1,'48d5bbb5ff0bcb82d9caee8d78c0dee8f0baf43c873be3dd9be3d253f5c2d5503ef9156b608026fa8da158b33986b24a866181d21212786c38a0b0b04a325672','2',NULL,NULL,NULL,NULL);
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

-- Dump completed on 2016-03-26 15:16:31
