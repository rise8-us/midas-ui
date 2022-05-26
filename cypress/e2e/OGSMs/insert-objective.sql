SET @goalId = nextId();
SET @measureId = nextId();
SET @objectiveId = nextId();
SET @strategyId = nextId();
SET @goalCompletionId = nextId();
SET @measureCompletionId = nextId();
SET @userId = 1;
SET @userId2 = nextId();

INSERT INTO `assertion` (`id`, `created_by_id`, `text`, `creation_date`, `parent_id`, `product_id`, `completed_at`, `status`, `is_archived`, `start_date`, `due_date`, `assigned_person_id`, `inherited_from`) VALUES
(@objectiveId,	@userId,	'Objective 1',	'2022-05-25 16:19:25',	NULL,	5,	NULL,	'NOT_STARTED',	CONV('0', 2, 10) + 0,	NULL,	NULL,	NULL,	NULL),
(@strategyId,	@userId,	'Strategy 1',	'2022-05-25 16:19:25',	@objectiveId,	5,	NULL,	'NOT_STARTED',	CONV('0', 2, 10) + 0,	NULL,	NULL,	NULL,	NULL);

INSERT INTO `measure` (`id`, `assertion_id`, `creation_date`, `text`, `status`) VALUES
(@goalId,	@objectiveId,	'2022-05-25 16:19:26',	'Goal 1',	'NOT_STARTED'),
(@measureId,	@strategyId,	'2022-05-25 16:19:26',	'Measure 1',	'NOT_STARTED');

INSERT INTO `completion` (`id`, `creation_date`, `start_date`, `due_date`, `completed_at`, `completion_type`, `value`, `target`) VALUES
(@goalCompletionId,	'2022-05-25 16:19:26',	NULL,	NULL,	NULL,	'BINARY',	0,	1),
(@measureCompletionId,	'2022-05-25 16:19:26',	NULL,	NULL,	NULL,	'BINARY',	0,	1);

INSERT INTO `completion_measure` (`completion_id`, `measure_id`) VALUES
(@goalCompletionId, @goalId),
(@measureCompletionId, @measureId);

INSERT INTO `user` (`id`, `dod_id`, `keycloak_uid`, `username`, `email`, `display_name`, `roles`, `creation_date`, `is_disabled`, `last_login`, `phone`, `company`, `user_type`) VALUES
(@userId2,	NULL,	'non-keycloak-comment-system',	'comment-system',	NULL,	'system-generated',	1,	'2022-05-26 19:19:15',	CONV('0', 2, 10) + 0,	NULL,	NULL,	NULL,	'ACTIVE');

