import type { Block, Section } from './types'
import { basicSections } from './sections-basics'
import { advancedSections } from './sections-advanced'

export type { Block, Section }

export const sections: Section[] = [...basicSections, ...advancedSections]
