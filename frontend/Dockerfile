# ==============================================================================
# Multi-stage Dockerfile for BHIV Core Auth Frontend Launcher
# ==============================================================================

# --- Stage 1: Build & Bundle Compilation ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
RUN npm ci

# Copy full application source
COPY . .

# Ingest build-time environment arguments for Vite bundler
ARG VITE_API_BASE_URL
ARG VITE_AUTH_SERVER_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_AUTH_SERVER_URL=$VITE_AUTH_SERVER_URL

# Compile production-ready static assets
RUN npm run build

# --- Stage 2: Production Static File Serving ---
FROM node:20-alpine

WORKDIR /app

# Install lightweight static web server and healthcheck dependencies
RUN npm install -g serve && \
    apk add --no-cache wget curl

# Copy compiled distribution output
COPY --from=builder /app/dist ./dist

# Create unprivileged runtime user
RUN adduser --disabled-password --gecos "" frontend && \
    chown -R frontend:frontend /app

# Switch to unprivileged user
USER frontend

# Expose frontend launcher port (app runs on 5173 internally)
EXPOSE 5173

# Health check probing root route
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

# Serve single-page application with SPA routing support on port 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
