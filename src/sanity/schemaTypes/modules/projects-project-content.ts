import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'

export default defineType({
	name: 'projects-project-content',
	title: 'Project content',
	icon: VscEdit,
	type: 'object',
	fields: [
		defineField({
			name: 'options',
			type: 'module-options',
		}),
	],
	preview: {
		select: {
			uid: 'options.uid',
		},
		prepare: ({ uid }) => ({
			title: 'Project content',
			subtitle: uid && `#${uid}`,
		}),
	},
})
