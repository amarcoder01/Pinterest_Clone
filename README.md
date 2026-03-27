<div align="center">
  <img src="public/images/PINS_BIG.png" alt="Pinterest Clone Logo" width="120" />

  # Pinterest Clone

  **A highly scalable, production-ready full-stack image discovery and sharing platform.**

  [![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-Backend-black.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-success.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📑 Table of Contents

- [Pinterest Clone](#pinterest-clone)
  - [📑 Table of Contents](#-table-of-contents)
  - [📝 Overview](#-overview)
  - [🔭 Vision](#-vision)
    - [Short-Term Vision](#short-term-vision)
    - [Long-Term Strategic Vision](#long-term-strategic-vision)
  - [✨ Features](#-features)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🏗️ Architecture](#️-architecture)
  - [🔄 Flow](#-flow)
    - [Application Data \& User Flow](#application-data--user-flow)
  - [📁 Project Structure](#-project-structure)
  - [⚙️ Setup](#️-setup)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
  - [📖 Usage Guide](#-usage-guide)
    - [First Steps](#first-steps)
    - [Managing Your Profile](#managing-your-profile)
    - [Browsing the Feed](#browsing-the-feed)
  - [🔌 API](#-api)
    - [Authentication \& Users](#authentication--users)
    - [Posts \& Feed](#posts--feed)
  - [🚑 Troubleshooting](#-troubleshooting)
  - [🔐 Environment Variables](#-environment-variables)
  - [🚢 Deployment](#-deployment)
  - [⚡ Performance](#-performance)
  - [🗺️ Roadmap](#️-roadmap)
  - [Author](#author)

---

## 📝 Overview

**Pinterest Clone** is an enterprise-grade web application engineered to emulate the core functionalities of the original Pinterest platform. Designed with an emphasis on seamless user experience, responsive UI, and robust backend architecture, it empowers users to register, securely log in, upload images, manage personal profiles, and browse a global masonry-style feed of visual content.

---

## 🔭 Vision

### Short-Term Vision
To provide a stable, fast, and secure foundation for image sharing. The immediate goal is ensuring high-fidelity image uploads, fault-tolerant authentication flows, and a fluid responsive grid layout that adapts perfectly across all mobile and desktop environments.

### Long-Term Strategic Vision
To evolve the platform into a comprehensive **Visual Discovery Engine**. Future iterations will introduce AI-driven content recommendations, collaborative boards, social engagement tools (likes, comments, following), and microservices-based scalability for handling massive global traffic.

---

## ✨ Features

- **🔐 Enterprise-Grade Authentication:** Secure user registration and login utilizing `Passport.js` with local strategy and session management.
- **🖼️ Advanced Image Uploading:** Handled seamlessly via `Multer`, utilizing `UUID v4` for cryptographically secure, unique filenames to prevent collisions.
- **📱 Responsive Masonry Grid:** A fluid, dynamic frontend layout built with `Tailwind CSS` that perfectly mimics the iconic Pinterest feed on any device.
- **👤 User Profile Management:** Dedicated spaces for users to update their avatars, manage personal information, and curate their own uploaded content.
- **⚡ Flash Messaging:** Integrated `connect-flash` to provide immediate, transient UI feedback for successful operations or authentication errors.
- **🗄️ Relational Data Modeling:** Efficient NoSQL data structures using `Mongoose` to link Users to their respective Posts via ObjectIds.

---

## 🛠️ Tech Stack

| Category | Technologies | Description |
| :--- | :--- | :--- |
| **Backend Framework** | Node.js, Express.js | High-performance server environment and routing. |
| **Database & ODM** | MongoDB, Mongoose | Flexible, schema-based NoSQL data management. |
| **Authentication** | Passport.js, express-session | Robust session handling and user validation. |
| **View Engine** | EJS (Embedded JavaScript) | Dynamic HTML templating via server-side rendering. |
| **Styling** | Tailwind CSS | Utility-first CSS framework for rapid UI development. |
| **File Handling** | Multer, UUID | Secure parsing of `multipart/form-data` and file naming. |

---

## 🏗️ Architecture

The application adheres strictly to the **MVC (Model-View-Controller)** architectural pattern.

```mermaid
graph TD
    Client[Browser / Client] -->|HTTP Requests| Router[Express Router]
    
    subgraph Controller Layer
        Router --> AuthCtrl[Auth Logic]
        Router --> PostCtrl[Post/Upload Logic]
        Router --> ViewCtrl[Page Rendering]
    end
    
    subgraph Middleware
        AuthCtrl --> Passport[Passport.js Session]
        PostCtrl --> Multer[Multer File Upload]
    end
    
    subgraph Model Layer
        Passport --> UserModel[(User Schema)]
        Multer --> PostModel[(Post Schema)]
    end
    
    subgraph Storage
        UserModel --> MongoDB[(MongoDB Atlas)]
        PostModel --> MongoDB
        Multer --> LocalFS[Local File System: /public/images/uploads]
    end
    
    ViewCtrl --> Views[EJS Templates]
    Views -->|HTML/CSS| Client
```

---

## 🔄 Flow

### Application Data & User Flow

```mermaid
sequenceDiagram
    actor User
    participant Client as Browser (EJS/Tailwind)
    participant Server as Express Server
    participant DB as MongoDB Atlas
    participant FS as Local File System

    %% Authentication Flow
    Note over User, FS: 1. Authentication Flow
    User->>Client: Submit Registration/Login
    Client->>Server: POST /register or /login
    Server->>Server: Validate & Hash (passport-local)
    Server->>DB: Save/Verify User
    DB-->>Server: User Data
    Server->>Server: Establish Session
    Server-->>Client: Redirect to /profile

    %% Post Creation Flow
    Note over User, FS: 2. Post Creation Flow
    User->>Client: Upload Image & Metadata
    Client->>Server: POST /uploadpost
    Server->>FS: Multer saves file with UUID
    FS-->>Server: File path generated
    Server->>DB: Create Post Document
    DB-->>Server: Post ObjectId
    Server->>DB: Push ObjectId to User.posts
    Server-->>Client: Redirect to /profile

    %% Feed Retrieval Flow
    Note over User, FS: 3. Feed Retrieval Flow
    User->>Client: Request Global Feed
    Client->>Server: GET /feed
    Server->>DB: Fetch Posts.populate('user')
    DB-->>Server: Populated Posts Array
    Server->>Server: Render feed.ejs
    Server-->>Client: Return HTML (Masonry Grid)
```

---

## 📁 Project Structure

```text
📦 pinterest-clone
 ┣ 📂 bin                 # Server initialization script (www)
 ┣ 📂 public              # Static assets served to the client
 ┃ ┣ 📂 images            # Site icons and logos
 ┃ ┃ ┗ 📂 uploads         # User-uploaded content (Multer destination)
 ┃ ┗ 📂 stylesheets       # Custom CSS (style.css, feed.css, profile.css)
 ┣ 📂 routes              # Controllers and Models
 ┃ ┣ 📜 index.js          # Core routing and business logic
 ┃ ┣ 📜 multer.js         # File upload configuration and UUID logic
 ┃ ┣ 📜 posts.js          # Mongoose Schema for Posts
 ┃ ┗ 📜 users.js          # Mongoose Schema for Users + DB Connection
 ┣ 📂 views               # EJS Templates (View Layer)
 ┃ ┣ 📂 partials          # Reusable UI components (header, footer)
 ┃ ┣ 📜 addpost.ejs       # Post creation form
 ┃ ┣ 📜 feed.ejs          # Global image feed
 ┃ ┣ 📜 index.ejs         # Login page
 ┃ ┣ 📜 profile.ejs       # User profile dashboard
 ┃ ┣ 📜 show.ejs          # User's specific posts view
 ┃ ┗ 📜 signup.ejs        # Registration page
 ┣ 📜 .env                # Environment variables (Ignored in Git)
 ┣ 📜 app.js              # Express application configuration
 ┣ 📜 package.json        # Project metadata and npm dependencies
 ┗ 📜 tailwind.config.js  # Tailwind CSS configuration
```

---

## ⚙️ Setup

Follow these precise steps to instantiate the environment locally.

### Prerequisites
- Node.js (v16.x or newer)
- MongoDB (Local instance or Atlas URI)
- Git

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/pinterest-clone.git
   cd pinterest-clone
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   MONGO_DB_URI=mongodb://127.0.0.1:27017/pinterest
   SESSION_SECRET=your_secure_random_string
   ```

4. **Initialize the Server**
   ```bash
   npm start
   ```
   *The server will boot and listen on `http://localhost:3000`.*

---

## 📖 Usage Guide

### First Steps
1. Navigate to `http://localhost:3000`.
2. Click **Create Account** to register a new user.
3. Upon successful registration, you will be redirected to your **Profile Dashboard**.

### Managing Your Profile
- **Update Avatar:** Click on your profile image placeholder, select an image from your device, and submit the form to update your avatar via the `/fileupload` route.
- **Create a Post:** Click the **Add Post** button. Provide a title, description, and an image file. Once submitted, the image joins the global feed.

### Browsing the Feed
- Navigate to the **Feed** via the top navigation bar to view all posts created by all users across the platform, rendered in a dynamic masonry layout.

---

## 🔌 API

The application utilizes Express routing for server-side rendering. Below are the core endpoints:

### Authentication & Users
| Method | Endpoint | Purpose | Protected |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Render login screen | No |
| `GET` | `/signup` | Render registration screen | No |
| `POST` | `/register` | Process new user creation | No |
| `POST` | `/login` | Authenticate user credentials | No |
| `GET` | `/logout` | Destroy session and redirect | Yes |
| `GET` | `/profile` | Render user dashboard | Yes |
| `POST` | `/fileupload` | Update user profile avatar | Yes |

### Posts & Feed
| Method | Endpoint | Purpose | Protected |
| :--- | :--- | :--- | :---: |
| `GET` | `/feed` | Display global masonry image feed | Yes |
| `GET` | `/addpost` | Render post creation form | Yes |
| `POST` | `/uploadpost` | Process new image upload and DB entry | Yes |
| `GET` | `/show/posts` | Display specific user's posts | Yes |

---

## 🚑 Troubleshooting

| Symptom | Diagnosis | Resolution |
| :--- | :--- | :--- |
| **Cannot connect to MongoDB** | Invalid URI or MongoDB service is down. | Verify `MONGO_DB_URI` in `.env`. Ensure local `mongod` service is running. |
| **`Unexpected field` Multer Error** | HTML form `name` attribute mismatch. | Ensure the `<input type="file" name="image">` matches the `upload.single('image')` parameter in your route. |
| **Images return 404 Not Found** | Missing `uploads` directory. | Ensure `/public/images/uploads/` exists. Multer requires the destination directory to be present. |
| **Session data lost on restart** | Expected behavior in development. | Sessions are stored in memory. For production, implement `connect-mongo`. |

---

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `MONGO_DB_URI` (Required): The connection string for your MongoDB database.
  - *Example:* `mongodb+srv://user:pass@cluster.mongodb.net/pinterest`
- `SESSION_SECRET` (Required): A cryptographically secure string used to sign session cookies.
  - *Example:* `c8f2b8a...`
- `PORT` (Optional): The port on which the Express server will listen. Defaults to `3000`.

---

## 🚀 Deployment

To deploy this application to a production environment (e.g., Render, Heroku):

1. **Database:** Provision a MongoDB Atlas cluster and obtain the connection string.
2. **Storage Considerations:** Local file uploads (`/public/images/uploads`) are **ephemeral** on platforms like Heroku. You **must** refactor `multer.js` to use a cloud storage provider like AWS S3 (`multer-s3`) or Cloudinary.
3. **Environment Setup:** Inject your `MONGO_DB_URI` and `SESSION_SECRET` into your hosting provider's environment variables settings.
4. **Launch Command:** Ensure your provider uses the standard `npm start` command (which maps to `node ./bin/www`).

---

## ⚡ Performance

- **Optimized Data Retrieval:** Utilizes Mongoose `.populate()` selectively to minimize unnecessary DB queries when joining User and Post data.
- **Static Asset Caching:** Express `.static()` middleware is used to serve images and CSS with optimal performance.
- **Client-Side Rendering:** The Masonry grid leverages Tailwind CSS for lightweight styling without heavy JavaScript DOM manipulation overhead.

---

## 🗺️ Roadmap

- [ ] **Phase 1:** Implement Cloudinary/AWS S3 for persistent, scalable image storage.
- [ ] **Phase 2:** Introduce "Boards" allowing users to categorize and save existing posts.
- [ ] **Phase 3:** Build social features: Commenting system, Like buttons, and User Follow amechanisms.
- [ ] **Phase 4:** Migrate from EJS to a decoupled React.js frontend architecture with a dedicated RESTful API.

---

## Author

**Created by:** Amar Pawar
**Current Version:** 2.0.0
**License:** MIT License

---
<div align="center">
  <i>If you found this repository helpful, please consider leaving a ⭐!</i>
</div>