import { stegaClean } from 'next-sanity'

export default function (
	page?: Sanity.PageBase,
	{
		base = true,
		params,
	}: {
		base?: boolean
		params?: string
	} = {},
) {
	const slug = page?.metadata?.slug?.current
	const path = slug === 'index' ? null : slug
	
	let segment = null;

	if (page?._type === 'blog.post') {
		segment = page?._type === 'blog.post' ? 'blog' : null
	}
	if (page?._type === 'projects.project') {
		segment = page?._type === 'projects.project' ? 'projects' : null
	}


	return (
		(base ? process.env.NEXT_PUBLIC_BASE_URL + '/' : '/') +
		[segment, path, stegaClean(params)].filter(Boolean).join('/')
	)
}
