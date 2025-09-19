# Use nginx:alpine for a lightweight web server
FROM nginx:alpine

# Install necessary packages
RUN apk add --no-cache \
    curl \
    && rm -rf /var/cache/apk/*

# Remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy website files
COPY . /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]