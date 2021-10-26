[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[license-shield]: https://img.shields.io/github/license/tsAppDevelopment/hello2.svg
[license-url]: https://github.com/tsAppDevelopment/fullstack-template/blob/master/licence.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/teague-stockwell/

<br />

<p align="center">
  <a href="https://game-feedback.vercel.app">
    <img src="./public/logo.png" alt="Logo" width="500vh">
  </a>

  <h3 align="center">Game Feedback</h3>

  <p align="center">
    😭 😍 Rate and comment on your game session
    <br />
    <!-- <a href="">View Live</a> -->
    <a href="https://github.com/tsAppDevelopment/fullstack-template/issues">Report Bug</a>
    <a href="https://game-feedback.vercel.app">View Site</a>
    <a href="https://teaguestockwell.com/">About Me</a>
  </p>
</p>

<br />

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#api">API</a></li>
    <li><a href="#ui">UI</a></li>
    <li><a href="#limitations">Limitations</a></li>
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

A web app for submitting and reviewing feedback. This project was boot strapped with another project im working on that I configured for some common patterns: [fullstack-template](https://github.com/tsAppDevelopment/fullstack-template)

<img src="https://user-images.githubusercontent.com/71202372/138722325-7a09c4aa-2c16-4cdb-8c11-4f3b4a31466e.gif" width="500vh"></a>
<img src="https://user-images.githubusercontent.com/71202372/138721971-022aab5e-d96b-452d-9823-ed4d05c0be8a.png" width="500vh"></a>
<img src="https://user-images.githubusercontent.com/71202372/138721968-07d18429-ea5c-4337-bf7f-fc9c4ac4231f.png" width="500vh"></a>
<img src="https://user-images.githubusercontent.com/71202372/138721964-edc6e24b-81f4-43eb-a903-a08b8f13f3ee.png" width="500vh"></a>
<img src="https://user-images.githubusercontent.com/71202372/138721956-adc4c1db-7346-4b0e-b370-0bc835b95efa.png" width="500vh"></a>

## Features

- Static, Server Side, and Client side rendering with Next.js. Static pages /feedback can server by a CDN for lightning fast initial loads and server side rendered pages like: /feedback/[gameSessionId]/edit remove a loading state from the client for a better user experience.

- Users may submit a 1-5 rating with an emoji plus a comment for each session. Multiple players can submit feedback for the same session, but a single player may only submit one feedback per session.

- After a user submits feedback, they may modify it. This serves a dual purpose because after a user submits feedback for one session, they can't create another for the same session. They can only modify their original.

- I setup infinite scrolling with react query on the /feedback view. As you scroll, react-query will fetch more data based on the query parameters. This allows you to filter and sort by rating (emoji).

- Dark and light mode

- Responsive for mobile and desktop

## API

The rest API was built using Next.js's serverless API routes. Whats great about this is its incredibly easy to scale this to a multi availability zone deployment either with Vercel, or by ejecting and hosting them directly on AWS.

Serverless functions are great, but there are a few common pitfalls that you can run into: slow cold starts and exhausting your database's connection limit. I tried a handfuls of cloud providers and some of their hosted solutions for connection pooling including: AWS RDS with RDS Proxy, AWS Aurora, and Digital Ocean with PgBouncer. I settled with a new platform called Planet Scale because they made the MySQL sharding middleware used by YouTube: [Vitess](https://vitess.io/). This has been working great with Vercel's functions, and theoretically this architecture could be used all the way up to planet scale, but im not sure how well it would hold up if you are trying to serving web apps to galaxies!

GET /api/v1/feedback

- get a paginated and or filtered list of all feedback and their users
  query params

```json
{
  "userId": "nullable string  0 - 36 chars",
  "gameSessionId": "nullable string  0 - 36 chars",
  "createdAtGTE": "nullable time stamp to filter where feedback.createdAt > param",
  "createdAtLTE": "nullable time stamp to filter where feedback.createdAt < param",
  "updatedAtGTE": "nullable time stamp to filter where feedback.updatedAt > param",
  "updatedAtLTE": "nullable time stamp to filter where feedback.updatedAt < param",
  "rating": "nullable number 0 - 4 inclusive",
  "cursor": "non nullable 1 - 36 chars",
  "pageSize": "nullable from 25 - 1000 inclusive, default of 25"
}
```

- 200 res.body

```json
[
  {
    "id": "2475",
    "userId": "25",
    "gameSessionId": "50",
    "createdAt": "2021-10-25T13:29:25.665Z",
    "updatedAt": "2021-10-25T13:29:25.665Z",
    "rating": 1,
    "comment": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    "user": {
      "oauthImgSrc": "https://cdn.fakercloud.com/avatars/mcflydesign_128.jpg",
      "oauthName": "Harriet Robel"
    }
  }
]
```

- 400 res.body

```json
{
  "msg": "a detailed message here explaining some missing query parameter"
}
```

- 405 res.body

```json
{
  "msg": "supported method(s): GET"
}
```

PUT /api/v1/feedback/[gameSessionId]

- create or update your feedback for one GameSession
- Google OAuth is required
  req.body

```json
{
  "comment": "a non null string from 1 - 2000 chars",
  "rating": 1 // a non null int from 0 - 4 inclusive that represent an emoji vote
}
```

- 200 res.body

```json
{
  "id": "id of feedback",
  "usedId": "your used id",
  "gameSessionId": "id of game session",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "comment": "a non null string from 1 - 2000 chars",
  "rating": 1 // a non null int from 0 - 4 inclusive that represent an emoji vote
}
```

- 400 res.body

```json
{
  "msg": "a detailed message here explaining some missing parameter"
}
```

- 403 res.body

```json
{
  "msg": "you must be signed in"
}
```

- 404 res.body

```json
{
  "msg": "game session / user not found"
}
```

- 405 res.body

```json
{
  "msg": "supported method(s): PUT"
}
```

Other endpoints for auth created by [next-auth](https://next-auth.js.org/getting-started/rest-api)

## UI

/ - There is not much on here, just some links to the other pages.
/feedback - View a infinite list of all feedbacks, the UI supports filtering by rating (emoji).
/feedback/[gameSessionId]/edit - Edit your feedback for a game session.
/feedback/[gameSessionId]/new - Add feedback for a session.

## Limitations

- Time. If I had more time I would focus in on a more robust e2e testing suit with a login workflow.

- In a real environment, there is most likely another service that owns the game sessions, and the API would use that service. For the scope of this demo, I used a seed script to create some mock sessions. Similarly, I chose not to expose an api to edit these sessions. Another hypothetical factor with real implementation would be that a users may have different roles against sessions, so they would only be able to leave feedback on the on the games they participated in.

- For this demo, I chose to use Google's OAuth service. I would imagine users land on a site like this after finishing a game. That means that they would have most likely already signed in with that game's auth provider. To make this a more seamless experience, I would use that same auth provider.

- The portal to view all the feedback can be read by everyone, not just an ops team. Roles could be setup to prevent this, but for now having it open to be read by all users works great because they can view some of the comments left by other members of a their game session.

- Delete was not implemented. For API routes.

- Known bug with the theme toggle not saving the state of the toggle icon.

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

- [Prisma](https://www.prisma.io/docs/)

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

- clone this repo
- cd into the directory
- install dependencies

```sh
npm i
```

- generate prisma orm

```sh
npx prisma generate
```

- create the development database, and run the seeds to populate it

```sh
npm run docker:db:up
```

- run the dev server in watch mode

```sh
npm run dev
```

## Testing

Unit and component tests are run with jests and test-library, to get started run:

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

Teague Stockwell - [LinkedIn](https://www.linkedin.com/in/teague-stockwell) [My Website](https://teaguestockwell.com)
