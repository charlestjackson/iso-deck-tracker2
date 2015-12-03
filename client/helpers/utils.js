Template.registerHelper('formatMoney', function(n) {
	return formatMoney(n);
});

Template.registerHelper('hasUser', function() {
	return Meteor.user != null;
});

Template.registerHelper('userHasDeck', function() {
	return Decks.find({ "userId" : Meteor.userId() }).count() > 0;
});

Template.registerHelper('cardLink', function() {
	var root = 'https://deckbox.org/mtg/';
	var cname = this.name.replace(/ /g, '%20');
	return root + cname;
});

var user = function() {
	return Meteor.users.findOne();
};

formatMoney = function(n) {
	if (n === undefined)
		return "$0.00";
	
	return "$" + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

isNumeric = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}