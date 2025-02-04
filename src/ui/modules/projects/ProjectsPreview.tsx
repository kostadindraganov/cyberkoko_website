import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import Img from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'

export default function ProjectsPreview({
	projects,
	skeleton,
}: {
	projects?: Sanity.ProjectsProject
	skeleton?: boolean
}) {
	if (!projects && !skeleton) return null

	const Root = skeleton ? 'div' : Link

	return (
		<Root
			className="group flex h-full flex-col space-y-2"
			href={processUrl(projects, { base: false })}
		>
			<figure className="relative aspect-video overflow-hidden bg-neutral-50">
				<Img
					className="aspect-video w-full object-cover transition-all group-hover:scale-105 group-hover:brightness-110"
					image={projects?.metadata.image}
					width={700}
					alt={projects?.metadata.title}
				/>

				{projects?.featured && (
					<span className="action absolute top-0 right-4 rounded-t-none py-1 text-xs shadow-md">
						Featured
					</span>
				)}
			</figure>

			<div className="h4 empty:skeleton-2 group-hover:underline">
				{projects?.metadata.title}
			</div>

			<div className="grow">
				<p className="line-clamp-3 text-sm empty:h-[3lh]">
					{projects?.metadata.description}
				</p>
			</div>

			{(projects?.authors?.length || skeleton) && (
				<Authors
					className="flex flex-wrap items-center gap-4 text-sm"
					authors={projects?.authors}
					skeleton={skeleton}
				/>
			)}

			<hr />

			<div className="empty:skeleton flex flex-wrap gap-x-4 text-sm">
				<Date value={projects?.publishDate} />
				<Categories
					className="flex flex-wrap gap-x-2"
					categories={projects?.categories}
				/>
			</div>
		</Root>
	)
}
