export async function onRequestPost(context) {
    const { prompt } = await context.request.json();
    
    // YOUR API KEY GOES HERE - It is safe here because it's server-side
    const API_KEY = "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"; 

    const response = await fetch("https://openrouter.ai", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
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
}
