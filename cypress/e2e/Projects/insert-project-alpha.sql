INSERT INTO `product` (`id`, `name`, `creation_date`, `description`, `is_archived`, `owner_id`, `type`, `parent_id`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`, `roadmap_type`) VALUES
(2, 'alpha product', NOW(), '', 0, 1, 'PRODUCT', NULL, NULL, NULL, NULL, NULL, NULL, 'MANUAL');

INSERT INTO `project` (`id`, `name`, `team_id`, `description`, `creation_date`, `is_archived`, `gitlab_project_id`, `project_journey_map`, `product_id`, `source_control_id`, `owner_id`, `web_url`) VALUES
(2, 'alpha', NULL, '', NOW(), 0, NULL, 0, 2, NULL, NULL, NULL);