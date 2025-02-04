import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import sortFeaturedProjects from './sortFeaturedProjects'
import ProjectsPreviewLarge from '../ProjectsPreviewLarge'
import FilterList from '../ProjectsList/FilterList'
import { Suspense } from 'react'
import Paginated from './Paginated'
import { stegaClean } from 'next-sanity'
import ProjectsPreview from '../ProjectsPreview'

export default async function BlogFrontpage({
	mainProject,
	showFeaturedProjectsFirst,
	itemsPerPage,
}: Partial<{
	mainProject: 'recent' | 'featured'
	showFeaturedProjectsFirst: boolean
	itemsPerPage: number
}>) {
	const projects = await fetchSanityLive<Sanity.ProjectsProject[]>({
		query: groq`*[_type == 'projects.project']|order(publishDate desc){
			_type,
			_id,
			featured,
			metadata,
			categories[]->,
			authors[]->,
			publishDate,
		}`,
	})

	const [firstProject, ...otherProjects] =
		stegaClean(mainProject) === 'featured' ? sortFeaturedProjects(projects) : projects

	return (
		<section className="section space-y-12">
			<ProjectsPreviewLarge projects={firstProject} />

			<hr />

			<FilterList />

			<Suspense
				fallback={
					<ul className="grid gap-x-8 gap-y-12 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
						{Array.from({ length: itemsPerPage ?? 6 }).map((_, i) => (
							<li key={i}>
								<ProjectsPreview skeleton />
							</li>
						))}
					</ul>
				}
			>
				<Paginated
					projects={sortFeaturedProjects(otherProjects, showFeaturedProjectsFirst)}
					itemsPerPage={itemsPerPage}
				/>
			</Suspense>
		</section>
	)
}
