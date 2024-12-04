/** @format */

const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Detail = require('../models/Detail');
const Game = require('../models/Game');

// Route to get all articles that don't have a parent with populated fields
router.get('/root-articles', async (req, res) => {
  try {
    const rootArticles = await Article.find({ parent: null })
      .populate('creators', 'username email') // Populate creators with specific fields
      .populate('children')
      .populate('siblings')
      .populate('details')
    res.json(rootArticles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get complete article details by id
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('details')
      .populate('games')
      .populate({
        path: 'parent',
        populate: { path: 'details games' },
      })
      .populate({
        path: 'children',
        populate: { path: 'details games' },
      })
      .populate({
        path: 'siblings',
        populate: { path: 'details games' },
      });

    if (!article) return res.status(404).send('Article not found');
    res.send(article);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/details/:title', async (req, res) => {
  try {
    //first of all, title is lowercase, but not necessarily in the database
    //so we need to use a case-insensitive
    //regex to find the title
    const details = await Detail.find({
      title: { $regex: new RegExp(req.params.title, 'i') },
    });
    //Take the one that matches the title the best
    //by checking the length of the title
    const titleLength = req.params.title.length;
    //Go through the details and find the one with the title that matches the closest
    let detail = details.reduce((acc, curr) => {
      if (
        Math.abs(curr.title.length - titleLength) <
        Math.abs(acc.title.length - titleLength)
      ) {
        return curr;
      }
      return acc;
    });
    if (!detail) return res.status(404).send('Detail not found');
    //Then, use the detail to find the article: article should have this detail in its details array
    const article = await Article.findOne({ details: detail._id }).populate(
      'games'
    );
    if (!article) return res.status(404).send('Article not found');
    //populate the article with its details
    await article.populate('details');
    // await article.populate('children');
    //Can

    res.send(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create, Update, Delete Article, Detail, and Game
router.post('/', async (req, res) => {
  try {
    const { details, creators, games, parent, siblings, ...rest } = req.body;

    // Step 1: Handle details
    if (details && typeof details === 'object') {
      let savedDetail = await Detail.findOne({
        title: details.title,
        author: details.author,
      });

      if (!savedDetail) {
        savedDetail = new Detail(details);
        await savedDetail.save();
      }

      // Replace details in the request body with the ObjectId
      rest.details = savedDetail._id;
      req.body.details = savedDetail;
    }

    // Step 2: Handle creators
    if (creators && creators.length > 0) {
      const savedCreators = await Promise.all(
        creators.map(async (creator) => {
          if (mongoose.Types.ObjectId.isValid(creator)) {
            return creator;
          } else {
            let savedCreator = await User.findOne({ email: creator.email });
            if (!savedCreator) {
              savedCreator = new User(creator);
              await savedCreator.save();
            }
            return savedCreator._id;
          }
        })
      );
      rest.creators = savedCreators;
      req.body.creators = savedCreators;
    }

    // Step 3: Handle games
    if (games && games.length > 0) {
      const savedGames = await Promise.all(
        games.map(async (game) => {
          if (mongoose.Types.ObjectId.isValid(game)) {
            return game;
          } else {
            let savedGame = await Game.findOne({ name: game.name });
            if (!savedGame) {
              savedGame = new Game(game);
              await savedGame.save();
            }
            return savedGame._id;
          }
        })
      );
      rest.games = savedGames;
    }
    rest.parent = parent;
    // Step 4: Save the article
    const article = new Article(rest);
    await article.save();

    // Step 5: Update parent with new child
    if (parent) {
      await Article.findByIdAndUpdate(parent, {
        $addToSet: { children: article._id },
      });
    }

    // Step 6: Update siblings
    if (siblings && siblings.length > 0) {
      await Article.updateMany(
        { _id: { $in: siblings } },
        { $addToSet: { siblings: article._id } }
      );
    }

    // Step 7: Update the new article's siblings to include existing siblings
    if (siblings && siblings.length > 0) {
      article.siblings = siblings;
      await article.save();
    }

    // Step 8: Return the new article with details, creators, and games populated

    req.body._id = article._id;

    res.status(201).json(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove an article by id
router.delete('/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    console.log('Deleting article with ID:', articleId);

    // Find the article by ID
    const article = await Article.findById(articleId);
    if (!article) return res.status(404).send('Article not found');

    // Step 1: Update the parent, removing this article from its children
    if (article.parent) {
      const parentArticle = await Article.findById(article.parent);
      if (parentArticle) {
        parentArticle.children = parentArticle.children.filter(
          (childId) => !childId.equals(articleId)
        );
        await parentArticle.save();
      }
    }

    // Step 2: Update siblings, removing this article from their siblings
    if (article.siblings.length > 0) {
      await Article.updateMany(
        { _id: { $in: article.siblings } },
        { $pull: { siblings: articleId } }
      );
    }

    // Step 3: Remove associated details and games
    if (article.details) {
      await Detail.findByIdAndDelete(article.details);
    }
    if (article.games.length > 0) {
      await Game.deleteMany({ _id: { $in: article.games } });
    }

    // Step 4: Remove the article itself
    await Article.findByIdAndDelete(articleId);

    res.send({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).send(error.message);
  }
});
// Implement similar routes for /details and /games

module.exports = router;
