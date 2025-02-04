import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import Img from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'

export default function ProjectPreviewLarge({ projects }: { projects: Sanity.ProjectsProject }) {
	if (!projects) return null

	return (
		<Link
			className="group grid items-center gap-x-8 gap-y-4 md:grid-cols-2"
			href={processUrl(projects, { base: false })}
		>
			<figure className="max-md:full-bleed bg-ink/5 relative aspect-video overflow-hidden md:self-start">
				<Img
					className="aspect-video w-full object-cover transition-all group-hover:scale-105 group-hover:brightness-110"
					image={projects.metadata.image}
					width={800}
					alt={projects.metadata.title}
					loading="eager"
				/>

				{projects.featured && (
					<span className="action absolute top-0 right-4 rounded-t-none py-1 text-xs shadow-md">
						Featured
					</span>
				)}
			</figure>

			<div className="mx-auto max-w-lg space-y-4">
				<h2 className="h2 md:h1 group-hover:underline">
					{projects.metadata.title}
				</h2>

				<p className="line-clamp-4 max-md:text-sm">
					{projects.metadata.description}
				</p>

				<div className="flex flex-wrap gap-x-4">
					<Date value={projects.publishDate} />
					<Categories
						className="flex flex-wrap gap-x-2"
						categories={projects.categories}
					/>
				</div>

				{projects.authors?.length && (
					<Authors
						className="flex flex-wrap items-center gap-4"
						authors={projects.authors}
					/>
				)}
			</div>
		</Link>
	)
}
