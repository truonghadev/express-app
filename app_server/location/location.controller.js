module.exports = {
  location: function(req, res) { //homeList
    res.render('locations-list', { title: 'Location' });
  },
  addReview: function(req, res) {
    res.render('location-review-form', { title: 'Add review' });
  },
  locationInfo: function(req, res){
    res.render('location-info', { title: 'Location info' });
  }
};
