# Automated Meal Planning System

## Table of Contents
1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Setup](#setup)
4. [Usage](#usage)
5. [Components](#components)
6. [Workflow](#workflow)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

The Automated Meal Planning System is a comprehensive solution designed to generate personalized meal plans for users based on their dietary restrictions. It integrates Google Forms, Google Sheets, Make (formerly Integromat), and a custom backend to create a seamless experience from user sign-up to weekly meal plan updates.
### Google Form Link: https://forms.gle/5D8jzjDmBpsQdgux7

## System Overview

The system consists of the following key components:

1. Google Form: Collects user information (Name, Email, Dietary Restrictions)
2. Google Sheet: Stores user responses from the form
3. Make Scenario: Triggers on new Google Sheet entries and weekly updates
4. Backend API: Handles user creation, meal plan generation, and email notifications
5. Frontend Application: Allows users to view their meal plans

## Setup

### Google Form and Sheet
1. Create a Google Form with fields for Name, Email, and Dietary Restrictions
2. Link the form to a Google Sheet to store responses

### Make (Integromat) Configuration
1. Create two scenarios in Make:
   a. New User Scenario: Triggered when a new row is added to the Google Sheet
   b. Weekly Update Scenario: Scheduled to run every Sunday at 00:00 Pakistan Time

2. Configure the New User Scenario:
   - Watch the Google Sheet for new rows
   - Extract data from the new row
   - Send a webhook to your backend API with the user data

3. Configure the Weekly Update Scenario:
   - Schedule it to run weekly
   - Fetch all users from your backend (or Google Sheet)
   - Send a webhook to your backend API to trigger meal plan updates

### Backend API
1. Set up an Express.js server with routes for:
   - User creation
   - Meal plan generation
   - Meal plan updates
2. Implement email functionality to send welcome emails and meal plan updates
3. Connect to a database (e.g., MongoDB) to store user information and meal plans

### Frontend Application
1. Develop a web application (e.g., using React) for users to log in and view their meal plans
2. Implement authentication to secure user data

## Usage

1. Users fill out the Google Form with their information
2. Make scenario triggers and sends data to the backend
3. Backend creates a new user, generates a meal plan, and sends a welcome email
4. Users receive login credentials via email
5. Users can log into the frontend application to view their meal plan
6. Every Sunday at midnight (Pakistan Time), Make triggers the backend to generate updated meal plans
7. Users receive an email notification about their updated meal plan

## Components

### Google Form
- Fields: Name, Email, Dietary Restrictions
- Linked to Google Sheet for response storage
- ### Google Form Link: https://forms.gle/5D8jzjDmBpsQdgux7

### Google Sheet
- Columns: Timestamp, Name, Email, Dietary Restrictions
- Automatically populated from Google Form responses

### Make Scenarios
1. New User Scenario
   - Trigger: New row in Google Sheet
   - Actions: Extract data, Send webhook to backend
2. Weekly Update Scenario
   - Trigger: Scheduled (Every Sunday at 00:00 Pakistan Time)
   - Actions: Fetch users, Send webhook to backend for updates

### Backend API
- User Management: Create, Read, Update, Delete
- Meal Plan Generation: Based on dietary restrictions
- Email Service: Send welcome emails and meal plan updates
- Database Integration: Store user data and meal plans

### Frontend Application
- User Authentication
- Meal Plan Display


## Workflow

1. User Sign-up:
   a. User fills out Google Form
   
   b. Response is recorded in Google Sheet
   
   c. Make scenario triggers and sends data to backend
   
   d. Backend creates user, generates meal plan, and sends welcome email (Including Credentials)
   
   e. User receives login credentials

3. Weekly Update:
   a. Make scenario triggers every Sunday at midnight (Pakistan Time)
   
   b. Backend generates new meal plans for all users
   
   c. Users receive email notifications about updated plans
   

5. User Interaction:
   a. User logs into frontend application
   
   b. Views current meal plan
  

## Contributing

Contributions to improve the Automated Meal Planning System are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2024 Meal Generator App

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
