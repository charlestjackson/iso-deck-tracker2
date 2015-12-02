Template.cardRow.helpers({ 
	editMode: function() {
		return Session.get('deckEditMode') === true;
	},
	
	editRow: function() {
		return Session.get('edit-card-' + this._id);
	}
});

Template.cardRow.events({ 
	'click .actions .add' : function(e) {
		Cards.update({ _id: this._id }, { $inc : { amount: 1 }});
	},
	
	'click .actions .subtract' : function(e) {
		Cards.update({ _id: this._id }, { $inc : { amount: -1 }});
	},
	
	'click .actions .remove' : function(e) {
		Cards.remove({ _id: this._id });
	},
	
	'mouseenter .card-amount, mouseenter .card-name, mouseenter .card-cost'  : function(e) {
		$(e.target).parent().addClass('active');
		$(e.target).siblings('.actions').removeClass('hidden');
	},
	
	'mouseleave .card-row' : function(e) {
		$(e.target).removeClass('active');
		$(e.target).children('.actions').addClass('hidden');
		$(e.target).children('span').removeClass('active');
	},
	
	'click .edit-card' : function(e) {
		Session.set('edit-card-' + this._id, true);
	},
	
	'click .cancel' : function(e) {
		Session.set('edit-card-' + this._id, false);
	},
	
	'click .save' : function(e) {
		var block = $(e.target).parent().parent().parent();
		var name = block.find('[name="card-name"]').val();
		var cost = block.find('[name="card-cost"]').val();
		
		cost = parseFloat(cost.replace('$', ''));
		
		Cards.update({ _id: this._id }, { $set: { name: name, cost: cost }});
		
		Session.set('edit-card-' + this._id, false);
	}
});