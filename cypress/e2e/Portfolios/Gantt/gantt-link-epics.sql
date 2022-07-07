INSERT INTO `gantt_portfolio_target` (`portfolio_id`, `target_id`) VALUES
(4,	18);

INSERT INTO `gantt_target` (`id`, `creation_date`, `start_date`, `due_date`, `title`, `description`, `parent_id`, `is_priority`) VALUES
(18,	'2022-07-01 21:41:43',	'1999-11-05',	'1999-12-05',	'testTarget',	'',	5,	CONV('0', 2, 10) + 0);

INSERT INTO `gantt_target_gitlab_epic` (`target_id`, `epic_id`) VALUES
(18,	9),
(7,	10),
(8,	11);