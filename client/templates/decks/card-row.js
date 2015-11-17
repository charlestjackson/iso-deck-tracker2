Template.cardRow.helpers({ 
	editMode: function() {
		return Session.get('deckEditMode') === true;
	}
});

Template.deckDetail.events({ 
	'click .actions .add' : function(e) {
		Cards.update({ _id: this._id }, { $inc : { amount: 1 }});
	},
	
	'click .actions .subtract' : function(e) {
		Cards.update({ _id: this._id }, { $inc : { amount: -1 }});
	}
});