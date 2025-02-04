export default function ({
	_type,
	internal,
	params,
	external,
}: {
	// internal
	_type?: string
	internal?: string
	params?: string
	// external
	external?: string
}) {
	if (external) return external

	if (internal) {
		let segment = '/';
		if (_type === 'blog.post') {
			segment = '/blog/';
		} 
		if (_type === 'projects.project') {
			segment = '/projects/';
		}
		const path = internal === 'index' ? null : internal

		return [segment, path, params].filter(Boolean).join('')
	}

	return undefined
}
