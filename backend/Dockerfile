# ==============================================================================
# Multi-stage Dockerfile for BHIV Core Auth Backend
# ==============================================================================

# --- Stage 1: Build & Dependency Resolution ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install build prerequisites
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

# Copy application source
COPY . .

# Remove any unnecessary test or dev artifacts
RUN rm -rf tests scripts test

# --- Stage 2: Production Runtime ---
FROM node:20-alpine

WORKDIR /app

# Install lightweight process supervisor and health probe tools
RUN apk add --no-cache dumb-init wget curl

# Create dedicated non-root user and group
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy build output from builder stage
COPY --from=builder --chown=nodejs:nodejs /app /app

# Ensure runtime directories exist with correct permissions
RUN mkdir -p /app/logs && \
    chown -R nodejs:nodejs /app/logs

# Switch to non-privileged user
USER nodejs

# Expose backend service port (app runs on 8080 internally)
EXPOSE 8080

# Configure health check against public health endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Handle kernel signals cleanly via dumb-init
ENTRYPOINT ["dumb-init", "--"]

# Start production server
CMD ["node", "src/server.js"]
