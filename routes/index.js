var express = require('express');
var router = express.Router();
var sql = require('../sql');
var request = require('request');
var cheerio = require('cheerio');

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let createCallback = (err, category, changes) => {
  console.log("Create error: ", err);
}

let scanJson = function(mark, category_parent_id, depth) {
  if (mark.type === "text/x-moz-place-container") {
    console.log(('\t'.repeat(depth)) + 'title: ' + mark.title)
    sql.createCategory(mark, "", category_parent_id, createCallback)
    if (mark.hasOwnProperty('children') && mark.children.length > 0) {
      mark.children.forEach((item, i) => {
        scanJson(item, mark.id, depth+1)
      });
    }
  } else if (mark.type === 'text/x-moz-place') {
    console.log(('\t'.repeat(depth)) + 'URL: ' + mark.uri)
    let timestamp = new Date(mark.dateAdded / 1000)
    console.log(('\t'.repeat(depth)) + ' - timestamp: ' + (timestamp.toString()))
    sql.createPage(mark.id, mark.uri, mark.title, "", category_parent_id, createCallback)
  }
}

router.get('/json', function(req, res, next) {
  let rawdata = fs.readFileSync('bookmarks.json');
  let bookmarks = JSON.parse(rawdata);
  //console.log(bookmarks.children[0]);
  scanJson(bookmarks, null, 0)
  res.render('index', { title: 'Json parser' });
});

router.get('/category', function(req, res, next) {
  let categories = sql.fetchCategories((rows) => {
    console.log(rows);
    res.json(rows);
  })
  //console.log(bookmarks.children[0]);
  //res.render('categories', { title: 'Categories', categories: categories });
});

router.get('/category/:catId', function(req, res, next) {
  let categories = sql.fetchCategory(req.params.catId, (err, rows) => {
    console.log(rows);
    res.json(rows);
  })
});

router.get('/category/:catId/children', function(req, res, next) {
  let categories = sql.fetchCategoryChildren(req.params.catId, (err, rows) => {
    console.log(rows);
    res.json(rows);
  })
});

router.get('/category/:catId/pages', function(req, res, next) {
  let categories = sql.fetchCategoryPages(req.params.catId, (err, rows) => {
    console.log(rows);
    res.json(rows);
  })
});

router.post('/cdx', function(req, res, next) {
  // console.log("CDX: ", req.body.url)
  request('http://localhost:8080/bookmarks-archive/cdx?url='+req.body.url+"&limit=1",
  (cdxErr, cdxRes, cdxBody) => {
    // console.log("RES: ", req.body.url, typeof(cdxBody))
    res.send(cdxBody)
  }
  )
});

router.get('/delete/category/:catId', function(req, res, next) {
  let categories = sql.deleteCategory(req.params.catId, (err) => {
    console.log(err);
    if (err === null) {
      res.sendStatus(200)
    } else {
      res.json(err)
    }
  })
});

router.get('/delete/page/:id', function(req, res, next) {
  let categories = sql.deletePage(req.params.id, (err, rows) => {
    console.log(rows);
    res.json(rows);
  })
});

router.post('/create/category', function(req, res, next) {
  let categories = sql.createNewCategory(req.body.name, req.body.desc, req.body.pid, (err, changes) => {
    console.log(err, changes);
    res.json(changes);
  })
});

router.post('/create/page', function(req, res, next) {
  // console.log(req.body)
  request(req.body.url,
  (reqErr, reqRes, reqBody) => {
    if (reqErr) {
      res.status(500).send(reqErr)
      return
    }
    const $ = cheerio.load(reqBody);
    const pageTitle = $("title").text();
    console.log("Page title: ", pageTitle)
    let categories = sql.createNewPage(req.body.url, pageTitle, req.body.desc, req.body.pid, (err, changes) => {
      // console.log("SQL error: ", err);
      // console.log("SQL changes: ", changes)
      if (err) {
        res.status(500).send(err)
        return
      }
      res.json(changes);
    })
  })
});

module.exports = router;
