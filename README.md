# Request Management System
Simple Request Management System build in Next.js

![React-CLI](https://imgur.com/H2j2DSG.gif)

## Overview

Welcome to the Request Management System, a powerful and intuitive tool built with Next.js, Prisma, TypeScript, MySQL, App Router, Radix UI, and Tailwind CSS. This system enables efficient request handling with a user-friendly interface, advanced markdown editing features, Google OAuth for secure login, and dynamic dashboard charts to monitor request statuses.

## Technologies Used

- **Next.js:** A React framework for building server-rendered applications.
- **Prisma:** A database toolkit for TypeScript and Node.js, simplifying database access.
- **TypeScript:** Adds static typing to JavaScript, enhancing code quality and maintainability.
- **MySQL:** A robust relational database for data storage and retrieval.
- **App Router:** Routing library for handling navigation in your application.
- **Radix UI:** Component library for building accessible and customizable interfaces.
- **Tailwind CSS:** Utility-first CSS framework for building modern designs.

## Features

1. **Request Management:**
   - Create, edit, and delete requests.
   - Assign requests to specific individuals.
   - Change request status (OPEN, IN_PROGRESS, CLOSED).

2. **Markdown Editor:**
   - Utilize a simple Markdown editor for request descriptions.
   - Format text with bullets, numbering, bold, and more.

3. **Dashboard:**
   - View dynamic charts representing the distribution of request statuses.

4. **Google OAuth:**
   - Secure and easy login using Google OAuth.

5. **Light/Dark Mode:**
   - Customize your viewing experience with light and dark modes.

## Getting Started

### Prerequisites

- Node.js
- MySQL Database
- Google OAuth API credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/seAfnan/nextjs-request-ms.git
   ```

2. Install dependencies:
   ```bash
   cd nextjs-request-ms
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env` and fill in your database and Google OAuth credentials.

4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the application:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Visit the application and log in using Google OAuth.
- Create, edit, and manage requests in the user-friendly interface.
- Utilize the Markdown editor for detailed request descriptions.
- Explore the dynamic dashboard charts for real-time status tracking.

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.

## Acknowledgements

Special thanks to the open-source community and the creators of the technologies used in this project.

Feel free to explore and contribute to make this Request Management System even better! 🚀
