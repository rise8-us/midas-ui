INSERT INTO `hibernate_sequence` (`next_val`) VALUES
    (5);

INSERT INTO `personnel` (`id`, `creation_date`, `owner_id`) VALUES
    (3,	'2022-06-28 19:42:19',	NULL);

INSERT INTO `portfolio` (`id`, `creation_date`, `name`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`, `gantt_note`, `gantt_note_modified_by`, `gantt_note_modified_at`, `sprint_start_date`, `sprint_duration_in_days`) VALUES
    (4,	'2022-06-28 19:42:19',	'bravo portfolio',	'',	CONV('0', 2, 10) + 0,	42,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-06-28',	7);

INSERT INTO `portfolio_personnel` (`portfolio_id`, `personnel_id`) VALUES
    (4,	3);

INSERT INTO `user` (`id`, `dod_id`, `keycloak_uid`, `username`, `email`, `display_name`, `roles`, `creation_date`, `is_disabled`, `last_login`, `phone`, `company`, `user_type`) VALUES
    (1,	9999999999,	'keycloak-sub-123',	'localuser',	NULL,	NULL,	1,	'2022-06-28 19:40:49',	CONV('0', 2, 10) + 0,	'2022-06-28 19:42:08',	NULL,	NULL,	'ACTIVE'),
    (2,	9999999999,	'non-keycloak-comment-system',	'comment-system',	NULL,	'System Generated',	1,	'2022-06-28 19:40:59',	CONV('0', 2, 10) + 0,	NULL,	NULL,	NULL,	'SYSTEM');