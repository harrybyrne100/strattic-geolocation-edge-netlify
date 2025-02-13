export default async (request, context) => {
  // Get the geolocation data from the request
  const geo = context.geo;

  // Extract the country code
  const countryCode = geo?.country?.code || "US"; // Default to US if undefined

  // Return the response with CORS headers
  return new Response(JSON.stringify({ countryCode }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // ✅ Allows all origins
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
};
