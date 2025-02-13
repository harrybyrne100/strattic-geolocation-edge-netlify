export default async (request, context) => {
  const geoData = {
    geo: {
      city: "Dublin",
      country: { code: "IE", name: "Ireland" },
      subdivision: { code: "L", name: "Leinster" },
      timezone: "Europe/Dublin",
      latitude: 53.3382,
      longitude: -6.2591,
      postalCode: "D02",
    }
  };

  return new Response(JSON.stringify(geoData), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",  // ✅ Fixes CORS issue
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
};
