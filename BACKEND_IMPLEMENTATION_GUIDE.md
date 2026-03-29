# 🛠️ Backend Implementation Guide
## Exact Specifications for Frontend Integration

---

## 🎯 Objective
Implement backend endpoints that perfectly match the frontend consumption patterns documented in the Frontend API Consumption Pattern.

---

## 📋 Frontend Expectations (Reference)

### **Service Layer Pattern:**
```javascript
// Frontend calls this
getStates()
  .then(data => {
    // Handles ANY of these formats:
    // 1. {success: true, data: {states: ["Lagos", "Ebonyi"]}}
    // 2. ["Lagos", "Ebonyi"]  
    // 3. {states: ["Lagos", "Ebonyi"]}
    // 4. {data: ["Lagos", "Ebonyi"]}
  });
```

### **Authentication Pattern:**
```javascript
// Frontend automatically adds this header
headers: {
  Authorization: `Bearer ${serviceToken}`
}
```

---

## 🚀 Required Backend Endpoints

### **1. States Endpoint**
**Route:** `GET /api/v1/states`

#### **Implementation Options (Choose ONE):**

##### **Option A: Standard Response (Recommended)**
```go
func GetStates(w http.ResponseWriter, r *http.Request) {
    // Fetch states from database
    states, err := getAllStates()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    response := map[string]interface{}{
        "success": true,
        "data": map[string]interface{}{
            "states": states,
        },
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "states": ["Lagos", "Abuja", "Ebonyi", "Rivers", "Kano"]
  }
}
```

##### **Option B: Simple Array Response**
```go
func GetStates(w http.ResponseWriter, r *http.Request) {
    states, err := getAllStates()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(states)
}
```

**Response:**
```json
["Lagos", "Abuja", "Ebonyi", "Rivers", "Kano"]
```

---

### **2. Categories Endpoint**
**Route:** `GET /api/v1/categories`

#### **Implementation:**
```go
func GetCategories(w http.ResponseWriter, r *http.Request) {
    categories, err := getAllCategories()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    response := map[string]interface{}{
        "success": true,
        "data": map[string]interface{}{
            "categories": categories,
        },
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": ["Crime", "Election", "Health", "Education"]
  }
}
```

---

### **3. Comparison Endpoint**
**Route:** `POST /api/v1/comparison/reports`

#### **Request Structure (Frontend Sends):**
```json
{
  "report_type": "Crime",
  "locations": [
    {
      "type": "state",
      "name": "Lagos"
    },
    {
      "type": "state",
      "name": "Ebonyi"
    }
  ],
  "date_range": {
    "start": "2024-01-01",
    "end": "2024-03-31"
  },
  "granularity": "daily"
}
```

#### **Go Implementation:**
```go
type ComparisonRequest struct {
    ReportType string                 `json:"report_type"`
    Locations  []LocationRequest      `json:"locations"`
    DateRange  DateRangeRequest       `json:"date_range"`
    Granularity string                `json:"granularity"`
}

type LocationRequest struct {
    Type string `json:"type"` // "state" or "lga"
    Name string `json:"name"`
}

type DateRangeRequest struct {
    Start string `json:"start"`
    End   string `json:"end"`
}

func GetComparisonData(w http.ResponseWriter, r *http.Request) {
    // Parse request
    var req ComparisonRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        sendErrorResponse(w, "INVALID_REQUEST", "Invalid JSON", http.StatusBadRequest)
        return
    }
    
    // Validate request
    if err := validateComparisonRequest(req); err != nil {
        sendErrorResponse(w, "VALIDATION_ERROR", err.Error(), http.StatusBadRequest)
        return
    }
    
    // Fetch comparison data
    comparisonData, err := fetchComparisonData(req)
    if err != nil {
        sendErrorResponse(w, "DATABASE_ERROR", err.Error(), http.StatusInternalServerError)
        return
    }
    
    // Generate insights
    insights := generateInsights(comparisonData)
    
    // Build response
    response := map[string]interface{}{
        "success": true,
        "data": map[string]interface{}{
            "comparison_id": generateComparisonID(),
            "report_type":  req.ReportType,
            "locations":    comparisonData,
            "insights":     insights,
            "metadata": map[string]interface{}{
                "total_locations": len(req.Locations),
                "date_range":      req.DateRange,
                "generated_at":    time.Now().Format(time.RFC3339),
            },
        },
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}
```

#### **Response Structure:**
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
        "trend": "increasing",
        "trend_percentage": 15.2,
        "time_series": [
          {
            "date": "2024-01-01",
            "count": 12,
            "percentage_change": null
          },
          {
            "date": "2024-01-02",
            "count": 15,
            "percentage_change": 25.0
          }
        ],
        "sub_report_breakdown": [
          {
            "sub_report_type": "Assault",
            "count": 456,
            "percentage": 36.9
          }
        ]
      }
    ],
    "insights": [
      {
        "type": "highest_incidence",
        "location": "Lagos",
        "value": 1234,
        "description": "Lagos has the highest number of reports"
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

---

### **4. Incident Reports Endpoint**
**Route:** `GET /api/v1/report/incident_reports`

#### **Query Parameters:**
```
?category=crime&state_name=Lagos&page=1&limit=10
```

#### **Go Implementation:**
```go
func GetIncidentReports(w http.ResponseWriter, r *http.Request) {
    // Parse query parameters
    category := r.URL.Query().Get("category")
    stateName := r.URL.Query().Get("state_name")
    pageStr := r.URL.Query().Get("page")
    limitStr := r.URL.Query().Get("limit")
    
    // Convert pagination
    page, _ := strconv.Atoi(pageStr)
    if page < 1 { page = 1 }
    limit, _ := strconv.Atoi(limitStr)
    if limit < 1 { limit = 10 }
    offset := (page - 1) * limit
    
    // Fetch reports
    reports, total, err := fetchIncidentReports(category, stateName, limit, offset)
    if err != nil {
        sendErrorResponse(w, "DATABASE_ERROR", err.Error(), http.StatusInternalServerError)
        return
    }
    
    // Build response
    response := map[string]interface{}{
        "success": true,
        "data": reports,
        "pagination": map[string]interface{}{
            "page":       page,
            "limit":      limit,
            "total":      total,
            "totalPages": (total + limit - 1) / limit,
        },
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}
```

---

## 🔐 Authentication Middleware

### **JWT Token Validation:**
```go
func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Get Authorization header
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            sendErrorResponse(w, "UNAUTHORIZED", "No authorization header", http.StatusUnauthorized)
            return
        }
        
        // Extract token
        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        if tokenString == authHeader {
            sendErrorResponse(w, "UNAUTHORIZED", "Invalid authorization format", http.StatusUnauthorized)
            return
        }
        
        // Validate token
        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return []byte(os.Getenv("JWT_SECRET")), nil
        })
        
        if err != nil || !token.Valid {
            sendErrorResponse(w, "UNAUTHORIZED", "Invalid token", http.StatusUnauthorized)
            return
        }
        
        // Token is valid, proceed
        next.ServeHTTP(w, r)
    })
}
```

### **Apply to Routes:**
```go
// Apply auth middleware to all API routes
router.Handle("/api/v1/states", AuthMiddleware(http.HandlerFunc(GetStates)))
router.Handle("/api/v1/categories", AuthMiddleware(http.HandlerFunc(GetCategories)))
router.Handle("/api/v1/comparison/reports", AuthMiddleware(http.HandlerFunc(GetComparisonData)))
router.Handle("/api/v1/report/incident_reports", AuthMiddleware(http.HandlerFunc(GetIncidentReports)))
```

---

## 🚨 Error Handling Standards

### **Standard Error Response:**
```go
func sendErrorResponse(w http.ResponseWriter, code, message string, statusCode int) {
    response := map[string]interface{}{
        "success": false,
        "error": map[string]interface{}{
            "code":    code,
            "message": message,
        },
    }
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(statusCode)
    json.NewEncoder(w).Encode(response)
}
```

### **Common Error Types:**
```go
// Validation Error (400)
sendErrorResponse(w, "VALIDATION_ERROR", "Invalid input data", http.StatusBadRequest)

// Authentication Error (401)
sendErrorResponse(w, "UNAUTHORIZED", "Invalid or expired token", http.StatusUnauthorized)

// Not Found Error (404)
sendErrorResponse(w, "NOT_FOUND", "Resource not found", http.StatusNotFound)

// Server Error (500)
sendErrorResponse(w, "INTERNAL_ERROR", "Internal server error", http.StatusInternalServerError)
```

---

## 🗄️ Database Query Examples

### **States Query:**
```go
func getAllStates() ([]string, error) {
    query := `SELECT DISTINCT name FROM states ORDER BY name`
    
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    
    var states []string
    for rows.Next() {
        var state string
        if err := rows.Scan(&state); err != nil {
            return nil, err
        }
        states = append(states, state)
    }
    
    return states, nil
}
```

### **Comparison Data Query:**
```go
func fetchComparisonData(req ComparisonRequest) ([]LocationData, error) {
    var locations []LocationData
    
    for _, location := range req.Locations {
        var locationData LocationData
        
        if location.Type == "state" {
            // Query by state
            query := `
                SELECT 
                    COUNT(*) as total_reports,
                    AVG(COUNT(*)) OVER () as daily_average,
                    DATE(created_at) as report_date,
                    COUNT(*) as daily_count
                FROM incident_reports ir
                JOIN report_types rt ON ir.report_type_id = rt.id
                WHERE rt.category = $1 
                AND ir.state_name = $2
                AND ir.created_at BETWEEN $3 AND $4
                GROUP BY DATE(ir.created_at)
                ORDER BY report_date
            `
            
            rows, err := db.Query(query, req.ReportType, location.Name, req.DateRange.Start, req.DateRange.End)
            if err != nil {
                return nil, err
            }
            defer rows.Close()
            
            var timeSeries []TimeSeriesPoint
            var totalCount int
            
            for rows.Next() {
                var total, dailyAvg int
                var reportDate string
                var dailyCount int
                
                if err := rows.Scan(&total, &dailyAvg, &reportDate, &dailyCount); err != nil {
                    return nil, err
                }
                
                totalCount += dailyCount
                
                timeSeries = append(timeSeries, TimeSeriesPoint{
                    Date:  reportDate,
                    Count: dailyCount,
                })
            }
            
            locationData = LocationData{
                Name:         location.Name,
                Type:         location.Type,
                TotalReports: totalCount,
                DailyAverage: float64(totalCount) / float64(len(timeSeries)),
                TimeSeries:   timeSeries,
            }
        }
        
        locations = append(locations, locationData)
    }
    
    return locations, nil
}
```

---

## 🧪 Testing Implementation

### **Unit Test Example:**
```go
func TestGetStates(t *testing.T) {
    // Setup test database
    db := setupTestDB()
    defer db.Close()
    
    // Insert test data
    _, err := db.Exec(`INSERT INTO states (name) VALUES ('Lagos'), ('Abuja')`)
    if err != nil {
        t.Fatal(err)
    }
    
    // Create request
    req, _ := http.NewRequest("GET", "/api/v1/states", nil)
    req.Header.Set("Authorization", "Bearer valid-token")
    
    // Create response recorder
    rr := httptest.NewRecorder()
    
    // Call handler
    handler := AuthMiddleware(http.HandlerFunc(GetStates))
    handler.ServeHTTP(rr, req)
    
    // Check status
    if status := rr.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
    }
    
    // Parse response
    var response map[string]interface{}
    json.Unmarshal(rr.Body.Bytes(), &response)
    
    // Verify response structure
    if !response["success"].(bool) {
        t.Error("Expected success to be true")
    }
}
```

### **Integration Test:**
```bash
# Test endpoints manually
curl -X GET "http://localhost:8080/api/v1/states" \
  -H "Authorization: Bearer YOUR_TOKEN"

curl -X POST "http://localhost:8080/api/v1/comparison/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "report_type": "Crime",
    "locations": [{"type": "state", "name": "Lagos"}],
    "date_range": {"start": "2024-01-01", "end": "2024-01-31"},
    "granularity": "daily"
  }'
```

---

## 🚀 Deployment Configuration

### **Environment Variables:**
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=citizenx
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your-secret-key

# Server
PORT=8080
ENVIRONMENT=production
```

### **CORS Configuration:**
```go
func setupCORS() *cors.Cors {
    return cors.New(cors.Options{
        AllowedOrigins: []string{
            "http://localhost:3000",           // Development
            "https://your-frontend-domain.com", // Production
        },
        AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders: []string{"*"},
        AllowCredentials: true,
        Debug: false,
    })
}
```

---

## 📋 Implementation Checklist

### **Core Endpoints:**
- [ ] `GET /api/v1/states` - Returns list of states
- [ ] `GET /api/v1/categories` - Returns report categories
- [ ] `POST /api/v1/comparison/reports` - Comparison data with insights
- [ ] `GET /api/v1/report/incident_reports` - Paginated incident reports

### **Authentication:**
- [ ] JWT token validation middleware
- [ ] Proper error responses for auth failures
- [ ] Token refresh support (if needed)

### **Data Validation:**
- [ ] Request body validation
- [ ] Query parameter validation
- [ ] SQL injection protection

### **Error Handling:**
- [ ] Standardized error response format
- [ ] Proper HTTP status codes
- [ ] Logging for debugging

### **Performance:**
- [ ] Database query optimization
- [ ] Response caching (if needed)
- [ ] Rate limiting (if needed)

### **Testing:**
- [ ] Unit tests for all endpoints
- [ ] Integration tests with frontend
- [ ] Load testing for comparison endpoint

---

## 🎯 Success Metrics

### **Functional Requirements:**
- ✅ All endpoints return expected data formats
- ✅ Authentication works seamlessly
- ✅ Error handling is comprehensive
- ✅ Response times < 500ms

### **Integration Requirements:**
- ✅ Frontend can consume all endpoints
- ✅ Testing script passes all checks
- ✅ No console errors in frontend
- ✅ Data displays correctly in UI

---

## 🚀 Ready for Implementation!

This guide provides everything needed to implement backend endpoints that work perfectly with the frontend consumption patterns. The frontend is designed to be flexible and will handle any reasonable response format.

**🤝 Let's build this amazing integration together!**
