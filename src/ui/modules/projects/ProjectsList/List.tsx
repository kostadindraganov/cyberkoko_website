'use client'

import ProjectsPreview from '../ProjectsPreview'
import { useCategory } from '../store'

export default function List({
	projects,
	...props
}: {
	projects: Sanity.ProjectsProject[]
} & React.ComponentProps<'ul'>) {
	const filtered = filterProjects(projects)

	if (!filtered.length) {
		return <div>No projects found...</div>
	}

	return (
		<ul {...props}>
			{filtered?.map((projects) => (
				<li className="anim-fade" key={projects._id}>
					<ProjectsPreview projects={projects} />
				</li>
			))}
		</ul>
	)
}

export function filterProjects(projects: Sanity.ProjectsProject[]) {
	const { category } = useCategory()

	return projects.filter(
		(projects) =>
			category === 'All' ||
		projects.categories?.some(({ slug }) => slug?.current === category),
	)
}
