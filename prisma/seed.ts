import {PrismaClient} from '@prisma/client'
import faker from 'faker'
import cuid from 'cuid'

const client = new PrismaClient()

// for testing having auto increment ids may be handy
class IdMaker {
  userId: number
  gameSessionId: number
  feedbackId: number
  type: 'cuid' | 'inc'

  constructor(type: 'cuid' | 'inc') {
    this.type = type
    this.userId = 0
    this.gameSessionId = 0
    this.feedbackId = 0
  }

  static getRandom({min, max}: {min: number; max: number}) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getUserId() {
    if (this.type === 'cuid') return cuid()
    this.userId++
    return this.userId.toString()
  }

  getGameSessionId() {
    if (this.type === 'cuid') return cuid()
    this.gameSessionId++
    return this.gameSessionId.toString()
  }

  getFeedbackId() {
    if (this.type === 'cuid') return cuid()
    this.feedbackId++
    return this.feedbackId.toString()
  }
}

const idMaker = new IdMaker('cuid')

const getUserData = () => {
  return {
    id: idMaker.getUserId(),
    oauthName: faker.name.findName(),
    email: faker.internet.email() + cuid(),
    oauthImgSrc: faker.image.avatar(),
    about: faker.commerce.productDescription(),
  }
}

const getGameSessionData = () => {
  return {
    id: idMaker.getGameSessionId(),
  }
}

const getFeedbackData = ({
  userId,
  gameSessionId,
}: {
  userId: string
  gameSessionId: string
}) => {
  return {
    id: idMaker.getFeedbackId(),
    userId,
    gameSessionId,
    comment: faker.commerce.productDescription(),
    rating: IdMaker.getRandom({min: 1, max: 4}),
  }
}

/** 
https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#optimizing-for-parallel-requests

TIL:
Sending a large amount of data with one instance of node can be fragile.
Here are a couple things to consider:

Queries can be sent in parallel using Promise.all([query1, query2, query3]), but this has a large change of exhausting your connection limit on a single instance of node.
if that limit is exhausted, Prisma will be forced to send queries in serially, and this may throw because of a timeout for large queries.

Two parameter that can be modified by adding them as query params to the end of the DB_URL string for the Prisma query engine are: 
connection_limit=(num_physical_cpus * 2 + 1)
pool_timeout=10 // in seconds

Prisma can pool connections from the API, but when you ship serverless functions you also need a DB connection pool to avoid exhausting the DB connection limit.
*/
async function main() {
  const numUsers = 50

  const userDatas = []
  const gameSessionDatas = []
  const feedbackDatas = []

  for (let i = 0; i < numUsers; i++) {
    userDatas.push(getUserData())
    gameSessionDatas.push(getGameSessionData())
  }

  for (const userData of userDatas) {
    for (const gameSessionData of gameSessionDatas) {
      feedbackDatas.push(
        getFeedbackData({
          userId: userData.id,
          gameSessionId: gameSessionData.id,
        })
      )
    }
  }

  await Promise.all([
    client.user.createMany({data: userDatas}),
    client.gameSession.createMany({data: gameSessionDatas}),
  ])

  await client.feedback.createMany({data: feedbackDatas})
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await client.$disconnect()
  })
