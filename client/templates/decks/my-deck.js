Template.myDeck.helpers({ 
	myDeck: function() {
		var currentId = Meteor.users.findOne()._id;
		return Decks.findOne({ userId:  currentId });
	},
	
	totalCost: function() {
		var cost = _.reduce(Cards.find({ deckId : this._id }).fetch(), function(memo, card) { return memo + (card.cost * card.amount) }, 0);
		return formatMoney(cost);
	},
	
	availableCards: function() {
		return Cards.find({ deckId: this._id, amount: { $lte : 0 } }, { sort: { 'name' : 1 }});
	}
});

Template.myDeck.events({
	'click .remove-deck' : function(e) {
		Meteor.call('removeDeck', this._id);
	},
	
	'submit form' : function(e) {
		e.preventDefault();
		
		var name = $(e.target).find('#newCardName').val();
		var cost = parseFloat($(e.target).find('#newCardCost').val());
		var type = $(e.target).find('#newCardType').val();
		
		var card = {
			deckId: this._id,
			name: name,
			cost: cost,
			type: type,
			amount: 1
		};
		
		Cards.insert(card);
		
		$(e.target).find('#newCardName').val('');
		$(e.target).find('#newCardCost').val('');
		$(e.target).find('#newCardType').val('');
	},
	
	'change #newCardCost': function(e) {
		var cost = $(e.target).val();
		if (!isNumeric(cost)) {
			$(e.target).parent().addClass('has-error');
			$(e.target).parents('form').find('.add-card').attr('disabled', 'disabled');
		} else {
			$(e.target).parent().removeClass('has-error');
			$(e.target).parents('form').find('.add-card').removeAttr('disabled');
		}
	},
	
	'click .available-cards .actions .add' : function(e) {
		Cards.update({ _id: this._id }, { $inc : { amount: 1 }});
	},
	
	'click .available-cards .actions .subtract' : function(e) {
		Cards.update({ _id: this._id }, { $inc : { amount: -1 }});
	}
})