import axios from '../utils/axios';

export const getFeed = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        
        const config = {
            headers: {
                Authorization: serviceToken ? `Bearer ${serviceToken}` : undefined
            }
        };

        axios
            .get('/incident_reports', config)
            .then((response) => {
                if (response.data && response.data.incident_reports) {
                    const mappedReports = response.data.incident_reports.map(report => ({
                        id: report.id,
                        user_fullname: report.fullname,
                        user_username: report.username,
                        created_at: report.created_at,
                        category: report.category,
                        description: report.description,
                        feed_urls: report.feed_urls,
                        thumbnail_urls: report.thumbnail_urls,
                        full_size_urls: report.full_size_urls,
                        upvote_count: report.upvote_count,
                        view: report.view,
                        lga_name: report.lga_name,
                        profile_image: report.User?.thumbnail_url || 'uploads/default-profile.png'
                    }));
                    resolve(mappedReports);
                } else {
                    reject(new Error('No feed data found'));
                }
            })
            .catch((error) => {
                console.error('Feed error:', error.response?.data || error.message);
                reject(error);
            });
    });
};

export const getPostById = (postId) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        
        const config = {
            headers: {
                Authorization: serviceToken ? `Bearer ${serviceToken}` : undefined
            }
        };

        axios
            .get(`/incident_reports/${postId}`, config)
            .then((response) => {
                if (response.data && response.data.data) {
                    const report = response.data.data;
                    resolve({
                        id: report.id,
                        user_fullname: report.fullname,
                        user_username: report.username,
                        created_at: report.created_at,
                        category: report.category,
                        description: report.description,
                        feed_urls: report.feed_urls,
                        thumbnail_urls: report.thumbnail_urls,
                        full_size_urls: report.full_size_urls,
                        upvote_count: report.upvote_count,
                        view: report.view,
                        lga_name: report.lga_name,
                        profile_image: report.User?.thumbnail_url || 'uploads/default-profile.png',
                        time_of_incidence: report.time_of_incidence,
                        location: report.address || report.landmark,
                        media: report.Media,
                        is_anonymous: report.is_anonymous,
                        comments: report.comments || []
                    });
                } else {
                    reject(new Error('Post not found'));
                }
            })
            .catch((error) => {
                console.error('Post error:', error.response?.data || error.message);
                reject(error);
            });
    });
};
