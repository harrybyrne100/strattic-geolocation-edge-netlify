export default async (request, context) => {
  // Extract only the country code
  const geoData = {
    countryCode: "IE" // Example: Hardcoded, you can replace this with actual API logic
  };

  return new Response(JSON.stringify(geoData), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
};
