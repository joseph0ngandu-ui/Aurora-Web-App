import requests
import sys
import time

BASE_URL = "http://localhost:8000/api/v1"

def test_endpoint(name, method, url, data=None, token=None):
    print(f"Testing {name}...", end=" ")
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    try:
        if method == "GET":
            res = requests.get(url, headers=headers)
        elif method == "POST":
            res = requests.post(url, json=data, headers=headers)
            
        if res.status_code >= 400:
            print(f"FAILED ({res.status_code})")
            print(res.text)
            return None
            
        json_data = res.json()
        if not json_data.get("success"):
            print("FAILED (success=False)")
            return None
            
        print("OK")
        return json_data.get("data")
    except Exception as e:
        print(f"ERROR: {e}")
        return None

def main():
    print("Waiting for backend to start...")
    time.sleep(5)
    
    # 1. Login
    print("\n--- Auth ---")
    login_data = {"username": "admin@eden.com", "password": "admin123"}
    res = requests.post(f"{BASE_URL}/auth/login/access-token", data=login_data)
    if res.status_code != 200:
        print("Login FAILED")
        print(res.text)
        sys.exit(1)
    
    token = res.json()["access_token"]
    print("Login OK")
    
    # 2. Bot Status
    print("\n--- Bot ---")
    test_endpoint("Bot Status", "GET", f"{BASE_URL}/bot/status", token=token)
    
    # 3. Trading
    print("\n--- Trading ---")
    test_endpoint("Trade History", "GET", f"{BASE_URL}/trades/history", token=token)
    test_endpoint("Open Positions", "GET", f"{BASE_URL}/trades/open", token=token)
    
    # 4. Performance
    print("\n--- Performance ---")
    test_endpoint("Performance Stats", "GET", f"{BASE_URL}/performance/stats", token=token)

if __name__ == "__main__":
    main()
