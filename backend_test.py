import requests
import sys
from datetime import datetime
import json

class OptimisAIAPITester:
    def __init__(self, base_url="https://ai-automation-hub-75.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.admin_user = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        # Add auth token if available
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        # Add additional headers if provided
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return True, response.json()
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "api/health", 200)

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root Endpoint", "GET", "api/", 200)

    def test_create_lead(self, name, email, company="Test Company", source="contact_form"):
        """Test lead creation"""
        lead_data = {
            "name": name,
            "email": email,
            "phone": "+1-555-0123",
            "company": company,
            "message": "Test message for automation testing",
            "source": source
        }
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "api/leads",
            200,
            data=lead_data
        )
        return success, response.get('id') if success else None

    def test_admin_register(self, name, email, password):
        """Test admin registration"""
        success, response = self.run_test(
            "Admin Registration",
            "POST",
            "api/admin/register",
            200,
            data={
                "name": name,
                "email": email,
                "password": password
            }
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.admin_user = response.get('admin')
            print(f"   Token acquired: {self.token[:20]}...")
            return True, response
        return success, response

    def test_admin_login(self, email, password):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/admin/login",
            200,
            data={
                "email": email,
                "password": password
            }
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.admin_user = response.get('admin')
            print(f"   Token acquired: {self.token[:20]}...")
            return True, response
        return success, response

    def test_get_admin_profile(self):
        """Test getting admin profile"""
        if not self.token:
            print("❌ No token available for admin profile test")
            return False, {}
        return self.run_test("Get Admin Profile", "GET", "api/admin/me", 200)

    def test_get_leads(self):
        """Test getting leads list"""
        if not self.token:
            print("❌ No token available for get leads test")
            return False, {}
        return self.run_test("Get Leads", "GET", "api/admin/leads", 200)

    def test_get_stats(self):
        """Test getting admin stats"""
        if not self.token:
            print("❌ No token available for stats test")
            return False, {}
        return self.run_test("Get Admin Stats", "GET", "api/admin/stats", 200)

    def test_update_lead(self, lead_id, status="contacted"):
        """Test updating lead status"""
        if not self.token:
            print("❌ No token available for update lead test")
            return False, {}
        return self.run_test(
            "Update Lead Status", 
            "PATCH", 
            f"api/admin/leads/{lead_id}",
            200,
            data={"status": status}
        )

    def test_delete_lead(self, lead_id):
        """Test deleting a lead"""
        if not self.token:
            print("❌ No token available for delete lead test")
            return False, {}
        return self.run_test(
            "Delete Lead",
            "DELETE", 
            f"api/admin/leads/{lead_id}",
            200
        )

def main():
    print("🚀 Starting Optimis AI API Tests...")
    print("=" * 50)
    
    tester = OptimisAIAPITester()
    test_timestamp = datetime.now().strftime('%H%M%S')
    test_email = f"admin_test_{test_timestamp}@optimisai.com"
    test_password = "TestPassword123!"
    
    # Test results tracking
    failed_tests = []
    
    # 1. Test Health Endpoints
    print("\n📋 BASIC HEALTH CHECKS")
    print("-" * 30)
    
    success, _ = tester.test_health_check()
    if not success:
        failed_tests.append("Health Check")
    
    success, _ = tester.test_root_endpoint()
    if not success:
        failed_tests.append("Root Endpoint")
    
    # 2. Test Lead Creation (Public)
    print("\n📝 LEAD MANAGEMENT (PUBLIC)")
    print("-" * 30)
    
    success, lead_id = tester.test_create_lead(
        name="Test User", 
        email=f"testlead_{test_timestamp}@example.com"
    )
    if not success:
        failed_tests.append("Create Lead")
    
    # 3. Test Admin Authentication
    print("\n🔐 ADMIN AUTHENTICATION")
    print("-" * 30)
    
    # Try admin registration
    success, _ = tester.test_admin_register(
        name="Test Admin",
        email=test_email,
        password=test_password
    )
    if not success:
        failed_tests.append("Admin Registration")
        # If registration fails, try login with existing admin
        success, _ = tester.test_admin_login(test_email, test_password)
        if not success:
            failed_tests.append("Admin Login")
    
    # Test admin profile
    if tester.token:
        success, _ = tester.test_get_admin_profile()
        if not success:
            failed_tests.append("Get Admin Profile")
    
    # 4. Test Protected Admin Endpoints
    print("\n📊 ADMIN DASHBOARD (PROTECTED)")
    print("-" * 30)
    
    if tester.token:
        success, leads_data = tester.test_get_leads()
        if not success:
            failed_tests.append("Get Leads")
        
        success, stats_data = tester.test_get_stats()
        if not success:
            failed_tests.append("Get Admin Stats")
        else:
            print(f"   📈 Stats: {json.dumps(stats_data, indent=2)}")
        
        # Test lead operations if we have a lead ID
        if lead_id:
            success, _ = tester.test_update_lead(lead_id, "qualified")
            if not success:
                failed_tests.append("Update Lead")
            
            success, _ = tester.test_delete_lead(lead_id)
            if not success:
                failed_tests.append("Delete Lead")
    else:
        failed_tests.extend(["Get Leads", "Get Admin Stats", "Update Lead", "Delete Lead"])
        print("❌ Skipping protected endpoints - no authentication token")
    
    # Final Results
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    print(f"✅ Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"❌ Tests failed: {len(failed_tests)}/{tester.tests_run}")
    
    if failed_tests:
        print(f"\n🚨 Failed Tests:")
        for test in failed_tests:
            print(f"   • {test}")
    
    if tester.admin_user:
        print(f"\n👤 Admin User Created: {tester.admin_user}")
    
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"\n📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if success_rate >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())