Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	onBeforeAction: function() {
		Session.set('deckEditMode', false);
		this.next();
	}
});

Router.route('/', { name: 'preconsList' });
Router.route('/precons/:_id', {
	name: 'preconDetail',
	data: function() { return Precons.findOne(this.params._id); }
});

Router.route('/my-deck', { 
	name: 'myDeck',
	onBeforeAction: function() {
		Session.set('deckEditMode', true);
		this.next();
	}
});

Router.route('/all-decks', {
	name: 'allDecks'
});

Router.route('/deck-detail/:_id', {
	name: 'userDeckDetail', 
	data: function() {
		return Decks.findOne(this.params._id);
	}
})