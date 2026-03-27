import axios from 'axios';

export const getTodayReportCount = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/today/report`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response) {
                    resolve(response.data.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteReport = (id) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .delete(`${process.env.REACT_APP_API_URL}/incident-report/${id}`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data); // Assuming response.data contains a success message or relevant data
                } else {
                    reject(new Error('Failed to delete report'));
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(new Error(error.response.data.error || 'An error occurred'));
                } else if (error.request) {
                    reject(new Error('Request failed, no response received'));
                } else {
                    reject(new Error('An error occurred while processing the request'));
                }
            });
    });
};

export const getStateReportCounts = (criteria) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/report-type/states`, criteria, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data); // Assuming response.data contains the report counts
                } else {
                    reject(new Error('Failed to fetch report counts'));
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(new Error(error.response.data.error || 'An error occurred'));
                } else if (error.request) {
                    reject(new Error('Request failed, no response received'));
                } else {
                    reject(new Error('An error occurred while processing the request'));
                }
            });
    });
};

export const getBarChartData = (requestBody) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/report-type/states`, requestBody, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getComparisonData = (requestBody) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/comparison/reports`, requestBody, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response && response.data) {
                    if (response.data.success) {
                        resolve(response.data);
                    } else {
                        // Handle backend error responses
                        const errorMsg = response.data.error?.message || 'Comparison failed';
                        reject(new Error(errorMsg));
                    }
                } else {
                    reject(new Error('No comparison data found'));
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    // Fallback to old endpoint if new one doesn't exist yet
                    console.log('New comparison endpoint not found, falling back to legacy endpoint...');
                    
                    axios
                        .post(`${process.env.REACT_APP_API_URL}/report-type/states`, {
                            report_types: [requestBody.report_type],
                            states: requestBody.locations
                                .filter(loc => loc.type === 'state')
                                .map(loc => loc.name)
                        }, {
                            headers: {
                                Authorization: `Bearer ${serviceToken}`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((fallbackResponse) => {
                            if (fallbackResponse && fallbackResponse.data) {
                                // Transform old data format to new format
                                const transformedData = transformLegacyData(fallbackResponse.data, requestBody);
                                resolve({ success: true, data: transformedData });
                            } else {
                                reject(new Error('No comparison data found'));
                            }
                        })
                        .catch((fallbackError) => {
                            reject(fallbackError);
                        });
                } else if (error.response && error.response.data) {
                    // Handle backend validation errors
                    const backendError = error.response.data;
                    const errorMsg = backendError.error?.message || backendError.message || 'Comparison request failed';
                    reject(new Error(errorMsg));
                } else {
                    reject(error);
                }
            });
    });
};

// Helper function to transform legacy data format
const transformLegacyData = (legacyData, requestBody) => {
    const locations = requestBody.locations.map(location => {
        const locationData = legacyData.find(item => item.state_name === location.name);
        return {
            name: location.name,
            type: location.type,
            total_reports: locationData ? locationData.report_count : 0,
            daily_average: locationData ? (locationData.report_count / 30).toFixed(1) : 0,
            trend: 'stable', // Default trend for legacy data
            trend_percentage: 0,
            time_series: [], // Legacy data doesn't have time series
            sub_report_breakdown: [] // Legacy data doesn't have sub-report breakdown
        };
    });

    return {
        comparison_id: `legacy_${Date.now()}`,
        report_type: requestBody.report_type,
        locations,
        insights: generateBasicInsights(locations),
        metadata: {
            total_locations: locations.length,
            date_range: requestBody.date_range,
            generated_at: new Date().toISOString()
        }
    };
};

// Helper function to generate basic insights
const generateBasicInsights = (locations) => {
    const insights = [];
    
    if (locations.length > 0) {
        // Find highest incidence
        const highest = locations.reduce((prev, current) => 
            (prev.total_reports > current.total_reports) ? prev : current
        );
        insights.push({
            type: 'highest_incidence',
            location: highest.name,
            value: highest.total_reports,
            description: `${highest.name} has the highest number of reports`
        });

        // Find lowest incidence
        const lowest = locations.reduce((prev, current) => 
            (prev.total_reports < current.total_reports) ? prev : current
        );
        if (highest.name !== lowest.name) {
            insights.push({
                type: 'lowest_incidence',
                location: lowest.name,
                value: lowest.total_reports,
                description: `${lowest.name} has the lowest number of reports`
            });
        }
    }
    
    return insights;
};

export const getCategories = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/categories`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data.categories);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getStateReportCountList = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/state/report/count`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data && response.data.top_states) {
                    resolve(response.data.top_states);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getTotalReportCount = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/report/total/count`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data && response.data.total_report_count !== undefined) {
                    resolve(response.data.total_report_count);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getSubReportsByCategory = (category, state) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        const params = { category };
        if (state) {
            params.state_name = state;
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/report/sub_reports`, {
                params,
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data && Array.isArray(response.data.data)) {
                    resolve(response.data.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getReportCountsByState = (state) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/report/counts/state/${state}`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getReportCountsByLGA = (lga) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/incident_reports/lga/${lga}/count`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getReportCount = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/incident_reports/count`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getReportCountByState = (state) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/incident_reports/state/${state}/count`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getGovernorDetails = (state) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/state/governor?state=${state}`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                console.error('Error fetching governor details:', error);
                
                // Handle different types of errors
                if (error.response?.status === 500) {
                    reject(new Error('The data for this state is currently unavailable. Please try again later.'));
                } else if (error.response?.status === 404) {
                    reject(new Error('No data found for this state.'));
                } else if (error.response?.status === 401 || error.response?.status === 403) {
                    reject(new Error('Authentication required to access this data.'));
                } else {
                    reject(new Error(error.response?.data?.message || error.message || 'Failed to fetch governor details.'));
                }
            });
    });
};

export const getReportCountByLGA = (lga) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/reports/count?lga=${lga}`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// New function to fetch states
export const getStates = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/states`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error('No states found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getLGAs = (state) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No authentication token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/lgas/${state}`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                console.log(`getLGAs response for ${state}:`, response.data); // Log the raw response
                resolve(response.data || []);
            })
            .catch((error) => {
                if (error.response) {
                    console.error(`getLGAs error for ${state}:`, error.response.status, error.response.data);
                    reject(new Error(`API error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`));
                } else if (error.request) {
                    console.error('getLGAs network error:', error);
                    reject(new Error('Network error: Unable to reach the server'));
                } else {
                    console.error('getLGAs unexpected error:', error);
                    reject(error);
                }
            });
    });
};

export const getStateReportCountsState = (state) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No authentication token found'));
        }

        if (!state) {
            return reject(new Error('State parameter is required'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/map/state/count?state=${encodeURIComponent(state)}`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                console.log('getStateReportCounts response:', response.data);
                resolve(response.data); // Expecting object with report_types, report_counts, etc.
            })
            .catch((error) => {
                if (error.response) {
                    console.error('getStateReportCounts API error:', error.response.status, error.response.data);
                    reject(new Error(`API error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`));
                } else if (error.request) {
                    console.error('getStateReportCounts network error:', error);
                    reject(new Error('Network error: Unable to reach the server'));
                } else {
                    console.error('getStateReportCounts unexpected error:', error);
                    reject(error);
                }
            });
    });
};

export const getTopStateReportCounts = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No authentication token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/reports/state/top`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                console.log('getTopStateReportCounts response:xxxxx', response.data);
                resolve(response.data); // Expecting [{ state_name, report_count }, ..., { total_states: X }]
            })
            .catch((error) => {
                if (error.response) {
                    console.error('getTopStateReportCounts API error:', error.response.status, error.response.data);
                    reject(new Error(`API error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`));
                } else if (error.request) {
                    console.error('getTopStateReportCounts network error:', error);
                    reject(new Error('Network error: Unable to reach the server'));
                } else {
                    console.error('getTopStateReportCounts unexpected error:', error);
                    reject(error);
                }
            });
    });
};

export const getStateReportCountsAllx = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No authentication token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/reports/states/top`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                },
            })
            .then((response) => {
                console.log('getStateReportCountsAll responsexxx:', response.data);
                resolve(response.data); // Expected shape: [..., { total_states: number }]
            })
            .catch((error) => {
                if (error.response) {
                    console.error('getStateReportCountsAll API error:', error.response.status, error.response.data);
                    reject(new Error(`API error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`));
                } else if (error.request) {
                    console.error('getStateReportCountsAll network error:', error);
                    reject(new Error('Network error: Unable to reach the server'));
                } else {
                    console.error('getStateReportCountsAll unexpected error:', error);
                    reject(error);
                }
            });
    });
};
