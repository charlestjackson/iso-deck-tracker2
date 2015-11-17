Template.deckDetail.helpers({
	creatures: function() {
		return Cards.find({ deckId: this._id, type: CREATURE_TYPE, amount: { $gt : 0 } }, { sort: { 'name' : 1 }});
	},
	
	instants: function() {
		return Cards.find({ deckId: this._id, type: INSTANT_TYPE, amount: { $gt : 0 } }, { sort: { 'name' : 1 }});
	},
	
	sorceries: function() {
		return Cards.find({ deckId: this._id, type: SORCERY_TYPE, amount: { $gt : 0 } }, { sort: { 'name' : 1 }});
	},
	
	artifacts: function() {
		return Cards.find({ deckId: this._id, type: ARTIFACT_TYPE, amount: { $gt : 0 } }, { sort: { 'name' : 1 }});
	},
	
	enchantments: function() {
		return Cards.find({ deckId: this._id, type: ENCHANTMENT_TYPE, amount: { $gt : 0 } }, { sort: { 'name' : 1 }});
	},
	
	planeswalkers: function() {
		return Cards.find({ deckId: this._id, type: PLANESWALKER_TYPE, amount: { $gt : 0 } }, { sort: { 'name' : 1 }});
	},
	
	land: function() {
		return Cards.find({ deckId: this._id, type: LAND_TYPE, amount: { $gt : 0 } }, { sort: { 'name' : 1 }});
	},
	
	cardCount: function(cur) {
		return _.reduce(cur.fetch(), function(memo, card) { return memo + card.amount; }, 0);
	}
});