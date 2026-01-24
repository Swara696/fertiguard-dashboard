// This stores the latest data sent by ESP32
let latestHardwareData = {
  system_mode: "NORMAL",
  current_action: "Monitoring",
  pressure_wash: "OFF",
  acid_pump: "OFF",
  tank_flush: "OFF",
  flow_rate: 0,
  ph: 0,
  turbidity: 0
};

// ESP32 will POST data here
export async function POST(request) {
  const data = await request.json();

  // Update latest data
  latestHardwareData = {
    ...latestHardwareData,
    ...data
  };

  return Response.json({
    success: true,
    message: "Hardware data received successfully"
  });
}

// Dashboard will GET data from here
export async function GET() {
  return Response.json(latestHardwareData);
}
