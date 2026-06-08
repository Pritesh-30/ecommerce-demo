# syntax=docker/dockerfile:1

# =============================================================================
# Verde & Co. — multi-stage Docker build (Next.js on Bun)
#
# The build produces a self-contained Next.js "standalone" bundle, so the final
# runtime image carries only what it needs to serve the app: no source, no dev
# dependencies, no install step. This keeps the image small and reproducible on
# any machine — the whole point of the project.
# =============================================================================

# ---- Stage 1: install dependencies ------------------------------------------
FROM oven/bun:1-alpine AS deps
WORKDIR /app

# Copy only the manifest + lockfile first so this layer is cached unless the
# dependency set actually changes.
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# ---- Stage 2: build the application -----------------------------------------
FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# ---- Stage 3: minimal runtime image -----------------------------------------
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user for safety.
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy the standalone server, static assets and public files.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# The standalone output emits a plain server.js — Bun runs it directly.
CMD ["bun", "server.js"]
