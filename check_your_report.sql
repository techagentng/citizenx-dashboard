-- Check if your report was actually created
SELECT 
    'Your recent report:' as info,
    category, 
    sub_report_type, 
    state_name, 
    lga_name, 
    description, 
    created_at
FROM incident_reports 
WHERE state_name = 'Akwa Ibom' 
ORDER BY created_at DESC 
LIMIT 5;

-- Also check all recent reports
SELECT 
    'All recent reports:' as info,
    category, 
    sub_report_type, 
    state_name, 
    lga_name, 
    description, 
    created_at
FROM incident_reports 
ORDER BY created_at DESC 
LIMIT 5;

-- Count reports by state
SELECT 
    state_name,
    COUNT(*) as report_count
FROM incident_reports 
GROUP BY state_name
ORDER BY report_count DESC;
