# ---------- Build stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# Install exactly the dependencies in the lockfile
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source
COPY . .

# Vite configuration is public and embedded in the build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN npm run build \
    && npm cache clean --force


# ---------- Production runtime ----------
FROM nginx:1.30.5-alpine AS runtime

# Prepare writable runtime directories for the non-root user.
# The official Nginx Alpine image provides the nginx user.
RUN mkdir -p \
      /tmp/client_temp \
      /tmp/proxy_temp \
      /tmp/fastcgi_temp \
      /tmp/uwsgi_temp \
      /tmp/scgi_temp \
    && chown -R nginx:nginx /tmp

# Apply available Alpine security updates
RUN apk upgrade --no-cache

# Use a dedicated Nginx configuration with an unprivileged port
COPY nginx.conf /etc/nginx/nginx.conf

# Copy only the production build, not Node.js or source files
COPY --from=build --chown=nginx:nginx \
    /app/dist /usr/share/nginx/html

USER nginx

EXPOSE 8080

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]