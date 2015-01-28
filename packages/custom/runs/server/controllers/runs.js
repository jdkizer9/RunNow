'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Run = mongoose.model('Run'),
  _ = require('lodash');


/**
 * Find run by id
 */
exports.run = function(req, res, next, id) {
  Run.load(id, function(err, run) {
    if (err) return next(err);
    if (!run) return next(new Error('Failed to load run ' + id));
    req.run = run;
    next();
  });
};

/**
 * Create a run
 */
exports.create = function(req, res) {
  var run = new Run(req.body);
  run.user = req.user;

  run.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the run'
      });
    }
    res.json(run);

  });
};

/**
 * Update a run
 */
exports.update = function(req, res) {
  var run = req.run;

  run = _.extend(run, req.body);

  run.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the run'
      });
    }
    res.json(run);

  });
};

/**
 * Delete an run
 */
exports.destroy = function(req, res) {
  var run = req.run;

  run.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the run'
      });
    }
    res.json(run);

  });
};

/**
 * Show an run
 */
exports.show = function(req, res) {
  res.json(req.run);
};

/**
 * List of Runs
 */
exports.all = function(req, res) {
  Run.find().sort('-created').populate('user', 'name username').exec(function(err, runs) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the runs'
      });
    }
    res.json(runs);

  });
};
