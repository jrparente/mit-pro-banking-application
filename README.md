<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Full Stack Banking Application</h3>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot][product-screenshot]

This is a full-stack banking application developed as part of the **MIT Professional Certificate in Coding: Full Stack Development with MERN**. The application includes a React frontend and an Express/MongoDB backend, providing functionalities for user account management, deposits, withdrawals, and more.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- User account management (create, delete)
- User authentication (login, logout)
- User authorization (protected routes)
- Account operations (deposit, withdraw, transfer)
- View transaction history
- Responsive UI with Bootstrap

### Built With

- **Frontend:** [![React][React.js]][React-url]
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jrparente/mit-pro-frontend-banking-application.git
   ```
2. Install NPM packages
   ```sh
   cd server && npm install
   ```
   ```sh
   cd client && npm install
   ```
3. Create a `.env` file in the `server` directory with the following environment variables:
   ```sh
   PORT=3001
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Running the Application

- **Frontend:** The React application will be served from the client/build directory.
- **Backend:** The server will run on the port specified in the .env file (default is 3001).

## Accessing the Application

Open your browser and navigate to **URL:** [http://localhost:3001](http://localhost:3001) to access the application.

## Demo Accounts

Use the following demo accounts to explore the application without creating a new account:

- **Employee/Admin Account**

  - **Username:** miranda@mail.com
  - **Password:** 12345678

- **Customer Account**
  - **Username:** harry@maill.com
  - **Password:** 12345678

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!--Deployment -->

## Deployment

The application was deployed on Render. You can access the live application [here](https://mit-pro-banking-application.onrender.com/).

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Joana Parente - [@joana_r_parente](https://twitter.com/joana_r_parente) - jrparente@gmail.com

Project Link: [https://github.com/jrparente/mit-pro-frontend-banking-application](https://github.com/jrparente/mit-pro-frontend-banking-application)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/jrparente/mit-pro-frontend-banking-application.svg?style=for-the-badge
[contributors-url]: https://github.com/jrparente/mit-pro-frontend-banking-application/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jrparente/mit-pro-frontend-banking-application.svg?style=for-the-badge
[forks-url]: https://github.com/jrparente/mit-pro-frontend-banking-application/network/members
[stars-shield]: https://img.shields.io/github/stars/jrparente/mit-pro-frontend-banking-application.svg?style=for-the-badge
[stars-url]: https://github.com/jrparente/mit-pro-frontend-banking-application/stargazers
[issues-shield]: https://img.shields.io/github/issues/jrparente/mit-pro-frontend-banking-application.svg?style=for-the-badge
[issues-url]: https://github.com/jrparente/mit-pro-frontend-banking-application/issues
[license-shield]: https://img.shields.io/github/license/jrparente/mit-pro-frontend-banking-application.svg?style=for-the-badge
[license-url]: https://github.com/jrparente/mit-pro-frontend-banking-application/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/joanaparente
[product-screenshot]: client/public/images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
