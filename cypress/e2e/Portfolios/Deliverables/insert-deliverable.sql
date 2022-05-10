DELETE FROM `portfolio`;
DELETE FROM `product`;
DELETE FROM `product_portfolio`;
DELETE FROM `personnel`;
DELETE FROM `portfolio_personnel`;
DELETE FROM `user` where `id` <> 1;
DELETE FROM `capability`;
DELETE FROM `portfolio_capability`;
DELETE FROM `epic`;

SET @portfolioId = nextId();
SET @userId = nextId();
SET @personnelId = nextId();
SET @productId1 = nextId();
SET @capabilityId = nextId();
SET @capabilityId2 = nextId();
SET @deliverableId = nextId();
SET @completionId = nextId();
SET @epicId = nextId();

INSERT INTO `portfolio` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`) VALUES
(@portfolioId, 'bravo portfolio', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `product` (`id`, `name`, `creation_date`, `description`, `is_archived`, `gitlab_group_id`, `source_control_id`, `vision`, `mission`, `problem_statement`, `roadmap_type`) VALUES
(@productId1, 'alpha product', NOW(), '', 0, NULL, NULL, NULL, NULL, NULL, 'MANUAL');

INSERT INTO `product_portfolio` (`product_id`, `portfolio_id`) VALUES (@productId1, @portfolioId);

INSERT INTO `personnel` (`id`, `creation_date`, `owner_id`) VALUES (@personnelId, '2022-03-28 22:37:27', 1);

INSERT INTO `portfolio_personnel` (`portfolio_id`, `personnel_id`) VALUES (@portfolioId, @personnelId);

INSERT INTO `user` (`id`, `dod_id`, `keycloak_uid`, `username`, `email`, `display_name`, `roles`, `creation_date`, `is_disabled`, `last_login`) VALUES
(@userId,	9999999999,	@userId,	'user1',	NULL,	NULL,	0,	'2021-07-09 14:13:02',	CONV('0', 2, 10) + 0,	'2021-07-22 15:41:18');

INSERT INTO `personnel_user_admin` (`personnel_id`, `user_id`) VALUES (@personnelId, @userId);

INSERT INTO `capability` (`id`, `title`, `description`, `is_archived`, `creation_date`, `reference_id`) VALUES
(@capabilityId, 'capability title', 'a descriptive sentence', 0, NOW(), 123);

INSERT INTO `capability` (`id`, `title`, `description`, `is_archived`, `creation_date`, `reference_id`) VALUES
(@capabilityId2, 'capability to link', 'a descriptive linked capability', 0, NOW(), 234);

INSERT INTO `portfolio_capability` (`portfolio_id`, `capability_id`) VALUES (@portfolioId, @capabilityId);

INSERT INTO `deliverable` (`id`, `title`, `is_archived`, `creation_date`, `status`, `reference_id`, `position`, `parent_id`, `product_id`, `assigned_to_id`) VALUES
(@deliverableId, 'deliverable with linked epic', 0, NOW(), 'NOT_STARTED', 0, 1, NULL, @productId1, @userId );

INSERT INTO `capability_deliverable` (`capability_id`, `deliverable_id`) VALUES
(@capabilityId, @deliverableId);

INSERT INTO `completion` (`id`, `creation_date`, `start_date`, `due_date`, `completed_at`, `completion_type`, `value`, `target`) VALUES 
(@completionId, NOW(), null, null, null, 'BINARY', 0, 1);

INSERT INTO `epic` (`id`, `title`, `description`, `is_hidden`, `creation_date`, `start_date`, `start_date_from_inherited_source`, `due_date`, `due_date_from_inherited_source`, `completed_at`, `synced_at`, `epic_iid`, `state`, `web_url`, `epic_uid`, `total_weight`, `completed_weight`, `product_id`) VALUES
(@epicId, 'epic title', 'epic description', 0, NOW(), '2022-03-28 22:37:27', '2022-03-28 22:37:27', '2022-04-28 22:37:27', '2022-04-28 22:37:27', '2022-03-29 22:37:27', '2022-03-29 22:37:27', @epicId, NULL, NULL, NULL, 0, 0, @productId1);

INSERT INTO `completion_deliverable` (`completion_id`, `deliverable_id`) VALUES
(@completionId, @deliverableId);

INSERT INTO `completion_gitlab_epic` (`completion_id`, `epic_id`) VALUES
(@completionId, @epicId);