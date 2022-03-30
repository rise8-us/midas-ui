INSERT INTO `product` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`, `roadmap_type`) VALUES
(2, 'alpha product', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL, 'MANUAL');

INSERT INTO `project` (`id`, `name`, `team_id`, `description`, `creation_date`, `is_archived`, `gitlab_project_id`, `project_journey_map`, `product_id`, `source_control_id`, `owner_id`, `web_url`) VALUES
(2, 'alpha', NULL, '', NOW(), 0, NULL, 0, 2, NULL, NULL, NULL);

INSERT INTO `personnel` (`id`, `creation_date`, `owner_id`) VALUES (1, '2022-03-28 22:37:27', 1);

INSERT INTO `product_personnel` (`product_id`, `personnel_id`) VALUES (2, 1);

INSERT INTO `team` (`id`, `name`) VALUES (100, 'TEAM');

INSERT INTO `personnel_team` (`team_id`, `personnel_id`) VALUES (100, 1)