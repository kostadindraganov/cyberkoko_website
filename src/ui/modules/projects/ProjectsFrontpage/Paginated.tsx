'use client'

import { usePagination } from '@/lib/usePagination'
import List, { filterProjects } from '../ProjectsList/List'

export default function Paginated({
	projects,
	itemsPerPage = 6,
}: {
	projects: Sanity.ProjectsProject[]
	itemsPerPage?: number
}) {
	const { paginatedItems, Pagination } = usePagination({
		items: filterProjects(projects),
		itemsPerPage,
	})

	function scrollToList() {
		if (typeof window !== 'undefined')
			document
				.querySelector('#projects-list')
				?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<div className="relative space-y-12">
			<List
				id="blog-list"
				projects={paginatedItems}
				className="grid scroll-mt-[calc(var(--header-height)+1rem)] gap-x-8 gap-y-12 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
			/>

			<Pagination
				className="frosted-glass sticky bottom-0 flex items-center justify-center gap-4 bg-canvas p-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] tabular-nums"
				buttonClassName="hover:underline disabled:opacity-20"
				onClick={scrollToList}
			/>
		</div>
	)
}
