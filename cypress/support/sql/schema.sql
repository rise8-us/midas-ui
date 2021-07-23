-- Adminer 4.8.1 MySQL 8.0.21 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `appDB`;
CREATE DATABASE `appDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `appDB`;

DELIMITER ;;

CREATE FUNCTION `nextID`() RETURNS bigint
BEGIN
  DECLARE response BIGINT(20);
  SET response = (SELECT `next_val` FROM `hibernate_sequence` LIMIT 1);
  UPDATE `hibernate_sequence` SET `next_val` = `next_val` + 1;
  RETURN (response);
END;;

DELIMITER ;

DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement` (
  `id` bigint NOT NULL,
  `message` text NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `assertion`;
CREATE TABLE `assertion` (
  `id` bigint NOT NULL,
  `created_by_id` bigint NOT NULL,
  `type` varchar(70) NOT NULL,
  `text` text NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_id` bigint DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `completed_date` datetime DEFAULT NULL,
  `status` varchar(70) DEFAULT 'NOT_STARTED',
  PRIMARY KEY (`id`),
  KEY `created_by_id` (`created_by_id`),
  KEY `parent_id` (`parent_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `assertion_ibfk_2` FOREIGN KEY (`created_by_id`) REFERENCES `user` (`id`),
  CONSTRAINT `assertion_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `assertion` (`id`),
  CONSTRAINT `assertion_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` bigint NOT NULL,
  `assertion_id` bigint NOT NULL,
  `created_by_id` bigint NOT NULL,
  `parent_id` bigint DEFAULT NULL,
  `text` text,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_edit` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assertion_id` (`assertion_id`),
  KEY `parent_id` (`parent_id`),
  KEY `created_by_id` (`created_by_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`assertion_id`) REFERENCES `assertion` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`created_by_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `coverage`;
CREATE TABLE `coverage` (
  `id` bigint NOT NULL,
  `job_id` int DEFAULT NULL,
  `project_id` bigint NOT NULL,
  `test_coverage` float NOT NULL,
  `coverage_change` float NOT NULL,
  `maintainability_rating` varchar(100) NOT NULL,
  `reliability_rating` varchar(100) NOT NULL,
  `security_rating` varchar(100) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sonarqube_url` varchar(255) DEFAULT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `triggered_by` varchar(255) DEFAULT NULL,
  `pipeline_url` varchar(255) DEFAULT NULL,
  `pipeline_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `coverage_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `flyway_schema_history`;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gitlab_config`;
CREATE TABLE `gitlab_config` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `base_url` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint NOT NULL,
  `name` varchar(70) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `is_archived` bit(1) NOT NULL DEFAULT b'0',
  `product_manager_id` bigint DEFAULT NULL,
  `type` varchar(70) DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `gitlab_group_id` int DEFAULT NULL,
  `gitlab_config_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_manager_id` (`product_manager_id`),
  KEY `parent_id` (`parent_id`),
  KEY `gitlab_config_id` (`gitlab_config_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_manager_id`) REFERENCES `user` (`id`),
  CONSTRAINT `product_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_ibfk_4` FOREIGN KEY (`gitlab_config_id`) REFERENCES `gitlab_config` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `product_tag`;
CREATE TABLE `product_tag` (
  `tag_id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` bigint NOT NULL,
  `name` varchar(70) NOT NULL,
  `team_id` bigint DEFAULT NULL,
  `description` text,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_archived` bit(1) NOT NULL DEFAULT b'0',
  `gitlab_project_id` int DEFAULT NULL,
  `project_journey_map` bigint NOT NULL DEFAULT '0',
  `product_id` bigint DEFAULT NULL,
  `gitlab_config_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `application_id` (`product_id`),
  KEY `gitlab_config_id` (`gitlab_config_id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `project_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `project_ibfk_4` FOREIGN KEY (`gitlab_config_id`) REFERENCES `gitlab_config` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `project_tag`;
CREATE TABLE `project_tag` (
  `tag_id` bigint NOT NULL,
  `project_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` bigint NOT NULL,
  `label` tinytext NOT NULL,
  `description` text,
  `color` tinytext DEFAULT (_utf8mb4'#969696'),
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by_id` bigint DEFAULT NULL,
  `tag_type` varchar(70) NOT NULL DEFAULT 'ALL',
  PRIMARY KEY (`id`),
  KEY `created_by_id` (`created_by_id`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`created_by_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `id` bigint NOT NULL,
  `name` varchar(70) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_archived` bit(1) NOT NULL DEFAULT b'0',
  `gitlab_group_id` bigint DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `dod_id` bigint DEFAULT NULL,
  `keycloak_uid` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `roles` bigint NOT NULL DEFAULT '0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_disabled` bit(1) NOT NULL DEFAULT b'0',
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `keycloak_uid` (`keycloak_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `user_team`;
CREATE TABLE `user_team` (
  `user_id` bigint NOT NULL,
  `team_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2021-07-23 15:35:40