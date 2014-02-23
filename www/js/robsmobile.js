( RobsMobile = function() {
	var started = false,
		viewCounter = 0,
		views = {};

	function renderView(viewName, state, movingBack) {
		var view = null;

		// get the new view
		if (views[viewName] !== undefined) {
			view = views[viewName](state);
		} else {
			view = $('<div/>').append($('#' + viewName).html());
		}

		slideIn(view, movingBack);

		// setup navigation for the new view
		view.on('click', '[data-nav]', function() {
			navigate($(this).data('nav'));
		});

		$('.backArrow').on('click', function() {
			window.history.back();
		});
	}

	function slideIn(view, movingBack) {
		// find the current view
		var viewContainer = $('#view-container');
		var currentView = viewContainer.find('div');

		// figure out the direction
		var newViewClass = 'off-left',
			oldViewClass = 'off-right';

		if (movingBack) {
			newViewClass = 'off-right',
			oldViewClass = 'off-left';
		}

		// remove the old view when it's done transitioning
		currentView.on('transitionend webkitTransitionEnd MSTransitionEnd', function() {
			currentView.remove();
		});

		// move in the new view
		view.addClass(newViewClass);
		viewContainer.append(view);
		window.getComputedStyle(view[0])['-webkit-transform'];
		window.getComputedStyle(view[0])['transform'];

		// move out the old view
		currentView.addClass(oldViewClass);
		view.removeClass(newViewClass);
	}

	function addView(name, renderFcn) {
		views[name] = renderFcn;
	};

	function navigate(name, state) {
		if (!started) {
			window.location.hash = "";

			// start responding to hash change
			$(window).on('hashchange', function() {
				var hash = window.location.hash.split('#')[1];

				hash = JSON.parse(decodeURIComponent(hash));

				renderView(hash.name, hash.state, viewCounter < hash.count);
				viewCounter = hash.count;
			});

			started = true;
		}

		var route = {
			name: name,
			state: state,
			count: viewCounter + 1
		};

		route = encodeURIComponent(JSON.stringify(route));

		window.location.hash = route;
	};

	return {
		View: addView,
		Navigate: navigate
	};
}());
