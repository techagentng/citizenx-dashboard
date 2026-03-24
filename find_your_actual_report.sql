-- Find your actual Akwa Ibom report that you created
SELECT 
    'Your Akwa Ibom report:' as info,
    id,
    report_type_id,
    sub_report_type,
    description,
    state_name,
    lga_name,
    date_of_incidence,
    created_at
FROM incident_reports 
WHERE state_name = 'Akwa Ibom' 
ORDER BY created_at DESC 
LIMIT 5;

-- Check all recent incident reports
SELECT 
    'All recent reports:' as info,
    id,
    sub_report_type,
    description,
    state_name,
    lga_name,
    created_at
FROM incident_reports 
ORDER BY created_at DESC 
LIMIT 5;
