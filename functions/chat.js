export async function onRequestPost(context) {
    try {
        const { prompt } = await context.request.json();
        
        // YOUR PROVIDED API KEY
        const API_KEY = "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"; 

        const response = await fetch("https://openrouter.ai", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "X-Title": "PrismAI"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.1-70b-instruct",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
