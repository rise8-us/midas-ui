DELETE FROM `portfolio`;
DELETE FROM `product`;
DELETE FROM `product_portfolio`;
DELETE FROM `personnel`;
DELETE FROM `portfolio_personnel`;

SET @id = nextId();

INSERT INTO `portfolio` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`) VALUES
(@id, 'bravo portfolio', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `product` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`, `roadmap_type`) VALUES
(200, 'alpha product', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL, 'MANUAL'),
(300, 'bravo product', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL, 'MANUAL');

INSERT INTO `product_portfolio` (`product_id`, `portfolio_id`) VALUES (300, @id);

INSERT INTO `personnel` (`id`, `creation_date`, `owner_id`) VALUES (1, '2022-03-28 22:37:27', 1);

INSERT INTO `portfolio_personnel` (`portfolio_id`, `personnel_id`) VALUES (@id, 1);



