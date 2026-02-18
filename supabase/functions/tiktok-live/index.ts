import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch settings from database
        const { data: currentSettings, error: fetchError } = await supabaseClient
            .from('site_settings')
            .select('value')
            .eq('key', 'tiktok_live_settings')
            .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError
        }

        const settings = currentSettings?.value || {
            mode: 'auto',
            is_live: false,
            viewer_count: 0,
            last_checked: null,
            manual_status: 'off'
        }

        // 2. Determine if we need to check TikTok
        const now = new Date()
        const lastChecked = settings.last_checked ? new Date(settings.last_checked) : null
        const CACHE_TTL = 60 * 60 * 1000 // 1 hour

        // Manual Overrides
        if (settings.mode === 'manual') {
            return new Response(
                JSON.stringify({
                    isLive: settings.manual_status === 'on',
                    viewerCount: settings.viewer_count || 0,
                    mode: 'manual'
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Auto Mode - check cache
        if (lastChecked && (now.getTime() - lastChecked.getTime() < CACHE_TTL)) {
            return new Response(
                JSON.stringify({
                    isLive: settings.is_live,
                    viewerCount: settings.viewer_count,
                    mode: 'auto',
                    cached: true
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 3. Cache expired or no data - Fetch from TikTok
        console.log("Fetching fresh data from TikTok for deenha.id")
        const username = "deenha.id"
        const tiktokUrl = `https://www.tiktok.com/api/live/detail/?uniqueId=${username}`

        const response = await fetch(tiktokUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://www.tiktok.com/',
            }
        })

        if (!response.ok) {
            throw new Error(`TikTok API returned ${response.status}`)
        }

        const json = await response.json()
        const isLive = json.data?.liveRoom?.status === 2 // 2 usually means LIVE in TikTok internal API
        const viewerCount = json.data?.liveRoom?.aliveUserCount || 0

        // 4. Update database
        const updatedSettings = {
            ...settings,
            is_live: isLive,
            viewer_count: viewerCount,
            last_checked: now.toISOString()
        }

        await supabaseClient
            .from('site_settings')
            .upsert({
                key: 'tiktok_live_settings',
                value: updatedSettings,
                updated_at: now.toISOString()
            })

        return new Response(
            JSON.stringify({
                isLive,
                viewerCount,
                mode: 'auto',
                cached: false
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error("Error in tiktok-live function:", error)
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
