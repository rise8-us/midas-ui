INSERT INTO `user` (`id`, `dod_id`, `keycloak_uid`, `username`, `email`, `display_name`, `roles`, `creation_date`, `is_disabled`, `last_login`) VALUES
(2,	9999999999,	'keycloak-sub-1234',	'user1',	NULL,	'user1',	0,	'2021-07-09 14:13:02',	CONV('0', 2, 10) + 0,	'2021-07-22 15:41:18');

INSERT INTO `portfolio` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`) VALUES
(3, 'bravo portfolio', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `personnel` (`id`, `creation_date`, `owner_id`) VALUES (4, '2022-03-28 22:37:27', 2);

INSERT INTO `portfolio_personnel` (`portfolio_id`, `personnel_id`) VALUES (3, 4);
