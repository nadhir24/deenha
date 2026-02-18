-- Insert TikTok Live settings if they don't exist
INSERT INTO site_settings (key, value)
VALUES (
    'tiktok_live_settings',
    '{
        "mode": "auto",
        "is_live": false,
        "viewer_count": 0,
        "last_checked": null,
        "manual_status": "off"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
