/** @format */

const mongoose = require("mongoose");
const Article = require("./models/Article");
const Detail = require("./models/Detail");
const Game = require("./models/Game");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const data = {
  articles: {
    "article-3": {
      creators: ["user1"],
      parent: null,
      children: ["article-0"],
      siblings: [],
      details: "psychology",
      games: [],
    },
    "article-0": {
      creators: ["user1"],
      parent: "article-3",
      children: ["article-1", "article-2"],
      siblings: [],
      details: "chapter0",
      games: [],
    },
    "article-1": {
      creators: ["user1"],
      parent: "article-0",
      children: [],
      siblings: ["article-2"],
      details: "chapter1",
      games: ["mcq-1"],
    },
    "article-2": {
      creators: ["user1"],
      parent: "article-0",
      children: [],
      siblings: ["article-1"],
      details: "chapter2",
      games: ["mcq-2"],
    },
  },
  details: {
    chapter0: {
      title: "Developmental Psychology",
      author: "",
      content: `<div>
      <p>Developmental psychology is the scientific study of how and why human beings change over the course of their life. Originally concerned with infants and children, the field has expanded to include adolescence, adult development, aging, and the entire lifespan. This field examines change across a broad range of topics, including motor skills and other psycho-physiological processes; cognitive development involving areas such as problem solving, moral understanding, and conceptual understanding; language acquisition; social, personality, and emotional development; and self-concept and identity formation.</p>
      </div>`,
      edit: "2019-12-01 10:00:00",
    },
    chapter1: {
      title: "Introduction",
      author: "",
      content: `<div>
      <p>This is the introduction to the first chapter. This chapter is about the basics of development. It covers the definition of development, the context of development, and the nature of development. It also discusses the history of developmental psychology and the major theories of development. The chapter concludes with a discussion of the research methods used in the study of development.
      </p>
      </div>
      `,
      edit: "2021-09-01 12:00:00",
    },
    chapter2: {
      title: "Defining Development",
      author: "",
      content: `<div>
      <p>We define development as the progressive series of physical, cognitive, and psychosocial changes that occur from conception to death. Development is a lifelong process that begins before birth and continues until we die. It involves both growth and decline, as well as gains and losses. Development is a complex and multifaceted process that is influenced by a variety of factors, including genetics, environment, and culture. It is also a dynamic process that is shaped by the interactions between individuals and their environments. Development is a universal process that occurs in all individuals, but it is also an individual process that is unique to each person.
      </p>
      </div>`,
      edit: "2021-09-01 14:00:00",
    },
    psychology: {
      title: "Psychology",
      author: "",
      content: `<div>
      <h2>What is Psychology?</h2>


      <p>Psychology is the scientific study of the mind and behavior. Psychology is a multifaceted discipline and includes many sub-fields of study such areas as human development
      , sports, health, clinical, social behavior and cognitive processes. Psychology is really a very new science, with most advances happening over the past 150 years or so. However, its origins can be traced back to ancient Greece, 400 – 500 years BC. The emphasis was a philosophical one, with great thinkers such as Socrates influencing Plato, who in turn influenced Aristotle. The emphasis of the early Greek philosophers was the relationship between mind and body, the so-called mind-body duality. One of the key questions that still fascinates psychologists today is how the mind and body interact.</p>
      </div>`,
      edit: "2022-01-01 12:00:00",
    },
  },
  // games: {
  //   "mcq-1": {
  //     type: "Mcq",
  //     name: "Mcq1",
  //     creators: ["user1"],
  //     content: [
  //       {
  //         question:
  //           "What does 'development' refer to in the context of human growth?",
  //         options: [
  //           "The process of getting older.",
  //           "The decline in cognitive functions.",
  //           "The progressive series of physical, cognitive, and psychosocial changes from conception to death.",
  //           "The societal expectations of a particular age group.",
  //         ],
  //         answer: "c",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question: "Aging is characterized by:",
  //         options: [
  //           "Growth and maturation.",
  //           "The process of becoming older with a decline in functions.",
  //           "Learning and adaptation.",
  //           "Socially defined age groups in a society.",
  //         ],
  //         answer: "b",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question: "What are age grades?",
  //         options: [
  //           "The process of getting older.",
  //           "Expectations of what one should achieve by a certain age.",
  //           "Culturally set timelines for life events.",
  //           "Socially defined age groups in a society with associated roles and expectations.",
  //         ],
  //         answer: "d",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question:
  //           "Which term refers to societal expectations about behaviors or achievements at specific ages?",
  //         options: [
  //           "Age grades.",
  //           "Development.",
  //           "Age norms.",
  //           "Social clock.",
  //         ],
  //         answer: "c",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question:
  //           "The 'right time' to get married or have children, as defined by society, refers to:",
  //         options: [
  //           "Age grades.",
  //           "Development.",
  //           "Age norms.",
  //           "Social clock.",
  //         ],
  //         answer: "d",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question:
  //           "The extreme position that emphasizes genetic inheritance as the primary factor in human development is:",
  //         options: ["Nurture.", "Epigenetics.", "Nature.", "Age norms."],
  //         answer: "c",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question:
  //           "Most developmental scientists today believe that human development is influenced by:",
  //         options: [
  //           "Only genes.",
  //           "Only environmental factors.",
  //           "Both genes and environmental factors.",
  //           "Neither genes nor environmental factors.",
  //         ],
  //         answer: "c",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //     ],
  //   },
  //   "mcq-2": {
  //     type: "Mcq",
  //     name: "Mcq2",
  //     creators: ["user1"],
  //     content: [
  //       {
  //         question:
  //           "Development is described as changes and continuities that occur from:",
  //         options: [
  //           "Infancy to adolescence.",
  //           "Birth to adulthood.",
  //           "Conception to death.",
  //           "Childhood to old age.",
  //         ],
  //         answer: "c",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question:
  //           "Which of the following is NOT a domain of human development as described in the chapter?",
  //         options: [
  //           "Physical development.",
  //           "Emotional development.",
  //           "Cognitive development.",
  //           "Psychosocial development.",
  //         ],
  //         answer: "b",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question: "The baby who learns to crawl can:",
  //         options: [
  //           "Only improve her physical skills.",
  //           "Develop her mind by exploring and hone social skills by interacting.",
  //           "Just hone her social skills.",
  //           "Only improve her mental abilities.",
  //         ],
  //         answer: "b",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question:
  //           "Traditional biologists define growth as the physical changes that occur from:",
  //         options: [
  //           "Birth to maturity.",
  //           "Conception to maturity.",
  //           "Infancy to old age.",
  //           "Conception to death.",
  //         ],
  //         answer: "b",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question: "Biological aging refers to:",
  //         options: [
  //           "The physical changes that occur throughout life.",
  //           "The deterioration that leads inevitably to death.",
  //           "The accumulation of knowledge over time.",
  //           "The growth from infancy to adolescence.",
  //         ],
  //         answer: "b",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question:
  //           "Which of the following statements about cognitive abilities in older adults is TRUE?",
  //         options: [
  //           "They always decline.",
  //           "They remain unchanged.",
  //           "They often score higher on vocabulary tests than young adults.",
  //           "They become less wise over time.",
  //         ],
  //         answer: "c",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question: "Aging, as defined by developmental scientists, refers to:",
  //         options: [
  //           "Only biological changes.",
  //           "A range of physical, cognitive, and psychosocial changes.",
  //           "Just physical and cognitive changes.",
  //           "Only the negative changes associated with getting older.",
  //         ],
  //         answer: "b",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //       {
  //         question: "Development can involve all of the following EXCEPT:",
  //         options: [
  //           "Gains.",
  //           "Losses.",
  //           "Constant improvement.",
  //           "Neutral changes.",
  //         ],
  //         answer: "c",
  //         solvedTimes: 0,
  //         sessionAttempts: 0,
  //       },
  //     ],
  // },
  // },
  users: {
    user1: {
      username: "user1",
      password: "password1",
      email: "user1@email.com",
    },
  },
};
mongoose
  .connect("mongodb://localhost:27017/psychology")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const populateDB = async () => {
  try {
    await User.deleteMany({});
    await Article.deleteMany({});
    await Detail.deleteMany({});
    await Game.deleteMany({});

    // Hash passwords before inserting users
    const userDataArray = await Promise.all(
      Object.values(data.users).map(async (userData) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 salt rounds
        return {
          ...userData,
          password: hashedPassword,
        };
      })
    );

    const users = await User.insertMany(userDataArray);
    console.log(
      "Inserted Users:",
      users.map((user) => user.username)
    );

    const details = await Detail.insertMany(Object.values(data.details));
    console.log(
      "Inserted Details:",
      details.map((detail) => detail.title)
    );
    if (data?.games && Object.keys(data.games).length !== 0) {
      // Map the creators field in games to user ObjectIds
      const gameDataArray = Object.values(data.games).map((gameData) => {
        const creators = gameData.creators
          .map((username) => {
            const user = users.find((u) => u.username === username);
            return user ? user._id : null;
          })
          .filter((id) => id !== null);

        return {
          ...gameData,
          creators,
        };
      });

      const games = await Game.insertMany(gameDataArray);
      console.log(
        "Inserted Games:",
        games.map((game) => game.name)
      );
    }
    const articles = data.articles;
    const articleMap = {};

    // First, create all articles without their references
    for (let key in articles) {
      const article = new Article({
        creators: articles[key].creators
          .map((username) => {
            const user = users.find((u) => u.username === username);
            return user ? user._id : null;
          })
          .filter((id) => id !== null),
        details: null, // Initialize with null, to be updated later
        parent: null, // Initialize with null, to be updated later
        children: [], // Initialize with empty array, to be updated later
        siblings: [], // Initialize with empty array, to be updated later
        games: [], // Initialize with empty array, to be updated later
      });
      await article.save();
      articleMap[key] = article;
    }

    // Now, update all articles with their references
    for (let key in articles) {
      const article = articleMap[key];

      // Map details
      if (articles[key].details) {
        const detail = details.find(
          (d) => d.title === data.details[articles[key].details].title
        );
        if (detail) {
          article.details = detail._id;
        } else {
          console.error(`Detail not found for ${articles[key].details}`);
        }
      }

      // Map parent
      if (articles[key].parent) {
        const parent = articleMap[articles[key].parent];
        if (parent) {
          article.parent = parent._id;
        } else {
          console.error(`Parent article not found for ${articles[key].parent}`);
        }
      }

      // Map children
      if (articles[key].children) {
        article.children = articles[key].children
          .map((childKey) => {
            const child = articleMap[childKey];
            if (child) {
              return child._id;
            } else {
              console.error(`Child article not found for ${childKey}`);
              return null;
            }
          })
          .filter((id) => id !== null);
      }

      // Map siblings
      if (articles[key].siblings) {
        article.siblings = articles[key].siblings
          .map((siblingKey) => {
            const sibling = articleMap[siblingKey];
            if (sibling) {
              return sibling._id;
            } else {
              console.error(`Sibling article not found for ${siblingKey}`);
              return null;
            }
          })
          .filter((id) => id !== null);
      }

      // Map games
      // if (articles[key].games) {
      //   article.games = articles[key].games
      //     .map((gameKey) => {
      //       const game = games.find((g) => g.name === data.games[gameKey].name);
      //       if (game) {
      //         return game._id;
      //       } else {
      //         console.error(`Game not found for ${gameKey}`);
      //         return null;
      //       }
      //     })
      //     .filter((id) => id !== null);
      // }

      await article.save();

      //The creators for the games should also be populated in the games collection. In the test data, the creators for the games are the same as the creators for the articles. The creators list in the games collection should be populated with the ObjectIds of the users who created the games.
      //Essentially, we need to use the users-keys. If the key of the users object is for example "users1", and the creators in the games object is ["users1"], then the ObjectId of the user with the username "users1" should be added to the creators list of the game.

      // Map creators in games
    }

    console.log("Database populated with test data");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

populateDB();
