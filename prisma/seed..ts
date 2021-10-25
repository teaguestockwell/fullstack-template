import {PrismaClient} from '@prisma/client'
import faker from 'faker'
import {v4} from 'uuid'

const client = new PrismaClient()

// for testing having auto increment id's is handy
class AutoInc {
  userId: number
  gameSessionId: number
  feedbackId: number

  constructor() {
    this.userId = 0
    this.gameSessionId = 0
    this.feedbackId = 0
  }

  getUserId() {
    this.userId++
    return this.userId.toString()
  }

  getGameSessionId() {
    this.gameSessionId++
    return this.gameSessionId.toString()
  }

  getFeedbackId() {
    this.feedbackId++
    return this.feedbackId.toString()
  }
}

const autoInc = new AutoInc()

const seedUser = async () => {
  return client.user.create({
    data: {
      id: autoInc.getUserId(),
      oauthName: faker.name.findName(),
      email: faker.internet.email() + v4(),
      oauthImgSrc: faker.image.avatar(),
      about: faker.commerce.productDescription(),
    },
  })
}

const seedGameSession = async () => {
  return client.gameSession.create({
    data: {
      id: autoInc.getGameSessionId(),
    },
  })
}

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createSessionFeedback = async ({
  gameSession,
  user,
}: {
  gameSession: any
  user: any
}) => {
  return client.feedback.create({
    data: {
      id: autoInc.getFeedbackId(),
      userId: user.id,
      gameSessionId: gameSession.id,
      comment: faker.commerce.productDescription(),
      rating: random(0, 4),
    },
  })
}

async function main() {
  const arr = new Array(10).fill(null)

  const users = await Promise.all(arr.map(seedUser))
  const gameSessions = await Promise.all(arr.map(seedGameSession))
  const feedbackPromises = []

  for (const gameSession of gameSessions) {
    for (const user of users) {
      feedbackPromises.push(createSessionFeedback({gameSession, user}))
    }
  }

  await Promise.all(feedbackPromises)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await client.$disconnect()
  })
