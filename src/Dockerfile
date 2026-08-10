# The following script is used for SVELTE
# define the engine to create the image. use the following to build node apps
FROM node:22-alpine AS builder
# This is not the name of the app but just specifying to the name of the container to do its work in.
WORKDIR /app 

################################################################
# Start copying all the required files to the new container
################################################################

# we copy these files first to install all the required depedencies.
# We do it this way because we dont want to re-install when docker starts again.
# the packages are already cached and will not run again.
COPY package.json package-lock.json ./
# Installs the packages. This will not run again. This installs are cached.
RUN npm ci

# Copy all the source code over and build the production env
COPY . .
RUN npm run build
# remove all dependencies that are related to dev
RUN npm prune --omit=dev

# Run the app. We seperate them because we only need what was built.
# we dont need the source code for running the app. We only need the built files.
FROM node:22-alpine AS runner
WORKDIR /app

# These env variables are used by the Node Adapter in Svelte.
# NODE_ENV is so that the logs produced by node is only production logs
ENV NODE_ENV=production
ENV PORT=8081
ENV HOST=0.0.0.0

# Copy only the required files from the builder to run the app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
# So wth the Node Adapter, this will start the server. rather then npm run preview.
CMD ["node", "build"]

