import { defineField, defineType } from 'sanity'
import { ImNewspaper } from 'react-icons/im'

export default defineType({
	name: 'projects-frontpage',
	title: 'Projects frontpage',
	icon: ImNewspaper,
	type: 'object',
	fields: [
		defineField({
			name: 'mainProject',
			description: 'Choose which project to display as the main project',
			type: 'string',
			options: {
				list: [
					{ title: 'Most recent project', value: 'recent' },
					{ title: 'Featured project', value: 'featured' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'showFeaturedProjectsFirst',
			description: 'In the list below the main project',
			type: 'boolean',
			initialValue: true,
		}),
		defineField({
			name: 'itemsPerPage',
			type: 'number',
			initialValue: 6,
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			mainProject: 'mainProject',
		},
		prepare: ({ mainProject }) => ({
			title: 'Projects frontpage',
			subtitle: `Main project: ${mainProject}`,
		}),
	},
})
