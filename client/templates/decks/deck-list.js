Template.deckList.rendered = function() {
	//setTimeout(Meteor.typeahead.inject, 1000);
};

Template.deckList.helpers({ 
	hasDeck: function() {
		return this.deck != null;
	},
	
	totalCost: function() {
		var cost = _.reduce(Cards.find({ deckId : this.deck._id }).fetch(), function(memo, card) { return memo + (card.cost * card.amount) }, 0);
		return formatMoney(cost);
	},
	
	availableCards: function() {
		return Cards.find({ deckId: this.deck._id, amount: { $lte : 0 } }, { sort: { 'name' : 1 }});
	},
	
	cardCount: function() {
		var num = _.reduce(Cards.find({ deckId : this.deck._id }).fetch(), function(memo, card) { return memo + card.amount }, 0);
		return num;
	},
	
	cardAuto: function(query, sync, callback) {
		$.get('https://api.deckbrew.com/mtg/cards/typeahead?q=' + query, function(data) {
			var names = _.map(data, function(it) { return { value: it.name, type: it.types[0] }; });
			callback(names);
		})
	},
	
	cardSelected: function(event, card) {
		var type = card.type.substring(0, 1).toUpperCase() + card.type.substring(1);
		$("#newCardType").val(type);
	}
});

Template.deckList.events({
	'click .remove-deck' : function(e) {
		Meteor.call('removeDeck', this._id);
	},
	
	'submit form' : function(e) {
		e.preventDefault();
		
		var nameInp = $(e.target).find('#newCardName'); 
		var name = nameInp.val();
		if (!name) {
			nameInp.parent().addClass('has-error');
			return;
		} else {
			nameInp.parent().removeClass('has-error');
		}
		
		var costInp = $(e.target).find('#newCardCost');
		var cost = parseFloat(costInp.val());
		if (!cost) {
			costInp.parent().addClass('has-error');
			return;
		} else {
			costInp.parent().removeClass('has-error');
		}
		
		var typeInp = $(e.target).find('#newCardType');
		var type = typeInp.val();
		if (!type) {
			typeInp.parent().addClass('has-error');
			return;
		} else {
			typeInp.parent().removeClass('has-error');
		}
		
		var card = {
			deckId: this.deck._id,
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
		Cards.update({ _id: this.deck._id }, { $inc : { amount: 1 }});
	},
	
	'click .available-cards .actions .subtract' : function(e) {
		Cards.update({ _id: this.deck._id }, { $inc : { amount: -1 }});
	}
})