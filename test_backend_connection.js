// Test script to verify backend connection
// Run this in browser console or as a standalone test

const testBackendConnection = async () => {
    const API_URL = 'http://localhost:8080/api/v1';
    
    // Get token from localStorage (assuming user is logged in)
    const serviceToken = localStorage.getItem('serviceToken');
    
    if (!serviceToken) {
        console.error('No authentication token found. Please log in first.');
        return;
    }

    try {
        // Test 1: Get states
        console.log('Testing states endpoint...');
        const statesResponse = await fetch(`${API_URL}/states`, {
            headers: {
                'Authorization': `Bearer ${serviceToken}`
            }
        });
        const statesData = await statesResponse.json();
        console.log('States response:', statesData);

        // Test 2: Get categories
        console.log('Testing categories endpoint...');
        const categoriesResponse = await fetch(`${API_URL}/categories`, {
            headers: {
                'Authorization': `Bearer ${serviceToken}`
            }
        });
        const categoriesData = await categoriesResponse.json();
        console.log('Categories response:', categoriesData);

        // Test 3: Enhanced incident reports endpoint
        console.log('Testing enhanced incident reports endpoint...');
        const incidentReportsResponse = await fetch(`${API_URL}/report/incident_reports?category=crime&state_name=Lagos&page=1&limit=10`, {
            headers: {
                'Authorization': `Bearer ${serviceToken}`
            }
        });
        const incidentReportsData = await incidentReportsResponse.json();
        console.log('Incident reports response:', incidentReportsData);

        // Test 4: Comparison endpoint (if we have valid states)
        if (statesData?.states && statesData.states.length > 0) {
            console.log('Testing comparison endpoint...');
            const comparisonResponse = await fetch(`${API_URL}/comparison/reports`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${serviceToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    report_type: 'Crime',
                    locations: [
                        { type: 'state', name: statesData.states[0] },
                        { type: 'state', name: statesData.states[1] || statesData.states[0] }
                    ],
                    date_range: {
                        start: '2024-01-01',
                        end: '2024-03-31'
                    },
                    granularity: 'daily'
                })
            });
            const comparisonData = await comparisonResponse.json();
            console.log('Comparison response:', comparisonData);
        }

    } catch (error) {
        console.error('Backend connection test failed:', error);
    }
};

// Export for use in browser console
window.testBackendConnection = testBackendConnection;
console.log('Test function loaded. Run testBackendConnection() in console to test.');
