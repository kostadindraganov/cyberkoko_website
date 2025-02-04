export default function (
	projects: Sanity.ProjectsProject[],
	showFeaturedProjectsFirst: boolean = true,
) {
	if (showFeaturedProjectsFirst)
		return projects.sort((a, b) => (b.featured ? 1 : -1) - (a.featured ? 1 : -1))

	return projects
}
