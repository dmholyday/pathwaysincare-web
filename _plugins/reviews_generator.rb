require 'json'

module Jekyll
  class ReviewsGenerator < Generator
    safe true
    priority :high

    def generate(site)
      # Read the v1places.json file
      json_path = File.join(site.source, 'data', 'gbp', 'v1places.json')
      
      unless File.exist?(json_path)
        Jekyll.logger.warn "Reviews Generator:", "v1places.json not found at #{json_path}"
        return
      end

      begin
        json_data = JSON.parse(File.read(json_path))
        reviews = json_data['reviews'] || []
        
        # Make reviews data available to all pages
        site.data['reviews'] = {
          'business_name' => json_data.dig('displayName', 'text') || 'Pathways in Care',
          'rating' => json_data['rating'] || 5,
          'reviews' => reviews.map do |review|
            {
              'text' => review.dig('text', 'text') || review.dig('originalText', 'text') || '',
              'author' => review.dig('authorAttribution', 'displayName') || 'Anonymous',
              'rating' => review['rating'] || 5,
              'date' => review['relativePublishTimeDescription'] || 'Recently',
              'stars' => '★' * (review['rating'] || 5)
            }
          end
        }
        
        Jekyll.logger.info "Reviews Generator:", "Loaded #{reviews.length} reviews from v1places.json"
        
      rescue JSON::ParserError => e
        Jekyll.logger.error "Reviews Generator:", "Error parsing v1places.json: #{e.message}"
      rescue => e
        Jekyll.logger.error "Reviews Generator:", "Error processing reviews: #{e.message}"
      end
    end
  end
end