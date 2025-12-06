require 'nokogiri'
require 'uri'

module Jekyll
  class ExternalLinksProcessor
    def initialize(site)
      @site = site
      @site_url = site.config['url'] || ''
      @site_domain = extract_domain(@site_url) if @site_url
    end

    def process(page)
      return unless page.output_ext == '.html'
      
      doc = Nokogiri::HTML::DocumentFragment.parse(page.output)
      modified = false

      doc.css('a[href]').each do |link|
        href = link['href']
        next if href.nil? || href.empty?
        
        # Skip if link already has a target attribute
        next if link['target']
        
        # Check if link is external
        if external_link?(href)
          link['target'] = '_blank'
          # Add rel="noopener noreferrer" for security, but preserve existing rel if present
          existing_rel = link['rel']
          if existing_rel
            rel_values = existing_rel.split(/\s+/)
            rel_values << 'noopener' unless rel_values.include?('noopener')
            rel_values << 'noreferrer' unless rel_values.include?('noreferrer')
            link['rel'] = rel_values.join(' ')
          else
            link['rel'] = 'noopener noreferrer'
          end
          modified = true
        end
      end

      page.output = doc.to_html if modified
    end

    private

    def external_link?(href)
      # PDF links are always treated as external (open in new tab)
      # Check for .pdf extension (case-insensitive), handling query strings and fragments
      href_lower = href.downcase
      pdf_match = href_lower.match(/\.pdf(\?|#|$)/)
      return true if pdf_match
      
      # Protocol-relative URLs (//example.com) are external
      return true if href.start_with?('//')
      
      # Absolute URLs
      if href.start_with?('http://') || href.start_with?('https://')
        href_domain = extract_domain(href)
        # External if domain is different or couldn't be extracted
        return true if href_domain.nil? || href_domain != @site_domain
        return false
      end
      
      # Relative links (starting with / or #) are internal
      return false if href.start_with?('/', '#')
      
      # Mailto links are treated as external
      return true if href.start_with?('mailto:')
      
      # JavaScript links are treated as internal (they don't navigate away)
      return false if href.start_with?('javascript:')
      
      # Default: treat as internal (relative paths without leading /)
      false
    end

    def extract_domain(url)
      return nil if url.nil? || url.empty?
      
      begin
        uri = URI.parse(url)
        domain = uri.host
        # Remove www. prefix for comparison
        domain&.sub(/^www\./, '')
      rescue URI::InvalidURIError
        nil
      end
    end
  end

  # Hook into Jekyll's post_render event
  Jekyll::Hooks.register [:pages, :posts, :documents], :post_render do |page|
    processor = ExternalLinksProcessor.new(page.site)
    processor.process(page)
  end
end

