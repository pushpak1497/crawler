# E-Commerce Crawler

## Overview
This project is a web crawler application designed to discover product URLs from specified e-commerce domains. It utilizes Puppeteer and Cheerio for web scraping and stores the results in a MongoDB database.

## Features
- Crawl specified domains for product URLs.
- Identify product URLs using a regular expression.
- Save unique product URLs in a MongoDB collection.
- Handle multiple domains in a single request.

## Prerequisites
- Node.js (version 14 or higher)
- MongoDB (running locally or accessible via a cloud service)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure the following variables:
   ```env
   PORT=3000
   MONGODB_URI="mongoDB atlas cluster connection string"
   ```

4. Start the MongoDB server locally or ensure your remote MongoDB instance is accessible.

5. Run the application:
   ```bash
   npm start
   ```

## API Endpoints

### 1. Crawl Domains
**POST** `/api/crawl`

#### Request Body:
```json
{
  "domains": ["example.com", "testsite.com"]
}
```

#### Response:
- **Success**: Returns an object containing crawled product URLs per domain.
  ```json
  {
    "example.com": ["https://example.com/product/123", "https://example.com/item/456"],
    "testsite.com": ["https://testsite.com/p/789"]
  }
  ```
- **Failure**: Returns an error message.
  ```json
  {
    "message": "Error message"
  }
  ```

## Project Structure

```
project_root/
├── controllers/
│   └── crawler.controller.js  # Contains the logic for crawling domains.
├── models/
│   └── productUrl.model.js    # Mongoose schema and model for storing URLs.
├── routes/
│   └── crawler.routes.js      # API route definitions.
├── server.js                  # Entry point for the application.
├── .env                       # Environment variables.
└── package.json               # Project dependencies and scripts.
```

## Code Explanation

### crawler.controller.js
- **crawlDomain**: Crawls specified domains using Puppeteer and extracts product URLs with Cheerio. Identified URLs are stored in MongoDB using the `ProductUrl` model.

### productUrl.model.js
- Defines a Mongoose schema with fields:
  - `domain`: The domain name.
  - `urls`: An array of product URLs associated with the domain.

### crawler.routes.js
- Sets up the `/crawl` POST endpoint and links it to the `crawlDomain` function.

### server.js
- Configures the Express application and connects to MongoDB using environment variables.
- Starts the server on the specified port.

## Dependencies
- **Puppeteer**: Used for headless browser automation and page content extraction.
- **Cheerio**: Simplifies DOM manipulation for web scraping.
- **Express.js**: Provides routing and middleware functionality.
- **Mongoose**: Manages MongoDB interactions.
- **dotenv**: Loads environment variables from a `.env` file.

## Usage Notes
- Ensure that the domains provided in the request body are reachable and valid.
- Product URLs are identified using a regular expression. Customize the `isProductUrl` function in `crawler.controller.js` if needed.

## Troubleshooting
- **MongoDB Connection Errors**: Verify the `MONGODB_URI` in the `.env` file and ensure MongoDB is running.
- **Scraping Issues**: Check the network and ensure the specified domains are accessible.
- **Regex Mismatch**: Update the `isProductUrl` function if the target site's URL patterns differ from those defined.



