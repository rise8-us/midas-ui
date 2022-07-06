INSERT INTO `gantt_portfolio_target` (`portfolio_id`, `target_id`) VALUES
(4,	5),
(4,	6),
(4,	7),
(4,	8);

INSERT INTO `gantt_target` (`id`, `creation_date`, `start_date`, `due_date`, `title`, `description`, `parent_id`, `is_priority`) VALUES
(5,	'2022-07-01 21:41:43',	'1999-11-05',	'1999-12-05',	'testTarget',	'',	NULL,	CONV('0', 2, 10) + 0),
(6,	'2022-07-01 21:42:53',	'2000-02-05',	'2000-04-30',	'testTarget2',	'',	NULL,	CONV('0', 2, 10) + 0),
(7,	'2022-07-01 21:42:57',	'1999-11-05',	'1999-12-05',	'testSubtarget',	NULL,	5,	CONV('0', 2, 10) + 0),
(8,	'2022-07-01 21:43:04',	'2000-02-05',	'2000-04-30',	'testSubtarget2',	NULL,	6,	CONV('0', 2, 10) + 0);