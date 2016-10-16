var mongoose = require('mongoose');
var AssetModel = require('../models/AssetModel');
var fse = require('fs-extra');
var _ = require('lodash');

var Assets = {

    //createOne, getAll, getOne, deleteOne, updateOne
    createOne: function (inputJson, res) { //don't expose this directly to a post route

        var item = new AssetModel();
        /*
         filename: {type:String, required: true},
         filetype: {type:String, required: true},
         unique_filename: {type: String, required: true},
         path: {type: String, required: true}, //e.g. /assets/abcd.jpg
         full_url: {type: String, required: true}, //e.g. http://imgur.com/xyz/abcd.jpg, could be external, not necessarily uploaded to server
         description: {type: String},
         created_by: {type: Schema.Types.ObjectId, ref: 'User'}
         */
        item.schema.eachPath(function(path) {
            if (_.has(inputJson, path)){
                _.set(item, path, _.get(inputJson, path));
            }
        });

        item.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({ success: false, message: 'Failed to create asset.'});
            }
            res.status(201).json({ success: true, message: 'asset db record created' });
        });
    },

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'orig_filename',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

        AssetModel.find().limit(limit_doc).skip(skip_doc).sort(order + order_by).exec(function (err, items) {
            if (err) res.send(err);
            res.json(items);
        });

    },

    getOne: function (req, res) {
        AssetModel.findById(req.params.asset_id, function (err, item) {
            if (err) res.send(err);
            res.json(item);
        });
    },

    updateOne: function (req, res) {
        AssetModel.findById(req.params.asset_id, function (err, item) {
            if (err) res.send(err);

            AssetModel.schema.eachPath(function(path) {
                if (_.has(req.body, path)){
                    _.set(item, path, _.get(req.body, path));
                }
             });

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "asset db record updated"});
            });

        });
    },

    deleteOne: function (req, res) {
        AssetModel.findOneAndRemove({
            _id: req.params.asset_id
        }, function (err, item) {
            if (err) {res.send(err);}
            else {
                //console.log(item);
                //console.log('');
                fse.remove('./' + item.path, function(err){
                    if (err) {res.send(err);}
                    else {
                        res.json({message: "asset db record and file deleted"});
                    }
                });
            }

        });
    },

    deleteAll: function(req,res) {
        AssetModel.remove({}, function (err, item) {
            if (err) {res.send(err);}
            else {
                fse.emptyDir(__dirname + '/public/assets', function(err){
                    if (err) {res.send(err);}
                    else {
                        res.json({message: "All asset db records and files deleted"});
                    }
                });
            }
        });
    }

};

module.exports = Assets;
