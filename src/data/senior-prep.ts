export type PrepTopic =
  | 'basics'
  | 'images'
  | 'runtime'
  | 'networking'
  | 'storage'
  | 'compose'
  | 'security'
  | 'ops'
  | 'design'

export type SeniorQA = {
  id: string
  topic: PrepTopic
  /** السؤال بصياغة واقعية زي ما السينيور بيقولها */
  q: string
  /** السينيور بيقيس إيه فيك بالظبط من السؤال ده */
  radar: string
  /** الجواب: عربي بمصطلحات إنجليزية تقنية زي ما بتتكلم في الشغل */
  answerAr: string
  /** جملة/جُمَل جاهزة تقولها بالإنجليزي لو الحوار إنجليزي */
  sayEn: string
  /** الفخ اللي بيقع فيه الناس فالسؤال ده */
  trap: string
  /** السؤال اللي السينيور غالبًا هيسألهولك بعد كده (follow-up) */
  next: string
}

export const prepTopics: { id: PrepTopic; label: string }[] = [
  { id: 'basics', label: 'أساسيات ومفاهيم' },
  { id: 'images', label: 'الصور والبناء' },
  { id: 'runtime', label: 'التشغيل ودورة الحياة' },
  { id: 'networking', label: 'الشبكات' },
  { id: 'storage', label: 'التخزين' },
  { id: 'compose', label: 'Compose والتشغيل' },
  { id: 'security', label: 'الأمان' },
  { id: 'ops', label: 'التشغيل والتحقيق' },
  { id: 'design', label: 'تصميم ومعمارية' },
]

export const seniorPrep: SeniorQA[] = [
  // ===================== أساسيات ومفاهيم =====================
  {
    id: 'p-b1',
    topic: 'basics',
    q: 'طب قوللي بكلامك إنت، إيه Docker وإيه المشكلة اللي بيحلها؟',
    radar:
      'عايز يعرف إنت فاهم القيمة ولا بتحفظ تعريف. بيقيس هل تقدر تربط الأداة بمشكلة حقيقية في فريق شغال.',
    answerAr:
      'المشكلة الأساسية هي environment inconsistency — الكود بيشتغل عندي ويقع عندك بسبب اختلاف الـ versions والـ dependencies. Docker بيحلها إنه بيعمل package للتطبيق مع كل اعتمادياته في image واحدة portable، فبيبقى عندنا نفس الـ artifact في الـ dev والـ CI والـ production. المكسب الإضافي: onboarding أسرع، وdeployment قابل لإعادة الإنتاج، وdensity أعلى من الـ VMs.',
    sayEn:
      'Docker solves environment inconsistency by packaging an app with its dependencies into one portable image, so the same artifact runs identically across dev, CI, and production.',
    trap:
      'ما تقولش "Docker زي VM خفيفة" وتسكت — ده تبسيط بيوقعك في سؤال الفرق بعدها على طول. اربطه بالـ artifact الموحّد.',
    next: 'طيب وإيه اللي Docker مش بيحلّه؟ (عشان يشوف هل تعرف حدوده).',
  },
  {
    id: 'p-b2',
    topic: 'basics',
    q: 'الفرق بين الـ Container والـ VM، بس مش الكلام الكتالوجي، الفرق التقني الحقيقي؟',
    radar:
      'بيتأكد إنك فاهم آلية العزل مش بس الشكل الخارجي. الكلمة المفتاح اللي بيستناها: kernel.',
    answerAr:
      'الـ container بيشارك الـ host kernel وبيعتزل باستخدام namespaces (بيحدد بيشوف إيه) و cgroups (بيحدد يستهلك قد إيه). الـ VM بتعمل hardware virtualization وبتشغّل guest OS كامل فوق hypervisor. عشان كده الـ container أخف وأسرع في الـ startup، بس الـ VM عندها security boundary أقوى لأن مفيش kernel مشترك.',
    sayEn:
      'A container shares the host kernel and is isolated with namespaces and cgroups, while a VM virtualizes hardware and boots a full guest OS — so containers are lighter but VMs give a stronger isolation boundary.',
    trap:
      'ما تقولش الـ container "أسرع في تنفيذ الكود" بإطلاق. الأسرع هو الـ startup والـ distribution، أما تنفيذ الكود فقريب من الـ native في الاتنين.',
    next: 'لو الـ kernel مشترك، يبقى الـ containers آمنة للعزل بين عملاء مش موثوقين؟',
  },
  {
    id: 'p-b3',
    topic: 'basics',
    q: 'يعني إيه namespaces و cgroups؟ اشرحهم في جملتين كأنك بتشرح لجديد.',
    radar: 'بيقيس عمق الفهم. القدرة على التبسيط بدون تسطيح = إشارة سينيور.',
    answerAr:
      'namespaces بتتحكم في التطبيق "بيشوف إيه": الـ process tree، الـ network، الـ mounts، الـ hostname — كل container شايف نسخته الخاصة. cgroups بتتحكم في "يستهلك قد إيه": CPU، memory، I/O. الاتنين مع الـ union filesystem هما أساس سلوك الـ container.',
    sayEn:
      'Namespaces control what a process can see — its PIDs, network, and mounts — while cgroups control how much CPU, memory, and I/O it can use.',
    trap: 'ما تخلطش بينهم. الخلط بيوري إن فهمك سطحي. namespaces = رؤية، cgroups = استهلاك.',
    next: 'طيب لو container تعدّى الـ memory limit بتاعه، بيحصل إيه؟ (بيتنقل لسؤال OOMKilled).',
  },

  // ===================== الصور والبناء =====================
  {
    id: 'p-i1',
    topic: 'images',
    q: 'ليه ترتيب سطور الـ Dockerfile بيفرق أصلاً؟ ما هي كلها هتتنفذ برضه.',
    radar:
      'بيقيس فهمك للـ layer caching، وده أكتر حاجة بتفرّق junior عن mid في البناء العملي.',
    answerAr:
      'كل instruction بتنتج layer، والـ build cache محسوب per-instruction بالترتيب. أول ما instruction مدخلاتها تتغيّر، هي وكل اللي بعدها بيعاد تنفيذهم (cache bust). عشان كده بنحط الأقل تغيّرًا فوق — زي COPY package.json ثم RUN npm ci — والأكتر تغيّرًا (كود التطبيق COPY . .) تحت، فالـ dependency install يفضل cached طول ما الـ dependencies ما اتغيّرتش.',
    sayEn:
      'Each instruction is a cache-keyed layer evaluated in order, so I put rarely-changing steps like dependency installation before copying source code to keep the cache warm.',
    trap:
      'ما تقولش "بندمج كل حاجة في RUN واحدة عشان layers أقل" كأنه الهدف — الهدف الحقيقي هو الـ caching والحجم، مش عدد الـ layers في ذاته.',
    next: 'طيب البناء عندنا بياخد 10 دقايق، هتعمل إيه؟ (بيتنقل لتحسين الـ build).',
  },
  {
    id: 'p-i2',
    topic: 'images',
    q: 'إزاي تصغّر image كبيرة؟ اداني خطة مرتبة مش حاجة واحدة.',
    radar: 'بيقيس هل عندك toolbox مرتّب بالأولوية، مش مجرد trick واحد سمعت عنه.',
    answerAr:
      'بترتيب الأثر: (1) base image أصغر ومناسب للـ runtime (slim/alpine/distroless). (2) multi-stage build عشان الـ build tools والـ dev dependencies ما تتشحنش في الصورة النهائية. (3) .dockerignore صارم يمنع نسخ node_modules و.git و ملفات build. (4) دمج الـ install ومسح الـ package cache في نفس الـ RUN عشان المساحة ترجع فعلاً. وبستخدم docker history أو dive عشان أشوف أضخم layer.',
    sayEn:
      'In order of impact: a smaller base image, multi-stage builds to drop build tooling, a strict .dockerignore, and cleaning package caches within the same RUN — then I profile layers with docker history.',
    trap:
      'ما تقولش "أمسح الملفات في RUN بعدين" — المسح في layer لاحقة ما بيرجعش المساحة لأن الملف موجود في layer أقدم. لازم نفس الـ RUN أو multi-stage.',
    next: 'إيه الـ distroless وإيه ثمنه؟ (بيشوف هل تعرف الـ trade-off في التحقيق).',
  },
  {
    id: 'p-i3',
    topic: 'images',
    q: 'إيه الفرق بين الـ tag والـ digest؟ وإمتى تستخدم كل واحد؟',
    radar: 'بيقيس نضجك في الـ reproducibility والـ production deployments.',
    answerAr:
      'الـ tag اسم mutable — ممكن يتعاد استخدامه ليشير لصورة تانية (زي latest). الـ digest هو sha256 hash لمحتوى الصورة، immutable للأبد. في الـ development بستخدم tags واضحة، وفي الـ production والـ CI بثبّت الـ digest للخدمات الحساسة (image@sha256:...) عشان أضمن نفس الـ bytes بالظبط.',
    sayEn:
      'A tag is a mutable pointer, while a digest is an immutable content hash — I use readable tags in dev but pin by digest in production for reproducible deployments.',
    trap: 'ما تعتمدش على latest في الإنتاج قدامه — دي أول علامة على قلة خبرة تشغيلية.',
    next: 'طيب إزاي تضمن إن اللي في production هو نفس اللي اختبرناه؟ (build once, deploy by digest).',
  },
  {
    id: 'p-i4',
    topic: 'images',
    q: 'حطيت سر في ENV جوه الـ Dockerfile، فيه مشكلة؟',
    radar: 'سؤال فخ. بيقيس وعيك الأمني وهل بتفكر في الـ image كـ artifact بيتوزّع.',
    answerAr:
      'مشكلة كبيرة. الـ ENV بيتسجّل في الـ image metadata وأي حد عنده الصورة يقراه بـ docker inspect أو docker history. حتى لو مسحته في layer بعدين، هو موجود في الـ layer الأقدم وفي الـ history. الأسرار بتتحقن at runtime من secret manager، ولو محتاج سر at build time بستخدم BuildKit secret mount (RUN --mount=type=secret) اللي ما بيتسجلش في الـ layers.',
    sayEn:
      'Yes — ENV values are baked into image metadata and readable via docker history, so secrets must be injected at runtime or passed via BuildKit secret mounts at build time, never stored in the image.',
    trap: 'ما تقولش "أمسحه بعدين" — دي إجابة بتسقّطك أمنيًا. الـ layers append-only.',
    next: 'طيب إزاي بتتعامل مع الأسرار بشكل عام في الـ pipeline؟',
  },

  // ===================== التشغيل ودورة الحياة =====================
  {
    id: 'p-r1',
    topic: 'runtime',
    q: 'container بيقفل على طول أول ما بشغّله، أعمل إيه؟',
    radar: 'بيقيس منهجك في الـ debugging، مش هل تعرف الحل. عايز خطوات مرتّبة.',
    answerAr:
      'منهج مرتّب: docker ps -a عشان أشوف الـ exit code، بعدين docker logs عشان أقرأ سبب الـ crash. لو محتاج أفحص جوه الصورة نفسها بشغّلها بـ --entrypoint sh وأتأكد من وجود الملفات والأمر الصح. الجذر دايمًا إن الـ main process (PID 1) خرجت أو وقعت — لأن مصير الـ container هو مصير الـ process الأساسية بتاعته.',
    sayEn:
      'I check the exit code with docker ps -a, read docker logs for the crash cause, and if needed override the entrypoint with a shell to inspect the image — since the container stops when its PID 1 exits.',
    trap: 'ما تبدأش بـ "أعيد الـ build" عشوائيًا. السينيور عايز يشوف تشخيص مبني على دليل.',
    next: 'طيب إيه الفرق بين الـ exec form والـ shell form في CMD وعلاقته بالموضوع؟',
  },
  {
    id: 'p-r2',
    topic: 'runtime',
    q: 'إزاي تعمل graceful shutdown لخدمة HTTP جوه container؟',
    radar:
      'سؤال بيفصل اللي شغّل فعلاً في production عن اللي جرّب محليًا بس. بيقيس فهم الـ signals.',
    answerAr:
      'لازم التطبيق يكون PID 1 ويستقبل SIGTERM ويعمله handle: يوقف قبول requests جديدة، يخلّص الـ in-flight requests (drain)، ويقفل الـ DB connections. وبستخدم الـ exec form في CMD (زي CMD ["node","server.js"]) عشان الـ signal يوصل للتطبيق مباشرة مش لـ shell wrapper بيبلعها. docker stop بيبعت SIGTERM ويدي grace period قبل الـ SIGKILL.',
    sayEn:
      'The app must run as PID 1 and handle SIGTERM to drain in-flight requests and close connections, using the exec form of CMD so signals reach the process instead of a shell wrapper.',
    trap:
      'لو قلت shell form عادي، السينيور هيعرف إن خدماتك بتتقتل بـ SIGKILL وبتفقد requests. اذكر الـ exec form صراحة.',
    next: 'وإيه الفرق العملي بين docker stop و docker kill؟',
  },
  {
    id: 'p-r3',
    topic: 'runtime',
    q: 'container بيتقتل من غير سبب واضح، وinspect بيقول OOMKilled. إيه اللي حصل؟',
    radar: 'بيقيس ربطك بين الأعراض والـ cgroups والـ memory limits.',
    answerAr:
      'الـ process تعدّت الـ memory limit المحدد فالـ kernel قتلها عن طريق الـ OOM killer — ده اللي cgroups بتفرضه. الحل مش إني أرفع الـ limit أعمى؛ بقيس الاستهلاك الحقيقي under load بـ docker stats، وأتأكد مفيش memory leak. ونقطة مهمة: بعض الـ runtimes زي الـ JVM أو Node القديم ما بيقروش الـ cgroup limits تلقائيًا وبيحسبوا الـ memory من الـ host، فلازم أضبط الـ heap صراحة (مثلاً MaxRAMPercentage).',
    sayEn:
      'The process exceeded its cgroup memory limit and was OOM-killed; I measure real usage under load before raising limits and make sure runtimes like the JVM respect cgroup limits explicitly.',
    trap: 'ما ترفعش الـ limit على طول من غير قياس — ده بيخبّي memory leak حقيقي.',
    next: 'طيب لو الخدمة بتعمل restart متكرر في production، منهجك إيه؟',
  },

  // ===================== الشبكات =====================
  {
    id: 'p-n1',
    topic: 'networking',
    q: 'الـ API مش شايف الـ DB، وأنا كاتب localhost في الـ connection string. ليه؟',
    radar: 'أشهر سؤال شبكات. بيقيس فهمك للـ network namespace والـ service discovery.',
    answerAr:
      'لأن localhost جوه الـ container معناها الـ container نفسه، مش الـ host ومش الـ container التاني — كل container عنده network namespace خاص. لازم أستخدم اسم الخدمة على شبكة user-defined bridge مشتركة (مثلاً db)، لأن Docker بيوفّر embedded DNS بيحوّل الاسم لـ IP تلقائيًا. لو محتاج أوصل لخدمة على الـ host نفسه بستخدم host.docker.internal على Mac/Windows.',
    sayEn:
      'Inside a container localhost refers to the container itself, so I connect using the service name on a shared user-defined network, where Docker’s embedded DNS resolves it automatically.',
    trap: 'ما تقولش "أحط الـ IP بتاع الـ container" — الـ IP بيتغيّر بعد إعادة الإنشاء. الاسم هو الحل.',
    next: 'طيب الـ default bridge القديم بيدي نفس الـ DNS ده؟ (لأ، لازم user-defined).',
  },
  {
    id: 'p-n2',
    topic: 'networking',
    q: 'إيه الفرق بين نشر منفذ بـ -p 8080:80 و EXPOSE 80؟',
    radar: 'بيقيس هل تفرّق بين التوثيق والفعل الحقيقي.',
    answerAr:
      'EXPOSE مجرد documentation في الـ image metadata — بيقول التطبيق بيسمع على أنهي port، بس ما بيفتحش حاجة. الـ -p HOST:CONTAINER هو اللي بيعمل الـ port publishing الفعلي ويربط port على الـ host بـ port جوه الـ container عشان توصله من بره. ونقطة أمان: بنشر الـ frontend ports بس، وبنسيب الـ DB داخلية، ولو محتاجها للتطوير بربطها بـ 127.0.0.1:5432:5432 عشان تبقى لجهازي فقط.',
    sayEn:
      'EXPOSE is just metadata documentation, while -p actually publishes a host port to the container — and I only publish what must be reachable, binding sensitive ports to 127.0.0.1.',
    trap: 'ناس كتير بتفتكر EXPOSE بيفتح المنفذ للخارج. لأ، لازم -p.',
    next: 'طيب إزاي تخلّي الـ DB مش مكشوفة للنت بس الـ API يوصلها؟',
  },

  // ===================== التخزين =====================
  {
    id: 'p-s1',
    topic: 'storage',
    q: 'إزاي بتحافظ على داتا قاعدة البيانات مع Docker؟',
    radar: 'بيقيس فهمك إن الـ container ephemeral وإن الـ state لازم يعيش بره.',
    answerAr:
      'بربط named volume على الـ data directory بتاع المحرك (في Postgres: /var/lib/postgresql/data) عشان الداتا تعيش بعد حذف الـ container وإعادة إنشائه — لأن الـ writable layer بتموت مع الـ container. وبعمل logical backups دورية (pg_dump) متخزّنة off-host. وفي الـ production الحقيقي غالبًا بفضّل managed database service بدل ما أدير الـ state بنفسي.',
    sayEn:
      'I mount a named volume at the engine’s data directory so data survives container recreation, keep scheduled off-host backups, and often prefer a managed database in real production.',
    trap:
      'ما تقولش bind mount للـ DB في الإنتاج — الأداء وإدارته أضعف، وnamed volume أنضف وأسرع خصوصًا على Mac/Windows.',
    next: 'طيب إيه الفرق بين named volume و bind mount وإمتى كل واحد؟',
  },
  {
    id: 'p-s2',
    topic: 'storage',
    q: 'عملت docker compose down -v على سيرفر فيه داتا، إيه اللي بيحصل؟',
    radar: 'بيقيس هل تعرف الفرق بين أمر آمن وأمر كارثي — وعي تشغيلي.',
    answerAr:
      'الـ -v بيحذف الـ volumes ومعاها الداتا كلها بلا رجعة. الفرق بين down و down -v هو الفرق بين إعادة تشغيل عادية وكارثة فقدان بيانات. عشان كده في الـ production ما بستخدمش -v إلا وأنا متأكد إني عايز أمسح الـ state فعلاً، وبيفضّل يكون فيه backup قبلها.',
    sayEn:
      'The -v flag deletes the volumes and all their data permanently — down and down -v are the difference between a restart and data loss, so I never use -v in production without a backup.',
    trap: 'ما تستخفّش بالسؤال — لو قلت "بيوقف الخدمات بس" هتبيّن إنك ممكن تمسح production data بالغلط.',
    next: 'طيب إزاي تعمل backup و restore لـ volume كامل؟',
  },

  // ===================== Compose والتشغيل =====================
  {
    id: 'p-c1',
    topic: 'compose',
    q: 'ليه Compose بدل ما أكتب كذا docker run؟',
    radar: 'بيقيس تفكيرك في reproducibility وteam workflow مش مجرد راحة.',
    answerAr:
      'لأنه declarative description متخزّن في Git وقابل للـ review، فأي مطوّر يشغّل نفس الـ stack بنفس الإعدادات بأمر واحد (docker compose up). وبيدير الـ networks والـ volumes والـ dependencies والـ healthchecks بشكل منظّم، بدل ما الأوامر تكون في دماغ حد أو في ملف ملاحظات. ده بيحسّن الـ onboarding والـ reproducibility بشكل مباشر.',
    sayEn:
      'Compose gives a declarative, version-controlled definition of the whole stack, so anyone reproduces the same environment with one command including networks, volumes, and health checks.',
    trap: 'ما تقولش "عشان أسهل" وبس — اذكر الـ version-controlled والـ reproducibility، ده اللي بيسمعه.',
    next: 'طيب depends_on بتضمن إن الخدمة التانية جاهزة فعلاً؟',
  },
  {
    id: 'p-c2',
    topic: 'compose',
    q: 'depends_on معناها إن الخدمة هتستنى التانية تبقى ready؟',
    radar: 'سؤال فخ. بيقيس هل تعرف الفرق بين ترتيب البدء والجاهزية الفعلية.',
    answerAr:
      'لأ، لوحدها بتضبط ترتيب البدء (start order) بس، مش الجاهزية. عشان انتظار حقيقي لازم healthcheck على الخدمة المطلوبة + depends_on مع condition: service_healthy. وبرضه التطبيق نفسه المفروض يعمل retry with backoff على الـ connection، لأن الشبكة أو الـ DB ممكن يقعوا في أي وقت مش وقت البدء بس.',
    sayEn:
      'No — depends_on only controls start order; real readiness needs a healthcheck with condition: service_healthy, and the app should still retry connections with backoff.',
    trap: 'لو قلت "أيوه بتستنى" غلط — دي من أكتر المفاهيم الخاطئة الشائعة والسينيور بيصطاد بيها.',
    next: 'طيب إزاي تكتب healthcheck كويس من غير ما يضغط الخدمة؟',
  },

  // ===================== الأمان =====================
  {
    id: 'p-sec1',
    topic: 'security',
    q: 'إزاي بتقسّي (harden) container قبل ما يروح production؟',
    radar: 'بيقيس عمقك الأمني — عدد الطبقات اللي تعرفها بيحدد مستواك.',
    answerAr:
      'طبقات مرتّبة: (1) base image صغيرة ومحدّثة عشان attack surface أقل. (2) non-root user (USER) عشان أي اختراق ما يبقاش بصلاحيات كاملة. (3) read-only root filesystem مع tmpfs للمسارات اللي محتاجة كتابة. (4) --cap-drop ALL وإضافة اللازم بس، مع --security-opt no-new-privileges. (5) resource limits. (6) vulnerability scanning مستمر (Docker Scout / Trivy) مع تثبيت الـ digests. وممنوع --privileged إلا لضرورة مفهومة.',
    sayEn:
      'Minimal updated base, non-root user, read-only filesystem with tmpfs, dropped capabilities with no-new-privileges, resource limits, and continuous image scanning with digest pinning.',
    trap: 'ما تكتفيش بـ "non-root" — ده أول سطر بس. السينيور عايز يشوف إنك عارف الطبقات التانية.',
    next: 'ليه ربط /var/run/docker.sock جوه container خطر؟',
  },
  {
    id: 'p-sec2',
    topic: 'security',
    q: 'الـ containers آمنة by default؟ رد عليّ بصراحة.',
    radar: 'بيقيس توازنك — مش متحمّس زيادة ولا مرعوب، رأي مهني.',
    answerAr:
      'رد متوازن: بتوفّر عزل جيد افتراضيًا، بس مش security boundary بقوة الـ VM لأن الـ kernel مشترك — أي kernel vulnerability خطيرة بتبقى مخاطرة مشتركة. عمليًا بنوصل لأمان مقبول بإضافة طبقات: non-root، صور صغيرة محدّثة، منع privileged، capabilities مقلّلة، وscanning. للعزل القوي بين tenants غير موثوقين بنلجأ لـ VMs أو sandboxed runtimes زي gVisor/Kata.',
    sayEn:
      'They provide good isolation but share the host kernel, so they’re not as strong a boundary as VMs; we harden them in layers and use VMs or sandboxed runtimes for untrusted multi-tenant isolation.',
    trap: 'ما تقولش "أيوه آمنة" جامد ولا "لأ خطر" جامد — الاتنين بيوروا قلة نضج. الرد المتوازن هو المطلوب.',
    next: 'طيب إمتى تختار VM بدل container؟',
  },

  // ===================== التشغيل والتحقيق =====================
  {
    id: 'p-o1',
    topic: 'ops',
    q: 'خدمة في production بتعمل restart كل شوية، امشي معايا خطوة بخطوة.',
    radar: 'بيقيس منهجيتك تحت الضغط. عايز evidence-based investigation مش تخمين.',
    answerAr:
      'بمنهج: أشوف RestartCount و State.OOMKilled من docker inspect، أقرأ الـ logs قبل كل انهيار عشان أشوف آخر عملية اتعملت، أقيس الـ memory under load عشان أتأكد إن الـ limit كافي، أراجع الـ healthcheck هل بيفشل بسبب بطء الإقلاع (start-period قصير)، وأتأكد إن التطبيق بيتعامل مع SIGTERM صح. بعد التشخيص أعدّل الـ limits أو الكود — مش بسكّت الأعراض بـ restart policy.',
    sayEn:
      'I inspect RestartCount and the OOMKilled flag, read logs right before each crash, validate memory under load, check the healthcheck start-period, and verify SIGTERM handling before changing anything.',
    trap: 'ما تحلّهاش بـ "restart: always" — ده بيخبّي المشكلة الحقيقية. السينيور عايز root cause.',
    next: 'طيب لو الـ logs مالياش الديسك، تعمل إيه؟ (log rotation).',
  },
  {
    id: 'p-o2',
    topic: 'ops',
    q: 'شغّال عندي وواقع في الـ CI، أفحص إيه؟',
    radar: 'بيقيس هل بتفكر في الفروقات بين البيئات بشكل منهجي.',
    answerAr:
      'بقارن خمس حاجات: نسخة/digest الـ base image، الـ CPU architecture (arm ضد amd — شائع مع Apple Silicon)، الـ environment variables والـ secrets الموجودة عندي وناقصة في الـ CI، الـ build context (ملفات عندي مش مرفوعة في Git)، وحالة الـ cache (محلي دافي مقابل CI بارد). غالبًا السبب واحد من دول.',
    sayEn:
      'I compare the base image digest, CPU architecture, environment variables and secrets, the build context, and cache state — the discrepancy is almost always one of those.',
    trap: 'ما تقولش "الـ CI بايظ" — ابدأ من الفروقات المنهجية بين البيئتين.',
    next: 'رسالة exec format error معناها إيه؟ (architecture mismatch).',
  },
  {
    id: 'p-o3',
    topic: 'ops',
    q: 'الديسك اتملى على سيرفر production بسبب Docker، تصرّفك إيه؟',
    radar: 'بيقيس وعيك بالـ housekeeping والـ log management في التشغيل الحقيقي.',
    answerAr:
      'أول حاجة docker system df عشان أعرف الاستهلاك متقسّم إزاي (images، containers، volumes، build cache). بعدين prune انتقائي: container prune وimage prune وbuilder prune (الأخير بياخد مساحة كبيرة). وللمنع المستقبلي: log rotation بـ max-size و max-file أو توجيه الـ logs لنظام مركزي، وretention policy على الـ registry. وبحذر شديد من prune -a --volumes عشان ما يمسحش داتا لسه محتاجها.',
    sayEn:
      'I run docker system df to see the breakdown, prune selectively, and prevent recurrence with log rotation limits and a registry retention policy — being careful with volume pruning.',
    trap: 'ما تشغّلش docker system prune -a --volumes على طول — ممكن تمسح داتا مهمة.',
    next: 'فين الـ logs بتتخزن فعليًا ومع أنهي driver؟',
  },

  // ===================== تصميم ومعمارية =====================
  {
    id: 'p-d1',
    topic: 'design',
    q: 'ليه ما نحطش الـ API والـ DB والـ nginx في container واحد ونريّح دماغنا؟',
    radar:
      'بيقيس فهمك لمبدأ الـ single responsibility والـ operational implications.',
    answerAr:
      'لأن كل خدمة ليها lifecycle و scaling و logging و monitoring مختلفين، والـ container الواحد بيخلط المسؤوليات ويصعّب التشغيل. مبدأ "one main process per container" بيخلّيني أعمل scale مستقل لكل خدمة، وأتابع logs منفصلة، وأعمل restart جزئي، وأحدّث خدمة من غير ما ألمس التانية. الـ orchestration كلها (Compose/K8s) مبنية على الافتراض ده.',
    sayEn:
      'Each service has a different lifecycle, scaling, and logging profile, so one process per container lets me scale, monitor, and deploy them independently — which is what orchestration assumes.',
    trap: 'ما تقولش "عشان الصورة تبقى أصغر" — دي مش النقطة. النقطة operational separation.',
    next: 'طيب لو عندك sidecar محتاج يشتغل جنب الخدمة، إزاي تعملها؟',
  },
  {
    id: 'p-d2',
    topic: 'design',
    q: 'إمتى Docker مايكونش الحل الصح أصلاً؟',
    radar: 'بيقيس نضجك في معرفة حدود الأداة — السينيور بيحب اللي يعرف يقول "لأ".',
    answerAr:
      'لما أحتاج kernel مختلف عن الـ host (مثلاً Windows kernel على Linux)، أو عزل أمني صارم بين tenants غير موثوقين (وقتها VM أو gVisor/Kata أقوى)، أو لما التطبيق محتاج وصول عميق للهاردوير أو kernel modules خاصة. وكمان للـ workloads البسيطة اللي managed service بيحلها أنضف، الـ container ممكن يكون تعقيد زيادة.',
    sayEn:
      'When I need a different kernel, strict isolation for untrusted tenants, or deep hardware access — and sometimes a managed service is simpler than containerizing at all.',
    trap: 'ما تقولش "Docker دايمًا الأفضل" — ده بيوري تحيّز مش خبرة.',
    next: 'طيب الفرق بين Docker و Kubernetes في المسؤولية؟',
  },
  {
    id: 'p-d3',
    topic: 'design',
    q: 'إيه الحد الفاصل بين شغل Docker وشغل Kubernetes؟',
    radar: 'بيقيس هل تعرف مكان Docker في الصورة الكبيرة.',
    answerAr:
      'Docker بيغلّف ويشغّل container على host واحد — بيبني الـ image ويشغّل الـ runtime. Kubernetes هو الـ orchestrator: بيوزّع الـ containers على cluster من الـ nodes، ويعمل scaling و self-healing و rolling updates و service discovery على مستوى الكلاستر. باختصار: Docker بيبني الطوبة، وKubernetes بيبني ويدير العمارة. وحاليًا K8s بيستخدم containerd كـ runtime مش Docker engine مباشرة.',
    sayEn:
      'Docker builds and runs containers on a single host, while Kubernetes orchestrates them across a cluster — scheduling, scaling, self-healing, and rolling updates. Docker builds the brick; Kubernetes builds the building.',
    trap: 'ما تقولش "K8s بديل لـ Docker" — ده خطأ مفاهيمي. هم في طبقتين مختلفتين.',
    next: 'طيب الـ OCI إيه دورها في إن الصور تشتغل بره Docker؟',
  },
]
