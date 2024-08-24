# Moodmap Application - README

## Overview

**Moodmap** is an application designed to help users track and visualize their daily mood. By selecting a mood on a daily basis, users can map their emotional state throughout the month and gain insights into their overall well-being. The app displays a calendar with the current day selected by default and provides 5 mood options, each represented by a color shade.

## Features

- **Mood Tracking:** Users can select one of five moods every day, ranging from "very sad" to "elated."

- **Calendar View:** A calendar is displayed, highlighting the current day by default. Each day is shaded based on the mood selected, with colors representing different mood intensities.

- **Responsive UI:** The application is responsive, ensuring it works well on both desktop and mobile devices.

## Mood Options

Each mood is represented by a button. The options include:

1. **Very Sad** (value: 1)
2. **Sad** (value: 2)
3. **Existing** (value: 3)
4. **Good** (value: 4)
5. **Elated** (value: 5)

## Mood Colors

Each mood is associated with a unique color shade that visually reflects the emotional intensity:

- **Very Sad:** Bright shade of pink

- **Sad:** Light shade of pink

- **Existing:** Neutral color pink

- **Good:** Light shade of pink

- **Elated:** Dark shade of pink

These colors allow users to easily see how their moods change over time when viewing the calendar.

## Usage Instructions

1. **Launch the Application:** Open the Moodmap application on your device.
2. **View Calendar:** The current month's calendar will be displayed. The current day will be highlighted.
3. **Select Your Mood:** Choose your mood by clicking one of the 5 buttons corresponding to your mood level. The selected day will be shaded according to your mood.
4. **Track Daily:** Continue tracking your mood every day to build a map of your emotional well-being.
5. **Visualize Mood Trends:** Over time, you will be able to see patterns and trends in your mood based on the colors displayed on the calendar.

## Installation

- **Prerequisites**

- Node.js (version 16 or higher)

- npm or pnpm package manager

1. **Clone the repository:**

```
git clone https://github.com/kofnet002/moodmap.git
cd moodmap
```

2. **Install Dependencies:** using npm:

```
npm install
```

or using pnpm:

```
pnpm install
```

3. **Run the Application:** Start the development server

```
npm run dev
```

open <a href="http://localhost:3000">hptt://localhost:3000</a> in your browser to view the application

## Technologies Used

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS

- **State Management:** Context API (for mananging the user's mood and calender state)

- **Backend:** Firebase (for storing user mood data)

- **Database:** Firestore (used for saving mood selections and retrieving them on page load)

## Firebase Setup

To set up Firebase in the project:

1. Create a Firebase project and enable Firestore and Firebase Authentication.
2. Copy your Firebase configuration details and add them to your `.env.local` file:

```
NEXT_PUBLIC_API_KEY=your_api_key
NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_APP_ID=your_public_app_id
```

3. Ensure Firebase SDK is initialized in your project and connected to your Firestore database.

## Contributions 💁🏼

Contributions are welcome! If you'd like to contribute to the project, please open a pull request with your changes, or submit issues for feature requests or bug reports. <br/>
I love receiving pull requests from the community! If you have an improvement or a new feature you'd like to add, please feel free to do so 👍

## Reporting Issues 🚩

If you encounter any bugs or issues, please report them using the <a href="https://github.com/kofnet002/moodmap/issues/">Issues</a> section of my GitHub repository. When reporting issues, please include:

- A clear and descriptive title.
- A detailed description of the problem, including steps to reproduce it.
- Any relevant logs or error messages. Your environment details (e.g., + Django version, DRF version, database, etc.).

## Contact

For any questions or feedback, feel free to contact me at: iamnetwork23@gmail.com
