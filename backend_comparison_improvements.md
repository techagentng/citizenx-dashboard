# Backend API Improvements for Report Comparison Feature

## 🎯 Objective
Enhance the comparison endpoints to support single report type comparisons across multiple states/LGAs with better data granularity and insights.

## 📋 Current Issues with Existing Endpoints

### 1. `/api/v1/report-type/states` - Current Limitations
- **Multiple report types in one request** makes data complex to visualize
- **No LGA-level comparison support**
- **Limited time-based analysis**
- **No statistical insights or trends**
- **No support for percentage calculations**

## 🚀 Proposed New Endpoints

### 1. Primary Comparison Endpoint
```
POST /api/v1/comparison/reports
```

**Request Body:**
```json
{
  "report_type": "Crime",  // Single report type only
  "locations": [
    {
      "type": "state",  // or "lga"
      "name": "Lagos"
    },
    {
      "type": "state", 
      "name": "Ebonyi"
    },
    {
      "type": "lga",
      "name": "Ikeja",
      "state": "Lagos"  // Required for LGA
    }
  ],
  "date_range": {
    "start": "2024-01-01",
    "end": "2024-03-31"
  },
  "granularity": "daily"  // daily, weekly, monthly
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "comparison_id": "cmp_123456",
    "report_type": "Crime",
    "locations": [
      {
        "name": "Lagos",
        "type": "state",
        "total_reports": 1234,
        "daily_average": 13.4,
        "trend": "increasing",  // increasing, decreasing, stable
        "trend_percentage": 15.2,
        "time_series": [
          {
            "date": "2024-01-01",
            "count": 12,
            "percentage_change": null  // null for first day
          },
          {
            "date": "2024-01-02", 
            "count": 15,
            "percentage_change": 25.0  // 15 vs 12 = +25%
          }
        ],
        "sub_report_breakdown": [
          {
            "sub_report_type": "Assault",
            "count": 456,
            "percentage": 36.9
          },
          {
            "sub_report_type": "Theft", 
            "count": 234,
            "percentage": 19.0
          }
        ]
      },
      {
        "name": "Ebonyi",
        "type": "state", 
        "total_reports": 567,
        "daily_average": 6.2,
        "trend": "decreasing",
        "trend_percentage": -8.5,
        "time_series": [...],
        "sub_report_breakdown": [...]
      }
    ],
    "insights": [
      {
        "type": "highest_incidence",
        "location": "Lagos",
        "value": 1234,
        "description": "Lagos has the highest number of Crime reports"
      },
      {
        "type": "fastest_growing",
        "location": "Lagos", 
        "value": 15.2,
        "description": "Lagos shows the fastest growth at 15.2%"
      }
    ],
    "metadata": {
      "total_locations": 2,
      "date_range": {
        "start": "2024-01-01",
        "end": "2024-03-31"
      },
      "generated_at": "2024-03-31T12:00:00Z"
    }
  }
}
```

### 2. Comparison Insights Endpoint
```
GET /api/v1/comparison/insights/{comparison_id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "statistical_summary": {
      "total_reports_all_locations": 1801,
      "average_per_location": 900.5,
      "standard_deviation": 470.3,
      "coefficient_of_variation": 52.2  // Higher means more variation
    },
    "correlations": [
      {
        "locations": ["Lagos", "Ebonyi"],
        "correlation_coefficient": 0.73,
        "description": "Strong positive correlation between Lagos and Ebonyi"
      }
    ],
    "anomalies": [
      {
        "location": "Lagos",
        "date": "2024-02-15",
        "expected_count": 13.4,
        "actual_count": 45,
        "anomaly_score": 3.2,
        "description": "Unusual spike in reports on Feb 15"
      }
    ]
  }
}
```

### 3. Historical Comparison Endpoint
```
POST /api/v1/comparison/historical
```

**Request Body:**
```json
{
  "report_type": "Crime",
  "location": {
    "type": "state",
    "name": "Lagos"
  },
  "periods": [
    {
      "start": "2024-01-01",
      "end": "2024-03-31",
      "label": "Q1 2024"
    },
    {
      "start": "2023-01-01", 
      "end": "2023-03-31",
      "label": "Q1 2023"
    }
  ]
}
```

## 🗄️ Database Schema Requirements

### 1. Optimized Queries for Single Report Type
```sql
-- Main comparison query
SELECT 
    s.name as location_name,
    'state' as location_type,
    COUNT(ir.id) as total_reports,
    AVG(COUNT(ir.id)) OVER (PARTITION BY s.name) as daily_average,
    -- Trend calculation
    (COUNT(ir.id) - LAG(COUNT(ir.id)) OVER (ORDER BY DATE(ir.created_at))) * 100.0 / 
    NULLIF(LAG(COUNT(ir.id)) OVER (ORDER BY DATE(ir.created_at)), 0) as trend_percentage,
    -- Sub-report breakdown
    ir.sub_report_type,
    COUNT(*) as sub_report_count
FROM incident_reports ir
JOIN states s ON ir.state_name = s.name
JOIN report_types rt ON ir.report_type_id = rt.id
WHERE rt.category = ?  -- Single report type
AND ir.created_at BETWEEN ? AND ?
AND s.name IN (?, ?, ?)  -- Multiple locations
GROUP BY s.name, DATE(ir.created_at), ir.sub_report_type
ORDER BY s.name, DATE(ir.created_at);
```

### 2. Performance Optimization
```sql
-- Recommended indexes
CREATE INDEX idx_incident_reports_category_date ON incident_reports(created_at, report_type_id);
CREATE INDEX idx_incident_reports_state_date ON incident_reports(state_name, created_at);
CREATE INDEX idx_incident_reports_lga_date ON incident_reports(lga_name, created_at);
```

## 📊 Response Format Standards

### 1. Consistent Date Format
```json
"date": "2024-01-01T00:00:00Z"  // ISO 8601 UTC
```

### 2. Percentage Calculations
```json
"percentage": 15.2,  // Always as number, not string
"trend": "increasing"  // Normalized trend direction
```

### 3. Error Handling
```json
{
  "success": false,
  "error": {
    "code": "INVALID_LOCATION",
    "message": "Location 'InvalidState' not found",
    "details": {
      "valid_states": ["Lagos", "Ebonyi", "Abuja"]
    }
  }
}
```

## 🔧 Implementation Priority

### Phase 1: Core Comparison Endpoint (Week 1)
- [ ] Implement `/api/v1/comparison/reports`
- [ ] Single report type validation
- [ ] Basic time series data
- [ ] Sub-report breakdown

### Phase 2: Enhanced Features (Week 2)
- [ ] Trend calculations
- [ ] Statistical insights
- [ ] LGA-level support
- [ ] Performance optimizations

### Phase 3: Advanced Analytics (Week 3)
- [ ] Anomaly detection
- [ ] Correlation analysis
- [ ] Historical comparisons
- [ ] Caching layer for performance

## 🎯 Success Metrics

1. **Response Time:** < 500ms for single comparison
2. **Data Accuracy:** 100% consistency with incident reports
3. **Scalability:** Support up to 10 locations in one request
4. **Flexibility:** Support daily, weekly, monthly granularity

## 🚨 Important Notes

1. **Backward Compatibility:** Keep existing `/api/v1/report-type/states` endpoint for now
2. **Rate Limiting:** Implement reasonable limits to prevent abuse
3. **Data Validation:** Validate all location names against database
4. **Error Logging:** Comprehensive logging for debugging
5. **Documentation:** Update API documentation with examples

## 📞 Contact for Clarification

Please reach out for any clarification on:
- Database schema requirements
- Expected response formats
- Performance optimization strategies
- Edge case handling

---

**Estimated Development Time:** 2-3 weeks  
**Priority:** High (critical for improved UX)  
**Dependencies:** Database access, existing incident_reports table
