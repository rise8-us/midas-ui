INSERT INTO `product` (`id`, `name`, `creation_date`, `description`, `is_archived`, `product_manager_id`, `type`, `parent_id`, `gitlab_group_id`, `source_control_id`) VALUES
(2, 'alpha product', NOW(), '', 0, 1, 'PRODUCT', NULL, NULL, NULL),
(3, 'bravo product', NOW(), '', 0, 1, 'PRODUCT', NULL, NULL, NULL),
(4, 'alpha portfolio', NOW(), '', 0, 1, 'PORTFOLIO', NULL, NULL, NULL);

UPDATE `product` SET `parent_id` = 4 WHERE id = 2;