<div align="center">
<svg width="1200" height="400" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>
    .title { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 42px; font-weight: 800; fill: white; text-anchor: middle; }
    .subtitle { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 500; fill: #A3E635; text-anchor: middle; }
  </style>

  <!-- Background -->
  <rect width="1200" height="400" fill="#14532d"/>
  
  <!-- Content -->
  <g>
      <!-- Company Name & Subtitle -->
      <text x="480" y="185" class="title">SP FAMILY VENTURES EST ENTERPRISE</text>
      <text x="480" y="235" class="subtitle">(002905563-H)</text>
  </g>
  
  <!-- Logo -->
  <svg x="900" y="125" width="150" height="150" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="6" fill="#A3E635" /> 
      <rect x="3" y="3" width="54" height="54" rx="4" fill="#166534" />
      <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', Times, serif"
          fontSize="36"
          fontWeight="900"
          fill="#FDE047"
          letterSpacing="-4"
      >
          SP
      </text>
  </svg>
</svg>
</div>

# SP Family Ventures ERP

This is a comprehensive business management application for SP Family Ventures EST Enterprise, featuring order entry, customer and product management, invoicing, and sales reporting.

## Running the Application Locally

**Prerequisites:** You need to have [Node.js](https://nodejs.org/) (version 18 or newer recommended) installed on your system.

Follow these steps to get the application running on your local machine:

1.  **Install Dependencies:**
    Open your terminal, navigate to the project directory, and run the following command to install all the necessary packages:
    ```bash
    npm install
    ```

2.  **Start the Development Server:**
    Once the installation is complete, start the local development server with this command:
    ```bash
    npm run dev
    ```

3.  **View the App:**
    The terminal will show you a local URL (usually `http://localhost:3000`). Open this URL in your web browser to start using the application.

## Deployment to GitHub Pages

This project includes a GitHub Actions workflow that automatically builds and deploys the application to GitHub Pages whenever you push changes to the `main` branch.

To enable this:

1.  **Go to Repository Settings:** In your GitHub repository, navigate to `Settings` > `Pages`.
2.  **Configure Build and Deployment:** Under the "Build and deployment" section, select `GitHub Actions` as the `Source`.
3.  **Push a Change:** Make a commit and push it to the `main` branch. The workflow will run automatically, and your site will be published at `https://<your-username>.github.io/copy-of-sp-family-ventures-erp/`.
