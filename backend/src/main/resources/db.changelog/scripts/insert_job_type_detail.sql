-- Insert records into job_type_detail table
INSERT INTO `job_type_detail` (`job_id`, `job_type_id`)
SELECT j.id AS job_id,
       CASE
           WHEN j.require_of_year >= 40 THEN 1 -- Full-time
           WHEN j.require_of_year < 40 THEN 2  -- Part-time (example condition)
           ELSE 3                               -- Freelance (example condition)
       END AS job_type_id
FROM `job` j;
