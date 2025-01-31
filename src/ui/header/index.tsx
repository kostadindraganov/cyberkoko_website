import { getSite } from '@/sanity/lib/queries'
import Wrapper from './Wrapper'
import Link from 'next/link'
import Img from '@/ui/Img'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import AudioToggle from "./AudioToggle";
import { cn } from '@/lib/utils'

export default async function Header() {
	const { title, logo, ctas } = await getSite()

	const logoImage = logo?.image?.dark || logo?.image?.default

	return (
		<Wrapper>
				<div className="flex items-center gap-7">
					<Link
						className={cn('h4 md:h3 inline-block', logo?.image && 'max-w-3xs')}
						href="/"
					>
						{logoImage ? (
							<Img
								className="inline-block max-h-[1.2em] w-auto"
								image={logoImage}
								alt={logo?.name || title}
							/>
						) : (
							<span className="text-gradient">{title}</span>
						)}
					</Link>

				<CTAList
						ctas={ctas}
						className="max-md:header-closed:hidden [grid-area:ctas] max-md:*:w-full md:ml-auto"
					/>
				</div>

				
				<div className="flex h-full items-center">
					<div className=" md:block">
					<Navigation />
					</div>

					<AudioToggle />
					
				</div>
		</Wrapper>
	)
}
