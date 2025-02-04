import moduleProps from '@/lib/moduleProps'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'
import ReadTime from './ReadTime'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './ProjectsContent.module.css'

export default function ProjectContent({
	projects,
	...props
}: { projects?: Sanity.ProjectsProject } & Sanity.Module) {
	if (!projects) return null

	const showTOC = !projects.hideTableOfContents || !!projects.headings?.length

	return (
		<article {...moduleProps(props)}>
			<header className="section space-y-6 text-center">
				<h1 className="h1 text-balance">{projects.metadata.title}</h1>
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
					<Date value={projects.publishDate} />
					<Categories
						className="flex flex-wrap gap-x-2"
						categories={projects.categories}
						isLink
					/>
					<ReadTime value={projects.readTime} />
				</div>

				{projects.authors?.length && (
					<Authors
						className="flex flex-wrap items-center justify-center gap-4"
						authors={projects.authors}
					/>
				)}
			</header>

			<div
				className={cn(
					'section grid gap-8',
					showTOC && 'lg:grid-cols-[1fr_auto]',
				)}
			>
				{showTOC && (
					<aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:order-1 lg:w-3xs">
						<TableOfContents headings={projects.headings} />
					</aside>
				)}

				<Content
					value={projects.body}
					className={cn(css.body, 'grid max-w-screen-md')}
				>
					<hr />
				</Content>
			</div>
		</article>
	)
}
