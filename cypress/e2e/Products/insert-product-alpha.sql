INSERT INTO `product` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`, `roadmap_type`) VALUES
(2, 'alpha product', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL, 'MANUAL');

INSERT INTO `personnel` (`id`, `creation_date`, `owner_id`) VALUES (1, '2022-03-28 22:37:27', 1);

INSERT INTO `product_personnel` (`product_id`, `personnel_id`) VALUES (2, 1);