-- Backend API should use this query for /report/incident_reports endpoint
-- This fetches ACTUAL incident reports, not templates

SELECT 
    ir.id,
    ir.report_type_id,
    ir.sub_report_type,
    ir.description,
    ir.state_name,
    ir.lga_name,
    ir.date_of_incidence,
    ir.created_at,
    rt.category,
    rt.name as report_type_name
FROM incident_reports ir
LEFT JOIN report_types rt ON ir.report_type_id = rt.id
WHERE rt.category = ? AND ir.state_name = ?
ORDER BY ir.created_at DESC;

-- Test query to find your actual Akwa Ibom report
SELECT 
    'Your actual report:' as info,
    ir.id,
    ir.report_type_id,
    ir.sub_report_type,
    ir.description,
    ir.state_name,
    ir.lga_name,
    ir.date_of_incidence,
    ir.created_at
FROM incident_reports ir
WHERE ir.state_name = 'Akwa Ibom' 
ORDER BY ir.created_at DESC 
LIMIT 5;

-- Check if any incident reports exist at all
SELECT 
    COUNT(*) as total_incident_reports
FROM incident_reports;
