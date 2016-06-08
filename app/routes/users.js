var users = {

  getAll: function(req, res) {
    res.json(fakeData);
  },

  getOne: function(req, res) {
    res.json(fakeData[req.params.id]);
  },

  create: function(req, res) {
    var input = req.body;
    fakeData.push(input); // Spoof a DB call
    res.json(input);
  },

  update: function(req, res) {
    var update = req.body;
    data[req.params.id] = update; // Spoof a DB call
    res.json(update);
  },

  delete: function(req, res) {
    data.splice(req.params.id, 1); // Spoof a DB call
    res.json(true);
  }
};

var fakeData = [{
  name: 'user 1',
  role: 'admin',
  id: '1'
}, {
  name: 'user 2',
  role: 'normal',
  id: '2'
}, {
  name: 'user 3',
  role: 'admin',
  id: '3'
}];

module.exports = users;
