import { defineField, defineType } from 'sanity'
import { VscTag } from 'react-icons/vsc'

export default defineType({
	name: 'projects.category',
	title: 'Projects category',
	type: 'document',
	icon: VscTag,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
			validation: (Rule) => Rule.required(),
		}),
	],
})
