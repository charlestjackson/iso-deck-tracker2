Meteor.startup(function() {
	$.getScript('https://deckbox.org/assets/external/tooltip.js');
});

Meteor.subscribe('precons');

Meteor.subscribe('decks');

Meteor.subscribe('cards');