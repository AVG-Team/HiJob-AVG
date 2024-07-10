-- Insert records into job_skill_detail table
INSERT INTO job_skill_detail (job_id, skill_id)
SELECT j.id, s.id
FROM job j
CROSS JOIN skill s;

