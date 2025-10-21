import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 200 });
  }

  try {
    console.log("📥 Webhook proxy received request");

    const body = await req.json();
    console.log("📦 Request body:", JSON.stringify(body, null, 2));

    const baseUrl = "https://n8n.anchi.io.vn";
    const webhookId = "20bb0440-5bfe-4f26-9718-85e0e7a94e2c";

    // Helper to POST to n8n and safely parse JSON or text
    const postToN8n = async (path: string) => {
      const url = `${baseUrl}${path}${webhookId}`;
      console.log("➡️ Forwarding to:", url);
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let parsed: unknown;
      let rawText: string | null = null;
      try {
        parsed = await resp.json();
      } catch (_) {
        rawText = await resp.text();
        parsed = { message: rawText };
      }
      return { resp, parsed, rawText } as const;
    };

    // First try production webhook
    let { resp, parsed, rawText } = await postToN8n("/webhook/");
    console.log("🔗 n8n response status (prod):", resp.status);

    // If not registered or 404/500, attempt test webhook as fallback
    if (!resp.ok && (resp.status === 404 || (rawText && rawText.includes("not registered")))) {
      console.warn("⚠️ Prod webhook not registered. Trying /webhook-test/ fallback...");
      const fallback = await postToN8n("/webhook-test/");
      resp = fallback.resp;
      parsed = fallback.parsed;
      rawText = fallback.rawText;
      console.log("🔁 n8n response status (test):", resp.status);
    }

    if (!resp.ok) {
      console.error("❌ n8n error:", rawText ?? JSON.stringify(parsed));
      return new Response(
        JSON.stringify({ error: "n8n webhook failed", status: resp.status, details: rawText ?? parsed }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 502 }
      );
    }

    console.log("✅ n8n response:", typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2));
    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in webhook proxy:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        details: "Failed to connect to webhook service"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
