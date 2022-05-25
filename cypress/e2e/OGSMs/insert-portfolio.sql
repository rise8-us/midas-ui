DELETE FROM `portfolio`;
DELETE FROM `product`;
DELETE FROM `product_portfolio`;
DELETE FROM `personnel`;
DELETE FROM `portfolio_personnel`;
DELETE FROM `user` where `id` <> 1;

SET @portfolioId = nextId();
SET @userId = nextId();
SET @personnelId1 = nextId();
SET @productId1 = 5;

INSERT INTO `portfolio` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`) VALUES
(@portfolioId, 'bravo portfolio', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `product` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`, `roadmap_type`) VALUES
(@productId1, 'alpha product', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL, 'MANUAL');

INSERT INTO `product_portfolio` (`product_id`, `portfolio_id`) VALUES (@productId1, @portfolioId);

INSERT INTO `personnel` (`id`, `creation_date`, `owner_id`) VALUES (@personnelId1, '2022-03-28 22:37:27', 1);

INSERT INTO `portfolio_personnel` (`portfolio_id`, `personnel_id`) VALUES (@portfolioId, @personnelId1);

INSERT INTO `product_personnel` (`product_id`, `personnel_id`) VALUES (@productId1, @personnelId1);

INSERT INTO `user` (`id`, `dod_id`, `keycloak_uid`, `username`, `email`, `display_name`, `roles`, `creation_date`, `is_disabled`, `last_login`) VALUES
(@userId,	9999999999,	@userId,	'user1',	NULL,	NULL,	0,	'2021-07-09 14:13:02',	CONV('0', 2, 10) + 0,	'2021-07-22 15:41:18');

INSERT INTO `personnel_user_admin` (`personnel_id`, `user_id`) VALUES (@personnelId1, @userId);
