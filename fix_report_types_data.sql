-- Fix report_types table data cleanup
-- This script fixes empty strings and invalid default values

-- Update empty strings to NULL for proper handling
UPDATE report_types 
SET 
    state_name = NULL,
    lga_name = NULL,
    date_of_incidence = NULL
WHERE 
    state_name = '' OR 
    lga_name = '' OR 
    date_of_incidence = '0001-01-01T00:00:00Z';

-- Fix any remaining empty strings (including whitespace)
UPDATE report_types 
SET 
    state_name = NULL
WHERE state_name IS NOT NULL AND TRIM(state_name) = '';

UPDATE report_types 
SET 
    lga_name = NULL
WHERE lga_name IS NOT NULL AND TRIM(lga_name) = '';

-- Fix invalid default dates
UPDATE report_types 
SET 
    date_of_incidence = NULL
WHERE date_of_incidence = '0001-01-01T00:00:00Z' OR 
      date_of_incidence = '0001-01-01' OR
      date_of_incidence::text LIKE '0001-%';

-- Verify the fixes
SELECT 
    id,
    name,
    state_name,
    lga_name,
    date_of_incidence,
    CASE 
        WHEN state_name IS NULL OR state_name = '' THEN 'NULL'
        ELSE state_name
    END as state_status,
    CASE 
        WHEN lga_name IS NULL OR lga_name = '' THEN 'NULL'
        ELSE lga_name
    END as lga_status,
    CASE 
        WHEN date_of_incidence IS NULL THEN 'NULL'
        ELSE CAST(date_of_incidence AS TEXT)
    END as date_status
FROM report_types 
WHERE state_name IS NULL OR lga_name IS NULL OR date_of_incidence IS NULL
ORDER BY id;
