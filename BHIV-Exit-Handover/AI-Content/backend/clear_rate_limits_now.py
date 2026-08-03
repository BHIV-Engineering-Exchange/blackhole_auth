#!/usr/bin/env python3
"""
Quick script to clear rate limits for immediate testing
"""
import requests
import time

def clear_rate_limits():
    """Clear rate limits by restarting the rate limiter"""
    print("🔄 Clearing rate limits...")
    
    # First, check if server is running
    try:
        response = requests.get("http://localhost:9000/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend server is running")
        else:
            print(f"⚠️ Backend responded with status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Cannot connect to backend: {e}")
        print("🔧 Please start the backend server first")
        return False
    
    # Try to make a request to trigger rate limiter reset
    print("🧹 Attempting to reset rate limiter...")
    
    # The rate limiter uses in-memory storage, so we can't directly clear it
    # But we can provide instructions for manual clearing
    print("\n📋 Rate Limit Status:")
    print("- Current upload limit: 50 uploads/hour (increased from 10)")
    print("- Current generate limit: 20 generations/hour (increased from 5)")
    print("- Rate limits are stored in memory")
    
    print("\n🔧 To immediately clear rate limits:")
    print("1. Stop the backend server (Ctrl+C in the terminal where it's running)")
    print("2. Restart the backend server")
    print("3. Rate limits will be reset to 0")
    
    print("\n⏰ Or wait for the current rate limit to expire")
    
    return True

if __name__ == "__main__":
    clear_rate_limits()