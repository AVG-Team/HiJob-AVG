-- Insert records into job_level_detail table
INSERT INTO job_level_detail (job_id, level_id)
SELECT j.id,
       CASE
           WHEN j.salary > 80000 THEN 5  -- Senior level
           WHEN j.salary > 60000 THEN 4  -- Mid level
           ELSE 3  -- Junior level or another appropriate level
       END AS level_id
FROM job j;

