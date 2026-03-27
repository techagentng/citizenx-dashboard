import React from 'react';
import {
    Box,
    Typography,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Alert,
    Card,
    CardContent
} from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    Assessment,
    LocationOn,
    Timeline,
    Speed
} from '@mui/icons-material';

const ComparisonInsights = ({ insights }) => {
    if (!insights || insights.length === 0) {
        return (
            <Alert severity="info">
                No significant insights available for this comparison.
            </Alert>
        );
    }

    const getInsightIcon = (type) => {
        switch (type) {
            case 'highest_incidence': return <LocationOn color="error" />;
            case 'lowest_incidence': return <LocationOn color="success" />;
            case 'fastest_growing': return <TrendingUp color="success" />;
            case 'fastest_declining': return <TrendingDown color="error" />;
            case 'most_stable': return <Timeline color="info" />;
            case 'highest_average': return <Speed color="primary" />;
            default: return <Assessment color="action" />;
        }
    };

    const getInsightColor = (type) => {
        switch (type) {
            case 'highest_incidence': return 'error';
            case 'lowest_incidence': return 'success';
            case 'fastest_growing': return 'warning';
            case 'fastest_declining': return 'error';
            case 'most_stable': return 'info';
            case 'highest_average': return 'primary';
            default: return 'default';
        }
    };

    const formatValue = (type, value) => {
        switch (type) {
            case 'highest_incidence':
            case 'lowest_incidence':
            case 'highest_average':
                return value.toLocaleString() + ' reports';
            case 'fastest_growing':
            case 'fastest_declining':
                return `${Math.abs(value).toFixed(1)}%`;
            default:
                return value.toString();
        }
    };

    return (
        <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Key findings from your comparison analysis:
            </Typography>

            <List>
                {insights.map((insight, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemIcon sx={{ mt: 1 }}>
                                {getInsightIcon(insight.type)}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {insight.location}
                                        </Typography>
                                        <Chip
                                            size="small"
                                            label={formatValue(insight.type, insight.value)}
                                            color={getInsightColor(insight.type)}
                                        />
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="body2" color="text.secondary">
                                        {insight.description}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {index < insights.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>

            {/* Additional Analysis Summary */}
            <Card sx={{ mt: 3, bgcolor: 'grey.50' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Assessment sx={{ mr: 1 }} />
                        Analysis Summary
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This comparison provides insights into report patterns across different locations. 
                        Use these insights to identify trends, allocate resources effectively, and understand 
                        regional differences in incident reporting.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ComparisonInsights;
