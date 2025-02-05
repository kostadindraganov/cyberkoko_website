import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from '@/sanity/lib/env'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineCliConfig({
	api: {
		projectId,
		dataset,
	},
	vite: {
    plugins: [tsconfigPaths()],
  },
})
