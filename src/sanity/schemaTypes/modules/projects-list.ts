import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { getBlockText } from '@/sanity/lib/utils'

export default defineType({
	name: 'projects-list',
	title: 'Projects list',
	icon: VscEdit,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'filtering' },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: ['grid', 'carousel'],
				layout: 'radio',
			},
			initialValue: 'carousel',
			group: 'options',
		}),
		defineField({
			name: 'showFeaturedProjectFirst',
			type: 'boolean',
			initialValue: true,
			group: 'filtering',
		}),
		defineField({
			name: 'displayFilters',
			title: 'Display category filter buttons',
			description: 'Allows for on-page filtering of projects by category',
			type: 'boolean',
			initialValue: false,
			group: 'filtering',
			hidden: ({ parent }) => !!parent.filteredCategory,
		}),
		defineField({
			name: 'limit',
			title: 'Number of projects to show',
			description: 'Leave empty to show all projects',
			type: 'number',
			initialValue: 6,
			validation: (Rule) => Rule.min(1).integer(),
			group: 'filtering',
		}),
		defineField({
			name: 'filteredCategory',
			title: 'Filter projects by a category',
			description: 'Leave empty to show all projects',
			type: 'reference',
			to: [{ type: 'projects.category' }],
			group: 'filtering',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Projects list',
		}),
	},
})
