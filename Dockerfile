# Use Node.js 12 as the base image
FROM node:12.16.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Set the environment variable for the app to listen on port 1333
ENV PORT=1333

# Expose port 1333
EXPOSE 1333

# Start the app
CMD [ "npm", "start" ]
