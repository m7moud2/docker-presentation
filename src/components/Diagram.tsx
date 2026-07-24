import type { DiagramKind } from '../data/types'

const C = {
  deep: '#0a4d68',
  brand: '#0693e3',
  soft: '#d7effc',
  softer: '#eef7fd',
  ink: '#0f2a3a',
  muted: '#6b8494',
  line: '#b9d6e6',
  warm: '#f4a261',
  warmSoft: '#fdece0',
  good: '#2a9d8f',
  goodSoft: '#e2f4f1',
  white: '#ffffff',
}

function Box({
  x,
  y,
  w,
  h,
  fill = C.white,
  stroke = C.line,
  label,
  sub,
  labelFill = C.ink,
  dash,
  mono,
}: {
  x: number
  y: number
  w: number
  h: number
  fill?: string
  stroke?: string
  label?: string
  sub?: string
  labelFill?: string
  dash?: boolean
  mono?: boolean
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
        strokeDasharray={dash ? '5 4' : undefined}
      />
      {label && (
        <text
          x={x + w / 2}
          y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
          textAnchor="middle"
          fontSize={mono ? 12 : 13}
          fontWeight={600}
          fill={labelFill}
          fontFamily={mono ? 'JetBrains Mono, monospace' : 'inherit'}
          direction={mono ? 'ltr' : undefined}
        >
          {label}
        </text>
      )}
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize={10.5} fill={C.muted}>
          {sub}
        </text>
      )}
    </g>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  label,
  dash,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  label?: string
  dash?: boolean
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={C.brand}
        strokeWidth={1.8}
        markerEnd="url(#arrowhead)"
        strokeDasharray={dash ? '5 4' : undefined}
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 7}
          textAnchor="middle"
          fontSize={10.5}
          fill={C.brand}
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </g>
  )
}

function Title({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize={13} fontWeight={700} fill={C.deep} textAnchor="middle">
      {text}
    </text>
  )
}

function Frame({ children, viewBox }: { children: React.ReactNode; viewBox: string }) {
  return (
    <svg viewBox={viewBox} className="dg-svg" role="img">
      <defs>
        <marker id="arrowhead" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
          <polygon points="0 0, 9 3.5, 0 7" fill={C.brand} />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

function VmVsContainer() {
  return (
    <Frame viewBox="0 0 760 400">
      <Title x={190} y={22} text="Virtual Machines" />
      <Title x={570} y={22} text="Containers" />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Box x={40 + i * 105} y={40} w={95} h={40} fill={C.softer} label="App" />
          <Box x={40 + i * 105} y={84} w={95} h={34} fill={C.white} label="Libs / Deps" />
          <Box x={40 + i * 105} y={122} w={95} h={44} fill={C.warmSoft} stroke={C.warm} label="Guest OS" sub="نظام كامل" />
        </g>
      ))}
      <Box x={40} y={172} w={305} h={40} fill={C.soft} label="Hypervisor" />
      <Box x={40} y={216} w={305} h={36} fill={C.white} label="Host OS" />
      <Box x={40} y={256} w={305} h={36} fill={C.softer} label="Infrastructure (CPU / RAM / Disk)" />
      <text x={192} y={318} textAnchor="middle" fontSize={11} fill={C.muted}>
        كل VM بتحمل Guest OS كامل ← حجم بالجيجا وإقلاع بالدقايق
      </text>

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Box x={420 + i * 105} y={84} w={95} h={40} fill={C.softer} label="App" />
          <Box x={420 + i * 105} y={128} w={95} h={38} fill={C.white} label="Libs / Deps" />
        </g>
      ))}
      <Box x={420} y={172} w={305} h={40} fill={C.goodSoft} stroke={C.good} label="Docker Engine" sub="namespaces + cgroups" />
      <Box x={420} y={216} w={305} h={36} fill={C.white} label="Host OS Kernel (مُشترَك)" />
      <Box x={420} y={256} w={305} h={36} fill={C.softer} label="Infrastructure (CPU / RAM / Disk)" />
      <text x={572} y={318} textAnchor="middle" fontSize={11} fill={C.muted}>
        مفيش Guest OS ← حجم بالميجا وإقلاع بالثواني
      </text>

      <line x1={382} y1={30} x2={382} y2={300} stroke={C.line} strokeDasharray="4 5" />
      <text x={192} y={352} textAnchor="middle" fontSize={11} fill={C.deep} fontWeight={600}>
        عزل أقوى · تكلفة أعلى
      </text>
      <text x={572} y={352} textAnchor="middle" fontSize={11} fill={C.deep} fontWeight={600}>
        كثافة أعلى · سرعة أعلى
      </text>
    </Frame>
  )
}

function Architecture() {
  return (
    <Frame viewBox="0 0 760 380">
      <Box x={30} y={150} w={140} h={70} fill={C.soft} label="Docker CLI" sub="أنت بتكتب الأوامر" />
      <Arrow x1={172} y1={185} x2={250} y2={185} label="REST API" />
      <Box x={252} y={130} w={180} h={110} fill={C.white} stroke={C.brand} label="dockerd (Daemon)" sub="images · containers · net · volumes" />
      <Arrow x1={434} y1={185} x2={505} y2={185} label="gRPC" />
      <Box x={507} y={150} w={110} h={70} fill={C.softer} label="containerd" sub="lifecycle" />
      <Arrow x1={619} y1={185} x2={665} y2={185} />
      <Box x={640} y={245} w={95} h={55} fill={C.goodSoft} stroke={C.good} label="runc" sub="OCI runtime" />
      <Box x={620} y={95} w={120} h={50} fill={C.white} label="Container" sub="PID 1 process" />

      <Box x={252} y={30} w={180} h={60} fill={C.warmSoft} stroke={C.warm} label="Registry" sub="Docker Hub · GHCR · ECR" />
      <Arrow x1={342} y1={92} x2={342} y2={128} label="pull / push" />

      <Box x={30} y={270} w={200} h={70} fill={C.softer} dash label="/var/run/docker.sock" sub="قناة الاتصال المحلية" mono />
      <Arrow x1={130} y1={268} x2={130} y2={222} dash />

      <text x={380} y={365} textAnchor="middle" fontSize={11} fill={C.muted}>
        الأمر بيمشي: CLI ← dockerd ← containerd ← runc ← عملية معزولة فعليًا
      </text>
    </Frame>
  )
}

function ImageLayers() {
  const layers = [
    { label: 'FROM node:22-alpine', sub: 'الطبقة الأساسية (base)', fill: C.softer },
    { label: 'RUN npm ci', sub: 'الاعتماديات (بتتغير قليل)', fill: C.white },
    { label: 'COPY . .', sub: 'كود التطبيق (بيتغير كتير)', fill: C.white },
    { label: 'ENV / CMD', sub: 'metadata مش ملفات', fill: C.soft },
  ]
  return (
    <Frame viewBox="0 0 760 380">
      <Title x={220} y={24} text="Image = طبقات read-only" />
      {layers.map((l, i) => (
        <Box
          key={l.label}
          x={60}
          y={45 + i * 52}
          w={330}
          h={46}
          fill={l.fill}
          label={l.label}
          sub={l.sub}
          mono
        />
      ))}
      <Box x={60} y={253} w={330} h={50} fill={C.goodSoft} stroke={C.good} dash label="Writable Layer" sub="بتتولد مع كل Container وتموت معاه" />
      <text x={225} y={330} textAnchor="middle" fontSize={11} fill={C.muted}>
        نفس الطبقات الأساسية بتتشارك بين كل الحاويات ← مساحة أقل
      </text>

      <Title x={585} y={24} text="من Image واحدة ← N Containers" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Arrow x1={396} y1={150} x2={470} y2={70 + i * 90} />
          <Box
            x={475}
            y={45 + i * 90}
            w={230}
            h={55}
            fill={C.white}
            stroke={C.brand}
            label={`container ${i + 1}`}
            sub="نفس الـ Image + طبقة كتابة خاصة"
            mono
          />
        </g>
      ))}
      <text x={590} y={340} textAnchor="middle" fontSize={11} fill={C.muted}>
        عشان كده تشغيل 10 حاويات مش معناه 10 أضعاف المساحة
      </text>
    </Frame>
  )
}

function Lifecycle() {
  const nodes = [
    { x: 20, label: 'image', sub: 'موجودة محليًا', fill: C.softer },
    { x: 168, label: 'created', sub: 'docker create', fill: C.white },
    { x: 316, label: 'running', sub: 'docker start', fill: C.goodSoft },
    { x: 464, label: 'stopped', sub: 'docker stop', fill: C.warmSoft },
    { x: 612, label: 'removed', sub: 'docker rm', fill: C.white },
  ]
  return (
    <Frame viewBox="0 0 760 300">
      {nodes.map((n, i) => (
        <g key={n.label}>
          <Box x={n.x} y={100} w={128} h={62} fill={n.fill} label={n.label} sub={n.sub} mono />
          {i < nodes.length - 1 && <Arrow x1={n.x + 130} y1={131} x2={nodes[i + 1].x - 2} y2={131} />}
        </g>
      ))}
      <text x={380} y={40} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.deep}>
        دورة حياة الحاوية
      </text>
      <text x={380} y={62} textAnchor="middle" fontSize={11} fill={C.muted}>
        docker run = create + start في خطوة واحدة
      </text>

      <path d="M380 168 C380 210, 200 210, 190 168" fill="none" stroke={C.brand} strokeWidth={1.6} markerEnd="url(#arrowhead)" />
      <text x={285} y={214} textAnchor="middle" fontSize={10.5} fill={C.brand} fontWeight={600}>
        docker restart
      </text>

      <text x={380} y={262} textAnchor="middle" fontSize={11} fill={C.muted}>
        لو العملية الأساسية (PID 1) خرجت ← الحاوية تروح لحالة stopped فورًا
      </text>
    </Frame>
  )
}

function PortMapping() {
  return (
    <Frame viewBox="0 0 760 320">
      <Box x={30} y={110} w={150} h={80} fill={C.soft} label="المتصفح" sub="localhost:8080" />
      <Arrow x1={182} y1={150} x2={255} y2={150} label="request" />
      <Box x={257} y={60} w={210} h={190} fill={C.softer} dash label="" />
      <text x={362} y={84} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.deep}>
        Host (جهازك)
      </text>
      <Box x={280} y={105} w={165} h={55} fill={C.white} stroke={C.brand} label="port 8080" sub="published port" mono />
      <Arrow x1={362} y1={162} x2={362} y2={196} label="-p 8080:80" />
      <Box x={280} y={196} w={165} h={42} fill={C.goodSoft} stroke={C.good} label="docker bridge" mono />
      <Arrow x1={470} y1={150} x2={540} y2={150} />
      <Box x={542} y={90} w={190} h={120} fill={C.white} stroke={C.brand} label="Container" sub="nginx يسمع على 0.0.0.0:80" />
      <Box x={562} y={150} w={150} h={40} fill={C.soft} label="port 80" mono />
      <text x={380} y={288} textAnchor="middle" fontSize={11} fill={C.muted}>
        الشكل دايمًا: -p HOST:CONTAINER — الرقم الشمال بتاعك، اليمين بتاع التطبيق جوه
      </text>
    </Frame>
  )
}

function BuildCache() {
  const rows = [
    { label: 'FROM node:22-alpine', a: 'cached', b: 'cached' },
    { label: 'COPY package*.json', a: 'cached', b: 'cached' },
    { label: 'RUN npm ci', a: 'cached', b: 'cached' },
    { label: 'COPY . .', a: 'rebuild', b: 'rebuild' },
    { label: 'CMD [...]', a: 'rebuild', b: 'rebuild' },
  ]
  const rowsBad = [
    { label: 'FROM node:22-alpine', a: 'cached' },
    { label: 'COPY . .', a: 'rebuild' },
    { label: 'RUN npm ci', a: 'rebuild' },
    { label: 'CMD [...]', a: 'rebuild' },
  ]
  return (
    <Frame viewBox="0 0 760 380">
      <Title x={185} y={24} text="ترتيب غلط ← الحزم تتنزل كل مرة" />
      {rowsBad.map((r, i) => (
        <Box
          key={r.label}
          x={30}
          y={45 + i * 58}
          w={310}
          h={48}
          fill={r.a === 'cached' ? C.goodSoft : C.warmSoft}
          stroke={r.a === 'cached' ? C.good : C.warm}
          label={r.label}
          sub={r.a === 'cached' ? 'CACHED' : 'REBUILD — بطيء'}
          mono
        />
      ))}
      <text x={185} y={300} textAnchor="middle" fontSize={11} fill={C.muted}>
        أي تعديل في أي ملف كود بيكسر cache الـ npm ci
      </text>

      <Title x={575} y={24} text="ترتيب صح ← cache بيصمد" />
      {rows.map((r, i) => (
        <Box
          key={r.label}
          x={420}
          y={45 + i * 58}
          w={310}
          h={48}
          fill={r.a === 'cached' ? C.goodSoft : C.warmSoft}
          stroke={r.a === 'cached' ? C.good : C.warm}
          label={r.label}
          sub={r.a === 'cached' ? 'CACHED — سريع' : 'REBUILD (طبيعي)'}
          mono
        />
      ))}
      <text x={575} y={358} textAnchor="middle" fontSize={11} fill={C.muted}>
        القاعدة: الأقل تغيّرًا فوق · الأكثر تغيّرًا تحت
      </text>
    </Frame>
  )
}

function MultiStage() {
  return (
    <Frame viewBox="0 0 760 320">
      <Box x={30} y={55} w={300} h={200} fill={C.warmSoft} stroke={C.warm} label="" />
      <text x={180} y={82} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.deep}>
        Stage 1: builder
      </text>
      <Box x={55} y={98} w={250} h={38} fill={C.white} label="compiler / SDK" mono />
      <Box x={55} y={142} w={250} h={38} fill={C.white} label="dev dependencies" mono />
      <Box x={55} y={186} w={250} h={38} fill={C.white} label="source code" mono />
      <text x={180} y={276} textAnchor="middle" fontSize={11} fill={C.muted}>
        كل الأدوات التقيلة هنا — ومش هتتشحن
      </text>

      <Arrow x1={336} y1={155} x2={425} y2={155} label="COPY --from=builder" />

      <Box x={430} y={95} w={300} h={120} fill={C.goodSoft} stroke={C.good} label="" />
      <text x={580} y={122} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.deep}>
        Stage 2: final image
      </text>
      <Box x={455} y={138} w={250} h={38} fill={C.white} label="runtime فقط" mono />
      <Box x={455} y={180} w={250} h={28} fill={C.white} label="artifact (app binary / dist)" mono />
      <text x={580} y={250} textAnchor="middle" fontSize={11} fill={C.muted}>
        النتيجة: حجم أصغر + سطح هجوم أقل
      </text>
    </Frame>
  )
}

function Volumes() {
  return (
    <Frame viewBox="0 0 760 360">
      <Box x={255} y={30} w={250} h={80} fill={C.white} stroke={C.brand} label="Container" sub="طبقة الكتابة بتموت مع الحذف" />

      <Arrow x1={330} y1={112} x2={200} y2={165} />
      <Arrow x1={380} y1={112} x2={380} y2={165} />
      <Arrow x1={430} y1={112} x2={565} y2={165} />

      <Box x={40} y={168} w={230} h={95} fill={C.goodSoft} stroke={C.good} label="Named Volume" sub="Docker بيديره — الأفضل للـ DB" />
      <Box x={280} y={168} w={200} h={95} fill={C.soft} label="Bind Mount" sub="مجلد من جهازك — للتطوير" />
      <Box x={490} y={168} w={230} h={95} fill={C.warmSoft} stroke={C.warm} label="tmpfs" sub="في الرام — مؤقت وسريع" />

      <text x={155} y={295} textAnchor="middle" fontSize={10.5} fill={C.muted}>
        -v pgdata:/var/lib/postgresql/data
      </text>
      <text x={380} y={295} textAnchor="middle" fontSize={10.5} fill={C.muted}>
        -v $PWD:/app
      </text>
      <text x={605} y={295} textAnchor="middle" fontSize={10.5} fill={C.muted}>
        --tmpfs /tmp
      </text>

      <text x={380} y={335} textAnchor="middle" fontSize={11} fill={C.deep} fontWeight={600}>
        القاعدة: أي داتا مهمة لازم تعيش برّه الحاوية
      </text>
    </Frame>
  )
}

function Networks() {
  return (
    <Frame viewBox="0 0 760 340">
      <Box x={40} y={60} w={680} h={190} fill={C.softer} stroke={C.brand} dash label="" />
      <text x={380} y={88} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.deep}>
        user-defined bridge network: appnet
      </text>

      <Box x={100} y={115} w={200} h={95} fill={C.white} stroke={C.brand} label="api" sub="hostname = api" mono />
      <Box x={460} y={115} w={200} h={95} fill={C.white} stroke={C.brand} label="db" sub="hostname = db" mono />
      <Arrow x1={302} y1={162} x2={458} y2={162} label="postgres://...@db:5432" />

      <Box x={300} y={252} w={160} h={50} fill={C.soft} label="embedded DNS" sub="الاسم ← IP تلقائيًا" />
      <Arrow x1={380} y1={250} x2={380} y2={212} dash />

      <Box x={40} y={10} w={200} h={40} fill={C.goodSoft} stroke={C.good} label="Host :3000" mono />
      <Arrow x1={140} y1={52} x2={170} y2={113} label="-p 3000:3000" />

      <text x={600} y={290} textAnchor="middle" fontSize={11} fill={C.muted}>
        الـ db مش مكشوفة للخارج — الأمان الافتراضي
      </text>
    </Frame>
  )
}

function Compose() {
  return (
    <Frame viewBox="0 0 760 380">
      <Box x={30} y={140} w={170} h={90} fill={C.soft} label="compose.yml" sub="وصف تصريحي واحد" mono />
      <Arrow x1={202} y1={185} x2={265} y2={185} label="up -d" />

      <Box x={268} y={40} w={460} h={290} fill={C.softer} stroke={C.brand} dash label="" />
      <text x={498} y={66} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.deep}>
        Project (شبكة خاصة تلقائية)
      </text>

      <Box x={295} y={82} w={190} h={62} fill={C.white} stroke={C.brand} label="web (nginx)" sub="ports 8080:80" mono />
      <Box x={295} y={158} w={190} h={62} fill={C.white} stroke={C.brand} label="api (build .)" sub="depends_on: db" mono />
      <Box x={295} y={234} w={190} h={62} fill={C.white} stroke={C.brand} label="db (postgres)" sub="healthcheck" mono />

      <Arrow x1={487} y1={113} x2={560} y2={150} />
      <Arrow x1={487} y1={189} x2={560} y2={189} />
      <Arrow x1={487} y1={265} x2={560} y2={228} />

      <Box x={563} y={140} w={140} h={100} fill={C.goodSoft} stroke={C.good} label="volumes" sub="pgdata" mono />

      <text x={380} y={362} textAnchor="middle" fontSize={11} fill={C.muted}>
        أمر واحد يبني الشبكة والتخزين والخدمات بالترتيب الصح
      </text>
    </Frame>
  )
}

function Registry() {
  return (
    <Frame viewBox="0 0 760 320">
      <Box x={40} y={110} w={210} h={110} fill={C.white} stroke={C.brand} label="Local images" sub="docker image ls" mono />
      <Box x={520} y={110} w={210} h={110} fill={C.warmSoft} stroke={C.warm} label="Registry" sub="Hub · GHCR · ECR" />

      <Arrow x1={255} y1={140} x2={515} y2={140} label="docker push app:1.4.2" />
      <Arrow x1={515} y1={195} x2={255} y2={195} label="docker pull app:1.4.2" />

      <Box x={285} y={30} w={200} h={55} fill={C.soft} label="tag" sub="app:1.4.2 (متحرك)" mono />
      <Box x={285} y={245} w={200} h={55} fill={C.goodSoft} stroke={C.good} label="digest" sub="sha256:… (ثابت للأبد)" mono />

      <text x={385} y={100} textAnchor="middle" fontSize={10.5} fill={C.muted}>
        الـ tag ممكن يتغيّر لنفس الاسم
      </text>
    </Frame>
  )
}

const map: Record<DiagramKind, () => React.ReactElement> = {
  'vm-vs-container': VmVsContainer,
  architecture: Architecture,
  'image-layers': ImageLayers,
  lifecycle: Lifecycle,
  'port-mapping': PortMapping,
  'build-cache': BuildCache,
  multistage: MultiStage,
  volumes: Volumes,
  networks: Networks,
  compose: Compose,
  registry: Registry,
}

export function Diagram({ kind, caption }: { kind: DiagramKind; caption?: string }) {
  const Comp = map[kind]
  if (!Comp) return null
  return (
    <figure className="dg">
      <div className="dg-frame">
        <Comp />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
