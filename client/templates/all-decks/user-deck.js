Template.userDeckDetail.helpers({
	totalCost: function() {
		var cost = _.reduce(Cards.find({ deckId : this._id }).fetch(), function(memo, card) { return memo + (card.cost * card.amount) }, 0);
		return formatMoney(cost);
	},
})