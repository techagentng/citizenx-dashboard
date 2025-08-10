import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem('serviceToken');
    
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the data.');
        error.status = response.status;
        throw error;
    }

    return response.json();
};

// State Reports
export const useStateReportCounts = () => {
    return useQuery({
        queryKey: ['stateReportCounts'],
        queryFn: () => fetchWithAuth('/reports/states/top'),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Overall Report Count
export const useReportCount = () => {
    return useQuery({
        queryKey: ['reportCount'],
        queryFn: () => fetchWithAuth('/incident_reports/count'),
    });
};

// State-specific Report Count
export const useStateReportCount = (state) => {
    return useQuery({
        queryKey: ['stateReportCount', state],
        queryFn: () => fetchWithAuth(`/incident_reports/state/${state}/count`),
        enabled: !!state,
    });
};

// LGA Report Count
export const useLGAReportCount = (lga) => {
    return useQuery({
        queryKey: ['lgaReportCount', lga],
        queryFn: () => fetchWithAuth(`/incident_reports/lga/${lga}/count`),
        enabled: !!lga,
    });
};

// User Data
export const useUserData = (isLoggedIn) => {
    return useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const [userCount, todayReportCount, onlineUsers] = await Promise.all([
                fetchWithAuth('/all/user'),
                fetchWithAuth('/today/report'),
                fetchWithAuth('/users/online')
            ]);
            return { userCount, todayReportCount, onlineUsers };
        },
        enabled: isLoggedIn,
    });
};

// Report Type Count by State and LGA
export const useReportTypeCount = (state, lga) => {
    return useQuery({
        queryKey: ['reportTypeCount', state, lga],
        queryFn: () => fetchWithAuth(`/report/type/count?state=${encodeURIComponent(state)}&lga=${encodeURIComponent(lga)}`),
        enabled: !!state && !!lga,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
