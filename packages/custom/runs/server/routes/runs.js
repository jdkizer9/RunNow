'use strict';

var runs = require('../controllers/runs');


var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Runs, app, auth) {

  app.route('/runs')
    .get(runs.all)
    .post(auth.requiresLogin, runs.create);
  app.route('/runs/:runId')
    .get(auth.isMongoId, runs.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, runs.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, runs.destroy);

  // Finish with setting up the runId param
  app.param('runId', runs.run);
};

// // The Package is past automatically as first parameter
// module.exports = function(Runs, app, auth, database) {

//   app.get('/runs/example/anyone', function(req, res, next) {
//     res.send('Anyone can access this');
//   });

//   app.get('/runs/example/auth', auth.requiresLogin, function(req, res, next) {
//     res.send('Only authenticated users can access this');
//   });

//   app.get('/runs/example/admin', auth.requiresAdmin, function(req, res, next) {
//     res.send('Only users with Admin role can access this');
//   });

//   app.get('/runs/example/render', function(req, res, next) {
//     Runs.render('index', {
//       package: 'runs'
//     }, function(err, html) {
//       //Rendering a view from the Package server/views
//       res.send(html);
//     });
//   });
// };
