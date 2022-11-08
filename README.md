# Strattic Geolocation Edge Function
Use the Geolocation Edge Functions from Netlify.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/StratticWeb/strattic-geolocation-edge-netlify&utm_source=github&utm_medium=stratticgeoloedgefunc-cs)

If you click this button, it will create a new repo for you that looks exactly like this one, and sets that repo up immediately for deployment on Netlify.

The Geolocation info will be at the `https://your-random-app-name.netlify.app/geolocation` URL. It will be information that looks like this:

```
{
    geo: {
        city: "Madison",
        country: {
            code: "US",
            name: "United States"
        },
        subdivision: {
            code: "AK",
            name: "Alaska"
        }
    }
}
```

## The `mu-plugins` folder
You can move the contents of this folder to your `mu-plugins` plugins folder, and add in the netlify app URL once you have it in the `mu-plugins/strattic-geoip-customizations/strattic-geoip-script.js` file.

## Reference links:
Local dev with Netlify CLI:
- https://docs.netlify.com/cli/get-started/#run-a-local-development-environment
- https://cli.netlify.com/functions-dev/

Using Edge/Functions:
- https://edge-functions-examples.netlify.app/example/geolocation
- https://docs.netlify.com/functions/overview/
- https://docs.netlify.com/functions/build-with-javascript/#environment-variables