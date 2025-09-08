--------------------------
-- Pathways in Care
--------------------------
Tech Stack: HTML/JS, Jekyll, Github Pages.

Google Business Profile Reviews.

We are just using the Places API (New), that can pull business information, as seen in Maps and Google Business.  This is
not using the actual Business API through google. I still have an outstanding request to get more than 0 quota for that.

The places API just requires an api key.  Just doing a manual call in postman, to pull current reviews.  Storing in a 
JSON file.  Eventually, want to make this part of the build process, and integrate with github actions.  Had to add 
Places API, and Places API (New) to my pathwaysincare-web project in GCP.  Also create an API Key linked to Places API.
I had great difficulty in getting the places_id for our business.  Only way was through a Chrome extension which 
managed to pull the place_id.

API call:
curl -X GET \
-H "Content-Type: application/json" \
-H "X-Goog-Api-Key: YOUR_API_KEY" \
-H "X-Goog-FieldMask: id,displayName,formattedAddress,rating,reviews" \
"https://places.googleapis.com/v1/places/YOUR_PLACE_ID"

