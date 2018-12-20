import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';

import ActiveGames from '../../api/ActiveGames/ActiveGames';
import Chapters from '../../api/Chapters/Chapters';
import Choices from '../../api/Choices/Choices';
import Sides from '../../api/Sides/Sides';
import Stories from '../../api/Stories/Stories';
import Files from '../../api/Files/Files';

const wipe = false;

const choiceSeed = (ownerId) => ({
  collection: Choices,
  environments: ['development', 'staging'],
  noLimit: true,
  wipe,
  modelCount: 2,
  model(dataIndex, faker) {
    const choice = {
      owner: ownerId,
      description: faker.lorem.paragraph(1).slice(0, 100),
      buttonText: faker.lorem.word().slice(0, 8),
      point1Change: 1,
      point2Change: 2,
      point3Change: 3,
      data() {
        return storySeed(ownerId, [choice]);
        // return chapterSeed(ownerId, [choice]);
      }
    };
    return choice;
  }
});

const storySeed = (ownerId, [choice]) => ({
  collection: Stories,
  environments: ['development', 'staging'],
  noLimit: true,
  wipe,
  modelCount: 3,
  model(dataIndex, faker) {
    return {
      owner: ownerId,
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(1),
      imageUrl: faker.image.imageUrl(400, 400, 'people'),
      side1Name: 'lorem',
      side2Name: 'ipsum',
      point1Name: 'point 1',
      point2Name: 'point 2',
      point3Name: 'point 3',
      data(storyId) {
        return sidesSeed(ownerId, storyId, 'lorem', [], [choice]);
      }
    };
  }
});

const sidesSeed = (ownerId, storyId, storySide, chapterIds, choices) => ({
  collection: Sides,
  environments: ['development', 'staging'],
  noLimit: true,
  wipe,
  modelCount: 4,
  model(dataIndex, faker) {
    return {
      owner: ownerId,
      storyId,
      side: storySide,
      difficulty: 'easy',
      point1Starting: 10,
      point2Starting: 20,
      point3Starting: 30,
      point1Winning: 15,
      point2Winning: 25,
      point3Winning: 35,
      assessmentVictory: faker.lorem.paragraph(1).slice(0, 280),
      assessmentPartialVictory: faker.lorem.paragraph(1).slice(0, 280),
      assessmentFailure: faker.lorem.paragraph(1).slice(0, 280),
      chapterIds,
      data(sideId) {
        return chapterSeed(ownerId, storyId, sideId, chapterIds, choices);
        // return activeGamesSeed(ownerId, storyId, sideId, chapterIds, [])
      },
    };
  },
});

const chapterSeed = (ownerId, storyId, sideId, chapterIds, choices) => ({
  collection: Chapters,
  environments: ['development', 'staging'],
  noLimit: true,
  wipe,
  modelCount: 5,
  model(dataIndex, faker) {
    return {
      owner: ownerId,
      type: 'normal',
      sideId,
      title: faker.lorem.sentence().slice(0, 30),
      description: faker.lorem.paragraph(1).slice(0, 280),
      imageUrl: faker.image.imageUrl(400, 400, 'people'),
      choices,
      data(){
        return activeGamesSeed(ownerId, storyId, sideId, chapterIds, []);
      }
    };
  },
});

const activeGamesSeed = (ownerId, storyId, sideId, chapterIds, choiceIds) => ({
  collection: ActiveGames,
  environments: ['development', 'staging'],
  noLimit: true,
  wipe,
  modelCount: 2,
  model(dataIndex, faker) {
    return {
      owner: ownerId,
      storyId,
      sideId,
      state: 'active',
      chapterHistory: chapterIds,
      currentPoint1: 10,
      currentPoint2: 20,
      currentPoint3: 30,
      decisions: choiceIds,
      // data() {
      //   return choiceSeed(ownerId);
      // }
    };
  },
});

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  wipe,
  data: [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'Andy',
        last: 'Warhol',
      },
    },
    roles: ['admin'],
    data(userId) {
      return choiceSeed(userId);
      // return storySeed(userId);
    },
  }],
  modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user+${userCount}@test.com`,
      password: 'password',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        return choiceSeed(userId);
      },
    };
  },
});
seeder(Files, {
  environments: ['development', 'staging'],
  noLimit: false,
  wipe,
  modelCount: 5,
  model(index, faker) {
    const size = 100 * (index + 1);
    return {
      url: `https://picsum.photos/${size}/${size}`,
      tags: ['lorem', 'ipsum'],
      accessibleTo: ['admin', 'editor', 'player'],
    };
  },
});
