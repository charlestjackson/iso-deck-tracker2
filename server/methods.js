Meteor.methods({ 
	
	copyDeck: function(preconId, userId) {
		var precon = Precons.findOne({ _id : preconId});
		var user = Meteor.users.findOne(userId);
		
		var deck = {
			userId: userId,
			emailAddress: user.emails[0].address
		};
		
		var newId = Decks.insert(deck);
		
		Cards.find({ deckId: preconId }).forEach(function(card) {
			Cards.insert({
				deckId: newId,
				amount: card.amount,
				name: card.name,
				cost: card.cost,
				type: card.type
			})
		});	
	},
	
	removeDeck: function(deckId) {
		Decks.remove({ _id: deckId });
		Cards.remove({ deckId: deckId });
	}
});