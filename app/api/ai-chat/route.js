export const runtime = "edge";

export async function POST(req) {
  try {
    const { message, systemState } = await req.json();

    /* ---------- FERTIGUARD SYSTEM CONTEXT ---------- */

    const prompt = `
You are FertiGuard AI — a real-time fertigation intelligence system.

ROLE:
You monitor irrigation pipelines and prevent clogging before failure.

LIVE DATA:
Risk: ${systemState.risk}%
Issue: ${systemState.prediction || "Analyzing"}
pH: ${systemState.ph}
Turbidity: ${systemState.turbidity}
Flow: ${systemState.flow}

RESPONSE STYLE (VERY IMPORTANT):
- Keep answers SHORT (3–5 lines max).
- Use clear farming language.
- Always include:
  1) Cause (WHY)
  2) Risk impact
  3) Preventive action
- Avoid long paragraphs.
- Sound like an AI control system, not a teacher.

FORMAT:
⚠ Cause:
📊 Impact:
✅ Recommended Action:

USER QUESTION:
${message}
`;

    /* ---------- CALL LOCAL OLLAMA AI ---------- */

    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3",
          prompt: prompt,
          stream: false,
        }),
      }
    );

    const data = await response.json();

    return Response.json({
      reply: data.response,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      reply: "Local AI not reachable. Make sure Ollama is running.",
    });
  }
}