/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');
var request = require('request');
var _ = require('lodash');
var GoogleSpreadsheet = require("google-spreadsheet");
//var google = require('googleapis');
var GoogleSpreadsheet = require("google-spreadsheet");
// Get list of things
exports.index = function (req, res) {
    var sheetObj;
    Thing.find(function (err, things) {
        if (err) {
            return handleError(res, err);
        }
        var my_sheet = new GoogleSpreadsheet('1lmdLJyLBVziGAbP3pBY1bMX8pIkm-c-lnaWWOQibtLw');
        var creds = {
            client_email: '1022286249425-amrj04t251ob1mshb1gdoiuikulat6u3@developer.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGJ9xiQmd4MAz0\nrUbXPfp0fDGHJsIiNNeedHF1+I6qIzeFsYEuFzHUXJ+vTFYqtZS2xSjF0ItWRRJg\nwYCcXQ7QsHzAsXCKTJbPkg9x0RJdg7VzR1K9/15kFWmDrdrvn1N9FqLkcv9Uwo4K\nbggYoBCHtB/KSAwMewdpCEAoz28rLL6RjoW6wxCdfudON8iqUmY/ObnDhNv79IUW\nfcbGtKcGz8fA96HSyE3ejUai04wFhJPrxA+YVuPZCqS1+KgL0S4B+xNN3XkU4crU\n8Vnl3NIiXK12EgaZGQXNnsQZwOw7C57W4+rssh4qEmARRGfK7r1ttb9zIZEGkN1L\nb1p/0Y25AgMBAAECggEAUYux3BXrssBDdKWiU43D9g/t6ep/VchdO248Cwpg249m\nl/Q2bxtIfFYpuOA3TZgwPQ7h+pYZ4UTHjV3UaYS6RhN7I2liIOfn4EABbxtU7Xr4\nPxqI6HuhApr1MyVmxdnRZ9ba7hyNCvqNrakeV9P3OYFc28fOfYxbvlOQ47qJy0AC\n0LFIJxMmz/J6mIrdc1BiK6iFG8j7RBpGbafrTNEmi/BSU959GzbsuKyRK2fH6TCL\nU1rJ0P64roIcWYs19xqthdrgOSN7+KHhzIPk7A9dID7NEJFJ6C0eiRb+zzOwae/+\nzp1BpS66qN/eZlF7fhKjWBV0S1GJXEsXg2uKW3tNyQKBgQDxgtyOG+SZceYlbzMf\nTrQT7ff2rqpLryd8Of55viuW44SJM+5klVapuqJpVsO0KL7ZPzBXQOPe2FGCxPu1\nCPsU8ZXznu4LbBOnYobSZRqYDsgz/A5XGL7CDHz22Ox7TzykaOqPfkchrHiq0Xou\nEN+fqx78rVIHNWFuTuymEC+kFwKBgQDSCyTtO6CAq77t2PeoVL9vRIfwVih22eA0\nFrL3aIO3L+3XGuCQ7K95DOCnCntgGgxwnkfss6F6AkW4aYp/wYGOUtECaOfmb1Kp\nfVW6Zk+qcmMVpTzcbDhB6TY6xThNBpwwVqk5FcJB60kIXA7uOz6LQNgjaccQpL1D\n6ByXecXurwKBgQCCWJmHDWDcvE91hsW1sPmaBAafmfeJb5hFANvqgwvtnRAMKP4S\nRVOHuZYsekqXsqIGiIcjoH8b5+5eQMiFFbrFu/mtiep6ObOF1LRlW3H1/YxqGjD3\nKwDRpIHRjJRdnQ9iwMlP9tyXPQnHT9W8hRjciTPpNfYes93I9knc+sFrswKBgQC0\n9I7qpv0e/VevN8YdSm3moUbwInoX8pq6pXenuG4Jiww/zlL76D1Ab3y3zEsAP1DK\nUUKrxRHvuDdyqdJ9QCuqfuS8S77GAtBXXrhVr0EhGg0NH98wEzfgaNekiDZ5/aDf\n8Dk4CeviuJ6hyhW+3mGCvOm4kK/EQfkgoL7JLUr91wKBgQDqFnPVjK1NcG7dn1fn\n0NTuRYJZ093YLBzVbFYRtDZj7oLcXsxFBQgeiYZIl2FujwczMo71wl3yajwuTvxQ\nvjOkSs3mfx24BMEx74t9IFDgzJ5XOZydfnbCrdQknmqVCwY7+H2XPt4nALTeSMMW\npnRDPKFb29CssLiNhmjBKC1yfg\u003d\u003d\n-----END PRIVATE KEY-----\n'
        }
        my_sheet.useServiceAccountAuth(creds, function (err) {
            // getInfo returns info about the sheet and an array or "worksheet" objects
            my_sheet.getInfo(function (err, sheet_info) {
                console.log(sheet_info.title + ' is loaded');
                // use worksheet object if you want to stop using the # in your calls
                var sheet1 = sheet_info.worksheets[0];
                sheet1.getRows(function (err, rows) {
                    var sheetObj;
                    sheetObj = rows;
                   // console.log(sheetObj);
                    res.send(sheetObj);
                });
            });
        })
    });
};

// Get a single thing
exports.show = function (req, res) {
    Thing.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        return res.json(thing);
    });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
    Thing.create(req.body, function (err, thing) {

        if (err) {
            return handleError(res, err);
        }
        return res.json(201, sheetObj);
    });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Thing.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        var updated = _.merge(thing, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, thing);
        });
    });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
    Thing.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        thing.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}