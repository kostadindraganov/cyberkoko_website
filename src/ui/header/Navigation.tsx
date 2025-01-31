import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'

export default async function Menu() {
	const { headerMenu } = await getSite()

	return (
		<>
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return <CTA className="nav-hover-btn md:px-2" link={item} key={key} />

					case 'link.list':
						return <LinkList {...item} key={key} />

					default:
						return null
				}
			})}
		</>
	)
}
