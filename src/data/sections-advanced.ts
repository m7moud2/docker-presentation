import type { Section } from './types'

export const advancedSections: Section[] = [
  {
    id: 'dockerfile',
    nav: 'Dockerfile',
    title: 'Dockerfile — كل تعليمة بتعمل إيه وفايدتها إيه',
    lead: 'الـ Dockerfile هو عقد البناء. كل سطر قرار بيأثر على الحجم والأمان وسرعة البناء.',
    blocks: [
      {
        type: 'teach',
        title: 'المدرّس',
        text: 'فكّر في الـ Dockerfile كوصفة مكتوبة بالترتيب. أهم تمييز لازم يثبت في دماغك: فيه تعليمات بتتنفّذ وقت البناء (build time) زي RUN و COPY، وفيه تعليمات بتوصف سلوك التشغيل (runtime) زي CMD و ENTRYPOINT. الخلط بين الاتنين هو مصدر معظم الأخطاء.',
      },
      {
        type: 'deep',
        term: 'FROM',
        en: 'FROM',
        what: 'بتحدد الصورة الأساسية اللي هتبني فوقها.',
        why: 'الفايدة إنك مش بتبدأ من الصفر: بتاخد نظام ملفات ولغة وأدوات جاهزة. واختيارها بيحدد حجمك وأمانك ابتداءً.',
        how: 'Docker بينزّل الصورة الأساسية وطبقاتها وبيخلّيها الطبقة الأولى في صورتك.',
        use: 'اختار نسخة محددة (مثلاً node:22-alpine) مش latest، وفضّل نسخ slim أو alpine لو مكتباتك متوافقة.',
        withWhat: 'بتتجمع مع multi-stage (أكتر من FROM في نفس الملف) ومع سياسة تحديث الصور الأمنية.',
        example: { lang: 'dockerfile', code: `FROM node:22-alpine\n# أو للبناء متعدد المراحل:\nFROM golang:1.22 AS build` },
        gotcha: 'استخدام FROM node بدون نسخة معناه إن بناء بكرة ممكن يجيب نسخة مختلفة تكسر مشروعك.',
      },
      {
        type: 'deep',
        term: 'WORKDIR',
        en: 'WORKDIR',
        what: 'بتحدد مجلد العمل الافتراضي لكل التعليمات اللي بعدها ولوقت التشغيل كذلك.',
        why: 'بتمنع مسارات مكسّرة وبتخلّي الملف مقروء: بدل ما تكتب مسار كامل في كل أمر، بتقول مرة واحدة أنا شغال في /app.',
        how: 'زي cd دائم، وبيعمل المجلد لو مش موجود.',
        use: 'حدّدها بعد FROM مباشرة، وخلّي كل COPY و RUN نسبية لها.',
        withWhat: 'بتتجمع مع COPY (المسار النسبي) ومع CMD (مكان التنفيذ).',
        example: { lang: 'dockerfile', code: `WORKDIR /app\nCOPY package*.json ./\nRUN npm ci` },
        gotcha: 'الاعتماد على RUN cd /app بدل WORKDIR ملهوش أثر دائم — كل RUN بتشتغل في shell منفصل.',
      },
      {
        type: 'deep',
        term: 'COPY مقابل ADD',
        en: 'COPY vs ADD',
        what: 'الاتنين بينسخوا ملفات من سياق البناء للصورة، لكن ADD عندها سلوك إضافي: بتفك ملفات الأرشيف وبتقدر تنزّل من رابط.',
        why: 'الفايدة من تفضيل COPY إن سلوكها متوقّع وواضح — والسلوك المتوقّع في البناء يعني أخطاء أقل ومراجعة أسهل.',
        how: 'COPY بتاخد المصدر من build context (المجلد اللي بعتته للـ daemon) والهدف داخل الصورة.',
        use: 'استخدم COPY دايمًا تقريبًا. استخدم ADD بس لو محتاج فك أرشيف محلي فعلًا.',
        withWhat: 'مرتبطة جدًا بـ .dockerignore (بيحدد إيه اللي يوصل للسياق أصلاً) وبالـ cache.',
        example: {
          lang: 'dockerfile',
          code: `COPY package*.json ./\nCOPY src ./src\n# لتحديد ملكية الملفات مباشرة:\nCOPY --chown=node:node . .`,
        },
        gotcha: 'تنزيل ملفات بـ ADD من رابط بيخلّي البناء غير قابل للتكرار ومش قابل للكاش بشكل جيد؛ استخدم RUN مع أداة تنزيل وتحقّق من الـ checksum.',
      },
      {
        type: 'deep',
        term: 'RUN',
        en: 'RUN',
        what: 'بتنفّذ أمر وقت البناء والنتيجة بتتحوّل لطبقة في الصورة.',
        why: 'هي المكان اللي بتثبّت فيه الحزم وتبني فيه المشروع. والفايدة الكبيرة إن ناتجها بيتخزّن مؤقتًا فمش بيتكرر كل مرة.',
        how: 'كل RUN بتعمل طبقة جديدة. عشان كده دمج الأوامر المرتبطة في RUN واحدة بيقلل عدد الطبقات وبيسمح بمسح الكاش في نفس الطبقة.',
        use: 'اربط الأوامر بـ && واقسم السطور بـ backslash للقراءة، وامسح كاش مدير الحزم في نفس الأمر.',
        withWhat: 'بتتجمع مع WORKDIR ومع ترتيب الطبقات وسياسة الكاش.',
        example: {
          title: 'تثبيت نظيف على Debian/Ubuntu',
          lang: 'dockerfile',
          code: `RUN apt-get update \\
 && apt-get install -y --no-install-recommends curl ca-certificates \\
 && rm -rf /var/lib/apt/lists/*`,
        },
        gotcha: 'لو مسحت الكاش في RUN لاحقة، المساحة مش بترجع لأن الملفات موجودة في طبقة أقدم. المسح لازم يكون في نفس الـ RUN.',
      },
      {
        type: 'deep',
        term: 'ENV مقابل ARG',
        en: 'ENV vs ARG',
        what: 'ARG متغير متاح وقت البناء فقط. ENV متغير بيتحفظ في الصورة ويكون متاح وقت التشغيل كذلك.',
        why: 'الفايدة إنك تفصل بين إعدادات البناء (مثلاً نسخة أداة) وإعدادات التشغيل (مثلاً NODE_ENV). والفهم ده مهم أمنيًا كمان.',
        how: 'ARG بتتمرر بـ --build-arg وقت البناء وبتختفي بعدها. ENV بتفضل في ميتاداتا الصورة ويقدر أي حد يقراها بـ inspect.',
        use: 'استخدم ARG لنسخ الأدوات والاختيارات وقت البناء، وENV للإعدادات غير الحساسة وقت التشغيل، ومرّر الأسرار وقت التشغيل بس.',
        withWhat: 'بتتجمع مع --build-arg وبالـ secrets في BuildKit للأسرار وقت البناء.',
        example: {
          lang: 'dockerfile',
          code: `ARG NODE_VERSION=22\nFROM node:\${NODE_VERSION}-alpine\n\nENV NODE_ENV=production\nENV PORT=3000`,
        },
        gotcha: 'متحطّش سر في ARG ولا ENV: قيم البناء بتظهر في تاريخ الصورة، وENV بيتقرأ بـ docker inspect بسهولة.',
      },
      {
        type: 'deep',
        term: 'CMD مقابل ENTRYPOINT',
        en: 'CMD vs ENTRYPOINT',
        what: 'ENTRYPOINT هو البرنامج الثابت اللي الحاوية بتشتغل بيه. CMD هو الأمر الافتراضي أو الوسائط (arguments) الافتراضية اللي تقدر تستبدلها من سطر الأوامر.',
        why: 'الفايدة إنك تصمّم الصورة زي أداة: نقطة دخول ثابتة + إعدادات قابلة للتغيير. ده بيخلّي الاستخدام مرن ومتوقّع.',
        how: 'لو الاتنين موجودين بصيغة القائمة (exec form)، اللي بتكتبه بعد اسم الصورة بيستبدل CMD ويتحوّل وسائط للـ ENTRYPOINT.',
        use: 'استخدم صيغة القائمة دايمًا: CMD ["node","server.js"]. للأدوات: ENTRYPOINT للبرنامج و CMD للوسائط الافتراضية.',
        withWhat: 'بيرتبط بإشارات الإيقاف (SIGTERM) وبـ --entrypoint وقت التحقيق.',
        example: {
          title: 'صورة تتصرّف كأداة',
          lang: 'dockerfile',
          code: `ENTRYPOINT ["python", "app.py"]\nCMD ["--port", "8000"]\n\n# docker run img              -> python app.py --port 8000\n# docker run img --port 9000  -> python app.py --port 9000`,
        },
        gotcha: 'صيغة النص (shell form) زي CMD node server.js بتشغّل shell وسط الطريق، فالإشارات مش بتوصل للتطبيق والإغلاق النظيف بيتعطّل.',
      },
      {
        type: 'deep',
        term: 'EXPOSE',
        en: 'EXPOSE',
        what: 'توثيق للمنافذ اللي التطبيق بيسمع عليها داخل الحاوية.',
        why: 'فايدتها تنظيمية وتوثيقية: أي حد يقرأ الصورة يعرف يوصلها إزاي، وبعض الأدوات بتقرأها. مش بتفتح منفذ لوحدها.',
        how: 'بتتسجل في ميتاداتا الصورة فقط. الفتح الحقيقي بيحصل بـ -p وقت التشغيل أو ports في Compose.',
        use: 'حدّدها لكل منفذ خدمة، وخلّيها مطابقة للواقع عشان متضلّلش حد.',
        withWhat: 'بتتجمع مع -p و -P (اللي بينشر كل المنافذ الموثّقة على منافذ عشوائية).',
        example: { lang: 'dockerfile', code: `EXPOSE 3000\n# التشغيل الفعلي:\n# docker run -p 3000:3000 myapp` },
        gotcha: 'ناس كتير بتفتكر EXPOSE بتخلّي الخدمة متاحة من برّه — لأ، لازم -p.',
      },
      {
        type: 'deep',
        term: 'USER',
        en: 'USER',
        what: 'بتحدد المستخدم اللي التعليمات اللي بعدها والعملية وقت التشغيل هتشتغل بيه.',
        why: 'الفايدة أمنية مباشرة: لو حصل اختراق للتطبيق، المهاجم مش هيكون root جوه الحاوية، فقدرته على التخريب أقل.',
        how: 'بتحتاج المستخدم يكون موجود في الصورة (كتير من الصور فيها مستخدم جاهز زي node)، أو تعمله بـ RUN adduser.',
        use: 'حطّها بعد ما تخلّص خطوات التثبيت اللي محتاجة صلاحيات، وقبل CMD.',
        withWhat: 'بتتجمع مع COPY --chown وصلاحيات الـ volumes و read-only filesystem.',
        example: {
          lang: 'dockerfile',
          code: `RUN addgroup -S app && adduser -S app -G app\nCOPY --chown=app:app . .\nUSER app\nCMD ["node","server.js"]`,
        },
        gotcha: 'لو حوّلت لمستخدم عادي وبعدين ربطت volume ملوك root، هتقابل permission denied — خلّي ملكية المسارات متوافقة.',
      },
      {
        type: 'code',
        title: 'Dockerfile كامل بكل الممارسات مجمّعة',
        lang: 'dockerfile',
        code: `# syntax=docker/dockerfile:1
FROM node:22-alpine

WORKDIR /app

# 1) الاعتماديات أولاً (بتتغير قليل) عشان الكاش
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# 2) الكود بعد كده (بيتغير كتير)
COPY . .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

USER node
CMD ["node", "server.js"]`,
      },
      {
        type: 'ask',
        q: 'ليه ننسخ package.json قبل باقي الكود؟ ما هي كلها ملفات!',
        a: 'لأن الكاش بيتحسب لكل تعليمة. لو نسخت كل حاجة مرة واحدة، أي تعديل بسيط في أي ملف كود بيبطل الكاش ويعيد تثبيت كل الحزم من أول وجديد (دقائق ضايعة كل build). لما تنسخ ملفات الاعتماديات لوحدها وتثبّت، خطوة التثبيت تفضل cached طول ما الاعتماديات ماتغيّرتش.',
      },
      {
        type: 'ask',
        q: 'إيه build context بالظبط؟ وإيه علاقته بسرعة البناء؟',
        a: 'هو المجلد اللي بتقوله للـ docker build (النقطة في الآخر). كل محتواه بيتضغط ويتبعت للـ daemon قبل البناء. لو فيه node_modules أو مجلد .git ضخم، بتضيّع وقت وشبكة قبل أول تعليمة. عشان كده .dockerignore بيقلل الحجم ويسرّع البناء.',
      },
      {
        type: 'ask',
        q: 'ينفع أعمل أكتر من CMD؟',
        a: 'ينفع تكتب أكتر من واحدة بس الأخيرة بس هي اللي هتشتغل — الباقي بيتم تجاهله. نفس الكلام على ENTRYPOINT. لو محتاج تشغّل حاجتين، إمّا حاويتين، أو أداة إدارة عمليات صغيرة، أو سكربت entrypoint واضح.',
      },
      {
        type: 'ask',
        q: 'إيه فايدة سطر syntax في أول الملف؟',
        a: 'بيحدد نسخة محلّل الـ Dockerfile الحديث (BuildKit frontend)، وبيفتحلك ميزات زي RUN --mount للكاش والأسرار. وجوده بيخلّي البناء أحدث وأقوى من غير تغيير في باقي الملف.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إيه أهم 3 ممارسات في Dockerfile؟',
        answerAr:
          'واحد: ترتيب مراعي للكاش (الثابت فوق والمتغيّر تحت). اتنين: multi-stage عشان صورة التشغيل تبقى خفيفة وأدوات البناء ما تتشحنش. تلاتة: صفر أسرار وصفر أدوات زايدة في الصورة النهائية، مع مستخدم غير root.',
        sayEn:
          'Cache-friendly instruction ordering, multi-stage builds to keep the runtime image lean, and never shipping secrets or unnecessary tooling — plus running as a non-root user.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إيه الفرق بين CMD و ENTRYPOINT؟',
        answerAr:
          'ENTRYPOINT بيحدد البرنامج الثابت، وCMD بيحدد الوسائط أو الأمر الافتراضي القابل للاستبدال من سطر الأوامر. الاستخدام الشائع: ENTRYPOINT للأداة وCMD للإعدادات الافتراضية.',
        sayEn:
          'ENTRYPOINT defines the fixed executable, while CMD provides default arguments or a default command that can be overridden at runtime.',
      },
    ],
  },
  {
    id: 'buildcache',
    nav: 'الكاش و BuildKit',
    title: 'الكاش و BuildKit — ليه البناء بطيء وإزاي يبقى سريع',
    lead: 'أسرع مكسب هندسي في Docker هو فهم الكاش. الفرق بين بناء 4 دقايق وبناء 12 ثانية.',
    blocks: [
      { type: 'diagram', kind: 'build-cache', caption: 'نفس الملف بترتيب مختلف: يمين الكاش صامد، شمال كل تعديل بيعيد تثبيت الحزم' },
      {
        type: 'deep',
        term: 'كاش البناء',
        en: 'Build cache',
        what: 'تخزين مؤقت لنتيجة كل تعليمة، بحيث لو التعليمة ومدخلاتها ماتغيّروش، Docker يستخدم الناتج القديم بدل ما ينفّذ تاني.',
        why: 'الفايدة الكبرى: سرعة. البناء بيبقى ثواني بدل دقايق، وده بيأثر على كل push وكل pipeline في اليوم.',
        how: 'الكاش بيتحسب بالترتيب. أول تعليمة تتغيّر مدخلاتها، هي وكل اللي بعدها بيعاد تنفيذهم. بالنسبة لـ COPY المدخل هو محتوى الملفات نفسه (checksum).',
        use: 'رتّب الملف صح، واستخدم --no-cache لو محتاج بناء نظيف، و--pull للتأكد من أحدث صورة أساس.',
        withWhat: 'بيتجمع مع .dockerignore وBuildKit والكاش المشترك في الـ CI (registry cache).',
        example: {
          title: 'تحكم واعي في الكاش',
          lang: 'bash',
          code: `docker build -t app:dev .              # طبيعي مع كاش
docker build --no-cache -t app:clean . # تجاهل الكاش بالكامل
docker build --pull -t app:fresh .     # هات أحدث صورة أساس`,
        },
        gotcha: 'ترتيب غلط واحد (COPY . . قبل تثبيت الحزم) بيلغي فايدة الكاش كلها — وده أشهر سبب لبطء البناء في المشاريع.',
      },
      {
        type: 'deep',
        term: 'BuildKit',
        en: 'BuildKit',
        what: 'محرّك البناء الحديث في Docker (الافتراضي في النسخ الحالية) وبيقدّم بناء متوازي وكاش أذكى وأسرار آمنة وقت البناء.',
        why: 'الفوايد الملموسة: مراحل مستقلة بتتبني بالتوازي، كاش لمجلدات مديري الحزم بين البناءات، وتمرير أسرار من غير ما تتسجّل في الطبقات.',
        how: 'بيبني رسم اعتماديات للتعليمات وينفّذ اللي ممكن يتوازى، ويدعم mounts خاصة وقت البناء (cache/secret/ssh).',
        use: 'مفعّل افتراضيًا. تستفيد منه بإضافة سطر syntax واستخدام RUN --mount لتسريع التثبيت وتأمين الأسرار.',
        withWhat: 'بيتجمع مع docker buildx للبناء متعدد المعماريات ومع كاش الـ CI.',
        example: {
          title: 'كاش لمدير الحزم + سر وقت البناء',
          lang: 'dockerfile',
          code: `# syntax=docker/dockerfile:1

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./

# كاش مجلد npm بين البناءات (سريع جدًا)
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# سر وقت البناء من غير ما يتسجل في الصورة
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci`,
        },
        gotcha: 'كاش الـ BuildKit محلي على الجهاز افتراضيًا؛ في الـ CI لازم تصدّره/تستورده (cache-from / cache-to) وإلا كل build هيبدأ بارد.',
      },
      {
        type: 'deep',
        term: 'التعدد المعماري',
        en: 'Multi-arch / buildx',
        what: 'بناء صورة واحدة تشتغل على أكتر من معمارية معالج (amd64 و arm64) عن طريق manifest واحد.',
        why: 'فايدته الواقعية دلوقتي كبيرة: أجهزة Apple Silicon بمعمارية arm64 والسيرفرات غالبًا amd64. من غير multi-arch الصورة اللي بنيتها على لابتوبك ممكن ما تشتغلش على السيرفر.',
        how: 'buildx بيستخدم emulation أو عقد بناء متعددة، وبيرفع manifest list بيشاور على صورة لكل معمارية.',
        use: 'لما تبني صور بتتنشر على أجهزة مختلفة، أو بتوزّع صورة عامة.',
        withWhat: 'بيتجمع مع الـ Registry (manifest list) ومع الـ CI.',
        example: {
          lang: 'bash',
          code: `docker buildx create --use
docker buildx build \\
  --platform linux/amd64,linux/arm64 \\
  -t myuser/app:1.0 --push .`,
        },
        gotcha: 'رسالة "exec format error" في الغالب معناها إنك بتشغّل صورة مبنية لمعمارية مختلفة عن الجهاز.',
      },
      {
        type: 'ask',
        q: 'إزاي أعرف إن الكاش اشتغل فعلاً؟',
        a: 'من مخرجات البناء: هتلاقي كلمة CACHED جنب الخطوات اللي مااتنفّذتش تاني. لو كل الخطوات بتتنفّذ في كل build، يبقى فيه حاجة بتبطّل الكاش — غالبًا COPY في مكان بدري، أو ملف بيتغيّر في كل مرة (زي ملف build info).',
      },
      {
        type: 'ask',
        q: 'ليه البناء في الـ CI أبطأ من جهازي؟',
        a: 'لأن عامل الـ CI بيبدأ نظيف كل مرة، فمفيش كاش محلي. الحل: تصدير/استيراد الكاش من Registry أو استخدام كاش الـ CI المدمج، ورتّب الملف صح لأن أثر الترتيب بيبقى أكبر لما تبدأ بارد.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: البناء عندنا بياخد 10 دقايق — هتعمل إيه؟',
        answerAr:
          'خطة مرتّبة: أقرأ مخرجات البناء وأشوف أنهي خطوة بتاخد الوقت وأنهي خطوة بتبطّل الكاش. بعدين أعيد ترتيب التعليمات، أضيف .dockerignore، وأضيف كاش لمدير الحزم بـ RUN --mount. لو فيه compile تقيل أستخدم multi-stage وأشارك الكاش في الـ CI عبر registry cache.',
        sayEn:
          'I profile the build output to find the slow and cache-busting steps, reorder instructions, add a strict .dockerignore, enable package-manager cache mounts, and share build cache in CI via a registry cache.',
      },
    ],
  },
  {
    id: 'multistage',
    nav: 'Multi-stage',
    title: 'Multi-stage — صور أصغر وأأمن',
    lead: 'نبني في مرحلة فيها كل الأدوات، ونشحن مرحلة فيها الناتج بس.',
    blocks: [
      { type: 'diagram', kind: 'multistage', caption: 'أدوات البناء بتفضل في المرحلة الأولى، والصورة النهائية بتاخد الناتج بس' },
      {
        type: 'deep',
        term: 'البناء متعدد المراحل',
        en: 'Multi-stage build',
        what: 'أكتر من FROM في نفس الـ Dockerfile، وكل واحدة مرحلة مستقلة، والمرحلة الأخيرة هي الصورة النهائية.',
        why: 'ثلاث فوايد: حجم أصغر بشكل دراماتيكي، سطح هجوم أقل (مفيش compiler ولا أدوات في الإنتاج)، وتنظيم أوضح بين البناء والتشغيل.',
        how: 'بتسمّي المرحلة بـ AS name، وبتنسخ منها الناتج بـ COPY --from=name. باقي المرحلة كلها بيتم إسقاطه.',
        use: 'أي لغة مترجمة (Go, Java, Rust, C#) وأي frontend محتاج build ثم يتقدّم بسيرفر ثابت.',
        withWhat: 'بيتجمع مع الصور الصغيرة (alpine/distroless) ومع BuildKit للبناء المتوازي.',
        example: {
          title: 'Frontend يتبني ويتقدّم بـ nginx',
          lang: 'dockerfile',
          code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80`,
        },
        gotcha: 'متنساش إن أي حاجة في مرحلة البناء مش موجودة في النهائية — لو التطبيق بيحتاج مكتبة وقت التشغيل لازم تثبتها في المرحلة الأخيرة.',
      },
      {
        type: 'code',
        title: 'Go: من مئات الميجا لبضعة ميجا',
        lang: 'dockerfile',
        code: `FROM golang:1.22 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /out/app ./cmd/api

FROM gcr.io/distroless/static:nonroot
COPY --from=build /out/app /app
USER nonroot:nonroot
ENTRYPOINT ["/app"]`,
      },
      {
        type: 'ask',
        q: 'إيه معنى distroless؟ وإيه ثمنه؟',
        a: 'صورة فيها الحد الأدنى لتشغيل التطبيق بس: مفيش مدير حزم ولا شِل. الفايدة: أصغر وأأمن بشكل واضح. الثمن: التحقيق أصعب لأنك مش هتلاقي sh تدخل بيه — بتعتمد على اللوجز وأدوات خارجية أو صورة debug مؤقتة.',
      },
      {
        type: 'ask',
        q: 'ينفع أستهدف مرحلة معيّنة بس؟',
        a: 'أيوه، وده مفيد جدًا للاختبارات: docker build --target build -t app:test . يبني لحد مرحلة اسمها build ويوقف. بتستخدمها في الـ CI لتشغيل الاختبارات في بيئة فيها أدوات التطوير.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إمتى تستخدم multi-stage؟',
        answerAr:
          'كل مرة البناء محتاج أدوات مش لازمة وقت التشغيل: مترجم لغة، SDK، أدوات bundling للفرونتند. النتيجة صورة أصغر وأأمن ونشر أسرع.',
        sayEn:
          'Whenever the build requires toolchains that must not exist at runtime — compilers, SDKs, or frontend bundlers — which yields a smaller and safer runtime image.',
      },
    ],
  },
  {
    id: 'volumes',
    nav: 'التخزين والـ Volumes',
    title: 'التخزين — الداتا لازم تعيش أطول من الحاوية',
    lead: 'الحاوية مؤقتة بطبيعتها. أي داتا مهمة لازم تتخزن برّه طبقة الكتابة.',
    blocks: [
      { type: 'diagram', kind: 'volumes', caption: 'ثلاث طرق تخزين وكل واحدة ليها استخدامها الصح' },
      {
        type: 'deep',
        term: 'Named Volume',
        en: 'Named volume',
        what: 'مساحة تخزين بيديرها Docker بنفسه وليها اسم، ومستقلة تمامًا عن عمر الحاوية.',
        why: 'الفايدة: الداتا بتعيش بعد حذف الحاوية وإعادة إنشائها، والأداء على كل الأنظمة أفضل من bind mount، والنسخ الاحتياطي والنقل أنظف.',
        how: 'Docker بيخزّنها في منطقة يديرها هو، وبيربطها بالمسار اللي تحدده جوه الحاوية.',
        use: 'قواعد البيانات، ملفات المستخدمين المرفوعة، أي حالة (state) لازم تستمر. الشكل: -v اسم:/مسار.',
        withWhat: 'بتتجمع مع Compose (قسم volumes) ومع سكربتات النسخ الاحتياطي.',
        example: {
          title: 'Postgres بداتا دائمة + نسخة احتياطية',
          lang: 'bash',
          code: `docker volume create pgdata
docker run -d --name db \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16

# نسخة احتياطية منطقية
docker exec db pg_dump -U postgres postgres > backup.sql`,
        },
        gotcha: 'أمر docker compose down -v بيمسح الـ volumes ومعاها الداتا. الفرق بين down و down -v هو الفرق بين إعادة تشغيل وكارثة.',
      },
      {
        type: 'deep',
        term: 'Bind Mount',
        en: 'Bind mount',
        what: 'ربط مجلد فعلي من جهازك مباشرة على مسار جوه الحاوية.',
        why: 'الفايدة الأساسية في التطوير: بتعدّل الكود على جهازك والتغيير يبان جوه الحاوية فورًا بدون إعادة بناء الصورة.',
        how: 'Docker بيعمل mount للمسار المضيف فوق المسار الداخلي، فاللي بره هو اللي بيظهر جوه.',
        use: 'التطوير المحلي، وتمرير ملفات إعداد (مثلاً nginx.conf) للقراءة فقط بإضافة :ro.',
        withWhat: 'بيتجمع مع أدوات إعادة التحميل التلقائي (nodemon/vite) ومع Compose في ملف خاص بالتطوير.',
        example: {
          title: 'تطوير مع إعادة تحميل فوري',
          lang: 'bash',
          code: `docker run --rm -it \\
  -v "$PWD":/app \\
  -v /app/node_modules \\
  -w /app -p 3000:3000 \\
  node:22-alpine sh -c "npm install && npm run dev"

# ملف إعداد للقراءة فقط
docker run -v "$PWD/nginx.conf":/etc/nginx/conf.d/default.conf:ro nginx`,
        },
        gotcha: 'ربط مجلد المشروع بيدفن node_modules بتاع الصورة. الحيلة الشائعة: volume فاضي على /app/node_modules زي المثال فوق.',
      },
      {
        type: 'deep',
        term: 'tmpfs',
        en: 'tmpfs mount',
        what: 'تخزين في الذاكرة (RAM) مش على القرص، وبيختفي مع توقف الحاوية.',
        why: 'الفايدة: سرعة عالية وعدم كتابة بيانات حساسة على القرص إطلاقًا.',
        how: 'الـ kernel بيوفّر نظام ملفات في الذاكرة ويتم ربطه على المسار المطلوب.',
        use: 'ملفات مؤقتة، كاش سريع، أو أسرار قصيرة العمر لازم ما تلمسش القرص.',
        withWhat: 'بيتجمع مع read-only root filesystem: تخلّي الجذر للقراءة وتفتح tmpfs للمسارات اللي محتاجة كتابة.',
        example: {
          lang: 'bash',
          code: `docker run -d --read-only \\
  --tmpfs /tmp \\
  --tmpfs /run \\
  myapp:1.0`,
        },
        gotcha: 'حجمها بياخد من رام السيرفر — كتابة كبيرة عليها بتضغط الذاكرة وممكن تسبب OOM.',
      },
      {
        type: 'ask',
        q: 'لو مسحت الحاوية، الداتا بتضيع؟',
        a: 'اللي في طبقة الكتابة بيضيع. اللي في named volume أو bind mount بيفضل. عشان كده أي حاجة مهمة لازم تتحدد صراحة على volume — الافتراضي مش آمن للداتا.',
      },
      {
        type: 'ask',
        q: 'إيه الفرق بين -v و --mount؟',
        a: 'الاتنين بيعملوا نفس الحاجة تقريبًا. -v أقصر وشائع. --mount أوضح وأكثر تصريحًا (بتكتب type و source و target صراحة) وبيقلل الأخطاء الصامتة، وهو المفضّل في السكربتات والإنتاج.',
      },
      {
        type: 'ask',
        q: 'إزاي أعمل نسخة احتياطية لـ volume كامل؟',
        a: 'بتشغّل حاوية مؤقتة تربط الـ volume ومجلد من جهازك وتضغط المحتوى: docker run --rm -v pgdata:/data -v "$PWD":/backup alpine tar czf /backup/pgdata.tgz -C /data . — والاستعادة بنفس الفكرة بالعكس. لقواعد البيانات، النسخة المنطقية (pg_dump) غالبًا أأمن.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إزاي بتحفظ داتا قاعدة بيانات مع Docker؟',
        answerAr:
          'بربط named volume على مجلد بيانات المحرك (في Postgres: /var/lib/postgresql/data) عشان الداتا تعيش بعد حذف الحاوية، وبعمل نسخ احتياطي منطقي دوري (pg_dump) مخزّن برّه السيرفر. وفي الإنتاج الحقيقي غالبًا بنستخدم خدمة قاعدة بيانات مُدارة.',
        sayEn:
          'I mount a named volume at the engine data directory so data survives container recreation, plus scheduled logical backups stored off-host — and in production I usually prefer a managed database service.',
      },
    ],
  },
  {
    id: 'networks',
    nav: 'الشبكات',
    title: 'الشبكات — إزاي الخدمات تلاقي بعضها',
    lead: 'أغلب مشاكل "الـ API مش شايف الـ DB" سببها فهم ناقص لشبكات Docker.',
    blocks: [
      { type: 'diagram', kind: 'networks', caption: 'على شبكة معرّفة، اسم الخدمة بيتحوّل لـ IP تلقائيًا — والداخلي مش مكشوف للخارج' },
      {
        type: 'deep',
        term: 'شبكة bridge المعرّفة',
        en: 'User-defined bridge network',
        what: 'شبكة افتراضية معزولة تعملها بنفسك وتحطّ فيها الحاويات اللي محتاجة تتكلم مع بعضها.',
        why: 'أهم فايدة: DNS داخلي. اسم الحاوية أو الخدمة بيتحوّل لعنوان IP تلقائيًا، فمش محتاج تعرف IP ولا تخاف إنه يتغيّر بعد إعادة الإنشاء. وكمان عزل: اللي مش على الشبكة مش بيوصل.',
        how: 'Docker بيعمل bridge على المضيف وبيوصل الحاويات بيه، وبيشغّل مُحلّل أسماء داخلي للشبكة دي.',
        use: 'docker network create ثم --network عند التشغيل. في Compose بيتعمل تلقائيًا لكل مشروع.',
        withWhat: 'بيتجمع مع نشر المنافذ (-p) للوصول من الخارج، ومع متغيرات البيئة اللي فيها روابط الاتصال.',
        example: {
          title: 'API + DB بالأسماء',
          lang: 'bash',
          code: `docker network create appnet

docker run -d --name db --network appnet \\
  -e POSTGRES_PASSWORD=secret postgres:16

docker run -d --name api --network appnet -p 3000:3000 \\
  -e DATABASE_URL=postgres://postgres:secret@db:5432/postgres \\
  myapi:1.0

docker network inspect appnet`,
        },
        gotcha: 'الشبكة الافتراضية القديمة (default bridge) مفيهاش DNS بالأسماء بنفس الشكل — لازم تعمل شبكة بنفسك أو تستخدم Compose.',
      },
      {
        type: 'deep',
        term: 'نشر المنافذ',
        en: 'Port publishing',
        what: 'ربط منفذ على جهازك المضيف بمنفذ داخل الحاوية عشان الوصول من خارج شبكة Docker.',
        why: 'الفايدة إنك تتحكم بدقة في اللي مكشوف: تنشر منفذ الواجهة بس وتسيب قاعدة البيانات مخفية داخليًا. ده أمان بالتصميم.',
        how: 'الشكل -p HOST:CONTAINER. ممكن تحدد عنوان معيّن: -p 127.0.0.1:5432:5432 عشان يبقى متاح لجهازك بس.',
        use: 'انشر منافذ الواجهات (web/api). متنشرش قواعد البيانات إلا للتطوير، وقتها اربطها بـ 127.0.0.1.',
        withWhat: 'بيتجمع مع الشبكات المعرّفة ومع reverse proxy زي nginx أو Traefik.',
        example: {
          lang: 'bash',
          code: `docker run -d -p 8080:80 nginx              # متاح للشبكة كلها
docker run -d -p 127.0.0.1:5432:5432 postgres:16  # لجهازك فقط
docker port web                                    # اعرض الربط الفعلي`,
        },
        gotcha: 'نشر قاعدة البيانات على 0.0.0.0 بكلمة سر ضعيفة على سيرفر عام = اختراق شبه مؤكد. ده بيحصل كتير للأسف.',
      },
      {
        type: 'table',
        headers: ['نوع الشبكة', 'بتعمل إيه', 'بتستخدمها إمتى'],
        rows: [
          ['bridge (معرّفة)', 'شبكة معزولة مع DNS بالأسماء', 'الاستخدام العادي على سيرفر واحد'],
          ['host', 'الحاوية تستخدم شبكة المضيف مباشرة', 'حالات أداء خاصة على Linux، بعزل أقل'],
          ['none', 'بدون شبكة إطلاقًا', 'مهام حسابية معزولة تمامًا'],
          ['overlay', 'شبكة بين أكتر من مضيف', 'Swarm أو أنظمة موزّعة'],
          ['macvlan', 'الحاوية بعنوان IP على شبكتك الفعلية', 'دمج مع أنظمة شبكات قديمة'],
        ],
      },
      {
        type: 'ask',
        q: 'كتبت localhost في رابط قاعدة البيانات ومش بيتصل — ليه؟',
        a: 'لأن localhost جوه الحاوية معناها الحاوية نفسها، مش جهازك ومش الحاوية التانية. لازم تستخدم اسم الخدمة على الشبكة المشتركة (مثلاً db). ولو محتاج توصل لخدمة شغالة على جهازك المضيف، استخدم host.docker.internal على Mac/Windows.',
      },
      {
        type: 'ask',
        q: 'إزاي أختبر الاتصال بين حاويتين بسرعة؟',
        a: 'دخول شِل في الأولى وتجربة الوصول للتانية: docker exec -it api sh وبعدين ping db أو wget -qO- http://web:80. لو الاسم ماتحلّش، يبقى إما مش على نفس الشبكة أو الاسم غلط.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إزاي الحاويات بتكتشف بعضها؟',
        answerAr:
          'على شبكة bridge معرّفة، Docker بيوفّر DNS داخلي فبتوصل بالأسماء (اسم الحاوية أو اسم الخدمة في Compose) وده بيلغي الحاجة لعناوين IP ثابتة. وللوصول من خارج المضيف بننشر المنافذ المطلوبة فقط.',
        sayEn:
          'On a user-defined bridge network Docker provides internal DNS, so containers reach each other by service name instead of IP, and we publish only the ports that must be reachable from outside.',
      },
    ],
  },
  {
    id: 'compose',
    nav: 'Docker Compose',
    title: 'Compose — النظام كله في ملف واحد',
    lead: 'من عشرة أوامر متفرقة لملف واحد مُراجَع، بيبني الشبكة والتخزين والخدمات بالترتيب الصح.',
    blocks: [
      { type: 'diagram', kind: 'compose', caption: 'ملف واحد بيوصف الخدمات والشبكة والتخزين والاعتماديات' },
      {
        type: 'deep',
        term: 'Compose',
        en: 'Docker Compose',
        what: 'أداة بتقرأ ملف YAML بيوصف مجموعة خدمات (حاويات) وشبكاتها وتخزينها، وبتشغّلها كمشروع واحد.',
        why: 'ثلاث فوايد: (1) وصف تصريحي مُراجَع في Git بدل أوامر شفهية. (2) تشغيل كل النظام بأمر واحد لأي مطور جديد. (3) إدارة الاعتماديات والترتيب و healthchecks.',
        how: 'بيعمل شبكة خاصة للمشروع، ويحوّل كل service لحاوية باسم يمكن استخدامه كـ hostname، وينشئ الـ volumes المعرّفة.',
        use: 'التطوير المحلي بشكل أساسي، والنشر البسيط على سيرفر واحد. الأمر: docker compose up -d.',
        withWhat: 'بيتجمع مع ملفات override للبيئات المختلفة، ومع .env لتمرير القيم، ومع healthchecks.',
        example: {
          title: 'ثلاث خدمات مترابطة',
          lang: 'yaml',
          code: `services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: appsecret
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
      timeout: 3s
      retries: 10

  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://app:appsecret@db:5432/appdb
      NODE_ENV: production
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    ports:
      - "3000:3000"

  web:
    image: nginx:1.27-alpine
    volumes:
      - ./web/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    ports:
      - "8080:80"
    depends_on:
      - api

volumes:
  pgdata:`,
        },
        gotcha: 'أمر down -v بيحذف الـ volumes. على جهاز فيه داتا تطوير مهمة، ده بيمسحها بلا رجعة.',
      },
      {
        type: 'code',
        title: 'أوامر Compose بشرح كل واحد',
        lang: 'bash',
        code: `docker compose up -d --build   # ابنِ وشغّل في الخلفية
docker compose ps              # حالة الخدمات
docker compose logs -f api     # لوجز خدمة واحدة
docker compose exec api sh     # شِل جوه خدمة
docker compose restart api     # إعادة تشغيل خدمة
docker compose stop            # إيقاف بدون حذف
docker compose down            # حذف الحاويات والشبكة
docker compose down -v         # + حذف الـ volumes (خطر)
docker compose config          # اعرض الملف بعد دمج المتغيرات`,
      },
      {
        type: 'deep',
        term: 'فحص السلامة',
        en: 'Healthcheck',
        what: 'أمر بيتنفّذ دوريًا جوه الحاوية عشان يقول هل الخدمة سليمة فعلًا ولا لأ.',
        why: 'الفايدة إن "الحاوية شغالة" مش معناها "الخدمة جاهزة". الـ healthcheck بيفرّق بين العملية موجودة وبين التطبيق بيرد صح — وبيسمح لـ Compose يستنى الجاهزية.',
        how: 'بيرجع كود 0 = سليم، غير كده = مش سليم. بعد عدد محاولات فاشلة الحاوية بتتوسم unhealthy.',
        use: 'حدّده لقواعد البيانات والخدمات الحرجة، واستخدم depends_on مع condition: service_healthy.',
        withWhat: 'بيتجمع مع restart policies ومع أدوات المراقبة و load balancers.',
        example: {
          title: 'في Dockerfile وفي Compose',
          lang: 'dockerfile',
          code: `HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \\
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1`,
        },
        gotcha: 'فحص تقيل كل ثانية بيستهلك موارد ويشوّش. خلّي المسار خفيف جدًا ومتحسبش فيه استعلامات معقّدة.',
      },
      {
        type: 'ask',
        q: 'depends_on معناها إن الخدمة هتستنى التانية تبقى جاهزة؟',
        a: 'مش بالمعنى الكامل. لوحدها هي بس بتضبط ترتيب البدء. لو عايز انتظار فعلي للجاهزية، لازم healthcheck على الخدمة المطلوبة + condition: service_healthy. وبرضه التطبيق نفسه المفروض يعمل إعادة محاولة للاتصال، لأن الشبكة بتقع أحيانًا في أي وقت.',
      },
      {
        type: 'ask',
        q: 'إيه الفرق بين image و build في الخدمة؟',
        a: 'image معناها هات صورة جاهزة من Registry. build معناها ابنِ الصورة من Dockerfile في المسار المحدد. تقدر تحدد الاتنين مع بعض: build للبناء و image لتسمية الناتج عشان تعمله push بعدين.',
      },
      {
        type: 'ask',
        q: 'إزاي أفصل إعدادات التطوير عن الإنتاج؟',
        a: 'بملف أساسي compose.yml + ملف تجاوز compose.override.yml للتطوير (bind mounts، منافذ تصحيح، أوامر dev). Compose بيدمجهم تلقائيًا. وللإنتاج تستخدم ملف منفصل: docker compose -f compose.yml -f compose.prod.yml up -d.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: ليه Compose بدل أوامر docker run كتيرة؟',
        answerAr:
          'لأنه وصف تصريحي متخزّن في Git وقابل للمراجعة، وبيضمن إن أي مطور يشغّل نفس النظام بنفس الإعدادات بأمر واحد، وبيدير الشبكة والتخزين والاعتماديات والـ healthchecks بشكل منظّم بدل ما تكون الأوامر في دماغ حد أو في ملف ملاحظات.',
        sayEn:
          'Compose gives a declarative, version-controlled definition of the whole stack, so anyone can reproduce the same environment with one command, including networks, volumes, dependencies, and health checks.',
      },
    ],
  },
  {
    id: 'example',
    nav: 'مثال عملي كامل',
    title: 'مثال عملي — API + Postgres من الصفر',
    lead: 'نجمع كل اللي فات في مشروع واحد تقدر تنفّذه حرفيًا وتشوف النتيجة.',
    blocks: [
      {
        type: 'teach',
        title: 'المدرّس يحدد الهدف',
        text: 'هنبني خدمة صغيرة فيها مسار /health بيتأكد إن قاعدة البيانات متاحة فعلًا. الهدف التعليمي إنك تشوف بعينك الترابط: الصورة اللي اتبنت من Dockerfile، والشبكة اللي خلّت الاسم db يشتغل، والـ volume اللي حفظ الداتا، والـ healthcheck اللي منع الـ API إنه يبدأ قبل الوقت.',
      },
      {
        type: 'steps',
        items: [
          { title: 'الخطوة 1 — هيكل المشروع', text: 'مجلد فيه api/ (فيه package.json و server.js و Dockerfile) وملف compose.yml في الجذر.' },
          { title: 'الخطوة 2 — كود التطبيق', text: 'خدمة Express بسيطة بتفتح اتصال بقاعدة البيانات وبترد على /health.' },
          { title: 'الخطوة 3 — Dockerfile', text: 'بناء مراعي للكاش + مستخدم غير root + منفذ موثّق.' },
          { title: 'الخطوة 4 — Compose', text: 'خدمتين: db مع volume وhealthcheck، وapi تعتمد عليها.' },
          { title: 'الخطوة 5 — التشغيل والتحقق', text: 'أمر واحد للتشغيل، وطلب واحد للتأكد، وتجربة إطفاء الـ DB لمشاهدة السلوك.' },
        ],
      },
      {
        type: 'code',
        title: 'api/server.js',
        lang: 'javascript',
        code: `import express from "express";
import pg from "pg";

const app = express();
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, service: "api" });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

const server = app.listen(3000, "0.0.0.0", () => {
  console.log("API listening on 0.0.0.0:3000");
});

// إغلاق نظيف مهم جوه الحاوية
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing...");
  server.close(() => pool.end().then(() => process.exit(0)));
});`,
      },
      {
        type: 'code',
        title: 'api/Dockerfile',
        lang: 'dockerfile',
        code: `# syntax=docker/dockerfile:1
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 3000
USER node

HEALTHCHECK --interval=20s --timeout=3s --start-period=8s --retries=3 \\
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "server.js"]`,
      },
      {
        type: 'code',
        title: 'compose.yml',
        lang: 'yaml',
        code: `services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: appsecret
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
      retries: 10

  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://app:appsecret@db:5432/appdb
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "3000:3000"
    restart: unless-stopped

volumes:
  pgdata:`,
      },
      {
        type: 'code',
        title: 'التشغيل والتجارب التعليمية',
        lang: 'bash',
        code: `docker compose up -d --build
curl http://localhost:3000/health        # المتوقع {"ok":true,...}

# تجربة 1: أوقف الداتابيز وشوف السلوك
docker compose stop db
curl -i http://localhost:3000/health     # المتوقع 500
docker compose start db

# تجربة 2: اثبت إن الداتا بتعيش
docker compose exec db psql -U app -d appdb -c "create table t(id int);"
docker compose down            # بدون -v
docker compose up -d
docker compose exec db psql -U app -d appdb -c "\\dt"   # الجدول لسه موجود`,
      },
      {
        type: 'ask',
        q: 'لو /health رجعت خطأ، أفحص إيه بالترتيب؟',
        a: 'خمس خطوات: (1) docker compose ps — الخدمتين شغالين وحالة db هل healthy؟ (2) docker compose logs db وlogs api. (3) قيمة DATABASE_URL — الاسم db مش localhost؟ (4) بيانات الدخول مطابقة لمتغيرات db؟ (5) هل api بدأت قبل جاهزية db فعلًا (يعني الـ condition ناقص)؟',
      },
      {
        type: 'ask',
        q: 'ليه كتبت listen على 0.0.0.0 مش localhost؟',
        a: 'لأن localhost جوه الحاوية معناها الواجهة الداخلية فقط، وربط المنفذ من برّه مش بيوصلها. لما تسمع على 0.0.0.0 التطبيق بيقبل الاتصالات الجاية من شبكة Docker، وبالتالي -p تشتغل.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: خدني في رحلة تحويل خدمة Node + Postgres لحاويات.',
        answerAr:
          'أرد بترتيب هندسي: أبدأ بـ Dockerfile مراعي للكاش ومستخدم غير root، أضيف .dockerignore، أعرّف الإعدادات كمتغيرات بيئة، أستخدم Compose لتعريف الخدمتين مع named volume للداتا وhealthcheck على Postgres وdepends_on بشرط الجاهزية، أنشر منفذ الـ API فقط وأسيب قاعدة البيانات داخلية، وأتأكد من الإغلاق النظيف على SIGTERM. وفي الإنتاج أثبّت الوسوم وأحقن الأسرار من مدير أسرار.',
        sayEn:
          'Write a cache-friendly Dockerfile with a non-root user, externalize config via environment variables, define both services in Compose with a named volume and a Postgres healthcheck, publish only the API port, handle SIGTERM for graceful shutdown, and inject secrets from a secret manager in production.',
      },
    ],
  },
  {
    id: 'ops',
    nav: 'الموارد واللوجز',
    title: 'التشغيل الحقيقي — لوجز، موارد، ومراقبة',
    lead: 'الفرق بين "شغّلت حاوية" و"بشغّل خدمة" هو الجزء ده.',
    blocks: [
      {
        type: 'deep',
        term: 'اللوجز',
        en: 'Logging',
        what: 'مخرجات التطبيق على stdout و stderr، وDocker بيجمعها ويخليك تقراها بـ docker logs.',
        why: 'الفايدة إنك متحتاجش تدير ملفات لوج جوه الحاوية: بتكتب على الخرج القياسي، والمنصة بتتولى الجمع والتوجيه لأي نظام مركزي.',
        how: 'الـ daemon بيستخدم logging driver (الافتراضي json-file) لتخزين المخرجات، وممكن تحوّله لأنظمة زي fluentd أو journald.',
        use: 'اطبع لوجز منظّمة (JSON لو ممكن) على stdout، وحدّد سقف حجم للملفات عشان القرص ما يتملاش.',
        withWhat: 'بيتجمع مع أنظمة تجميع اللوجز ومع rotation ومع مستويات الخطورة.',
        example: {
          title: 'قراءة وتحديد حجم اللوجز',
          lang: 'bash',
          code: `docker logs -f --tail 200 --timestamps api

docker run -d --name api \\
  --log-opt max-size=10m \\
  --log-opt max-file=3 \\
  myapi:1.0`,
        },
        gotcha: 'من غير حدود، ملفات اللوج بتكبر لحد ما تملأ القرص وتوقّف السيرفر كله. ده حادث شائع جدًا في الإنتاج.',
      },
      {
        type: 'deep',
        term: 'حدود الموارد',
        en: 'Resource limits',
        what: 'سقوف للذاكرة والمعالج لكل حاوية.',
        why: 'الفايدة عزل الأعطال: خدمة فيها تسريب ذاكرة تتقتل هي بس، بدل ما تسحب السيرفر ومعاه كل الخدمات.',
        how: 'Docker بيترجمها لـ cgroups. تجاوز سقف الذاكرة بيسبب قتل العملية (OOMKilled).',
        use: 'قدّر الاحتياج من القياس مش التخمين: راقب بـ docker stats تحت حمل، وبعدين حدّد سقف أعلى منه بهامش.',
        withWhat: 'بتتجمع مع restart policy و healthcheck والمراقبة.',
        example: {
          lang: 'bash',
          code: `docker run -d --name api --memory 512m --memory-reservation 256m --cpus 1.0 myapi:1.0
docker stats --no-stream
docker inspect -f '{{.State.OOMKilled}}' api`,
        },
        gotcha: 'بعض اللغات (زي Java و Node القديمة) مش بتقرأ حدود الحاوية تلقائيًا وبتحسب الذاكرة من المضيف — لازم تضبط إعدادات الـ heap صراحة.',
      },
      {
        type: 'deep',
        term: 'التنظيف',
        en: 'Pruning & disk usage',
        what: 'حذف الصور والحاويات والشبكات والـ volumes وكاش البناء غير المستخدم.',
        why: 'الفايدة استرجاع مساحة القرص. جهاز مطوّر بيستهلك عشرات الجيجا بدون ما يحس بسبب صور قديمة وكاش بناء.',
        how: 'docker system df بيوريك الاستهلاك بالتقسيم، وprune بيمسح غير المستخدم.',
        use: 'شغّل system df أول، وبعدين prune انتقائي. خُد بالك من -a ومن --volumes.',
        withWhat: 'بيتجمع مع سياسات الاحتفاظ في الـ Registry ومع مراقبة القرص.',
        example: {
          title: 'تنظيف واعي بالترتيب',
          lang: 'bash',
          code: `docker system df               # اعرف الاستهلاك أولاً
docker container prune         # حاويات واقفة
docker image prune             # صور بدون وسم
docker builder prune           # كاش البناء (بياخد مساحة كبيرة)
docker system prune            # الكل ما عدا الـ volumes
# خطر: بيمسح الداتا غير المستخدمة
docker system prune -a --volumes`,
        },
        gotcha: 'الأمر prune -a --volumes ممكن يمسح volume فيه داتا تطوير مهمة لسه محتاجها. اقرأ التأكيد قبل ما تضغط y.',
      },
      {
        type: 'ask',
        q: 'إزاي أعرف الحاوية بتستهلك قد إيه فعلًا؟',
        a: 'docker stats بيديك استهلاك لحظي للمعالج والذاكرة والشبكة والقرص لكل حاوية. للقياس الجدي تحت حمل، شغّل اختبار حمل وسجّل الأرقام على مدة، وبعدين حدّد الحدود على الأساس ده.',
      },
      {
        type: 'ask',
        q: 'فين اللوجز بتتخزن فعليًا؟',
        a: 'مع الـ driver الافتراضي بتتخزن كملفات JSON على المضيف تحت مجلد بيانات Docker لكل حاوية. عشان كده حدود الحجم مهمة، ولو حذفت الحاوية اللوجز بتروح معاها — فالمهم توجيهها لنظام مركزي في الإنتاج.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: خدمة في الإنتاج بتترستارت كل شوية — منهجك إيه؟',
        answerAr:
          'أتحرك بمنهج: أشوف RestartCount وحالة OOMKilled من inspect، أقرأ اللوجز قبل كل انهيار لأشوف آخر عملية، أقيس الذاكرة تحت حمل لأتأكد إن السقف كافي، أراجع الـ healthcheck هل بيفشل بسبب بطء بدء التشغيل (start-period قصير)، وأتأكد إن التطبيق بيتعامل مع SIGTERM صح. وبعد التشخيص أعدّل الحدود أو الكود مش أسكت الأعراض.',
        sayEn:
          'I inspect RestartCount and the OOMKilled flag, read logs right before each crash, measure memory under load to validate limits, review the healthcheck start period, and verify graceful SIGTERM handling before changing anything.',
      },
    ],
  },
  {
    id: 'registry',
    nav: 'Registry والنشر',
    title: 'Registry — تخزين الصور ونشرها',
    lead: 'الصورة اللي على جهازك ملهاش قيمة لفريق. Registry هو اللي بيحوّلها لـ artifact مشترك.',
    blocks: [
      { type: 'diagram', kind: 'registry', caption: 'push و pull، والفرق بين الوسم المتحرك والبصمة الثابتة' },
      {
        type: 'deep',
        term: 'Registry',
        en: 'Container registry',
        what: 'خدمة بتخزّن الصور وطبقاتها وتوزّعها، مع تنظيم بالمستودعات (repositories) والوسوم.',
        why: 'الفايدة إنه المصدر الموحّد للحق: الـ CI يبني ويرفع مرة، وكل البيئات تنزّل نفس الصورة بالظبط. وده أساس الـ rollback السريع كذلك.',
        how: 'بيرفع الطبقات الناقصة بس (deduplication)، وبيربط الوسوم بالبصمات، وبيدير الصلاحيات.',
        use: 'docker login للدخول، docker tag لتسمية الصورة بمسار الـ registry، docker push للرفع، docker pull للتنزيل.',
        withWhat: 'بيتجمع مع الـ CI/CD وسياسات الاحتفاظ وفحص الثغرات وتوقيع الصور.',
        example: {
          title: 'رفع صورة لـ GitHub Container Registry',
          lang: 'bash',
          code: `docker login ghcr.io
docker build -t ghcr.io/myorg/api:1.4.2 .
docker push ghcr.io/myorg/api:1.4.2

# وسم إضافي للإصدار الحالي
docker tag ghcr.io/myorg/api:1.4.2 ghcr.io/myorg/api:latest
docker push ghcr.io/myorg/api:latest`,
        },
        gotcha: 'لو نسيت تعمل tag بمسار الـ registry، الـ push بيحاول يروح Docker Hub وبيفشل أو يرفع في مكان غلط.',
      },
      {
        type: 'ask',
        q: 'إيه استراتيجية الوسوم المعقولة في فريق؟',
        a: 'الشائع والعملي: وسم بالإصدار الدلالي (1.4.2) للإصدارات، ووسم بـ commit SHA لكل بناء (يخليك تربط أي صورة بكودها بالظبط)، ووسم بيئة زي staging يتحرك على أحدث نسخة مقبولة. وlatest للراحة في التطوير بس، مش للاعتماد عليه في النشر.',
      },
      {
        type: 'ask',
        q: 'ليه الـ push سريع أحيانًا وبطيء أحيانًا؟',
        a: 'لأن الرفع بيتم للطبقات الناقصة في الـ Registry بس. لو غيّرت الكود فقط، طبقة الأساس والاعتماديات موجودة فوق فمش هتترفع تاني — يترفع اللي اتغيّر. ده نفس منطق الطبقات بالضبط.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إزاي تضمن إن اللي في الإنتاج هو نفس اللي اختبرناه؟',
        answerAr:
          'بأربع ممارسات: البناء يحصل مرة واحدة في الـ CI مش في كل بيئة، الصورة تتوسم بـ commit SHA، النشر يستخدم digest ثابت مش وسم متحرك، والإعدادات تتغيّر عبر متغيرات بيئة مش عبر بناء صورة جديدة لكل بيئة.',
        sayEn:
          'Build once in CI, tag with the commit SHA, deploy by immutable digest rather than a moving tag, and vary only configuration through environment variables across environments.',
      },
    ],
  },
  {
    id: 'security',
    nav: 'الأمان والأسرار',
    title: 'الأمان والأسرار — الجزء اللي بيفرّق سينيور',
    lead: 'الحاوية مش آمنة بشكل تلقائي. الأمان قرارات بتاخدها في الـ Dockerfile ووقت التشغيل.',
    blocks: [
      {
        type: 'deep',
        term: 'إدارة الأسرار',
        en: 'Secrets management',
        what: 'طريقة توصيل القيم الحساسة (كلمات سر، مفاتيح API) للتطبيق بدون تسجيلها في الصورة أو في Git.',
        why: 'الفايدة الأساسية منع التسريب: الصورة بتتوزّع على ناس كتير وبتفضل مخزّنة لسنين، وأي سر جواها بيبقى مكشوف بشكل دائم.',
        how: 'الأسرار تتحقن وقت التشغيل من مصدر آمن (مدير أسرار أو نظام التنسيق) أو تتمرر وقت البناء بـ BuildKit secret mount اللي مش بيتسجّل في الطبقات.',
        use: 'وقت التشغيل: متغيرات بيئة من مدير أسرار أو ملفات مركّبة. وقت البناء: RUN --mount=type=secret. وممنوع ENV لسر.',
        withWhat: 'بيتجمع مع .gitignore و.dockerignore ومع تدوير المفاتيح (rotation) ومع صلاحيات أقل.',
        example: {
          title: 'سر وقت البناء بشكل آمن',
          lang: 'bash',
          code: `# البناء
DOCKER_BUILDKIT=1 docker build \\
  --secret id=npmrc,src=$HOME/.npmrc \\
  -t app:1.0 .

# وفي Dockerfile
# RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci`,
        },
        gotcha: 'حتى لو مسحت السر في طبقة لاحقة، هو موجود في الطبقة القديمة وفي تاريخ الصورة. المسح مش حل.',
      },
      {
        type: 'deep',
        term: 'تقليل الصلاحيات',
        en: 'Least privilege',
        what: 'تشغيل الحاوية بأقل صلاحيات ممكنة: مستخدم غير root، نظام ملفات للقراءة فقط، إزالة قدرات النظام غير اللازمة.',
        why: 'الفايدة تقليل الأثر لو حصل اختراق: مهاجم في عملية غير مميّزة قدرته على التوسّع أقل بكتير.',
        how: 'USER في الصورة، و--read-only وقت التشغيل، و--cap-drop لإزالة قدرات، و--security-opt no-new-privileges.',
        use: 'خلّيها الافتراضي في كل خدمة إنتاجية، وافتح فقط اللي التطبيق محتاجه فعلًا.',
        withWhat: 'بيتجمع مع tmpfs للمسارات اللي محتاجة كتابة، ومع فحص الصور، ومع تحديث الأساس.',
        example: {
          title: 'تشغيل مقيّد',
          lang: 'bash',
          code: `docker run -d --name api \\
  --read-only --tmpfs /tmp \\
  --cap-drop ALL \\
  --security-opt no-new-privileges \\
  --user 10001:10001 \\
  myapi:1.0`,
        },
        gotcha: 'خيار --privileged بيلغي معظم الحمايات دي ويقرّب الحاوية من صلاحيات المضيف. متستخدموش إلا لضرورة مفهومة تمامًا.',
      },
      {
        type: 'ul',
        items: [
          'متعملش commit لملف .env — وضيفه في .gitignore و.dockerignore',
          'ثبّت نسخ الصور الأساسية وحدّثها بانتظام لسد الثغرات',
          'شغّل فحص ثغرات في الـ CI وامنع النشر عند وجود ثغرة حرجة',
          'متعملش mount لـ docker.sock جوه حاوية إلا بفهم كامل للخطر',
          'قلّل محتوى الصورة: أدوات أقل = ثغرات أقل',
          'استخدم مستخدم غير root وحدود موارد دايمًا',
        ],
      },
      {
        type: 'code',
        title: 'فحص الثغرات',
        lang: 'bash',
        code: `docker scout quickview myapi:1.0
docker scout cves myapi:1.0

# بديل شائع
trivy image myapi:1.0`,
      },
      {
        type: 'ask',
        q: 'لو حطيت سر في ENV داخل Dockerfile، إيه الخطر بالظبط؟',
        a: 'القيمة بتتخزن في ميتاداتا الصورة وتاريخها، فأي حد عنده الصورة يقراها بأمر واحد: docker inspect أو docker history. ولو الصورة على Registry مشترك، السر مكشوف لكل من له صلاحية القراءة. الأسرار وقت التشغيل فقط.',
      },
      {
        type: 'ask',
        q: 'الحاوية بتشتغل root افتراضيًا؟ وده خطير قد إيه؟',
        a: 'أيوه، معظم الصور افتراضيًا root جوه الحاوية. الخطورة إن أي تنفيذ كود عن بعد يبقى بصلاحيات كاملة داخل الحاوية، وبيسهّل استغلال أي خطأ في الإعداد (زي mounts حساسة) للوصول للمضيف. الحل: USER غير root.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إزاي بتتعامل مع الأسرار في Docker؟',
        answerAr:
          'قاعدتي: صفر أسرار في الصور. الأسرار بتتحقن وقت التشغيل من مدير أسرار أو من آلية الأسرار في نظام التنسيق، وملفات .env مستثناة من Git ومن سياق البناء. ولو محتاج سر وقت البناء بستخدم BuildKit secret mount عشان ما يتسجّلش في الطبقات، مع تدوير دوري للمفاتيح.',
        sayEn:
          'No secrets in images. They are injected at runtime from a secret manager or the orchestrator secret mechanism, .env files are excluded from git and build context, and build-time secrets use BuildKit secret mounts so they never land in layers.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: إزاي تقسّي (harden) حاوية إنتاج؟',
        answerAr:
          'ست نقاط: صورة أساس صغيرة ومحدّثة، مستخدم غير root، نظام ملفات للقراءة فقط مع tmpfs للمؤقت، إزالة القدرات غير اللازمة وno-new-privileges، حدود موارد، وفحص ثغرات مستمر مع تثبيت الوسوم بالبصمة.',
        sayEn:
          'Minimal updated base image, non-root user, read-only filesystem with tmpfs for temp paths, dropped capabilities with no-new-privileges, resource limits, and continuous vulnerability scanning with digest-pinned images.',
      },
    ],
  },
  {
    id: 'troubleshoot',
    nav: 'حل المشاكل',
    title: 'حل المشاكل — منهج مرتّب مش تخمين',
    lead: 'كل مشكلة ليها مسار فحص. لو مشيت بالترتيب، هتوصل أسرع بكتير.',
    blocks: [
      {
        type: 'teach',
        title: 'المدرّس يعطيك مسار ثابت',
        text: 'المسار: (1) حالة الحاوية وكود الخروج. (2) اللوجز. (3) الإعدادات الفعلية بـ inspect. (4) الشبكة والأسماء والمنافذ. (5) التخزين والصلاحيات. (6) مساحة القرص وحدود الموارد. القاعدة الذهبية: غيّر حاجة واحدة في المرة، وسجّل النتيجة.',
      },
      {
        type: 'table',
        headers: ['العَرَض', 'الفحص الأول', 'الحل الشائع'],
        rows: [
          ['المنفذ مش شغال', 'هل فيه -p؟ التطبيق سامع على 0.0.0.0؟', 'صحّح الربط أو عنوان الاستماع'],
          ['الحاوية بتقفل فورًا', 'docker ps -a وdocker logs', 'إصلاح الأمر أو الاعتمادية الناقصة'],
          ['مش شايف قاعدة البيانات', 'نفس الشبكة؟ الاسم صح مش localhost؟', 'شبكة معرّفة + اسم الخدمة'],
          ['تعديلات الكود مش ظاهرة', 'بنيت من جديد؟ الـ bind mount صح؟', 'إعادة بناء أو تصحيح المسار'],
          ['permission denied على volume', 'مطابقة UID/GID', 'chown أو تشغيل بنفس المستخدم'],
          ['القرص امتلأ', 'docker system df', 'prune انتقائي وحدود لوجز'],
          ['البناء بطيء جدًا', 'أي خطوة بتبطّل الكاش؟', 'ترتيب + dockerignore + cache mounts'],
          ['exec format error', 'معمارية الصورة', 'بناء multi-arch أو --platform'],
        ],
      },
      {
        type: 'code',
        title: 'صندوق أدوات التحقيق',
        lang: 'bash',
        code: `docker ps -a                                   # الحالة وكود الخروج
docker logs -f --tail 200 --timestamps api     # اللوجز بالوقت
docker inspect api                             # الإعدادات الفعلية
docker inspect -f '{{.State.ExitCode}} {{.State.OOMKilled}}' api
docker exec -it api sh                         # فحص من جوه
docker port api                                # ربط المنافذ الحقيقي
docker network inspect appnet                  # مين على الشبكة
docker stats --no-stream                       # استهلاك الموارد
docker events                                  # أحداث لحظية من الـ daemon
docker system df                               # المساحة`,
      },
      {
        type: 'ask',
        q: 'الصورة مبنية بس التطبيق بيقول ملف مش موجود — إيه الأسباب؟',
        a: 'ثلاثة أسباب متكررة: (1) الملف مستثنى في .dockerignore فمااتنسخش. (2) مسار COPY غلط بالنسبة لـ WORKDIR. (3) الملف بيتولد في مرحلة بناء ومانسختوش للمرحلة النهائية في multi-stage. أسرع تحقق: docker run --rm -it --entrypoint sh الصورة وبعدين ls.',
      },
      {
        type: 'ask',
        q: 'شغّال عندي وواقع في الـ CI — أفحص إيه؟',
        a: 'قارن خمس حاجات: نسخة/بصمة الصورة الأساسية، معمارية المعالج (arm ضد amd)، متغيرات البيئة والأسرار الموجودة محليًا وناقصة في CI، سياق البناء (ملفات موجودة عندك ومش مرفوعة)، وحالة الكاش (محلي مقابل بارد).',
      },
      {
        type: 'ask',
        q: 'إزاي أفحص صورة من غير شِل جواها (distroless)؟',
        a: 'ثلاث طرق: (1) استخدم docker cp لسحب الملفات وفحصها بره. (2) شغّل حاوية مؤقتة من صورة فيها أدوات وربّط نفس الـ volume. (3) استخدم نسخة debug من الصورة (كثير من صور distroless ليها tag فيه شِل) للتحقيق المؤقت فقط.',
      },
      {
        type: 'senior',
        q: 'السينيور بيسأل: الخدمة بطيئة جوه الحاوية وسريعة برّه — تحقيقك إيه؟',
        answerAr:
          'أفحص ثلاث مساحات بالترتيب: الموارد (هل فيه سقف CPU/memory بيخنقها؟ docker stats)، التخزين (هل الملفات على bind mount بطيء خصوصًا على macOS؟)، والشبكة (هل فيه طبقة proxy أو DNS بيضيف تأخير؟). وبعدين أقيس بأرقام قبل وبعد كل تغيير عشان أعرف السبب الحقيقي.',
        sayEn:
          'I check resource limits with docker stats, then storage overhead such as slow bind mounts on macOS, then network and DNS latency — measuring before and after each change instead of guessing.',
      },
    ],
  },
  {
    id: 'cheatsheet',
    nav: 'مرجع سريع',
    title: 'مرجع سريع — كل الأوامر في مكان واحد',
    lead: 'ارجع للصفحة دي وأنت شغال أو قبل الإنترفيو بعشر دقايق.',
    blocks: [
      {
        type: 'code',
        title: 'الصور',
        lang: 'bash',
        code: `docker pull IMAGE:TAG
docker build -t NAME:TAG .
docker build --no-cache --pull -t NAME:TAG .
docker image ls
docker history IMAGE
docker tag SRC TARGET
docker push REGISTRY/NAME:TAG
docker image rm IMAGE
docker image prune -a`,
      },
      {
        type: 'code',
        title: 'الحاويات',
        lang: 'bash',
        code: `docker run -d --name N -p 8080:80 IMAGE
docker run --rm -it IMAGE sh
docker ps / docker ps -a
docker logs -f --tail 100 N
docker exec -it N sh
docker inspect N
docker stats
docker stop N / docker start N / docker restart N
docker rm N`,
      },
      {
        type: 'code',
        title: 'التخزين والشبكات',
        lang: 'bash',
        code: `docker volume create V
docker volume ls / inspect V / rm V
docker run -v V:/data IMAGE
docker run -v "$PWD":/app IMAGE

docker network create NET
docker network ls / inspect NET
docker network connect NET N`,
      },
      {
        type: 'code',
        title: 'Compose والتنظيف',
        lang: 'bash',
        code: `docker compose up -d --build
docker compose ps / logs -f / exec S sh
docker compose down          # آمن
docker compose down -v       # يمسح الـ volumes

docker system df
docker container prune
docker builder prune
docker system prune`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'نصيحة أخيرة من المدرّس',
        text: 'لما تُسأل، اتكلم في ثلاث طبقات: المشكلة، الميكانيزم اللي بيحلها، والتنازل (trade-off) بتاعه. الترتيب ده بيفرّق بين حد حافظ أوامر وحد فاهم النظام.',
      },
    ],
  },
  {
    id: 'resources',
    nav: 'مصادر التعلّم',
    title: 'مصادر موثوقة تكمّل بيها',
    lead: 'مصادر أنصحك تقرأها بالترتيب ده، من الرسمي للتطبيقي.',
    blocks: [
      {
        type: 'resources',
        items: [
          {
            kind: 'رسمي',
            title: 'Docker Documentation',
            url: 'https://docs.docker.com/',
            note: 'المصدر الأول والأدق. ابدأ بقسم Get Started ثم Build و Compose.',
          },
          {
            kind: 'رسمي',
            title: 'Dockerfile reference',
            url: 'https://docs.docker.com/reference/dockerfile/',
            note: 'مرجع كل تعليمة بالتفصيل والحالات الحدية — ارجع له وقت الشك.',
          },
          {
            kind: 'رسمي',
            title: 'Docker Compose specification',
            url: 'https://docs.docker.com/reference/compose-file/',
            note: 'كل مفاتيح ملف Compose ومعانيها بدقة.',
          },
          {
            kind: 'ممارسات',
            title: 'Building best practices',
            url: 'https://docs.docker.com/build/building/best-practices/',
            note: 'الممارسات الرسمية للبناء: الطبقات، الكاش، الحجم، وmulti-stage.',
          },
          {
            kind: 'أمان',
            title: 'Docker security',
            url: 'https://docs.docker.com/engine/security/',
            note: 'العزل والصلاحيات وseccomp وcapabilities من المصدر.',
          },
          {
            kind: 'معايير',
            title: 'Open Container Initiative (OCI)',
            url: 'https://opencontainers.org/',
            note: 'مواصفات الصورة والتشغيل اللي بتخلي الصور تشتغل خارج Docker كذلك.',
          },
          {
            kind: 'صور',
            title: 'Docker Hub — Official Images',
            url: 'https://hub.docker.com/search?image_filter=official',
            note: 'الصور الرسمية وتوثيق متغيراتها — اقرأ صفحة الصورة قبل استخدامها.',
          },
          {
            kind: 'تطبيقي',
            title: 'Play with Docker',
            url: 'https://labs.play-with-docker.com/',
            note: 'بيئة تجريبية في المتصفح لو مش عايز تثبّت حاجة.',
          },
          {
            kind: 'الخطوة اللي بعدها',
            title: 'Kubernetes Documentation',
            url: 'https://kubernetes.io/docs/home/',
            note: 'بعد ما تتقن Docker، ده المسار الطبيعي للتنسيق والتوسّع.',
          },
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'إزاي تستخدم المصادر دي صح',
        text: 'متقرأش بالتسلسل من غير تطبيق. خُد مفهوم واحد، اقرأ عنه صفحة رسمية، وبعدها طبّقه على مشروع حقيقي عندك، وبعدها اشرحه بصوت عالي كأنك بتشرح لسينيور. التلاتة مع بعض بيثبّتوا الفهم.',
      },
    ],
  },
]
