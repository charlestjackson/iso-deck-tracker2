Template.preconDetail.events({ 
	'click .set-deck' : function(e) {
		e.preventDefault();
		
		Meteor.call('copyDeck', this._id, Meteor.users.findOne()._id);
	}
});