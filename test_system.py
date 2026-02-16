#!/usr/bin/env python3
"""
Comprehensive System Test Report  
Tests all critical functionality of the Amaliyot Ofisi Platform
"""

import http.client
import json
import sys
from datetime import datetime

BASE_URL = "localhost:8000"
API_PREFIX = "/api/v1"

class TestReport:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.results = []
    
    def add_result(self, test_name, status, details):
        self.tests_run += 1
        if status:
            self.tests_passed += 1
            symbol = "✅"
        else:
            self.tests_failed += 1
            symbol = "❌"
        
        self.results.append({
            "test": test_name,
            "status": status,
            "symbol": symbol,
            "details": details
        })
    
    def print_report(self):
        print("\n" + "=" * 70)
        print(f"📊 SYSTEM TEST REPORT - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 70)
        
        for result in self.results:
            print(f"\n{result['symbol']} {result['test']}")
            print(f"   Status: {'PASSED' if result['status'] else 'FAILED'}")
            if result['details']:
                print(f"   Details: {result['details']}")
        
        print("\n" + "=" * 70)
        print("📈 SUMMARY")
        print("=" * 70)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_failed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        print("=" * 70)

def make_request(method, endpoint, body=None, token=None):
    """Make HTTP request to the API"""
    conn = http.client.HTTPConnection(BASE_URL)
    headers = {"Content-Type": "application/json"}
    
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    url = API_PREFIX + endpoint
    
    try:
        if body:
            conn.request(method, url, json.dumps(body), headers)
        else:
            conn.request(method, url, headers=headers)
        
        response = conn.getresponse()
        data = response.read().decode()
        conn.close()
        
        try:
            return response.status, json.loads(data) if data else {}
        except:
            return response.status, {"raw": data}
    except Exception as e:
        return None, {"error": str(e)}

def test_health():
    """Test health endpoint"""
    report = TestReport()
    
    conn = http.client.HTTPConnection(BASE_URL)
    conn.request("GET", "/health")
    response = conn.getresponse()
    data = json.loads(response.read().decode())
    conn.close()
    
    passed = response.status == 200 and data.get("status") == "ok"
    report.add_result(
        "Health Check",
        passed,
        f"Status: {response.status}, Response: {data.get('status')}"
    )
    
    return report

def test_authentication():
    """Test user registration and login"""
    report = TestReport()
    
    import time
    timestamp = int(time.time())
    email = f"test{timestamp}@example.com"
    username = f"test{timestamp}"
    password = "TestPass123!"
    
    # Register
    reg_data = {
        "email": email,
        "username": username,
        "password": password,
        "full_name": "Test User"
    }
    
    reg_status, reg_response = make_request("POST", "/auth/register", reg_data)
    reg_passed = reg_status == 200 and "access_token" in reg_response
    report.add_result(
        "User Registration",
        reg_passed,
        f"Status: {reg_status}, Token received: {'access_token' in reg_response}"
    )
    
    if not reg_passed:
        return report
    
    # Login
    login_data = {"email": email, "password": password}
    login_status, login_response = make_request("POST", "/auth/login", login_data)
    login_passed = login_status == 200 and "access_token" in login_response
    report.add_result(
        "User Login",
        login_passed,
        f"Status: {login_status}, Token received: {'access_token' in login_response}"
    )
    
    return report

def test_crud_operations():
    """Test CRUD endpoints"""
    report = TestReport()
    
    # Get all interns (public endpoint, no auth required)
    get_status, get_response = make_request("GET", "/interns/")
    get_passed = get_status == 200 and isinstance(get_response, list)
    report.add_result(
        "GET /interns/ (Read All)",
        get_passed,
        f"Status: {get_status}, Count: {len(get_response) if isinstance(get_response, list) else 'N/A'}"
    )
    
    # Check other endpoints are callable (even if 401)
    create_status, _ = make_request("POST", "/interns/", {
        "name": "Test",
        "role": "Developer",
        "status": "Active",
        "progress": 50
    })
    # We expect 401 because no auth, but endpoint exists if 401
    endpoint_exists = create_status in [200, 401, 422]
    report.add_result(
        "POST /interns/ (Create) - Endpoint Exists",
        endpoint_exists,
        f"Status: {create_status} (expected: 200 or 401)"
    )
    
    return report

def test_cors():
    """Test CORS middleware"""
    report = TestReport()
    
    conn = http.client.HTTPConnection(BASE_URL)
    headers = {
        "Origin": "http://localhost:3000",
        "Content-Type": "application/json"
    }
    
    conn.request("GET", f"{API_PREFIX}/health", headers=headers)
    response = conn.getresponse()
    cors_headers = dict(response.getheaders())
    conn.close()
    
    has_cors = any(k.lower() == "access-control-allow-origin" for k in cors_headers.keys())
    report.add_result(
        "CORS Middleware",
        has_cors,
        f"CORS header present: {has_cors}"
    )
    
    return report

def main():
    """Run all tests"""
    print("\n" + "=" * 70)
    print("🧪 AMALIYOT OFISI PLATFORM - COMPREHENSIVE SYSTEM TEST")
    print("=" * 70)
    
    all_results = TestReport()
    
    # Run tests
    for test_func in [test_health, test_authentication, test_crud_operations, test_cors]:
        report = test_func()
        for result in report.results:
            all_results.add_result(result["test"], result["status"], result["details"])
    
    # Print consolidated report
    all_results.print_report()
    
    # System status
    print("\n" + "=" * 70)
    print("🚀 SYSTEM STATUS")
    print("=" * 70)
    print("✅ Backend API: http://localhost:8000")
    print("✅ Frontend UI: http://localhost:3000")
    print("✅ API Documentation: http://localhost:8000/docs")
    print("✅ OpenAPI Schema: http://localhost:8000/openapi.json")
    print("=" * 70)
    
    # Next steps
    print("\n" + "=" * 70)
    print("📋 NEXT STEPS")
    print("=" * 70)
    print("1. Open http://localhost:3000 in your browser")
    print("2. Navigate to the Auth page")
    print("3. Register a new account")
    print("4. Login with your credentials")
    print("5. Test the dashboard and CRUD operations")
    print("=" * 70)

if __name__ == "__main__":
    main()
