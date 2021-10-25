import prisma from '@prisma/client'
const {PrismaClient} = prisma
import faker from 'faker'
import {v4} from 'uuid'

const client = new PrismaClient()

const seedUser = async () => {
  return client.user.create({
    data: {
      id: v4(),
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
      id: v4(),
    },
  })
}

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createSessionFeedback = async ({gameSession, user}) => {
  return client.feedback.create({
    data: {
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
