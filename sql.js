//////////////////////
// SQLite functions //
//////////////////////

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./main.db');
var sql = {};

sql.getAllPages = function (callback) {
  db.serialize(function () {
    db.all('SELECT * FROM pages',
  function (err, rows) {
    console.log("SQL errors: ", err);
    if (err === null) {
      if (typeof(callback) === 'function') {
        callback(err, rows);
      }
    }
  });
  });
};

sql.createPage = function (id, url, title, desc, category, callback) {
  db.serialize(function () {
    db.run('INSERT INTO pages '+
    '(id, url, title, description, category)'+
    ' VALUES (?, ?, ?, ?, ?)',
  id, url, title, desc, category,
  function (err) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Num rows changed: ", this.changes);
    }
    callback(err, id, this.changes);
  });
  });
};

sql.createCategory = function (category, description, parent_id, callback) {
  db.serialize(function () {
    db.run('INSERT INTO categories '+
    '(id, name, description, parent_id)'+
    ' VALUES (?, ?, ?, ?)',
  category.id, category.title, description, parent_id,
  function (err) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Num rows changed: ", this.changes);
    }
    callback(err, category, this.changes);
  });
  });
};

sql.fetchCategories = function (callback) {
  // db.serialize(function () {
    db.all('SELECT * FROM categories',[],
    function (err, row) {
      if (typeof(row) === 'undefined') {
        callback(null);
      }
      //console.log("returned row: ", row);
      callback(row);
    });
  // });
};

sql.fetchCategory = function (id, callback) {
  // db.serialize(function () {
    db.get('SELECT * FROM categories WHERE id = ? LIMIT 1',
    [id],
  function (err, row) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Result: ", row);
    }
    callback(err, row);
    });
  // });
}

sql.fetchCategoryChildren = function (id, callback) {
  // db.serialize(function () {
    db.all('SELECT * FROM categories WHERE parent_id = ?',
    [id],
  function (err, rows) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Result: ", rows);
    }
    callback(err, rows);
    });
  // });
}

sql.fetchCategoryPages = function (id, callback) {
  // db.serialize(function () {
    db.all('SELECT * FROM pages WHERE category = ?',
    [id],
  function (err, rows) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Result: ", rows);
    }
    callback(err, rows);
    });
  // });
}

sql.createAccount = function (user, callback) {
  db.serialize(function () {
    db.run('INSERT INTO users (id, authMethod, givenName, familyName, accountType) VALUES (?, ?, ?, ?, ?)',
  user.id, user.authMethod, user.givenName, user.familyName, user.accountType,
  function (err) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Num rows changed: ", this.changes);
    }
    //callback(err, this.changes);
  });
  });
};

sql.login = function (user, callback) {
  db.serialize(function () {
    db.run('UPDATE users SET numLogins=?, lastLogIn=? WHERE id=?;',
  (user.numLogins+1), new Date().toString(), user.id,
  function (err) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Num rows changed: ", this.changes);
    }
    //callback(err, this.changes);
  });
  });
};

sql.fetchUser = function (id, authMethod, callback) {
  if (req.authMethod !== 'google') {
    callback(null);
  }
  if (typeof(req.user.id) !== 'string') {
    callback(null);
  }
  var googleId = req.user.id;
  //db.serialize(function () {
    console.log("Finding account for " + googleId);
    db.get('SELECT * FROM users WHERE googleId=?;', googleId,
    function (err, row) {
      if (typeof(row) === 'undefined') {
        callback(null);
      }
      //console.log("returned row: ", row);
      callback(row);
    });
  //});
};

// user = req.user
sql.fetchActiveUser = function (user, callback) {
  // Make sure req is valid
  if (user.authMethod !== 'google' && user.authMethod !== 'ldap' && user.authMethod !== 'local') {
    callback(null);
  }
  if (typeof(user.id) !== 'string') {
    callback(null);
  }
  // Check for google auth
  if (user.authMethod === 'google') {
    console.log("Finding google user for " + user.id);
    db.get('SELECT * FROM users WHERE authMethod=? AND id=?;', user.authMethod, user.id,
    function (err, row) {
      // row is undefined if user is not in DB
      callback(row);
      return;
    });
  }
};

module.exports = sql;
