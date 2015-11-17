Meteor.publish('precons', function() {
	return Precons.find();
})

Meteor.publish('decks', function() {
	return Decks.find();
})

Meteor.publish('cards', function() {
	return Cards.find();
})