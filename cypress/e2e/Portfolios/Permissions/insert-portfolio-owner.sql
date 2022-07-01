DELETE FROM personnel WHERE id = 4;

INSERT INTO `user` (`id`, `dod_id`, `keycloak_uid`, `username`, `email`, `display_name`, `roles`, `creation_date`, `is_disabled`, `last_login`) VALUES
(1,	9999999999,	'keycloak-sub-123',	'localuser',	NULL,	'localuser',	2,	'2021-07-09 14:13:02',	CONV('0', 2, 10) + 0,	'2021-07-22 15:41:18');

INSERT INTO `personnel` (`id`, `creation_date`, `owner_id`) VALUES (4, '2022-03-28 22:37:27', 1);

