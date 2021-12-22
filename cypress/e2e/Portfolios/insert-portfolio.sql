INSERT INTO `product` (`id`, `name`, `creation_date`, `description`, `is_archived`, `owner_id`, `type`, `parent_id`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`, `roadmap_type`) VALUES
(2, 'alpha product', NOW(), '', 0, 1, 'PRODUCT', NULL, NULL, NULL, NULL, NULL, NULL, 'MANUAL'),
(3, 'bravo product', NOW(), '', 0, 1, 'PRODUCT', NULL, NULL, NULL, NULL, NULL, NULL, 'MANUAL'),
(4, 'alpha portfolio', NOW(), '', 0, 1, 'PORTFOLIO', NULL, NULL, NULL, NULL, NULL, NULL, 'MANUAL');

UPDATE `product` SET `parent_id` = 4 WHERE id = 2;