export default async (request, context) => {
  // Get the geolocation data from the request
  const geo = context.geo;

  // Extract the country code
  const countryCode = geo.country.code;

  // Return the simplified JSON response
  return new Response(JSON.stringify({ countryCode }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
