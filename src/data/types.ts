export type DiagramKind =
  | 'vm-vs-container'
  | 'architecture'
  | 'image-layers'
  | 'lifecycle'
  | 'port-mapping'
  | 'build-cache'
  | 'multistage'
  | 'volumes'
  | 'networks'
  | 'compose'
  | 'registry'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; title?: string; lang?: string; code: string }
  | { type: 'callout'; tone?: 'info' | 'warn' | 'tip'; title: string; text: string }
  | { type: 'compare'; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'teach'; title?: string; text: string }
  | { type: 'ask'; q: string; a: string; why?: string }
  | { type: 'senior'; q: string; answerAr: string; sayEn: string; followUp?: string }
  | { type: 'terms'; items: { en: string; ar: string; meaning: string }[] }
  | { type: 'diagram'; kind: DiagramKind; caption?: string }
  | {
      /**
       * كارت "ديتيلز الديتيلز": كل معلومة بتتفكّك لسبع زوايا ثابتة
       * عشان المتعلّم يعرف الفايدة والاستخدام مش التعريف بس.
       */
      type: 'deep'
      term: string
      en?: string
      what: string
      why: string
      how: string
      use: string
      withWhat: string
      example?: { title?: string; lang?: string; code: string }
      gotcha?: string
    }
  | { type: 'resources'; items: { title: string; url: string; note: string; kind: string }[] }

export type Section = {
  id: string
  nav: string
  title: string
  lead: string
  blocks: Block[]
}
