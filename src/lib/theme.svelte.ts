function create_theme_state() {
	let all_themes = ['level-up', 'syntax'] as const;
	type Theme = (typeof all_themes)[number];
	let theme: Theme = $state('level-up');

	function load_state() {
		theme = localStorage.getItem('theme') as Theme;
		document.body.classList = theme;
	}

	return {
		get theme() {
			return theme;
		},
		set theme(value) {
			theme = value;
			localStorage.setItem('theme', value);
			document.body.classList = value;
		},
		load_state,
	};
}

export const theme = create_theme_state();
