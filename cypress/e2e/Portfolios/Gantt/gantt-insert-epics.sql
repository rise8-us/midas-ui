INSERT INTO `epic` (`id`, `title`, `description`, `is_hidden`, `creation_date`, `start_date`, `start_date_from_inherited_source`, `due_date`, `due_date_from_inherited_source`, `completed_at`, `synced_at`, `epic_iid`, `state`, `web_url`, `epic_uid`, `total_weight`, `completed_weight`, `product_id`, `portfolio_id`) VALUES
(9,	'testEpic1',	'first description',	NULL,	'1999-09-12 12:03:47',	'2000-01-02',	NULL,	'2000-05-29',	NULL,	'2000-02-09 16:32:40',	NULL,	12,	'closed',	'weburl',	'206-2377-12',	10,	10,	NULL,	4),
(10,	'testEpic2',	'second description',	NULL,	'1999-10-12 12:03:47',	'2000-01-02',	NULL,	'2000-07-31',	NULL,	NULL,	NULL,	13,	'opened',	'weburl',	'206-2377-13',	8,	3,	NULL,	4),
(11,	'testEpic3',	'third description',	NULL,	'1999-11-12 12:03:48',	'2000-01-05',	NULL,	'2000-03-30',	NULL,	NULL,	NULL,	14,	'opened',	'weburl',	'206-2377-14',	12,	4,	NULL,	4);

INSERT INTO `completion` (`id`, `creation_date`, `start_date`, `due_date`, `completed_at`, `completion_type`, `value`, `target`) VALUES
(15,	'1999-05-26 15:15:43',	NULL,	NULL,	NULL,	'BINARY',	10,	10),
(16,	'1999-05-26 15:15:43',	NULL,	NULL,	NULL,	'BINARY',	3,	8),
(17,	'1999-05-26 15:16:46',	NULL,	NULL,	NULL,	'BINARY',	4,	12);

INSERT INTO `completion_gitlab_epic` (`completion_id`, `epic_id`) VALUES
(15,	9),
(16,	10),
(17,	11);
