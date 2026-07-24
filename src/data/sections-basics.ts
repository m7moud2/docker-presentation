import type { Section } from './types'

export const basicSections: Section[] = [
  {
    id: 'what',
    nav: 'ما هو Docker؟',
    title: 'ما هو Docker؟ — التفصيلة الأولى',
    lead: 'مدرّس يشرح، وطالب يسأل، وفي الآخر أسئلة السينيور. كل معلومة هنفكّكها: بتعمل إيه، فايدتها إيه، بنستخدمها إمتى وإزاي ومع إيه.',
    blocks: [
      {
        type: 'teach',
        title: 'المدرّس',
        text: 'خُد الجملة دي واحفظها بفهم: Docker هو منصة (platform) بتخلّيك تعمل ثلاث حاجات — تبني (build)، تنقل (ship)، وتشغّل (run) التطبيق جوه حاوية. الحاوية دي وحدة فيها تطبيقك + كل حاجة محتاجها (مكتبات، إعدادات، نسخة الـ runtime). يعني إحنا مش بنركّب البرنامج على النظام، إحنا بنغلّف البرنامج مع بيئته كلها في علبة واحدة تتنقل زي ما هي.',
      },
      {
        type: 'teach',
        title: 'المدرّس يوضح الفايدة العملية',
        text: 'الفايدة الحقيقية مش "شكل حديث" — الفايدة إن نفس العلبة اللي شغالة على لابتوبك تشتغل بنفس السلوك على سيرفر الشركة وعلى الـ CI. ده بيوفّر عليك أكتر حاجة بتضيّع وقت الفِرَق: يومين تحقيق في مشكلة سببها إن نسخة مكتبة عندك مختلفة عن السيرفر.',
      },
      {
        type: 'ask',
        q: 'طيب إيه الفرق الحقيقي بين Docker وبرنامج عادي بثبّته على الجهاز؟',
        a: 'البرنامج العادي بيعتمد على اللي متثبّت عندك: نسخة Node، مكتبات النظام، متغيرات البيئة. لو أي حاجة منهم اختلفت، السلوك يختلف. Docker بيغلّف التطبيق مع اعتمادياته في Image، والحاوية بتشتغل من الـ Image دي، فالاعتماد على بيئة الجهاز بيقل جدًا — بيفضل الاعتماد على الـ kernel بس.',
        why: 'الفكرة دي هي جوهر كلمة portability، وهي أول سبب أي شركة بتدخل Docker.',
      },
      {
        type: 'ask',
        q: 'يعني Docker بيحل كل مشاكل النشر (deployment)؟',
        a: 'لأ. Docker بيحل مشكلة التغليف والعزل والتشغيل الموحّد. لكنه مش بيحل: التوسّع التلقائي (auto-scaling)، توزيع الحاويات على سيرفرات كتير، الـ self-healing على مستوى الكلاستر. دي شغلانة الـ orchestrator زي Kubernetes. Docker بيبني الطوبة، وKubernetes بيبني العمارة.',
      },
      {
        type: 'ask',
        q: 'إيه معنى كلمة Containerization بالظبط؟',
        a: 'يعني تشغيل التطبيق كعملية معزولة باستخدام خصائص موجودة في Linux kernel: namespaces (بتحدد التطبيق يشوف إيه) و cgroups (بتحدد يستهلك قد إيه). النتيجة: عزل قريب من الـ VM بس بدون تشغيل نظام تشغيل كامل لكل تطبيق.',
      },
      {
        type: 'ask',
        q: 'ليه بيقولوا الحاوية "خفيفة"؟ خفيفة بالنسبة لإيه؟',
        a: 'خفيفة بالنسبة للـ VM. الـ VM محتاجة تحمّل نظام تشغيل كامل (kernel + services + drivers) قبل ما تطبيقك يشتغل. الحاوية بتستخدم kernel الجهاز المضيف، فاللي بيتحمّل هو تطبيقك ومكتباته بس. عشان كده الحجم ميجابايتات مش جيجابايتات، والإقلاع ثواني مش دقايق.',
      },
      {
        type: 'ask',
        q: 'هو ده معناه إن الحاوية أسرع في تنفيذ الكود؟',
        a: 'مش بالضرورة أسرع في تنفيذ الكود نفسه — الكود بيتنفّذ على نفس المعالج بدون طبقة محاكاة، فالأداء قريب من الأصلي. اللي أسرع فعلًا هو زمن الإقلاع (startup) وزمن التوزيع (نقل الصورة). الـ I/O على الملفات جوه الحاوية أحيانًا أبطأ شوية، خصوصًا على macOS مع الـ bind mounts.',
      },
      {
        type: 'deep',
        term: 'الحاوية (Container)',
        en: 'Container',
        what: 'عملية (process) أو مجموعة عمليات شغّالة على نظام التشغيل بس معزولة: ليها نظام ملفات خاص، وشبكة خاصة، وحدود موارد خاصة.',
        why: 'الفايدة إنك تشغّل عشرات التطبيقات على نفس السيرفر بدون ما يتعارضوا في المكتبات أو المنافذ، وبتكلفة موارد أقل بكتير من الـ VM.',
        how: 'بتشتغل عن طريق ثلاث تقنيات: namespaces للعزل البصري (تشوف إيه)، cgroups لتحديد الاستهلاك (CPU/RAM)، و union filesystem لتركيب طبقات الصورة فوق بعضها.',
        use: 'بتستخدمها لما تشغّل خدمة أو أداة أو حتى أمر لمرة واحدة: docker run لتشغيلها، docker ps لمتابعتها، docker exec للدخول جواها، docker stop لإيقافها.',
        withWhat: 'بتيجي دايمًا مع Image (المصدر)، وغالبًا مع Volume (للداتا)، وNetwork (للتواصل)، وenvironment variables (للإعدادات).',
        example: {
          title: 'حاوية واحدة تشرح كل ده',
          lang: 'bash',
          code: `docker run -d --name web -p 8080:80 nginx:1.27
# -d = تشتغل في الخلفية
# --name = اسم ثابت تناديه بيه
# -p = تعريض المنفذ لجهازك
# nginx:1.27 = الـ Image اللي الحاوية طلعت منها`,
        },
        gotcha: 'أشهر خطأ: الناس بتفتكر الحاوية زي VM فبتحاول تشغّل فيها 4 خدمات و SSH. القاعدة: عملية أساسية واحدة لكل حاوية.',
      },
      {
        type: 'deep',
        term: 'الصورة (Image)',
        en: 'Image',
        what: 'قالب للقراءة فقط (read-only template) فيه نظام ملفات جاهز + معلومات تشغيل (الأمر الافتراضي، متغيرات البيئة، المنافذ الموثّقة).',
        why: 'الفايدة إنها artifact ثابت وقابل للنقل والتخزين: تبنيه مرة، تخزنه في Registry، وتشغّله في أي مكان بنفس النتيجة. وده أساس إن الـ CI/CD يبقى موثوق.',
        how: 'بتتكوّن من طبقات (layers) متراصة. كل تعليمة في الـ Dockerfile بتنتج طبقة. الطبقات المتشابهة بتتشارك بين الصور المختلفة على نفس الجهاز.',
        use: 'docker build لبنائها، docker pull لتنزيلها، docker push لرفعها، docker image ls لعرضها، docker history لفحص طبقاتها.',
        withWhat: 'مرتبطة بـ Dockerfile (بتُبنى منه)، وRegistry (بتُخزَّن فيه)، وTag أو Digest (بتُعرَّف بيهم).',
        example: {
          title: 'الفرق العملي بين Image و Container',
          lang: 'bash',
          code: `docker pull nginx:1.27      # نزّلت القالب
docker image ls             # القالب موجود، بس مفيش حاجة شغالة
docker run -d nginx:1.27    # دلوقتي بقى فيه حاوية شغالة
docker run -d nginx:1.27    # وتانية من نفس القالب`,
        },
        gotcha: 'الصورة متتعدّلش. لو دخلت حاوية وثبّت حزمة، التعديل ده في طبقة الحاوية وهيضيع. التعديل الصح يتكتب في الـ Dockerfile ويتعمل build.',
      },
      {
        type: 'terms',
        items: [
          { en: 'Image', ar: 'صورة / قالب', meaning: 'قالب ثابت للقراءة فقط بتشتغل منه الحاويات' },
          { en: 'Container', ar: 'حاوية', meaning: 'نسخة شغّالة من الصورة، فوقها طبقة كتابة مؤقتة' },
          { en: 'Registry', ar: 'سجل الصور', meaning: 'سيرفر بتخزّن وتوزّع منه الصور (Docker Hub مثلاً)' },
          { en: 'Layer', ar: 'طبقة', meaning: 'جزء من نظام ملفات الصورة، قابل للتخزين المؤقت والمشاركة' },
          { en: 'Portability', ar: 'قابلية النقل', meaning: 'نفس الـ artifact يشتغل في بيئات مختلفة بنفس السلوك' },
          { en: 'Isolation', ar: 'العزل', meaning: 'التطبيقات مش بتشوف أو تأثّر على بعضها' },
        ],
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إيه المشكلة اللي Docker بيحلها؟ (What problem does Docker solve?)',
        answerAr:
          'الرد المنظّم: المشكلة الأساسية هي عدم تطابق البيئات — التطبيق يشتغل على جهاز ويفشل على غيره لاختلاف النسخ والمكتبات. Docker بيحلها بتغليف التطبيق مع اعتمادياته في صورة قابلة للنقل، فبيبقى عندنا نفس الـ artifact في كل البيئات. وكمكسب إضافي: سرعة تهيئة المطور الجديد، وقابلية إعادة إنتاج نتائج الـ CI، وكثافة نشر أعلى من الـ VM.',
        sayEn:
          'Docker solves environment inconsistency by packaging the application together with its dependencies into a portable image, so the same artifact runs identically across dev, CI, and production.',
        followUp:
          'لو سأل عن الحدود، قول: it does not replace orchestration — scaling and scheduling across nodes is Kubernetes territory.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: هو Docker نوع من الـ VM؟ (Is Docker a virtual machine?)',
        answerAr:
          'لأ، والفرق جوهري: الحاوية بتشارك kernel الجهاز المضيف وبتعتزل بالـ namespaces و cgroups، بينما الـ VM بتحاكي هاردوير وبتشغّل نظام تشغيل ضيف كامل. عشان كده الحاوية أخف وأسرع إقلاعًا، والـ VM حدودها الأمنية أقوى.',
        sayEn:
          'No. A container shares the host kernel and is isolated using namespaces and cgroups, while a VM virtualizes hardware and boots a full guest OS — that is why containers are lighter and start much faster.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إمتى Docker مايكونش الحل المناسب؟',
        answerAr:
          'أقول بصراحة مهنية: لما أحتاج نظام تشغيل مختلف تمامًا عن المضيف (مثلاً Windows kernel على Linux host)، أو لما أحتاج حدود أمنية صارمة بين عملاء مختلفين (multi-tenant غير موثوق) فالـ VM أو الـ sandbox أقوى، أو لما التطبيق يحتاج وصول عميق للهاردوير أو kernel modules خاصة.',
        sayEn:
          'Containers are not ideal when you need a different kernel, very strict tenant isolation, or deep hardware and kernel-level access — in those cases VMs or specialized sandboxes fit better.',
      },
    ],
  },
  {
    id: 'before',
    nav: 'قبل Docker',
    title: 'قبل Docker — الوجع اللي خلّى الناس تدوّر على حل',
    lead: 'لو فهمت الألم القديم، هتعرف بتستخدم كل feature عشان إيه، مش بتحفظ أوامر.',
    blocks: [
      {
        type: 'teach',
        title: 'المدرّس',
        text: 'كان عندنا ثلاث طرق، وكل واحدة ليها ضريبة. الأولى: تثبيت كل حاجة على السيرفر مباشرة — رخيصة بس أي خدمتين محتاجين نسخ مختلفة من نفس المكتبة بيتخانقوا. التانية: VM لكل خدمة — عزل ممتاز بس فاتورة موارد ضخمة. التالتة: سكربتات تهيئة وتوثيق — بتشتغل النهاردة وتتكسر بعد شهر لأن الدنيا اتغيّرت.',
      },
      {
        type: 'ask',
        q: 'إيه معنى Dependency Hell بمثال ملموس؟',
        a: 'عندك على نفس السيرفر تطبيق قديم محتاج Python 3.8، وتطبيق جديد محتاج 3.12. تحدّث النظام لـ 3.12 فالقديم يقع. تسيبه 3.8 فالجديد ميشتغلش. تبدأ تحلها بـ virtualenv وحيل، وكل حل بيضيف تعقيد. مع Docker كل تطبيق بياخد صورته بنسخته، والمشكلة تختفي من أصلها.',
      },
      {
        type: 'ask',
        q: 'إيه معنى Environment Drift؟',
        a: 'إن البيئات بتفرق عن بعضها بالتدريج مع الوقت: حد ثبّت حزمة يدوي على السيرفر، حد غيّر إعداد، حد رقّى نسخة. بعد فترة السيرفر بقى "قطعة أثرية" محدش يعرف بالظبط جواه إيه (بيسمّوها snowflake server). الصور الثابتة بتقلّل ده لأن التغيير بيحصل في ملف مُراجَع مش على السيرفر مباشرة.',
      },
      {
        type: 'ask',
        q: 'وليه ما نستخدم سكربت تثبيت واحد للجميع ونخلص؟',
        a: 'لأن السكربت بيوصف "خطوات"، والخطوات نتيجتها بتعتمد على حالة الجهاز وقت التنفيذ ونسخ الحزم في المستودعات وقتها. Docker بيوصف "نتيجة" مغلّفة: الصورة نفسها هي الناتج المضمون. الفرق بين "اعمل كذا وادعي" و"خُد النتيجة جاهزة".',
      },
      {
        type: 'compare',
        left: {
          title: 'قبل: أعراض متكررة',
          items: [
            'شغال عندي وواقع عندك',
            'تهيئة مطور جديد بتاخد يومين',
            'تعارض نسخ المكتبات',
            'صعوبة إرجاع نسخة قديمة بسرعة',
            'خوف من أي تحديث على السيرفر',
          ],
        },
        right: {
          title: 'بعد: مكاسب واضحة',
          items: [
            'artifact واحد لكل البيئات',
            'تهيئة بأمر واحد تقريبًا',
            'كل خدمة بنسختها معزولة',
            'rollback = شغّل tag قديم',
            'التغيير بيحصل في ملف مُراجَع (reviewable)',
          ],
        },
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: ليه ما نكمّل بالـ VMs لكل حاجة؟',
        answerAr:
          'لأن الـ VM ثقيلة نسبيًا: نظام تشغيل كامل لكل خدمة معناه رام وديسك ووقت إقلاع وصيانة تحديثات أمنية لكل نظام. لو عندي عشرات الخدمات الصغيرة، الحاويات بتديني عزل كافٍ لمعظم الحالات بكثافة أعلى وسرعة أعلى، وبتخلّي الـ CI أسرع بكتير.',
        sayEn:
          'VMs give stronger isolation but cost a full guest OS per service. For many small services, containers provide sufficient isolation with far better density and startup time.',
      },
    ],
  },
  {
    id: 'vs-vm',
    nav: 'Container مقابل VM',
    title: 'Container مقابل VM — بالرسم والتفصيل',
    lead: 'السؤال ده بيتسأل في كل إنترفيو تقريبًا. خلّي عندك الرسمة والفرق التقني والـ trade-off.',
    blocks: [
      { type: 'diagram', kind: 'vm-vs-container', caption: 'الفرق البنيوي: الـ VM بتكرّر نظام التشغيل، والحاوية بتشارك kernel المضيف' },
      {
        type: 'table',
        headers: ['نقطة المقارنة', 'Virtual Machine', 'Container'],
        rows: [
          ['مستوى العزل', 'محاكاة هاردوير (hardware virtualization)', 'عزل على مستوى نظام التشغيل'],
          ['نظام التشغيل', 'Guest OS كامل لكل واحدة', 'بتشارك kernel المضيف'],
          ['الحجم النموذجي', 'جيجابايتات', 'ميجابايتات إلى مئات الميجا'],
          ['زمن الإقلاع', 'دقائق', 'ثوانٍ أو أقل'],
          ['قوة الحد الأمني', 'أقوى (سطح هجوم أضيق بين الأنظمة)', 'قوي، لكن kernel مشترك = مخاطرة مشتركة'],
          ['الأنسب لـ', 'أنظمة مختلفة، عزل عملاء غير موثوقين', 'تغليف التطبيقات والخدمات و CI'],
        ],
      },
      {
        type: 'deep',
        term: 'Namespaces',
        en: 'Linux namespaces',
        what: 'خاصية في Linux kernel بتخلّي كل مجموعة عمليات تشوف "نسخة خاصة" من موارد النظام: قائمة العمليات، الشبكة، نظام الملفات، اسم الجهاز.',
        why: 'الفايدة إن العملية جوه الحاوية تفتكر إنها لوحدها على الجهاز: ترقيم عملياتها يبدأ من 1، وبتشوف كروت شبكة خاصة بيها. ده اللي بيمنع تطبيق من التلصص أو التلاعب في تطبيق تاني.',
        how: 'الـ kernel بيعمل namespace لكل نوع: PID (العمليات)، NET (الشبكة)، MNT (نقاط التحميل)، UTS (اسم الجهاز)، IPC (التواصل بين العمليات)، USER (المستخدمين). الحاوية = مجموعة من الـ namespaces دي مع بعض.',
        use: 'مش بتتعامل معاها بشكل مباشر عادةً — Docker بيعملها لك. بس تقدر تشوف أثرها: docker exec وبعدين ps بيوريك عمليات الحاوية بس، و ip addr بيوريك شبكتها بس.',
        withWhat: 'بتشتغل جنب cgroups (حدود الموارد) و capabilities (الصلاحيات) و seccomp (تصفية system calls).',
        example: {
          title: 'اتفرج على العزل بنفسك',
          lang: 'bash',
          code: `docker run --rm -it alpine sh
# جوه الحاوية:
ps aux        # هتلاقي عمليات قليلة جدًا و PID 1 هو الشِل
hostname      # اسم مختلف عن جهازك
ip addr       # كارت شبكة خاص بالحاوية`,
        },
        gotcha: 'العزل مش مطلق: الـ kernel مشترك. ثغرة خطيرة في الـ kernel أو تشغيل الحاوية بـ --privileged بيضعّف الحد الأمني ده جدًا.',
      },
      {
        type: 'deep',
        term: 'cgroups',
        en: 'Control groups',
        what: 'خاصية في Linux بتحدّد وتحاسب استهلاك الموارد لمجموعة عمليات: المعالج، الذاكرة، الـ I/O.',
        why: 'الفايدة الأساسية منع "الجار المزعج": حاوية واحدة بتسرّب ذاكرة متقدرش تقتل السيرفر كله. وكمان بتخليك تحجز نصيب عادل لكل خدمة.',
        how: 'بتحدّد سقف (limit) وأوزان مشاركة (shares). لما الحاوية تتعدى سقف الذاكرة، الـ kernel بيقتل العملية (حالة OOMKilled).',
        use: 'من خلال أعلام docker run: --memory و --cpus و --pids-limit. وفي Compose عبر deploy.resources أو mem_limit.',
        withWhat: 'بتتجمع مع المراقبة (docker stats) وسياسات إعادة التشغيل (--restart) عشان الخدمة ترجع بعد ما تتقتل.',
        example: {
          title: 'حدود واقعية لخدمة',
          lang: 'bash',
          code: `docker run -d --name api \\
  --memory 512m \\
  --cpus 1.5 \\
  --restart unless-stopped \\
  myapi:1.0

docker stats api   # متابعة الاستهلاك الحقيقي`,
        },
        gotcha: 'لو حاويتك بتقفل من غير سبب واضح، شوف docker inspect وابحث عن OOMKilled — غالبًا سقف الذاكرة أقل من احتياج التطبيق.',
      },
      {
        type: 'ask',
        q: 'لو الحاوية بتشارك kernel، إزاي بتشتغل Linux images على Mac؟',
        a: 'Docker Desktop بيشغّل جواه Linux VM خفيفة، والحاويات كلها بتشتغل جوه الـ VM دي. يعني على Mac أنت فعليًا بتستخدم VM واحدة + حاويات كتير جواها. عشان كده أداء الملفات المرتبطة بالـ bind mounts أبطأ على Mac من Linux.',
      },
      {
        type: 'ask',
        q: 'إيه OCI ولّيه مهم أعرفه؟',
        a: 'OCI هي Open Container Initiative — مواصفات قياسية لشكل الصورة (image spec) وطريقة التشغيل (runtime spec). أهميتها إن الصورة اللي بتبنيها بـ Docker تشتغل على أدوات تانية زي Podman أو containerd في Kubernetes. يعني أنت مش مربوط بأداة واحدة.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: اشرحلي namespaces و cgroups في سطرين.',
        answerAr:
          'باختصار محفوظ: namespaces بتحدد العملية "تشوف إيه"، و cgroups بتحدد "تستهلك قد إيه". الاتنين مع نظام ملفات الطبقات هما أساس سلوك الحاوية.',
        sayEn:
          'Namespaces control what a process can see — its process tree, network, and mounts. cgroups control how much CPU, memory, and I/O it can consume.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: الحاويات آمنة؟ (Are containers secure by default?)',
        answerAr:
          'الرد المتوازن: الحاويات بتوفّر عزل جيد افتراضيًا، بس مش حد أمني بقوة الـ VM لأن الـ kernel مشترك. الأمان بيبقى مقبول لما نضيف طبقات: مستخدم غير root، صور صغيرة ومحدّثة، منع --privileged، حدود موارد، وفحص الصور للثغرات.',
        sayEn:
          'Containers provide good isolation but share the host kernel, so they are not a strong security boundary like VMs. In practice we harden them with non-root users, minimal updated base images, no privileged mode, resource limits, and image scanning.',
      },
    ],
  },
  {
    id: 'architecture',
    nav: 'المعمارية',
    title: 'المعمارية — مين بيعمل إيه لما تكتب أمر',
    lead: 'لما تعرف السلسلة اللي الأمر بيمشي فيها، حل المشاكل بيتحوّل من تخمين إلى منهج.',
    blocks: [
      { type: 'diagram', kind: 'architecture', caption: 'من الأمر اللي بتكتبه لحد العملية المعزولة اللي بتشتغل فعلًا' },
      {
        type: 'steps',
        items: [
          {
            title: 'Docker CLI — العميل',
            text: 'الأداة اللي بتكتب فيها الأوامر. هي مش بتشغّل حاويات بنفسها؛ بتحوّل أمرك لطلب API وتبعته للـ daemon. عشان كده ممكن يكون الـ CLI عندك والـ engine على سيرفر بعيد.',
          },
          {
            title: 'dockerd — الخدمة الخلفية (Daemon)',
            text: 'العقل المدبّر: بيستقبل الطلبات، يدير الصور والحاويات والشبكات والـ volumes، ويكلّم الـ Registry. لو هو واقف، كل الأوامر هتفشل برسالة Cannot connect to the Docker daemon.',
          },
          {
            title: 'containerd — مدير دورة الحياة',
            text: 'طبقة أدنى مسؤولة عن جلب الصور وتشغيل/إيقاف الحاويات ومتابعتها. هي المعيارية اللي Kubernetes كمان بيستخدمها.',
          },
          {
            title: 'runc — المشغّل الفعلي',
            text: 'أداة صغيرة بتنفّذ مواصفة OCI: بتاخد rootfs + إعدادات وتخلق العملية المعزولة بالـ namespaces و cgroups، وبعدين بتسلّم وتخرج.',
          },
          {
            title: 'Registry — المخزن',
            text: 'مكان تخزين الصور وتوزيعها: Docker Hub أو GitHub Container Registry أو AWS ECR أو Registry داخلي للشركة.',
          },
        ],
      },
      {
        type: 'deep',
        term: 'Docker daemon socket',
        en: '/var/run/docker.sock',
        what: 'ملف socket محلي بيمثّل قناة الاتصال بين الـ CLI والـ daemon على نفس الجهاز.',
        why: 'فايدته إنه بيخلّي أي أداة تقدر تكلّم Docker برمجيًا (أدوات CI، لوحات إدارة، مكتبات). وفهمه بيفسّرلك أخطاء الصلاحيات على Linux.',
        how: 'الـ CLI بيبعت طلبات HTTP على الـ socket ده. صلاحيات الملف بتحدد مين يقدر يتكلم مع الـ engine.',
        use: 'على Linux لو ظهرت permission denied، الحل الشائع: إضافة مستخدمك لمجموعة docker وإعادة تسجيل الدخول.',
        withWhat: 'بيرتبط بأمان المضيف بشكل مباشر، وبأدوات CI اللي بتبني صور جوه حاويات.',
        example: {
          title: 'إصلاح صلاحيات على Linux',
          lang: 'bash',
          code: `sudo usermod -aG docker $USER
# سجّل خروج ودخول تاني عشان المجموعة تتفعّل
docker info`,
        },
        gotcha: 'خطر أمني مهم: أي حاوية بتوصل للـ socket ده فعليًا عندها صلاحيات جذرية على المضيف. متعمِلش mount له إلا وأنت فاهم النتيجة.',
      },
      {
        type: 'ask',
        q: 'إيه الفرق بين docker version و docker info؟',
        a: 'docker version بتقولك نسخ العميل والسيرفر — مفيدة تعرف إن الـ engine واصل أصلاً. docker info بتديك حالة الـ engine بالتفصيل: عدد الصور والحاويات، storage driver، نظام اللوجز، الموارد المتاحة. في أي تحقيق مشكلة، ابدأ بـ info.',
      },
      {
        type: 'ask',
        q: 'يعني إيه إن Docker "client-server"؟ وإيه فايدة ده عمليًا؟',
        a: 'معناه إن اللي بتكتب فيه (client) منفصل عن اللي بينفّذ (server/daemon)، والاتصال بينهم بـ API. الفايدة العملية: تقدر تدير Docker على سيرفر بعيد من جهازك، وتقدر تبني أدوات وتكاملات فوق الـ API نفسه بدل ما تتعامل مع أوامر نصية.',
      },
      {
        type: 'ask',
        q: 'لما أعمل docker run لصورة مش موجودة، إيه اللي يحصل بالترتيب؟',
        a: 'أربع خطوات: (1) الـ CLI يبعت الطلب للـ daemon. (2) الـ daemon ميلاقيش الصورة محليًا فيعمل pull من الـ Registry وينزّل الطبقات الناقصة بس. (3) يعمل حاوية جديدة ويضيف طبقة الكتابة ويهيّئ الشبكة والتخزين. (4) يشغّل الأمر المحدد في ENTRYPOINT/CMD كعملية PID 1.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: بيحصل إيه بالظبط وقت docker run؟',
        answerAr:
          'أرد بالسلسلة: العميل يبعت طلب للـ daemon، الـ daemon يجيب الصورة لو ناقصة، ينشئ الحاوية بطبقة كتابة، يجهّز الشبكة والتخزين المطلوبين، وبعدين containerd/runc يشغّلوا العملية الأساسية داخل namespaces و cgroups.',
        sayEn:
          'The CLI sends an API request to the daemon; it pulls the image if missing, creates the container with a writable layer, wires up networking and storage, then containerd and runc start the main process inside its namespaces and cgroups.',
      },
    ],
  },
  {
    id: 'install',
    nav: 'التثبيت والتحقق',
    title: 'التثبيت والتحقق — أول خمس دقايق',
    lead: 'الشرح النظري ملوش قيمة قبل ما تشغّل أول حاوية بنفسك وتتأكد إن السلسلة كلها سليمة.',
    blocks: [
      {
        type: 'teach',
        title: 'المدرّس',
        text: 'على Mac و Windows بتستخدم Docker Desktop (وجواه Linux VM خفيفة + واجهة). على Linux بتستخدم Docker Engine مباشرة. بعد التثبيت فيه اختبار عالمي واحد: docker run hello-world. لو الرسالة ظهرت، يعني العميل بيكلّم الـ daemon، والـ daemon قدر ينزّل من الـ Registry، وقدر يشغّل حاوية فعلًا. اختبار واحد بيغطّي السلسلة كلها.',
      },
      {
        type: 'code',
        title: 'macOS',
        lang: 'bash',
        code: `brew install --cask docker
# افتح تطبيق Docker Desktop مرة واحدة عشان الـ engine يقلع
docker version
docker info
docker run hello-world`,
      },
      {
        type: 'code',
        title: 'Ubuntu / Debian (الطريقة الرسمية بإيجاز)',
        lang: 'bash',
        code: `# اتبع مستودع Docker الرسمي من docs.docker.com
sudo usermod -aG docker $USER   # عشان تشتغل من غير sudo
# سجّل خروج ودخول
docker run hello-world`,
      },
      {
        type: 'ul',
        items: [
          'Windows: فعّل WSL2 وخلّي الـ backend عليه — الأداء أفضل بكتير',
          'اتأكد إن Docker Desktop شغال قبل أي أمر، مش مجرد متثبّت',
          'docker compose version للتأكد إن Compose جاهز (بقى مدمج كـ plugin)',
        ],
      },
      {
        type: 'ask',
        q: 'إيه الفرق بين Docker Desktop و Docker Engine؟',
        a: 'Docker Engine هو الـ daemon والـ CLI (اللي بيشتغل أصلاً على Linux). Docker Desktop حزمة كاملة لأنظمة Mac/Windows: فيها الـ Engine جوه Linux VM مُدارة، زائد واجهة رسومية، وKubernetes اختياري، وإعدادات موارد. على سيرفرات الإنتاج بتستخدم Engine، على جهازك بتستخدم Desktop غالبًا.',
      },
      {
        type: 'ask',
        q: 'محتاج أعمل حساب Docker Hub؟',
        a: 'لتنزيل الصور العامة: مش لازم في الأغلب، بس فيه حدود على عدد التنزيلات للمستخدمين المجهولين. لرفع صورك (push) لازم تسجّل دخول بـ docker login. في الشركات غالبًا هتستخدم Registry خاص.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إزاي تتأكد إن Docker سليم على جهاز جديد؟',
        answerAr:
          'خطوات مرتبة: docker version للتأكد إن العميل والسيرفر متوافقين، docker info لحالة الـ engine ومساحة القرص، وبعدين تشغيل حاوية بسيطة زي hello-world للتأكد من مسار السحب والتشغيل. لو الثلاثة تمام، الأساس سليم.',
        sayEn:
          'I check docker version and docker info, then run a small container like hello-world to validate the pull and run path end to end.',
      },
    ],
  },
  {
    id: 'images',
    nav: 'Images والطبقات',
    title: 'Images والطبقات — الفهم اللي بيوفّر وقت ومساحة',
    lead: 'الطبقات مش تفصيلة أكاديمية: هي السبب في سرعة البناء، وحجم الصورة، وسرعة النشر.',
    blocks: [
      { type: 'diagram', kind: 'image-layers', caption: 'الصورة طبقات ثابتة مشتركة، والحاوية بتضيف طبقة كتابة خاصة بيها' },
      {
        type: 'deep',
        term: 'الطبقات',
        en: 'Layers',
        what: 'كل طبقة هي مجموعة تغييرات على نظام الملفات (إضافة/تعديل/حذف ملفات) ناتجة عن تعليمة في الـ Dockerfile.',
        why: 'ليها ثلاث فوايد مباشرة: (1) التخزين المؤقت — التعليمة اللي متغيّرتش متتنفّذش تاني فالبناء يبقى أسرع. (2) المشاركة — عشر صور على نفس الأساس بتخزّن الأساس مرة واحدة. (3) النقل الجزئي — الـ pull بينزّل الطبقات الناقصة بس.',
        how: 'نظام الملفات بيركّب الطبقات فوق بعض (union mount) ويقدّم للحاوية شكل واحد مدمج. أي كتابة وقت التشغيل بتروح لطبقة الكتابة العليا (copy-on-write).',
        use: 'بتستفيد منها عمليًا بترتيب تعليمات الـ Dockerfile: الحاجات الثابتة فوق (التثبيت)، والمتغيرة تحت (الكود). وبتفحصها بـ docker history.',
        withWhat: 'مرتبطة بـ .dockerignore (بيقلل اللي يتنسخ)، وbuild cache، وحجم الصورة النهائي، وmulti-stage builds.',
        example: {
          title: 'شوف الطبقات وحجم كل واحدة',
          lang: 'bash',
          code: `docker history nginx:1.27
docker image ls
docker system df       # مساحة الصور والحاويات والـ volumes`,
        },
        gotcha: 'حذف ملف في طبقة لاحقة مش بيصغّر الصورة — الملف موجود في الطبقة القديمة. عشان كده لو نزّلت ملف كبير ثم مسحته في RUN تانية، الحجم بيفضل. الحل: نفس تعليمة RUN، أو multi-stage.',
      },
      {
        type: 'deep',
        term: 'الوسم والبصمة',
        en: 'Tag & Digest',
        what: 'الـ tag اسم مقروء لنسخة الصورة (مثل app:1.4.2)، والـ digest بصمة تشفيرية (sha256) لمحتوى الصورة بالظبط.',
        why: 'الفايدة إن الـ tag بيسهّل التعامل اليومي، والـ digest بيضمن إعادة الإنتاج (reproducibility) لأنه مش بيتغيّر أبدًا لنفس المحتوى.',
        how: 'الـ tag مؤشّر متحرك: تقدر تعيد وسم صورة تانية بنفس الاسم. الـ digest محسوب من المحتوى، فأي تغيير بيغيّره.',
        use: 'في التطوير استخدم tags واضحة. في الإنتاج والـ CI ثبّت digest للخدمات الحساسة: image@sha256:...',
        withWhat: 'بيتجمع مع الـ Registry وسياسات النشر وrollback (ترجع لـ tag أو digest قديم).',
        example: {
          title: 'التثبيت الدقيق',
          lang: 'bash',
          code: `docker pull nginx:1.27
docker inspect --format '{{index .RepoDigests 0}}' nginx:1.27
# استخدام digest لضمان نفس البايتات
docker pull nginx@sha256:...`,
        },
        gotcha: 'الاعتماد على latest في الإنتاج بيخلّي النشر غير قابل للتكرار: نفس الأمر النهاردة وبكرة ممكن يجيب صورتين مختلفتين.',
      },
      {
        type: 'code',
        title: 'أوامر الصور الأساسية بشرح سريع',
        lang: 'bash',
        code: `docker pull redis:7-alpine     # نزّل صورة
docker image ls                # اعرض الصور المحلية
docker history redis:7-alpine  # طبقات الصورة
docker inspect redis:7-alpine  # كل الميتاداتا (JSON)
docker image rm redis:7-alpine # احذف صورة
docker image prune             # احذف الصور المعلّقة (dangling)
docker image prune -a          # احذف كل صورة مش مستخدمة (خُد بالك)`,
      },
      {
        type: 'ask',
        q: 'إيه معنى صورة "dangling"؟',
        a: 'صورة من غير وسم (بتظهر بـ none)، وعادةً بتنتج لما تبني صورة بنفس الوسم مرة تانية فالقديمة تفقد اسمها. مساحتها بتفضل محجوزة. docker image prune بيمسح النوع ده بأمان في الغالب.',
      },
      {
        type: 'ask',
        q: 'ليه صورة alpine صغيرة كده؟ وهل أستخدمها دايمًا؟',
        a: 'alpine توزيعة مصمّمة صغيرة (حوالي 5 ميجا) وبتستخدم musl libc بدل glibc. مش دايمًا الخيار الصح: بعض المكتبات المبنية على glibc بتكسر أو تحتاج تجميع، والتصحيح بيبقى أصعب. البديل المتوازن غالبًا نسخ slim (زي python:3.12-slim).',
      },
      {
        type: 'ask',
        q: 'إزاي أعرف ليه صورتي حجمها كبير؟',
        a: 'ابدأ بـ docker history لترى أضخم طبقة، وبعدين اسأل: هل بنسخ ملفات مش محتاجها (node_modules، ملفات build)? هل بثبّت أدوات تطوير في صورة التشغيل؟ هل الكاش الخاص بمدير الحزم متمسوح في نفس الـ RUN؟ الحل الأقوى عادةً multi-stage.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إيه الطبقة وليه ترتيبها مهم؟',
        answerAr:
          'الطبقة تغيير على نظام الملفات ناتج عن تعليمة، والـ cache محسوب لكل تعليمة بالترتيب. لو حطيت نسخ الكود قبل تثبيت الاعتماديات، أي تعديل بسيط في الكود بيبطل الكاش ويعيد التثبيت. عشان كده بنحط الثابت فوق والمتغيّر تحت.',
        sayEn:
          'A layer is a filesystem diff produced by an instruction, and the build cache is keyed per instruction in order, so stable steps must come before frequently changing ones.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إزاي تقلل حجم الصورة؟',
        answerAr:
          'أربع أدوات مرتّبة: (1) صورة أساس أصغر مناسبة للغة. (2) multi-stage عشان أدوات البناء ما تتشحنش. (3) .dockerignore صارم. (4) دمج خطوات التثبيت ومسح الكاش في نفس تعليمة RUN.',
        sayEn:
          'Smaller base image, multi-stage builds, a strict .dockerignore, and cleaning package caches within the same RUN instruction.',
      },
    ],
  },
  {
    id: 'containers',
    nav: 'تشغيل الحاويات',
    title: 'تشغيل الحاويات — كل flag وليه موجود',
    lead: 'ده الشغل اليومي. بدل ما تحفظ أوامر، افهم كل علم (flag) بيحل مشكلة إيه.',
    blocks: [
      { type: 'diagram', kind: 'lifecycle', caption: 'دورة حياة الحاوية والأوامر اللي بتنقلها بين الحالات' },
      {
        type: 'deep',
        term: 'العملية الأساسية',
        en: 'PID 1 / main process',
        what: 'أول عملية بتشتغل جوه الحاوية، ومصيرها هو مصير الحاوية: لو خرجت، الحاوية بتتوقف.',
        why: 'فهم النقطة دي بيحل أكتر سؤال محيّر: "ليه الحاوية بتقفل فورًا؟". السبب دايمًا إن العملية الأساسية خلصت أو وقعت.',
        how: 'الأمر بيتحدد من ENTRYPOINT/CMD في الصورة، أو من اللي بتكتبه بعد اسم الصورة في docker run.',
        use: 'لما تعمل تحقيق: docker ps -a يوريك كود الخروج، و docker logs يوريك السبب. وتقدر تستبدل الأمر مؤقتًا بشِل للفحص.',
        withWhat: 'بيرتبط بإشارات النظام (SIGTERM وقت الإيقاف) وسياسات إعادة التشغيل و healthchecks.',
        example: {
          title: 'حاوية بتقفل فورًا — وإزاي تفحصها',
          lang: 'bash',
          code: `docker run --name t1 alpine echo "خلصت"
docker ps -a          # هتلاقيها Exited (0) — طبيعي، الأمر خلص

# افتح شِل بدل الأمر الأصلي للتحقيق
docker run --rm -it --entrypoint sh myapi:1.0`,
        },
        gotcha: 'لو التطبيق بيتعامل مع SIGTERM غلط، الإيقاف بياخد 10 ثواني وبعدين يتقتل بالعافية. تعامل مع الإشارة عشان الإغلاق يبقى نظيف.',
      },
      {
        type: 'diagram',
        kind: 'port-mapping',
        caption: 'ربط المنافذ: -p HOST:CONTAINER — والتطبيق لازم يسمع على 0.0.0.0 جوه الحاوية',
      },
      {
        type: 'table',
        headers: ['العلم (flag)', 'بيعمل إيه', 'بتستخدمه إمتى'],
        rows: [
          ['-d', 'تشغيل في الخلفية', 'الخدمات طويلة العمر زي سيرفر ويب'],
          ['-it', 'تفاعل + طرفية', 'لما تحتاج شِل أو أداة تفاعلية'],
          ['--name', 'اسم ثابت للحاوية', 'عشان تناديها في الأوامر والشبكة'],
          ['-p 8080:80', 'تعريض منفذ للمضيف', 'لما تحتاج توصل للخدمة من برّه'],
          ['-e KEY=value', 'متغير بيئة', 'الإعدادات وأسرار وقت التشغيل'],
          ['--env-file', 'قراءة متغيرات من ملف', 'إعدادات كثيرة منظّمة'],
          ['-v name:/path', 'ربط تخزين دائم', 'قواعد بيانات وملفات مرفوعة'],
          ['--rm', 'حذف تلقائي بعد الخروج', 'أوامر لمرة واحدة وتجارب'],
          ['--network', 'اختيار الشبكة', 'ربط خدمات ببعضها بالاسم'],
          ['--restart', 'سياسة إعادة التشغيل', 'استمرارية الخدمة بعد الأعطال'],
          ['--memory / --cpus', 'حدود موارد', 'حماية السيرفر من خدمة شرهة'],
          ['--entrypoint', 'استبدال نقطة الدخول', 'التحقيق والصيانة'],
        ],
      },
      {
        type: 'code',
        title: 'أوامر التشغيل والمتابعة اللي هتستخدمها كل يوم',
        lang: 'bash',
        code: `docker run -d --name web -p 8080:80 nginx:1.27
docker ps                       # الشغال بس
docker ps -a                    # كل حاجة بما فيها الواقف
docker logs -f --tail 100 web   # آخر 100 سطر ومتابعة مستمرة
docker exec -it web sh          # دخول شِل جوه الحاوية
docker inspect web              # الإعدادات الكاملة
docker stats                    # استهلاك حقيقي لحظي
docker stop web && docker rm web`,
      },
      {
        type: 'deep',
        term: 'سياسة إعادة التشغيل',
        en: 'Restart policy',
        what: 'إعداد بيقول للـ daemon يعمل إيه لو الحاوية وقعت أو الجهاز اتعمله restart.',
        why: 'الفايدة إن الخدمة ترجع لوحدها بدون تدخل بشري — أبسط شكل من أشكال المرونة (resilience).',
        how: 'فيه أربع قيم: no (الافتراضي)، on-failure (لو كود الخروج مش صفر، وتقدر تحدد عدد محاولات)، always (دايمًا حتى بعد إيقاف يدوي وإعادة تشغيل الـ daemon)، unless-stopped (زي always بس بيحترم إنك وقّفتها يدوي).',
        use: 'للخدمات الإنتاجية على سيرفر واحد: unless-stopped غالبًا الاختيار العملي. مع Compose: restart: unless-stopped.',
        withWhat: 'بيتجمع مع healthcheck (لكشف الخدمة الميتة منطقيًا) ومع اللوجز للتحليل بعد الحادث.',
        example: {
          title: 'خدمة بترجع لوحدها',
          lang: 'bash',
          code: `docker run -d --name api \\
  --restart unless-stopped \\
  -p 3000:3000 myapi:1.0

docker inspect -f '{{.RestartCount}}' api   # عدد مرات الرجوع`,
        },
        gotcha: 'إعادة التشغيل التلقائي بتخفي المشكلة الأصلية. لو RestartCount بيزيد، ده مؤشر عطل حقيقي محتاج تحقيق مش تجاهل.',
      },
      {
        type: 'ask',
        q: 'إيه الفرق بين docker stop و docker kill؟',
        a: 'stop بيبعت إشارة SIGTERM ويستنى مدة سماح (10 ثواني افتراضيًا) عشان التطبيق يقفل نفسه بشكل نظيف، وبعدها بيبعت SIGKILL. kill بيبعت SIGKILL فورًا. في الإنتاج استخدم stop عشان تسمح بإغلاق الاتصالات وكتابة البيانات المعلّقة.',
      },
      {
        type: 'ask',
        q: 'إيه الفرق بين docker exec و docker attach؟',
        a: 'exec بيفتح عملية جديدة جوه الحاوية — أأمن وأشهر للتحقيق (زي فتح شِل). attach بيوصلك للعملية الأساسية نفسها، فلو عملت Ctrl+C ممكن توقف التطبيق فعليًا.',
      },
      {
        type: 'ask',
        q: 'شغّلت التطبيق بـ -p 3000:3000 ومش شايفه على localhost — ليه؟',
        a: 'أشهر سبب: التطبيق سامع على 127.0.0.1 جوه الحاوية، ولمّا يسمع على العنوان الداخلي بس مفيش حاجة تجيله من برّه. لازم يسمع على 0.0.0.0. السبب التاني: عكس ترتيب المنافذ. والتالت: التطبيق أصلاً واقع — شوف اللوجز.',
      },
      {
        type: 'ask',
        q: 'إزاي أنقل ملف بيني وبين الحاوية؟',
        a: 'بـ docker cp: من الحاوية لجهازك docker cp web:/etc/nginx/nginx.conf ./ وبالعكس docker cp ./file web:/tmp/. مفيد في التحقيق، لكنه مش بديل للـ volumes في الاستخدام الدائم.',
      },
      {
        type: 'ask',
        q: 'إمتى أستخدم --rm؟',
        a: 'في أي أمر لمرة واحدة: تجربة صورة، تشغيل أداة، فحص سريع. بيمنع تراكم حاويات ميتة على جهازك. متستخدموش لخدمة إنتاجية عايز تفحص لوجزها بعد ما تقع.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: حاوية بتقفل فورًا بعد التشغيل — تعمل إيه؟',
        answerAr:
          'منهج مرتب: docker ps -a لمعرفة كود الخروج، docker logs لقراءة سبب الانهيار، وبعدين لو محتاج أفحص جوه الصورة أشغّلها بـ --entrypoint sh عشان أتأكد من وجود الملفات والأمر الصح. وأراجع ENTRYPOINT/CMD في الصورة.',
        sayEn:
          'I check the exit code with docker ps -a, read docker logs for the crash reason, then if needed I override the entrypoint with a shell to inspect the image and verify the command and files.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إزاي تحقّق إغلاق نظيف (graceful shutdown) للحاوية؟',
        answerAr:
          'أضمن إن التطبيق هو PID 1 ويستقبل SIGTERM ويقفل عليه: يوقف استقبال طلبات جديدة، يخلّص الطلبات الجارية، يقفل اتصالات قاعدة البيانات. وأستخدم شكل exec في CMD عشان الإشارة توصل للتطبيق مش للشِل.',
        sayEn:
          'Make the app PID 1, handle SIGTERM to drain in-flight requests and close connections, and use the exec form of CMD so signals reach the process instead of a shell wrapper.',
      },
    ],
  },
]
