import { Suspense } from 'react'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import FilterList from '@/ui/modules/projects/ProjectsList/FilterList'
import ProjectsPreview from '../ProjectsPreview'
import List from './List'
import { cn } from '@/lib/utils'

export default async function BlogList({
	pretitle,
	intro,
	layout,
	limit,
	showFeaturedProjectsFirst,
	displayFilters,
	filteredCategory,
}: Partial<{
	pretitle: string
	intro: any
	layout: 'grid' | 'carousel'
	limit: number
	showFeaturedProjectsFirst: boolean
	displayFilters: boolean
	filteredCategory: Sanity.ProjectsCategory
}>) {
	const projects = await fetchSanityLive<Sanity.ProjectsProject[]>({
		query: groq`
			*[
				_type == 'projects.project'
				${!!filteredCategory ? `&& $filteredCategory in categories[]->._id` : ''}
			]|order(
				${showFeaturedProjectsFirst ? 'featured desc, ' : ''}
				publishDate desc
			)
			${limit ? `[0...${limit}]` : ''}
			{
				...,
				categories[]->,
				authors[]->
			}
		`,
		params: {
			filteredCategory: filteredCategory?._id || '',
			limit: limit ?? 0,
		},
	})

	const listClassName = cn(
		'items-stretch gap-x-8 gap-y-12',
		stegaClean(layout) === 'grid'
			? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
			: 'carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4',
	)

	return (
		<section className="section space-y-8">
			{intro && (
				<header className="richtext">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			{displayFilters && !filteredCategory && <FilterList />}

			<Suspense
				fallback={
					<ul className={listClassName}>
						{Array.from({ length: limit ?? 6 }).map((_, i) => (
							<li key={i}>
								<ProjectsPreview skeleton />
							</li>
						))}
					</ul>
				}
			>
				<List projects={projects} className={listClassName} />
			</Suspense>
		</section>
	)
}
