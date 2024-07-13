-- Insert records into contract_type_detail table
INSERT INTO contract_type_detail (contract_type_id, job_id)
SELECT
    CASE
        WHEN require_of_year <= 2 THEN 1
        WHEN require_of_year <= 5 THEN 2
        ELSE 3
    END AS contract_type_id,
    id AS job_id
FROM job;

