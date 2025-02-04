import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import processUrl from '@/lib/processUrl'
import { Feed } from 'feed'
import { escapeHTML, toHTML } from '@portabletext/to-html'
import { urlFor } from '@/sanity/lib/image'

export async function GET() {
	const { projects, project, copyright } = await fetchSanity<{
		projects: Sanity.Page
		project: Array<Sanity.ProjectsProject & { image?: string }>
		copyright: string
	}>({
		query: groq`{
			'projects': *[_type == 'page' && metadata.slug.current == 'projects'][0]{
				_type,
				title,
				metadata,
				'image': metadata.image.asset->url
			},
			'project': *[_type == 'projects.project']{
				_type,
				body,
				publishDate,
				authors[]->,
				metadata,
				'image': metadata.image.asset->url
			},
			'copyright': pt::text(*[_type == 'site'][0].copyright)
		}`,
	})

	if (!projects || !project) {
		return new Response(
			'Missing either a projects page or project in Sanity Studio',
			{ status: 500 },
		)
	}

	const url = processUrl(projects)

	const feed = new Feed({
		title: projects?.title || projects.metadata.title,
		description: projects.metadata.description,
		link: url,
		id: url,
		copyright,
		favicon: process.env.NEXT_PUBLIC_BASE_URL + '/favicon.ico',
		language: 'en',
		generator: 'https://sanitypress.dev',
	})

	project.map((project) =>
		feed.addItem({
			title: escapeHTML(project.metadata.title),
			description: project.metadata.description,
			id: processUrl(project),
			link: processUrl(project),
			published: new Date(project.publishDate),
			date: new Date(project.publishDate),
			author: project.authors?.map((author) => ({ name: author.name })),
			content: toHTML(project.body, {
				components: {
					types: {
						image: ({ value: { alt = '', caption, source, ...value } }) => {
							const img = `<img src="${urlFor(value).url()}" alt="${escapeHTML(alt)}" />`
							const figcaption =
								caption && `<figcaption>${escapeHTML(caption)}</figcaption>`
							const aSource = source && `<a href="${source}">(Source)</a>`

							return `<figure>${[img, figcaption, aSource].filter(Boolean).join(' ')}</figure>`
						},
						code: ({ value }) =>
							`<pre><code>${escapeHTML(value.code)}</code></pre>`,
					},
				},
			}),
			image: project.image,
		}),
	)

	return new Response(feed.atom1(), {
		headers: {
			'Content-Type': 'application/atom+xml',
		},
	})
}
