/* =============================================
   PIXO CODE — app.js
   ============================================= */

// ─── PROMPT DATA ────────────────────────────────────────────────────────────
const PROMPTS = [
  {
    id: 1,
    tag: 'frontend',
    title: 'React + Tailwind',
    name: 'Landing page',
    desc: "Zamonaviy,responsive va SEO-do‘st landing page yaratish uchun to‘liq prompt.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="12" r="3" stroke="#00e5ff" stroke-width="1.8"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00e5ff" stroke-width="1.8"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00e5ff" stroke-width="1.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00e5ff" stroke-width="1.8" transform="rotate(120 12 12)"/></svg>`,
    iconBg: 'rgba(0,229,255,0.1)',
    text: `Act as a Senior Frontend Developer. Create a complete, modern landing page for a SaaS product.

## Tech Stack
- React 18+ with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Framer Motion for animations

## Sections (in order)
1. **Navbar**: Sticky header with glassmorphism effect (backdrop-blur-md), logo on left, navigation links center (Home, Features, Pricing, About), 'Get Started' CTA button on right. Mobile hamburger menu.
2. **Hero Section**: Large H1 headline, supporting H2 subheadline, two buttons (primary solid indigo-600, secondary outline), right side: animated illustration placeholder with floating elements using Framer Motion.
3. **Features Grid**: 3-column responsive grid, 6 feature cards with Lucide icons, titles, and descriptions. Hover lift effect.
4. **Social Proof**: 'Trusted by' heading, 6 grayscale company logo placeholders in a row with fade-in animation.
5. **Testimonials**: 3-column grid of review cards with avatar, name, role, star rating, and quote.
6. **CTA Section**: Full-width gradient background, centered content, 'Start your free trial' prominent button.
7. **Footer**: 4-column layout (Product, Company, Resources, Legal), newsletter signup, social icons, copyright.

## Design Specifications
- Colors: Slate-900 background, Indigo-600 primary, Slate-200 text, White cards
- Font: Inter from Google Fonts
- Responsive: Mobile-first approach with sm/md/lg/xl breakpoints
- Animations: Fade-in on scroll, staggered children animations

## Output Requirements
Provide complete runnable code: App.tsx, all component files, and Tailwind config if needed. Include sample data arrays. Code must work after npm install and npm run dev.`
  },
  {
    id: 2,
    tag: 'backend',
    title: 'REST API Endpoint Dizayn',
    name: 'API Builder',
    desc: "Express.js yoki FastAPI bilan professional REST API endpoint yaratish.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><rect x="2" y="6" width="20" height="14" rx="2" stroke="#a78bfa" stroke-width="1.8"/><path d="M6 10h.01M10 10h8M6 14h8" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    iconBg: 'rgba(124,58,237,0.15)',
    text: `Sen senior backend arxitektisan. Quyidagi API endpoint dizayni uchun yordam ber:

Endpoint: [HTTP_METHOD] /api/v1/[RESOURCE]
Maqsad: [ENDPOINT_PURPOSE]
Framework: [Express.js | FastAPI | NestJS]
Database: [PostgreSQL | MongoDB | MySQL]

Menga quyidagilarni yoz:
1. Route handler to'liq kodi
2. Request validation (Joi, Zod yoki Pydantic)
3. Middleware: auth, rate limiting, CORS
4. Error handling: custom exception sinflar
5. Database query optimizatsiyasi (indekslar, eager loading)
6. Response DTO/serializer
7. OpenAPI/Swagger hujjatlash
8. Unit va integration testlar
9. Environment variable boshqaruvi
10. Docker-ready konfiguratsiya

Best practice: RESTful prinsipler, HTTP status codes, JSON:API yoki custom format.`
  },
  {
    id: 3,
    tag: 'debug',
    title: "Kod Xatolarini Tahlil Qilish",
    name: 'Bug Hunter',
    desc: "Murakkab buglarni tizimli ravishda topish va hal qilish metodologiyasi.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 22c4.418 0 8-4.03 8-9H4c0 4.97 3.582 9 8 9z" stroke="#f59e0b" stroke-width="1.8"/><path d="M12 13V8M9 3l3 3 3-3" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 13h2M20 13h2M4.93 6.93l1.41 1.41M17.66 8.34l1.41-1.41" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    iconBg: 'rgba(245,158,11,0.12)',
    text: `Sen expert dasturchi-debuggersan. Quyidagi xatoni tahlil qilib, hal qil:

Xato xabari:
\`\`\`
[ERROR_MESSAGE]
\`\`\`

Stack trace:
\`\`\`
[STACK_TRACE]
\`\`\`

Kontekst: [BRIEF_CONTEXT]
Dasturlash tili/framework: [LANGUAGE/FRAMEWORK]

Iltimos quyidagilarni bajaring:
1. Xatoning asosiy sababini aniqlang (root cause analysis)
2. Xato qayerda va nima uchun sodir bo'layotganini tushuntiring
3. Kamida 2 ta hal yo'lini tavsiya eting (tez va to'g'ri yechim)
4. Kodni qanday to'g'rilash kerakligini ko'rsating
5. Kelajakda shunaqa xatolarni oldini olish uchun best practices
6. Qo'shimcha debuglash vositalari va metodlari

Javob: Aniq, tushunarli, kod namunalari bilan.`
  },
  {
    id: 4,
    tag: 'review',
    title: "Kod Review va Refactoring",
    name: 'Code Inspector',
    desc: "Mavjud kodni professional ko'z bilan ko'rib, yaxshilash tavsiyalari berish.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M9 11l3 3L22 4" stroke="#10b981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#10b981" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    iconBg: 'rgba(16,185,129,0.12)',
    text: `Sen senior software engineer va code reviewer sifatida ishlaysan.

Quyidagi kodni review qil:
\`\`\`[LANGUAGE]
[CODE_TO_REVIEW]
\`\`\`

Review mezonlari:
1. Kod sifati va o'qilishi (readability)
2. Performance muammolari va optimizatsiya imkoniyatlari
3. Security zaifliklar (SQL injection, XSS, CSRF va boshqalar)
4. SOLID prinsiplariga muvofiqligi
5. Design patterns to'g'ri ishlatilganmi?
6. Xatoliklarni boshqarish yetarlimi?
7. Test qilish qiyinmi (testability)?
8. Dokumentatsiya va kommentariylar yetarlimi?

Natija formati:
✅ Yaxshi tomonlar
❌ Muammolar (severity: critical/major/minor)
💡 Tavsiyalar (kod namunalari bilan)
📊 Umumiy baho (1-10)`
  },
  {
    id: 5,
    tag: 'frontend',
    title: 'CSS Animation & Micro-interactions',
    name: 'Motion Studio',
    desc: "Zamonaviy CSS animatsiyalar va foydalanuvchi tajribasini yaxshilaydigan micro-interactions.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#00e5ff" stroke-width="1.8" stroke-linejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00e5ff" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    iconBg: 'rgba(0,229,255,0.1)',
    text: `Sen CSS animatsiyalar bo'yicha mutaxassissan.

Element: [ELEMENT_DESCRIPTION]
Animatsiya turi: [hover | scroll | load | click | transition]
Framework: [Pure CSS | Tailwind | Framer Motion | GSAP]

Quyidagilarni yarating:
1. Asosiy animatsiya kodi (keyframes yoki transition)
2. Easing funksiyalar (cubic-bezier) tushuntirishi
3. Performance optimizatsiyasi (will-change, transform vs top/left)
4. Reduced motion foydalanuvchilar uchun @prefers-reduced-motion
5. Cross-browser compatibility
6. JavaScript bilan birgalikda ishlatish (kerak bo'lsa)

Animatsiya turlari:
- Entrance animations (fade, slide, scale, rotate)
- Hover effects (lift, glow, morph)
- Loading states (skeleton, spinner, progress)
- Scroll-triggered animations
- Stagger effects (bir nechta element)

Interaktiv demo uchun HTML+CSS+JS misol ham bering.`
  },
  {
    id: 6,
    tag: 'backend',
    title: 'Database Schema Dizayn',
    name: 'DB Architect',
    desc: "Kuchli va miqyoslanadigan ma'lumotlar bazasi strukturasi loyihalash.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="#a78bfa" stroke-width="1.8"/><path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="#a78bfa" stroke-width="1.8"/><path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" stroke="#a78bfa" stroke-width="1.8"/></svg>`,
    iconBg: 'rgba(124,58,237,0.15)',
    text: `Sen database arxitekt sifatida ishlaysan.

Loyiha: [PROJECT_NAME]
Tizim turi: [e-commerce | SaaS | social | marketplace]
Ma'lumotlar bazasi: [PostgreSQL | MySQL | MongoDB | Supabase]
Kutilgan foydalanuvchilar: [USER_COUNT]

Quyidagilarni loyihalashtir:
1. Entity-Relationship Diagram (ERD) tavsifi
2. Barcha jadvallar:
   - To'liq maydonlar (nom, tip, constraints)
   - Primary keys va Foreign keys
   - Unique constraints
   - Default qiymatlar
3. Indekslar strategiyasi:
   - Composite indekslar
   - Partial indekslar
   - Full-text search indekslar
4. Normalizatsiya (3NF yoki BCNF)
5. Partition strategiyasi (katta ma'lumotlar uchun)
6. Backup va recovery rejasi
7. Migration skriptlari (SQL)
8. Seed data namunalari

Chiqish: SQL DDL skriptlar + ER diagram tavsifi`
  },
  {
    id: 7,
    tag: 'debug',
    title: 'Performance Profiling va Optimizatsiya',
    name: 'Speed Lab',
    desc: "Ilova tezligini aniqlash va sekin joylarni optimizatsiya qilish.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    iconBg: 'rgba(245,158,11,0.12)',
    text: `Sen performance optimization mutaxassisi sifatida ishlaysan.

Ilova turi: [web app | mobile | API | database]
Muammo: [PERFORMANCE_ISSUE]
Hozirgi ko'rsatkichlar: [CURRENT_METRICS]
Maqsad ko'rsatkichlar: [TARGET_METRICS]

Profiling va optimizatsiya rejasi:
1. Profiling vositalari:
   - Frontend: Chrome DevTools, Lighthouse, Web Vitals
   - Backend: cProfile, py-spy, clinic.js
   - Database: EXPLAIN ANALYZE, slow query log

2. Umumiy muammolar va yechimlar:
   - N+1 query muammosi
   - Memory leaks
   - Bundle size optimizatsiyasi
   - Image optimization
   - Caching strategiyasi (Redis, CDN, browser cache)

3. Core Web Vitals optimizatsiyasi:
   - LCP (Largest Contentful Paint)
   - FID/INP (Interaction to Next Paint)
   - CLS (Cumulative Layout Shift)

4. Backend performance:
   - Database query optimization
   - Connection pooling
   - Async/await to'g'ri ishlatish
   - Rate limiting

Menga: aniqlangan muammo + yechim kodi + before/after taqqoslash bering.`
  },
  {
    id: 8,
    tag: 'review',
    title: 'Security Audit Checklist',
    name: 'Shield Guard',
    desc: "Ilovani xavfsizlik nuqtai nazaridan to'liq tekshirish va zaifliklarni aniqlash.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#10b981" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#10b981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    iconBg: 'rgba(16,185,129,0.12)',
    text: `Sen cybersecurity ekspert va penetration tester sifatida ishlaysan.

Ilova: [APP_NAME]
Stack: [TECH_STACK]
Muhit: [production | staging | development]

To'liq security audit o'tkaz:

1. OWASP Top 10 tekshiruvi:
   ☐ Injection (SQL, NoSQL, Command)
   ☐ Broken Authentication
   ☐ Sensitive Data Exposure
   ☐ XML External Entities (XXE)
   ☐ Broken Access Control
   ☐ Security Misconfiguration
   ☐ XSS (Cross-Site Scripting)
   ☐ Insecure Deserialization
   ☐ Vulnerable Components
   ☐ Insufficient Logging

2. API Security:
   - Authentication (JWT, OAuth2, API Keys)
   - Rate limiting va throttling
   - Input validation va sanitization
   - CORS konfiguratsiyasi

3. Infrastructure Security:
   - Environment variables
   - Secrets management
   - HTTPS/TLS konfiguratsiya
   - Docker/K8s security

4. Code-level zaifliklar va yechimlar

Natija: Topilgan zaifliklar + CVSS score + tuzatish kod namunalari`
  },
  {
    id: 9,
    tag: 'frontend',
    title: 'State Management Arxitekturasi',
    name: 'State Master',
    desc: "Redux Toolkit, Zustand yoki Jotai bilan kuchli holat boshqaruvi tizimi.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#00e5ff" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#00e5ff" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#00e5ff" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#00e5ff" stroke-width="1.8" opacity="0.5"/><path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,
    iconBg: 'rgba(0,229,255,0.1)',
    text: `Sen React state management bo'yicha arxitektsan.

Loyiha: [PROJECT_DESCRIPTION]
Murakkablik: [simple | medium | complex | enterprise]
Kutilgan: [real-time | offline-first | multi-user | single-user]

State management yechimi tanlang va implement qiling:

1. Kutubxona tanlash asoslari:
   - Redux Toolkit: katta, murakkab ilovalar
   - Zustand: o'rta, minimal boilerplate
   - Jotai: atom-based, React-native feel
   - TanStack Query: server state
   - Recoil: concurrent mode friendly

2. Store strukturasi:
   - Global state nima bo'lishi kerak
   - Server state vs UI state ajratish
   - Slice/atom dizayn pattern

3. To'liq implementatsiya:
   - Store konfiguratsiyasi
   - Actions/mutations
   - Selectors/derived state
   - Async operations (thunks yoki sagas)
   - DevTools integratsiyasi
   - TypeScript types

4. Performance:
   - Gereksiz re-render oldini olish
   - Memoization strategiyasi
   - Code splitting

Chiqish: To'liq ishlaydigan state management tizimi.`
  },
  {
    id: 10,
    tag: 'backend',
    title: 'Microservices Arxitekturasi',
    name: 'Micro Forge',
    desc: "Miqyoslanadigan microservices tizimini loyihalash va implement qilish.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="12" r="3" stroke="#a78bfa" stroke-width="1.8"/><circle cx="4" cy="6" r="2" stroke="#a78bfa" stroke-width="1.8"/><circle cx="20" cy="6" r="2" stroke="#a78bfa" stroke-width="1.8"/><circle cx="4" cy="18" r="2" stroke="#a78bfa" stroke-width="1.8"/><circle cx="20" cy="18" r="2" stroke="#a78bfa" stroke-width="1.8"/><path d="M6 7l4 4M18 7l-4 4M6 17l4-4M18 17l-4-4" stroke="#a78bfa" stroke-width="1.5"/></svg>`,
    iconBg: 'rgba(124,58,237,0.15)',
    text: `Sen cloud arxitekt va microservices mutaxassisissan.

Loyiha: [PROJECT_NAME]
Hozirgi holat: [monolith | existing microservices]
Texnologiyalar: [Node.js | Python | Go | Java]
Cloud: [AWS | GCP | Azure | Kubernetes]

Microservices arxitektura loyihasini tuzing:

1. Service decomposition:
   - Domain-Driven Design (DDD) asosida bo'linish
   - Har bir servicening mas'uliyati (SRP)
   - Service inventory

2. Communication patterns:
   - Synchronous: REST, gRPC
   - Asynchronous: RabbitMQ, Kafka, SQS
   - Event-driven architecture
   - API Gateway (Kong, AWS API Gateway)

3. Har bir service uchun:
   - Dockerfile va docker-compose
   - Health check endpoint
   - Graceful shutdown
   - Circuit breaker (Hystrix pattern)

4. Cross-cutting concerns:
   - Centralized logging (ELK stack)
   - Distributed tracing (Jaeger, Zipkin)
   - Service discovery (Consul, Kubernetes)
   - Secrets management (Vault)

5. Deployment:
   - Kubernetes manifests (Deployment, Service, Ingress)
   - CI/CD pipeline (GitHub Actions)
   - Blue-green deployment

Chiqish: Arxitektura diagrammasi + barcha konfiguratsiya fayllar.`
  },
  {
    id: 11,
    tag: 'debug',
    title: 'Memory Leak Topish va Tuzatish',
    name: 'Leak Detector',
    desc: "JavaScript va Node.js ilovalaridagi memory leaklarni professional tarzda aniqlash.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#f59e0b" stroke-width="1.8"/><path d="M12 8v4M12 16h.01" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/></svg>`,
    iconBg: 'rgba(245,158,11,0.12)',
    text: `Sen JavaScript performance va memory mutaxassisissan.

Muammo tavsifi: [MEMORY_ISSUE_DESCRIPTION]
Muhit: [Browser | Node.js | Electron]
Framework: [React | Vue | Angular | Vanilla]
Alomatlari: [slow memory growth | high heap | GC pauses]

Memory leak diagnostika va yechim:

1. Aniqlash vositalari:
   - Chrome DevTools Memory panel
   - Node.js: --inspect, clinic doctor
   - heapdump, memwatch-next

2. Umumiy memory leak sabablari:
\`\`\`javascript
// ❌ Event listener tozalanmagan
window.addEventListener('resize', handler) // componentWillUnmount yo'q

// ❌ setInterval tozalanmagan
const id = setInterval(fn, 1000) // clearInterval yo'q

// ❌ Closure orqali katta ob'ekt ushlab qolish
// ❌ Global variables
// ❌ DOM nodes reference
\`\`\`

3. React-specific leaklar:
   - useEffect cleanup funksiyalari
   - Async operatsiyalar unmount dan keyin
   - Event delegation muammolari

4. Node.js leaklar:
   - Stream larni to'g'ri yopish
   - Connection pool boshqaruvi
   - Cache cheksiz o'sishi

5. Heap snapshot tahlili qadamlari

6. To'liq tuzatilgan kod namunalari

Natija: Muammo + sabab + to'liq yechim kodi + test.`
  },
  {
    id: 12,
    tag: 'review',
    title: 'API Design Best Practices',
    name: 'API Polisher',
    desc: "RESTful yoki GraphQL API dizaynini professional standartlarga moslashtirish.",
    icon: `<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#10b981" stroke-width="1.8" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="#10b981" stroke-width="1.8" stroke-linejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="#10b981" stroke-width="1.8" stroke-linecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="#10b981" stroke-width="1.8" stroke-linecap="round"/><polyline points="10 9 9 9 8 9" stroke="#10b981" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    iconBg: 'rgba(16,185,129,0.12)',
    text: `Sen API dizayn va developer experience mutaxassisissan.

Mavjud API: [API_DESCRIPTION]
Tur: [REST | GraphQL | gRPC | WebSocket]
Foydalanuvchilar: [internal | public | partner]

API dizaynini review qil va yaxshila:

1. RESTful prinsipler:
   - Resource naming (nouns, not verbs)
   - HTTP methods to'g'ri ishlatish
   - Status codes standartlari
   - Versioning strategiyasi (/v1/, header, param)

2. Request/Response dizayn:
   - Consistent naming (camelCase vs snake_case)
   - Pagination (cursor vs offset)
   - Filtering, sorting, searching
   - Sparse fieldsets
   - Error response format (RFC 7807)

3. Security:
   - Authentication (Bearer, API Key, OAuth2)
   - Rate limiting headers
   - Input validation

4. Documentation:
   - OpenAPI 3.0 spec
   - Request/Response examples
   - Error codes dictionary

5. Developer Experience:
   - SDK generation (OpenAPI Generator)
   - Postman collection
   - Webhook support

6. Backward compatibility:
   - Deprecation strategy
   - Migration guides

Chiqish: Yaxshilangan API spec + OpenAPI YAML + changelog.`
  }
];

// ─── STATE ──────────────────────────────────────────────────────────────────
let activeTag = 'all';
let currentPrompt = null;

// ─── RENDER CARDS ───────────────────────────────────────────────────────────
function renderCards(list) {
  const grid = document.getElementById('promptGrid');
  const empty = document.getElementById('emptyMsg');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';
  grid.innerHTML = list.map((p, i) => `
    <div class="prompt-card"
         style="animation-delay: ${i * 0.06}s"
         onclick="openModal(${p.id})"
         role="button"
         tabindex="0"
         onkeydown="if(event.key==='Enter')openModal(${p.id})"
         aria-label="${p.title}">
      <div class="card-head">
        <div class="card-icon-wrap" style="background:${p.iconBg}">
          ${p.icon}
        </div>
        <span class="tag-pill tag-${p.tag}">${p.tag}</span>
      </div>
      ${p.name ? `<div class="card-name">${p.name}</div>` : ''}
      <div class="card-title">${p.title}</div>
      <div class="card-desc">${p.desc}</div>
      <div class="card-footer">
        <span class="card-chars">${p.text.length} belgi</span>
        <div class="card-arrow">
          <svg viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── FILTER LOGIC ───────────────────────────────────────────────────────────
function getFiltered() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase();
  return PROMPTS.filter(p => {
    const matchTag = activeTag === 'all' || p.tag === activeTag;
    const matchSearch = !query ||
      p.title.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.tag.toLowerCase().includes(query) ||
      (p.name && p.name.toLowerCase().includes(query));
    return matchTag && matchSearch;
  });
}

function filterPrompts() { renderCards(getFiltered()); }

function filterByTag(tag, btn) {
  activeTag = tag;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  filterPrompts();
}

// ─── MODAL ──────────────────────────────────────────────────────────────────
function openModal(id) {
  const p = PROMPTS.find(x => x.id === id);
  if (!p) return;
  currentPrompt = p;

  document.getElementById('modalTag').innerHTML =
    `<span class="tag-pill tag-${p.tag}">${p.tag}</span>`;
  document.getElementById('modalTitle').textContent = p.title;

  const modalName = document.getElementById('modalName');
  if (modalName) modalName.textContent = p.name || '';

  document.getElementById('modalText').textContent = p.text;
  resetCopyBtn();

  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  setTimeout(() => document.getElementById('copyBtn')?.focus(), 300);
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  currentPrompt = null;
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ─── COPY ───────────────────────────────────────────────────────────────────
function copyPrompt() {
  if (!currentPrompt) return;

  const text = currentPrompt.text;
  const btn = document.getElementById('copyBtn');
  const btnText = document.getElementById('copyBtnText');

  const doCopy = (success) => {
    if (success) {
      if (btn) btn.classList.add('copied');
      if (btnText) btnText.textContent = 'Nusxalandi!';
      showToast();
      trackCopy(currentPrompt);
      setTimeout(resetCopyBtn, 2000);
    }
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => doCopy(true))
      .catch(() => fallbackCopy(text, doCopy));
  } else {
    fallbackCopy(text, doCopy);
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { cb(document.execCommand('copy')); } catch (e) { cb(false); }
  document.body.removeChild(ta);
}

function resetCopyBtn() {
  const btn = document.getElementById('copyBtn');
  const btnText = document.getElementById('copyBtnText');
  if (btn) btn.classList.remove('copied');
  if (btnText) btnText.textContent = 'Nusxalash';
}

// ─── TOAST ──────────────────────────────────────────────────────────────────
function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── ACTIVITY TRACKING ──────────────────────────────────────────────────────
function trackCopy(prompt) {
  let count = parseInt(localStorage.getItem('pixo_copy_count') || '0');
  localStorage.setItem('pixo_copy_count', ++count);

  const activity = JSON.parse(localStorage.getItem('pixo_activity') || '[]');
  const now = new Date();
  const time = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  activity.push({ id: prompt.id, title: prompt.title, tag: prompt.tag, time });
  if (activity.length > 20) activity.shift();
  localStorage.setItem('pixo_activity', JSON.stringify(activity));
}

// ─── KEYBOARD ───────────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
});

// ─── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('promptGrid')) {
    renderCards(PROMPTS);
  }
});
