[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[license-shield]: https://img.shields.io/github/license/tsAppDevelopment/hello2.svg
[license-url]: https://github.com/tsAppDevelopment/fullstack-template/blob/master/licence.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/teague-stockwell/

<br />

<p align="center">
    <img src="./public/logo.png" alt="Logo" width="500vh">

  <h3 align="center">Game Feedback</h3>

  <p align="center">
    😭 😍 Rate and comment on your game session
    <br />
    <!-- <a href="">View Live</a> -->
    <a href="https://github.com/tsAppDevelopment/fullstack-template/issues">Report Bug</a>
  </p>
</p>

<br />

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#implementation">Implementation</a></li>
    <li><a href="#system-architecture">System Architecture</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#getting-started">Testing</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#how-to-run">How to run</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
</details>

<br/>

## About The Project

A web app for submitting and reviewing feedback. This project was bootstraped with another project im working on that I configured for some common patterns: [fullstack-template](https://github.com/tsAppDevelopment/fullstack-template)

## Features

- Users may submit a 1-5 rating and a comment for session. Multiple players can submit feedback for the same session, but a single player may only submit one feedback per session.

- After a user submits feedback, they may modify it.

- Users can view all feedback submitted their session.

- Admin users can view submitted feedback for all sessions in a sorted, paginated table.

### Authentication

Next Auth and Google OAuth are used to authenticate users. From there the API can determine what roles a user has. In the future the same auth provider that was used before redirecting user to the application could be used.

## System Architecture

<p align="center">
  <img src="https://user-images.githubusercontent.com/71202372/138581096-73d9fbb5-5afc-49a2-b5e4-f51b1697a7ac.png" alt="system architecture" width="1000vh" >
</p>

## Built With

### Language and Framework

- [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)
- [TypeScript](https://www.typescriptlang.org)

### Serverless API

- [Next.js API Routes](https://nextjs.org/learn/basics/API-routes)
- [Custom API middleware handler](https://github.com/tsAppDevelopment/buildable/blob/main/src/middleware/init_middleware.ts)

### Database ORM

- [prisma](https://www.prisma.io/docs/)

### State

- Global state management with [zustand](https://github.com/pmndrs/zustand)
- Server state management with [react-query](https://react-query.tanstack.com/overview)

### JWT Authentication

- Plugin for OAuth providers [next-auth](https://next-auth.js.org/getting-started/introduction)
- [Google Oauth](https://developers.google.com/identity/protocols/oauth2)

### Styling

- CSS in JS with [emotion](https://emotion.sh/docs/ssr)
- Dark and light mode hook, default user preference and persistance with [next-themes](https://github.com/pacocoursey/next-themes)

### Static and Runtime Caching

- Service worker generated using workbox and [next-pwa](https://github.com/shadowwalker/next-pwa)

### SEO

- Meta tags / Open Graph generated using [next-auth](https://github.com/garmeeh/next-seo)
- Favorite icons generated with [RealFaviconGenerator](https://realfavicongenerator.net)

### Testing

- Unit tests [jest](https://jestjs.io/docs/getting-started)
- Component tests [testing-library](https://testing-library.com/docs/)
- E2E tests [cypress](https://docs.cypress.io/API/table-of-contents)

## Getting Started

Follow these easy steps to get started developing locally

- clone the fork
- cd into the directory
- install dependencies

```sh
npm i
```

- generate prisma orm

```sh
npx prisma generate
```

- create the development database

```sh
npm run docker:db:up
```

- run the dev server in watch mode

```sh
npm run dev
```

## Testing

Unit and component tests are run with jests a test-library to get started run:

```sh
npm run test
```

e2e tests are run with cypress to get started run:

```sh
npm run docker:db:up
```

```sh
npm run test:e2e
```

Both of these commands can be ran with hot reload.

```sh
npm run test:e2e:watch
```

```sh
npm run test:watch
```

## Deployment

- Generate your fav icon package and add the contents to the public folder
- edit your site.webmanifest to include match ./public/site.webmanifest
- Add your open graph img into the public folder as og-1200-630.png
- Edit const.ts to include your constants like domain, title and description
- Deploy to [Vercel](https://nextjs.org/docs/deployment)
- Create a new Planet Scale database and add the database url to Vercel's env
- Add a new google oauth client with the following parameters using the google cloud console:

```json
{
  "authorizedDomains": ["fullstack-template.vercel.app"],
  "applicationType": ["webApp"],
  "authorizedJavascriptOrigins": [
    "https://fullstack-template.vercel.app",
    "http://localhost:8080",
    "http://localhost:3000"
  ],
  "redirectUris": [
    "http://localhost:8080/api/auth/callback/google",
    "https://fullstack-template.vercel.app/api/auth/callback/google"
  ]
}
```

- Add the google client id and google client secret to .env.local and Vercel as GOOGLE_ID and GOOGLE_SECRET

## How to Run

To build and run the app locally with docker run:

```sh
npm run docker:build
```

```sh
npm run docker:up
```

The app will be available on: http://localhost:8080

## Roadmap

See the [open issues](https://github.com/tsappdevelopment/fullstack-template/issues) for a list of proposed features (and known issues).

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Teague Stockwell - [LinkedIn](https://www.linkedin.com/in/teague-stockwell)
