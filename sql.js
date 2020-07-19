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

sql.createNewPage = function (url, title, desc, category, callback) {
  db.serialize(function () {
    db.run('INSERT INTO pages '+
    '(url, title, description, category)'+
    ' VALUES (?, ?, ?, ?)',
  url, title, desc, category,
  function (err) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Num rows changed: ", this.changes);
    }
    callback(err, this.changes);
  });
  });
};

sql.deletePage = function (id, callback) {
  db.serialize(function () {
    db.run('DELETE FROM pages WHERE id = ?',
    id,
    function (err) {
      console.log("SQL errors: ", err);
      if (err === null) {
        console.log("Num rows changed: ", this.changes);
      }
      callback(err, id, this.changes);
    });
  });
};

sql.deleteCategory = function (id, callback) {
  db.serialize(function () {
    db.get('SELECT * FROM categories WHERE id = ?', id,
    function (err, row) {
      console.log("SQL errors: ", err);
      if (err === null) {
        console.log("Category to delete: ", row);
        db.run('UPDATE pages SET category = ? WHERE category = ?', row.parent_id, id,
        function (err, row) {
          console.log("SQL errors: ", err);
          if (err === null) {
            console.log("Moved pages: ", row);
            console.log("rows updated: ", this.changes)
            db.run('DELETE FROM categories WHERE id = ?', id,
            function (err) {
              console.log("SQL errors: ", err);
              if (err === null) {
                console.log("Num rows changed: ", this.changes);
              }
              callback(err);
            });
          } else {
            console.log("update err: ", err)
            callback(err);
            return
          }
        });
      } else {
        callback(err);
        return
      }
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

sql.createNewCategory = function (name, description, parent_id, callback) {
  db.serialize(function () {
    db.run('INSERT INTO categories '+
    '(name, description, parent_id)'+
    ' VALUES (?, ?, ?)',
  name, description, parent_id,
  function (err) {
    console.log("SQL errors: ", err);
    if (err === null) {
      console.log("Num rows changed: ", this.changes);
    }
    callback(err, this.changes);
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

module.exports = sql;
