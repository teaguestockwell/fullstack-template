[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[license-shield]: https://img.shields.io/github/license/tsAppDevelopment/hello2.svg
[license-url]: https://github.com/tsAppDevelopment/fullstack-template/blob/master/licence.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/teague-stockwell/

<br />

<p align="center">
    <img src="https://user-images.githubusercontent.com/71202372/138011873-47e9b176-c06f-4931-9fe6-2b392e3d8e68.png" alt="Logo" width="500vh">

  <h3 align="center">Fullstack Template</h3>

  <p align="center">
    Jump Start your jam stack with some of my favorite tools
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
    <li><a href="#api">API</a></li>
    <li><a href="#ui">UI</a></li>
    <li><a href="#limitations">Limitations</a></li>
    <li><a href="#system-architecture">System Architecture</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#how-to-run">How to run</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
</details>

<br/>

## About The Project

This is an opinionated starting point for common patterns and tools I have used building jam stack sites with Postgres, Next.js, React, and Node.js.

Mobile Lighthouse: / (statically rendered)
<img src="https://user-images.githubusercontent.com/71202372/139150316-9537247a-edb4-4dac-bb94-5e25a2d2b22a.png" ></a>
Mobile Lighthouse: /feedback (client side rendered)
<img src="https://user-images.githubusercontent.com/71202372/139150537-a6cf202b-da1c-4420-8c49-a0a2c4368c1c.png"></a>

<img src="https://user-images.githubusercontent.com/71202372/138722325-7a09c4aa-2c16-4cdb-8c11-4f3b4a31466e.gif" width="500vh"></a>
<img src="https://user-images.githubusercontent.com/71202372/138721971-022aab5e-d96b-452d-9823-ed4d05c0be8a.png" width="500vh"></a>
<img src="https://user-images.githubusercontent.com/71202372/138721968-07d18429-ea5c-4337-bf7f-fc9c4ac4231f.png" width="500vh"></a>
<img src="https://user-images.githubusercontent.com/71202372/138721964-edc6e24b-81f4-43eb-a903-a08b8f13f3ee.png" width="500vh"></a>
<img src="https://user-images.githubusercontent.com/71202372/138721956-adc4c1db-7346-4b0e-b370-0bc835b95efa.png" width="500vh"></a>

Initially I used AWS RDS, but the serverless functions quickly exhausted all the connections to my small RDS instance. One possible solution was to use AWS RDS Proxy to pool connections on Postgres. Unfortunately, because of the way AWS RDS Proxy pins connections it couldn't be used with [Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/caveats-when-deploying-to-aws-platforms). Instead of hosting a custom PgBouncer on an EC2 instance, I switched to Digital Ocean because they offered a managed PostgreSQL RDS service with PgBouncer pre configured.

In the spirit of a serverless architecture and reading, I eventually ended up using Planet Scale because it's built on top of [Vitess](https://vitess.io/) - a MySQL Db sharding middleware created to scale Youtube.

Another thing to keep an eye on in the future is [Prisma's data proxy](https://www.prisma.io/docs/concepts/components/prisma-data-platform#data-proxy) as a managed connection pool and ORM as a service that can reduce lambda cold start times by offloading part of the ORM.

### Presigned Image Uploads

When a client want to upload an image, a request is sent to the API to return a presigned upload URL. Before the API returns the URL, it can make sure the user is signed in and that they have not exceeded their rate limit. In the future, rate limiting would be handled by Redis, but for now it lives in a DB table. Once the client receives the upload URL any they input an image, it gets compressed in the browser using [browser-image-compression](https://www.npmjs.com/package/browser-image-compression) until it is within the upload limit. When the image is submitted to the API, the API sends a HEAD req to verify the upload was successful. It can then save the image and remove the Pic job it created when issuing the presigned URL to track stale objects that may be in S3.

### Incremental Static Generation & React Query

Next.js can generate static HTML incrementally into it's edge network cache. When that page is served to the client, the next data is passed to react-query as as initial data. From there react-query can take over and do some powerful things like refetch on window focus and optimistic updates for mutations.

### Authentication

Next Auth and Google OAuth are used to authenticate users. From there the API can determine what roles a user has.

## System Architecture

<p align="center">
  <img src="https://user-images.githubusercontent.com/71202372/138579764-eca2f1fb-8f8e-43df-9d6a-f56d5dc5f788.png" alt="system architecture" width="1000vh" >
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

### Object Storage

- S3
- [Presigned URLs](https://github.com/leerob/nextjs-aws-s3)

### State

- Global state management with [zustand](https://github.com/pmndrs/zustand)
- Server state management with [react-query](https://react-query.tanstack.com/overview)

### JWT Authentication

- Plugin for OAuth providers [next-auth](https://next-auth.js.org/getting-started/introduction)
- [Google Oauth](https://developers.google.com/identity/protocols/oauth2)

### Styling

- CSS in JS with [emotion](https://emotion.sh/docs/ssr)
- Dark / light mode hook, default user preference and persistance with [next-themes](https://github.com/pacocoursey/next-themes)

### Static and Runtime Caching

- Service worker generated using workbox and [next-pwa](https://github.com/shadowwalker/next-pwa)

### SEO

- Meta tags / Open Graph generated using [next-auth](https://github.com/garmeeh/next-seo)
- Favorite icons generated with [RealFaviconGenerator](https://realfavicongenerator.net)

## Getting Started

Follow these easy steps to get started developing locally

- fork the repo
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

- create the development database, and run the seeds to populate it

```sh
npm run docker:db:up
```

- run the dev server in watch mod

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
    "http://localhost:8081",
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
