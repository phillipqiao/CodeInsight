# Node.js image 
FROM node:20-alpine
# Set the working directory inside the container  
WORKDIR /app
# Copy package.json and package-lock.json files 
COPY package*.json ./
# install the dependencies 
RUN npm install
# copy the rest of the application code to the container 
COPY . .
# Expose the port your app runs on 
EXPOSE 3010
# Command to run the application 
CMD ["node", "index.js"]