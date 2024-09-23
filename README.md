# Mini Map Application

## Overview

Mini Map Application is a single-page application built with React, TypeScript, and Tailwind CSS. It integrates with OpenStreetMap and allows users to interact with points of interest displayed on the map. Users can view and update the status and comments associated with each point.

## Features

- **Interactive Map**: Utilize OpenStreetMap to display locations.
- **Zoom In/Out**: Easily navigate the map with zoom buttons for both desktop and mobile layouts.
- **Data Points**: Show points from sample data with different statuses.
- **Status and Comments**: Click on points to view and change their status and comments.
- **Offline Functionality**: The app works in offline mode and remembers changes.
- **Responsive Design**: The interface is adaptive for mobile and desktop views.
- **PWA Support**: (Advanced feature) Supports Progressive Web App capabilities for offline use.
- **End-to-End Testing**: (Advanced feature) Includes an E2E test suite.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **OpenLayers**: Library for displaying maps and handling geospatial data.
- **Cypress**: Testing framework for end-to-end testing.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/javy99/mini-map-app.git
   cd mini-map-app
   ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Run the application:
  ```bash
  npm run dev
  ```