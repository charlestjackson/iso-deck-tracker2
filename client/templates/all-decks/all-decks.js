Template.allDecks.helpers({
	allDecks: function() {
		return Decks.find();
	},
	
	userEmail: function() {
		return Session.get('userDeckEmail');
	}
})