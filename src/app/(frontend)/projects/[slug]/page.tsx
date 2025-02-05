import { client } from '@/sanity/lib/client'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const page = await getPageTemplate()
	const projects = await getProjects(await params)

	console.log(projects);

	if (!page)
		throw Error('No `page` document with slug "projects/*" found in the Studio')

	if (!projects) notFound()

	return <Modules modules={page?.modules} page={page} projects={projects} />
}

export async function generateMetadata({ params }: Props) {
	const projects = await getProjects(await params)

	if (!projects) notFound()

	return processMetadata(projects)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[_type == 'projects.project' && defined(metadata.slug.current)].metadata.slug.current`,
	)
	return slugs.map((slug) => ({ slug }))
}

async function getProjects(params: { slug?: string }) {
	return await fetchSanityLive<Sanity.ProjectsProject>({
		query: groq`*[_type == 'projects.project' && metadata.slug.current == $slug][0]{
			...,
			body[]{
				...,
				_type == 'image' => { asset-> }
			},
			'readTime': length(string::split(pt::text(body), ' ')) / 200,
			'headings': body[style in ['h2', 'h3']]{
				style,
				'text': pt::text(@)
			},
			categories[]->,
			authors[]->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,
		params,
	})
}

async function getPageTemplate() {
	return await fetchSanityLive<Sanity.Page>({
		
		query: groq`*[_type == 'page' && metadata.slug.current == 'projects/*'][0]{
			...,
			modules[]{ ${MODULES_QUERY} },
			metadata { slug }
		}`,
		
	})
}

type Props = {
	params: Promise<{ slug?: string }>
}
