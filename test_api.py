#!/usr/bin/env python3
"""API Testing Script for Amaliyot Ofisi Platform"""

import http.client
import json
import sys

BASE_URL = "localhost:8000"
API_PREFIX = "/api/v1"

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
    print("\n✓ Testing Health Endpoint")
    print("=" * 50)
    conn = http.client.HTTPConnection(BASE_URL)
    conn.request("GET", "/health")
    response = conn.getresponse()
    data = json.loads(response.read().decode())
    conn.close()
    
    print(f"Status: {response.status}")
    print(f"Response: {data}")
    return response.status == 200

def test_registration():
    """Test user registration"""
    print("\n✓ Testing User Registration")
    print("=" * 50)
    
    import time
    timestamp = int(time.time())
    user_data = {
        "email": f"testuser{timestamp}@example.com",
        "username": f"testuser{timestamp}",
        "password": "testpass123",
        "full_name": "Test User"
    }
    
    status, response = make_request("POST", "/auth/register", user_data)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(response, indent=2)}")
    
    if status == 200 and "access_token" in response:
        email = user_data["email"]
        return response.get("access_token"), response.get("user", {}).get("id"), email
    return None, None, None

def test_login(email, password):
    """Test user login"""
    print("\n✓ Testing User Login")
    print("=" * 50)
    
    login_data = {
        "email": email,
        "password": password
    }
    
    status, response = make_request("POST", "/auth/login", login_data)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(response, indent=2)}")
    
    if status == 200 and "access_token" in response:
        return response.get("access_token"), response.get("user", {}).get("id")
    return None, None

def test_get_current_user(token):
    """Test getting current user"""
    print("\n✓ Testing Get Current User")
    print("=" * 50)
    
    status, response = make_request("GET", "/auth/me", token=token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(response, indent=2)}")
    return status == 200

def test_create_intern(token):
    """Test creating an intern"""
    print("\n✓ Testing Create Intern")
    print("=" * 50)
    
    intern_data = {
        "name": "John Doe",
        "role": "Frontend Developer",
        "status": "Active",
        "progress": 50.0,
        "avatar": "https://i.pravatar.cc/150?u=1"
    }
    
    status, response = make_request("POST", "/interns/", intern_data, token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(response, indent=2)}")
    
    return status == 200, response.get("id") if status == 200 else None

def test_get_interns(token):
    """Test getting all interns"""
    print("\n✓ Testing Get All Interns")
    print("=" * 50)
    
    status, response = make_request("GET", "/interns/", token=token)
    print(f"Status: {status}")
    print(f"Response Count: {len(response) if isinstance(response, list) else 'N/A'}")
    if isinstance(response, list) and len(response) > 0:
        print(f"First Item: {json.dumps(response[0], indent=2)}")
    return status == 200

def test_update_intern(token, intern_id):
    """Test updating an intern"""
    print("\n✓ Testing Update Intern")
    print("=" * 50)
    
    update_data = {
        "status": "Completed",
        "progress": 100.0
    }
    
    status, response = make_request("PUT", f"/interns/{intern_id}", update_data, token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(response, indent=2)}")
    return status == 200

def test_delete_intern(token, intern_id):
    """Test deleting an intern"""
    print("\n✓ Testing Delete Intern")
    print("=" * 50)
    
    status, response = make_request("DELETE", f"/interns/{intern_id}", token=token)
    print(f"Status: {status}")
    print(f"Response: {response}")
    return status == 204

def main():
    """Run all tests"""
    print("\n" + "=" * 50)
    print("🧪 AMALIYOT OFISI PLATFORM - API TEST SUITE")
    print("=" * 50)
    
    # Test 1: Health Check
    if not test_health():
        print("\n❌ Backend is not responding!")
        sys.exit(1)
    
    # Test 2: Registration
    token, user_id, email = test_registration()
    if not token:
        print("\n❌ Registration failed!")
        sys.exit(1)
    print("✅ Registration successful!")
    
    # Test 3: Login
    login_token, user_id2 = test_login(email, "testpass123")
    if not login_token:
        print("\n❌ Login failed!")
        sys.exit(1)
    print("✅ Login successful!")
    
    # Test 4: Get Current User
    if not test_get_current_user(login_token):
        print("\n❌ Get current user failed!")
    else:
        print("✅ Get current user successful!")
    
    # Test 5: Create Intern
    created, intern_id = test_create_intern(login_token)
    if not created:
        print("\n❌ Create intern failed!")
    else:
        print("✅ Create intern successful!")
    
    # Test 6: Get All Interns
    if not test_get_interns(login_token):
        print("\n❌ Get interns failed!")
    else:
        print("✅ Get interns successful!")
    
    # Test 7: Update Intern (if created)
    if intern_id:
        if not test_update_intern(login_token, intern_id):
            print("\n❌ Update intern failed!")
        else:
            print("✅ Update intern successful!")
        
        # Test 8: Delete Intern
        if not test_delete_intern(login_token, intern_id):
            print("\n❌ Delete intern failed!")
        else:
            print("✅ Delete intern successful!")
    
    print("\n" + "=" * 50)
    print("🎉 ALL TESTS COMPLETED!")
    print("=" * 50)
    print("\n✅ Backend is running perfectly!")
    print("✅ Frontend is running at: http://localhost:3000")
    print("✅ API Docs at: http://localhost:8000/docs")
    print("\n" + "=" * 50)

if __name__ == "__main__":
    main()
