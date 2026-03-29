# 🤝 Backend-Frontend Collaboration Guide
## Complete API Integration Blueprint

---

## 🎯 Objective
This guide provides backend developers with exact specifications for frontend API integration, ensuring seamless collaboration and proper data flow.

---

## 📋 Current Frontend Components & API Requirements

### **1. Enhanced Comparison Feature**
**Component:** `src/views/compare/EnhancedComparison.js`

#### **Required Endpoints:**

##### **A. States Endpoint**
```http
GET /api/v1/states
```

**Expected Response Format:**
```json
{
  "success": true,
  "data": {
    "states": ["Lagos", "Abuja", "Ebonyi", "Rivers", "Kano"]
  }
}
```

**Alternative Formats (Frontend Handles All):**
```json
// Direct array format
["Lagos", "Abuja", "Ebonyi", "Rivers", "Kano"]

// Or nested data format
{
  "data": ["Lagos", "Abuja", "Ebonyi", "Rivers", "Kano"]
}
```

**Frontend Usage:**
```javascript
// In EnhancedComparison.js
getStates()
  .then(data => {
    // Frontend handles all response formats automatically
    if (data && data.states) {
      setStates(data.states);
    } else if (data && Array.isArray(data)) {
      setStates(data);
    } else if (data && data.data && Array.isArray(data.data)) {
      setStates(data.data);
    }
  });
```

---

##### **B. Categories Endpoint**
```http
GET /api/v1/categories
```

**Expected Response Format:**
```json
{
  "success": true,
  "data": {
    "categories": ["Crime", "Election", "Health", "Education"]
  }
}
```

**Alternative Formats (Frontend Handles All):**
```json
// Direct array format
["Crime", "Election", "Health", "Education"]

// Or nested format
{
  "categories": ["Crime", "Election", "Health", "Education"]
}
```

---

##### **C. Main Comparison Endpoint**
```http
POST /api/v1/comparison/reports
```

**Request Body (Frontend Sends This):**
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

**Expected Response Format:**
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

### **2. Sub-Report Details Feature**
**Component:** `src/views/dashboard/subReportDetails.js`

#### **Required Endpoint:**
```http
GET /api/v1/report/incident_reports?category=crime&state_name=Lagos&page=1&limit=10
```

**Expected Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sub_report_type": "Assault",
      "description": "Physical assault reported at location",
      "state_name": "Lagos",
      "lga_name": "Ikeja",
      "date_of_incidence": "2024-01-15T10:30:00Z",
      "created_at": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

## 🔧 Authentication Requirements

### **All Endpoints Must Include:**
```http
Authorization: Bearer {serviceToken}
```

**Token Source:** Frontend retrieves from `localStorage.getItem('serviceToken')`

### **Error Handling Standards:**

#### **Authentication Errors (401):**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

#### **Validation Errors (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "report_type",
      "issue": "Required field missing"
    }
  }
}
```

#### **Not Found Errors (404):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

---

## 📊 Data Structure Standards

### **Date Formats:**
- **All dates:** ISO 8601 format (`2024-01-15T10:30:00Z`)
- **Date ranges:** YYYY-MM-DD format (`2024-01-01`)
- **Time series dates:** ISO 8601 format

### **Number Formats:**
- **Counts:** Integers
- **Percentages:** Float with 1 decimal place (`15.2`)
- **Averages:** Float with 1 decimal place (`13.4`)

### **String Formats:**
- **State names:** Title case (`Lagos`, `Abuja`)
- **Report types:** Title case (`Crime`, `Election`)
- **Descriptions:** Plain text strings

---

## 🔄 Frontend Service Integration

### **Service File:** `src/services/reportService.js`

#### **Current Implementation:**
```javascript
export const getStates = () => {
  return new Promise((resolve, reject) => {
    const serviceToken = localStorage.getItem('serviceToken');
    
    axios.get(`${process.env.REACT_APP_API_URL}/states`, {
      headers: {
        Authorization: `Bearer ${serviceToken}`
      }
    })
    .then((response) => {
      if (response && response.data) {
        resolve(response.data);  // Frontend handles response format
      } else {
        reject(new Error('No states found'));
      }
    })
    .catch((error) => {
      reject(error);
    });
  });
};
```

---

## 🧪 Testing Collaboration

### **Backend Testing Script:**
Use the provided `test_backend_connection.js` in browser console:

```javascript
// Run in browser console when logged in
testBackendConnection()
```

### **Manual Testing Steps:**
1. **Start backend:** `go run main.go`
2. **Start frontend:** `npm start`
3. **Login to application**
4. **Navigate to `/compare`**
5. **Open browser console**
6. **Run:** `testBackendConnection()`

### **Expected Console Output:**
```
Testing states endpoint...
States response: {success: true, data: {states: ["Lagos", "Ebonyi"]}}

Testing categories endpoint...
Categories response: {success: true, data: {categories: ["Crime", "Election"]}}

Testing enhanced incident reports endpoint...
Incident reports response: {success: true, data: [...]}
```

---

## 🚀 Deployment Integration

### **Environment Variables:**
```javascript
// Frontend uses this for API base URL
process.env.REACT_APP_API_URL
```

**Development:** `http://localhost:8080/api/v1`
**Production:** `https://your-api-domain.com/api/v1`

### **CORS Requirements:**
Backend must allow requests from frontend domain:
```go
// Example Go CORS setup
corsHandler := cors.New(cors.Options{
    AllowedOrigins: []string{"https://your-frontend-domain.com"},
    AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowedHeaders: []string{"*"},
    AllowCredentials: true,
})
```

---

## 📋 Integration Checklist

### **Backend Team:**
- [ ] Implement `/api/v1/states` with proper response format
- [ ] Implement `/api/v1/categories` with proper response format  
- [ ] Implement `/api/v1/comparison/reports` with full response structure
- [ ] Implement `/api/v1/report/incident_reports` with pagination
- [ ] Add proper authentication middleware
- [ ] Add comprehensive error handling
- [ ] Set up CORS for frontend domain
- [ ] Test with provided connection script

### **Frontend Team:**
- [ ] Update API base URL in environment variables
- [ ] Test all endpoints with backend
- [ ] Verify error handling works correctly
- [ ] Test authentication flow
- [ ] Validate data display in UI
- [ ] Test comparison feature end-to-end

---

## 🔄 Iteration Process

### **1. Initial Integration:**
- Backend implements basic endpoints
- Frontend tests with real data
- Both teams review console logs

### **2. Data Validation:**
- Backend validates response formats
- Frontend confirms data display
- Teams coordinate on any format changes

### **3. Feature Testing:**
- End-to-end testing of comparison flow
- Error scenario testing
- Performance validation

### **4. Production Deployment:**
- Backend endpoints deployed to staging
- Frontend points to staging API
- Full integration testing
- Production deployment

---

## 📞 Communication Protocol

### **API Changes:**
- **Backend team:** Notify frontend of any API changes
- **Frontend team:** Report any data format issues immediately
- **Both teams:** Use shared testing script for validation

### **Issue Resolution:**
1. **Frontend reports issue** with console logs
2. **Backend investigates** endpoint behavior
3. **Both teams coordinate** on fix implementation
4. **Testing validates** the solution

---

## 🎯 Success Metrics

### **Technical Metrics:**
- ✅ All endpoints return proper response formats
- ✅ Authentication works seamlessly
- ✅ Error handling is comprehensive
- ✅ Response times < 500ms

### **User Experience Metrics:**
- ✅ State dropdown populated correctly
- ✅ Comparison feature works end-to-end
- ✅ Data displays accurately in UI
- ✅ Error messages are user-friendly

---

## 🚀 Ready for Integration!

This guide provides everything needed for seamless backend-frontend integration. The frontend is built with flexibility to handle various response formats, making integration robust and future-proof.

**🤝 Let's build this amazing comparison feature together!**
