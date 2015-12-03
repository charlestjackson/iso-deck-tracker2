Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	onBeforeAction: function() {
		Session.set('deckEditMode', false);
		this.next();
	}
});

Router.route('/precons/:_id', {
	name: 'preconDetail',
	template: 'deckList',
	data: function() { 
		if (this.ready()) {
			var precon = Precons.findOne(this.params._id);
		
			return {
				deck: precon,
				deckName: precon.name,
				deckEditMode: false
			}
		} else {
			return {};
		}
	},
	waitOn: function() {
		return [ Meteor.subscribe('precons'), Meteor.subscribe('cards') ];
	}
});

Router.route('/', { 
	name: 'myDeck',
	template: 'deckList',
	onBeforeAction: function() {
		Session.set('deckEditMode', true);
		this.next();
	},
	data: function() {
		if (this.ready()) {
			var deck = Decks.findOne({ userId:  Meteor.userId() });
		
			return {
				deck: deck,
				deckName: 'My Deck',
				deckEditMode: true
			};
		} else {
			return {};
		}
	},
	waitOn: function() {
		return [ Meteor.subscribe('decks'), Meteor.subscribe('cards') ];
	},
	onAfterAction: function() {
		if (this.ready()) {
			setTimeout(Meteor.typeahead.inject, 1000);
		}
	}
});

Router.route('/precons-list', {
	name: 'preconsList'
});

Router.route('/all-decks', {
	name: 'allDecks'
});

Router.route('/deck-detail/:_id', {
	name: 'userDeckDetail',
	template: 'deckList', 
	data: function() {
		if (this.ready()) {
			var deck = Decks.findOne(this.params._id);
			return {
				deck: deck,
				deckName: deck.emailAddress + '\'s Deck',
				deckEditMode: false
			}
		} else {
			return {};
		}
	},
	waitOn: function() {
		return [ Meteor.subscribe('decks'), Meteor.subscribe('cards') ];
	}
});