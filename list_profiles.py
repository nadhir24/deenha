import json
import os

def list_profiles():
    local_state_path = os.path.join(os.environ['LOCALAPPDATA'], 'Google', 'Chrome', 'User Data', 'Local State')
    if not os.path.exists(local_state_path):
        print(f"Local State not found at: {local_state_path}")
        return

    with open(local_state_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    cache = data.get('profile', {}).get('info_cache', {})
    print(f"{'Folder':<15} | {'Name'}")
    print("-" * 30)
    for folder, info in cache.items():
        print(f"{folder:<15} | {info.get('name')}")

if __name__ == "__main__":
    list_profiles()
