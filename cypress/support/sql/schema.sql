-- Adminer 4.8.1 MySQL 8.0.27 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DELIMITER ;;

DROP FUNCTION IF EXISTS `nextID`;;
CREATE FUNCTION `nextID`() RETURNS bigint
BEGIN
  DECLARE response BIGINT(20);
  SET response = (SELECT `next_val` FROM `hibernate_sequence` LIMIT 1);
  UPDATE `hibernate_sequence` SET `next_val` = `next_val` + 1;
  RETURN (response);
END;;

DELIMITER ;

SET NAMES utf8mb4;

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
  `text` text NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_id` bigint DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `completed_at` datetime DEFAULT NULL,
  `status` varchar(70) DEFAULT 'NOT_STARTED',
  `is_archived` bit(1) DEFAULT b'0',
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `assigned_person_id` bigint DEFAULT NULL,
  `inherited_from` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by_id` (`created_by_id`),
  KEY `parent_id` (`parent_id`),
  KEY `product_id` (`product_id`),
  KEY `assigned_person_id` (`assigned_person_id`),
  CONSTRAINT `assertion_ibfk_2` FOREIGN KEY (`created_by_id`) REFERENCES `user` (`id`),
  CONSTRAINT `assertion_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `assertion` (`id`),
  CONSTRAINT `assertion_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `assertion_ibfk_5` FOREIGN KEY (`assigned_person_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `assertion_comment`;
CREATE TABLE `assertion_comment` (
  `assertion_id` bigint NOT NULL,
  `comment_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `capability`;
CREATE TABLE `capability` (
  `id` bigint NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `is_archived` bit(1) DEFAULT b'0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reference_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `capability_deliverable`;
CREATE TABLE `capability_deliverable` (
  `capability_id` bigint NOT NULL,
  `deliverable_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `capability_mission_thread`;
CREATE TABLE `capability_mission_thread` (
  `capability_id` bigint NOT NULL,
  `mission_thread_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `capability_performance_measure`;
CREATE TABLE `capability_performance_measure` (
  `capability_id` bigint NOT NULL,
  `performance_measure_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` bigint NOT NULL,
  `created_by_id` bigint NOT NULL,
  `parent_id` bigint DEFAULT NULL,
  `text` text,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_edit` datetime DEFAULT NULL,
  `edited_by_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  KEY `created_by_id` (`created_by_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`created_by_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `completion`;
CREATE TABLE `completion` (
  `id` bigint NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `completion_type` varchar(70) NOT NULL DEFAULT 'BINARY',
  `value` float NOT NULL DEFAULT '0',
  `target` float NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `completion_deliverable`;
CREATE TABLE `completion_deliverable` (
  `completion_id` bigint NOT NULL,
  `deliverable_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `completion_gitlab_epic`;
CREATE TABLE `completion_gitlab_epic` (
  `completion_id` bigint NOT NULL,
  `epic_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `completion_gitlab_issue`;
CREATE TABLE `completion_gitlab_issue` (
  `completion_id` bigint NOT NULL,
  `issue_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `completion_measure`;
CREATE TABLE `completion_measure` (
  `completion_id` bigint NOT NULL,
  `measure_id` bigint NOT NULL
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


DROP TABLE IF EXISTS `deliverable`;
CREATE TABLE `deliverable` (
  `id` bigint NOT NULL,
  `title` text NOT NULL,
  `is_archived` bit(1) DEFAULT b'0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(70) DEFAULT 'NOT_STARTED',
  `reference_id` int DEFAULT NULL,
  `position` int DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `assigned_to_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `deliverable_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `deliverable` (`id`),
  CONSTRAINT `deliverable_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `epic`;
CREATE TABLE `epic` (
  `id` bigint NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `is_hidden` bit(1) DEFAULT b'0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date DEFAULT NULL,
  `start_date_from_inherited_source` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `due_date_from_inherited_source` date DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `synced_at` datetime DEFAULT NULL,
  `epic_iid` int DEFAULT NULL,
  `state` text,
  `web_url` text,
  `epic_uid` varchar(255) DEFAULT NULL,
  `total_weight` bigint NOT NULL DEFAULT '0',
  `completed_weight` bigint NOT NULL DEFAULT '0',
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `epic_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `feature`;
CREATE TABLE `feature` (
  `id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `position` int DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `feature_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` bigint NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by_id` bigint NOT NULL,
  `edited_by_id` bigint DEFAULT NULL,
  `edited_at` datetime DEFAULT NULL,
  `rating` varchar(70) NOT NULL DEFAULT 'AVERAGE',
  `notes` text,
  `related_to` text NOT NULL,
  PRIMARY KEY (`id`)
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


DROP TABLE IF EXISTS `gantt_event`;
CREATE TABLE `gantt_event` (
  `id` bigint NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `title` varchar(280) NOT NULL,
  `description` text,
  `location` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_event_user_attendee`;
CREATE TABLE `gantt_event_user_attendee` (
  `event_id` bigint NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_event_user_organizer`;
CREATE TABLE `gantt_event_user_organizer` (
  `event_id` bigint NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_milestone`;
CREATE TABLE `gantt_milestone` (
  `id` bigint NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `due_date` date DEFAULT NULL,
  `title` varchar(280) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_portfolio_event`;
CREATE TABLE `gantt_portfolio_event` (
  `portfolio_id` bigint NOT NULL,
  `event_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_portfolio_milestone`;
CREATE TABLE `gantt_portfolio_milestone` (
  `portfolio_id` bigint NOT NULL,
  `milestone_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_portfolio_target`;
CREATE TABLE `gantt_portfolio_target` (
  `portfolio_id` bigint NOT NULL,
  `target_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_target`;
CREATE TABLE `gantt_target` (
  `id` bigint NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `title` varchar(280) NOT NULL,
  `description` text,
  `parent_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_target_deliverables`;
CREATE TABLE `gantt_target_deliverables` (
  `target_id` bigint NOT NULL,
  `deliverable_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gantt_target_gitlab_epic`;
CREATE TABLE `gantt_target_gitlab_epic` (
  `target_id` bigint NOT NULL,
  `epic_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `issue`;
CREATE TABLE `issue` (
  `id` bigint NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `synced_at` datetime DEFAULT NULL,
  `issue_iid` int NOT NULL,
  `issue_uid` varchar(255) DEFAULT NULL,
  `state` text,
  `web_url` text,
  `weight` bigint NOT NULL DEFAULT '1',
  `project_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `issue_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `measure`;
CREATE TABLE `measure` (
  `id` bigint NOT NULL,
  `assertion_id` bigint DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` text,
  `status` varchar(70) NOT NULL DEFAULT 'NOT_STARTED',
  PRIMARY KEY (`id`),
  KEY `assertion_id` (`assertion_id`),
  CONSTRAINT `measure_ibfk_1` FOREIGN KEY (`assertion_id`) REFERENCES `assertion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `measure_comment`;
CREATE TABLE `measure_comment` (
  `measure_id` bigint NOT NULL,
  `comment_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `metrics_app_user`;
CREATE TABLE `metrics_app_user` (
  `id` date NOT NULL,
  `unique_logins` bigint NOT NULL,
  `unique_role_metrics` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `metrics_page_view`;
CREATE TABLE `metrics_page_view` (
  `id` date NOT NULL,
  `page_views` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `mission_thread`;
CREATE TABLE `mission_thread` (
  `id` bigint NOT NULL,
  `title` text NOT NULL,
  `is_archived` bit(1) DEFAULT b'0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `performance_measure`;
CREATE TABLE `performance_measure` (
  `id` bigint NOT NULL,
  `title` text NOT NULL,
  `is_archived` bit(1) DEFAULT b'0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reference_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `performance_measure_deliverable`;
CREATE TABLE `performance_measure_deliverable` (
  `performance_measure_id` bigint NOT NULL,
  `deliverable_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `persona`;
CREATE TABLE `persona` (
  `id` bigint NOT NULL,
  `title` varchar(70) NOT NULL,
  `position` int DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `is_supported` bit(1) NOT NULL DEFAULT b'0',
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `personnel`;
CREATE TABLE `personnel` (
  `id` bigint NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `owner_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `personnel_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `personnel_team`;
CREATE TABLE `personnel_team` (
  `team_id` bigint NOT NULL,
  `personnel_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `personnel_user_admin`;
CREATE TABLE `personnel_user_admin` (
  `personnel_id` bigint NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `portfolio`;
CREATE TABLE `portfolio` (
  `id` bigint NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(120) NOT NULL,
  `description` text,
  `is_archived` bit(1) NOT NULL DEFAULT b'0',
  `gitlab_group_id` int DEFAULT NULL,
  `source_control_id` bigint DEFAULT NULL,
  `vision` text,
  `mission` text,
  `problem_statement` text,
  PRIMARY KEY (`id`),
  KEY `source_control_id` (`source_control_id`),
  CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`source_control_id`) REFERENCES `source_control` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `portfolio_capability`;
CREATE TABLE `portfolio_capability` (
  `portfolio_id` bigint NOT NULL,
  `capability_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `portfolio_personnel`;
CREATE TABLE `portfolio_personnel` (
  `portfolio_id` bigint NOT NULL,
  `personnel_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint NOT NULL,
  `name` varchar(70) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `is_archived` bit(1) NOT NULL DEFAULT b'0',
  `gitlab_group_id` int DEFAULT NULL,
  `source_control_id` bigint DEFAULT NULL,
  `vision` text,
  `mission` text,
  `problem_statement` text,
  `roadmap_type` varchar(70) NOT NULL DEFAULT 'MANUAL',
  PRIMARY KEY (`id`),
  KEY `gitlab_config_id` (`source_control_id`),
  CONSTRAINT `product_ibfk_4` FOREIGN KEY (`source_control_id`) REFERENCES `source_control` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `product_personnel`;
CREATE TABLE `product_personnel` (
  `product_id` bigint NOT NULL,
  `personnel_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `product_portfolio`;
CREATE TABLE `product_portfolio` (
  `product_id` bigint NOT NULL,
  `portfolio_id` bigint NOT NULL
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
  `source_control_id` bigint DEFAULT NULL,
  `owner_id` bigint DEFAULT NULL,
  `web_url` text,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `application_id` (`product_id`),
  KEY `gitlab_config_id` (`source_control_id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `project_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `project_ibfk_4` FOREIGN KEY (`source_control_id`) REFERENCES `source_control` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `project_tag`;
CREATE TABLE `project_tag` (
  `tag_id` bigint NOT NULL,
  `project_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `release_deliverable`;
CREATE TABLE `release_deliverable` (
  `release_id` bigint NOT NULL,
  `deliverable_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `releases`;
CREATE TABLE `releases` (
  `id` bigint NOT NULL,
  `title` text NOT NULL,
  `is_archived` bit(1) DEFAULT b'0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `target_date` datetime DEFAULT NULL,
  `status` varchar(70) DEFAULT 'NOT_STARTED',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `roadmap`;
CREATE TABLE `roadmap` (
  `id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `status` varchar(70) NOT NULL DEFAULT 'FUTURE',
  `product_id` bigint NOT NULL,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `is_hidden` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `roadmap_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `source_control`;
CREATE TABLE `source_control` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `base_url` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
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
  `product_manager_id` bigint DEFAULT NULL,
  `designer_id` bigint DEFAULT NULL,
  `tech_lead_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_manager_id` (`product_manager_id`),
  KEY `designer_id` (`designer_id`),
  KEY `tech_lead_id` (`tech_lead_id`),
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`product_manager_id`) REFERENCES `user` (`id`),
  CONSTRAINT `team_ibfk_2` FOREIGN KEY (`designer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `team_ibfk_3` FOREIGN KEY (`tech_lead_id`) REFERENCES `user` (`id`)
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
  `phone` varchar(100) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `user_type` varchar(70) NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `keycloak_uid` (`keycloak_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `user_team`;
CREATE TABLE `user_team` (
  `user_id` bigint NOT NULL,
  `team_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2022-05-06 15:40:20