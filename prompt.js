// ─── ICON SVGs ───
const ICONS = {
  portrait: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#6c47ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  landscape: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#43e8a8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  product: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffb432" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  art: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#a88fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  architecture: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ff47d6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/><line x1="12" y1="12" x2="12" y2="18"/></svg>`,
  food: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ff7a47" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  animal: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#47d6ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.1.282"/></svg>`,
  fashion: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e8a843" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>`,
};

const CATS = [
  { id: 'all',          label: 'Hammasi',      icon: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>` },
  { id: 'portrait',     label: 'Portret',      icon: ICONS.portrait },
  { id: 'landscape',    label: 'Manzara',      icon: ICONS.landscape },
  { id: 'product',      label: 'Mahsulot',     icon: ICONS.product },
  { id: 'art',          label: "San'at",       icon: ICONS.art },
  { id: 'architecture', label: 'Arxitektura',  icon: ICONS.architecture },
  { id: 'food',         label: 'Taom',         icon: ICONS.food },
  { id: 'animal',       label: 'Hayvon',       icon: ICONS.animal },
  { id: 'fashion',      label: 'Moda',         icon: ICONS.fashion },
];

// ─── 150 PROMPTS ───
const PROMPTS = [
  // PORTRET (20)
  { id:1,  cat:'portrait', title:'Portret Ultra 4K', badge:'4K', badgeClass:'badge-4k', desc:'Yuz detallari bilan ultra aniq portret', prompt:'Upscale this portrait to 4K Ultra HD (3840×2160). Enhance facial details: skin texture, pores, eye iris, eyelashes, hair strands. Remove noise and blur. Preserve natural skin tones. Photorealistic output.' },
  { id:2,  cat:'portrait', title:'Portret HDR Teri', badge:'HDR', badgeClass:'badge-hdr', desc:'Teri va ko\'z teksturasi HDR bilan', prompt:'Enhance portrait to 4K HDR. Maximize skin pore detail, iris texture, eyelash definition. Natural HDR lighting. Remove compression artifacts. Cinematic warm color grade. 3840×2160px.' },
  { id:3,  cat:'portrait', title:'Stüdyo Portret 4K', badge:'4K', badgeClass:'badge-4k', desc:'Professional stüdyo portret sifati', prompt:'Upscale studio portrait to 4K. Professional lighting enhancement, soft shadows, sharp facial features. Clean background. Skin retouching while preserving natural texture. 3840×2160px output.' },
  { id:4,  cat:'portrait', title:'Bolalar Portreti', badge:'4K', badgeClass:'badge-4k', desc:'Bolalar yuzini muloyim 4K ga oshirish', prompt:'Upscale children portrait to 4K. Soft, gentle skin enhancement. Bright eyes, natural colors. Remove noise while keeping soft child skin texture. Warm natural tones. 3840×2160px.' },
  { id:5,  cat:'portrait', title:'Keksa Portret Restore', badge:'AI', badgeClass:'badge-ai', desc:'Keksa odamlar portretini tiklash', prompt:'Restore and upscale elderly portrait to 4K. Enhance wrinkle details authentically, silver hair texture, wise eyes clarity. Respectful enhancement preserving age characteristics. 3840×2160px.' },
  { id:6,  cat:'portrait', title:'Oilaviy Portret 4K', badge:'4K', badgeClass:'badge-4k', desc:'Guruh va oilaviy rasmlarni 4K ga', prompt:'Upscale family group portrait to 4K. Sharpen all faces equally, balance exposure across subjects. Natural background blur. Consistent color grading. 3840×2160px photorealistic.' },
  { id:7,  cat:'portrait', title:'Kino Portreti', badge:'PRO', badgeClass:'badge-pro', desc:'Kinematografik portret effekti', prompt:'Upscale to 4K cinematic portrait. Film grain texture, dramatic Rembrandt lighting, deep shadows, sharp eyes. Cinematic color grade: teal-orange LUT. 3840×2160px.' },
  { id:8,  cat:'portrait', title:'Ko\'cha Portreti', badge:'4K', badgeClass:'badge-4k', desc:'Ko\'chada olingan portretni aniqlash', prompt:'Upscale street portrait to 4K. Enhance subject sharpness while keeping natural bokeh background. Fix motion blur on face. Urban color tone. 3840×2160px.' },
  { id:9,  cat:'portrait', title:'Qora-Oq Portret', badge:'HDR', badgeClass:'badge-hdr', desc:'B&W portretni HDR bilan kuchaytirish', prompt:'Upscale black and white portrait to 4K HDR. Maximize tonal range, deep blacks, bright highlights. Skin texture detail. Classic film look. Silver gelatin print quality. 3840×2160px.' },
  { id:10, cat:'portrait', title:'Sportchi Portreti', badge:'4K', badgeClass:'badge-4k', desc:'Sport va harakat portretlari', prompt:'Upscale athlete portrait to 4K. Sharp sweat drops, muscle definition, intense expression detail. Dynamic lighting. Sports magazine quality. 3840×2160px.' },
  { id:11, cat:'portrait', title:'Kelin Portreti', badge:'PRO', badgeClass:'badge-pro', desc:'To\'y uchun professional portret', prompt:'Upscale bridal portrait to 4K. Flawless skin, sparkling jewelry detail, delicate fabric texture, flower details. Soft romantic lighting. Wedding magazine quality. 3840×2160px.' },
  { id:12, cat:'portrait', title:'Korporativ Portret', badge:'4K', badgeClass:'badge-4k', desc:'Biznes va korporativ portret sifati', prompt:'Upscale corporate/business portrait to 4K. Professional appearance, sharp suit texture, confident expression. Clean neutral background. LinkedIn-ready quality. 3840×2160px.' },
  { id:13, cat:'portrait', title:'Badiiy Portret', badge:'AI', badgeClass:'badge-ai', desc:'Ijodiy va badiiy portret effektlari', prompt:'Upscale artistic portrait to 4K. Enhance painterly qualities, dramatic lighting, expressive details. Artistic color palette. Fine art photography quality. 3840×2160px.' },
  { id:14, cat:'portrait', title:'Yon Profil 4K', badge:'4K', badgeClass:'badge-4k', desc:'Yon tomondan olingan profil portreti', prompt:'Upscale profile/side portrait to 4K. Sharp jawline, ear details, hair texture from side angle. Beautiful background separation. 3840×2160px.' },
  { id:15, cat:'portrait', title:'Ko\'z Makro 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Ko\'zni ekstremal yaqindan 4K', prompt:'Upscale extreme close-up eye portrait to 4K. Maximum iris detail, individual eyelash clarity, reflection in pupil. Macro photography quality. 3840×2160px.' },
  { id:16, cat:'portrait', title:'Tabassumli Portret', badge:'4K', badgeClass:'badge-4k', desc:'Tabassum va his-tuyg\'u portreti', prompt:'Upscale smiling portrait to 4K. Bright natural smile, tooth detail, laugh lines, joyful eyes. Warm uplifting color grade. 3840×2160px.' },
  { id:17, cat:'portrait', title:'Milliy Kiyim Portreti', badge:'HDR', badgeClass:'badge-hdr', desc:'An\'anaviy kiyimlarda portret', prompt:'Upscale traditional cultural portrait to 4K. Enhance fabric patterns, embroidery details, jewelry, headdress texture. Rich saturated cultural colors. 3840×2160px.' },
  { id:18, cat:'portrait', title:'Suv Ostida Portret', badge:'AI', badgeClass:'badge-ai', desc:'Suv ostida olingan portretni tiklash', prompt:'Upscale underwater portrait to 4K. Enhance water caustics, bubble details, hair flow, skin through water. Enhance blue-teal tones. 3840×2160px.' },
  { id:19, cat:'portrait', title:'Bog\'cha Portreti', badge:'4K', badgeClass:'badge-4k', desc:'Tabiat va bog\' fonida portret', prompt:'Upscale outdoor garden portrait to 4K. Sharp subject against beautiful bokeh flowers/greenery. Natural sunlight enhancement. Vibrant natural colors. 3840×2160px.' },
  { id:20, cat:'portrait', title:'Eski Portret Restore', badge:'AI', badgeClass:'badge-ai', desc:'Qadimgi portret rasmlarini tiklash', prompt:'Restore vintage portrait to 4K. Remove scratches, yellowing, tears. Reconstruct facial details. Optional: natural colorization. Preserve historical authenticity. 3840×2160px.' },

  // MANZARA (20)
  { id:21, cat:'landscape', title:'Tog\' Manzarasi 4K', badge:'4K', badgeClass:'badge-4k', desc:'Tog\' cho\'qqilari va vodiylarni 4K ga', prompt:'Upscale mountain landscape to 4K. Enhance rock texture, snow details, cloud formations, atmospheric haze layers. Sharp horizon. Dramatic alpine color palette. 3840×2160px.' },
  { id:22, cat:'landscape', title:'Okean Qirg\'og\'i 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Dengiz va okean manzarasi HDR', prompt:'Upscale ocean/beach landscape to 4K HDR. Enhance wave foam detail, wet sand texture, water transparency, horizon glow. Vivid coastal colors. 3840×2160px.' },
  { id:23, cat:'landscape', title:'O\'rmon Manzarasi', badge:'4K', badgeClass:'badge-4k', desc:'Daraxt va o\'rmon detallari 4K', prompt:'Upscale forest landscape to 4K. Every leaf, bark texture, light ray through canopy, forest floor detail. Natural green palette enhancement. 3840×2160px.' },
  { id:24, cat:'landscape', title:'Cho\'l Manzarasi', badge:'HDR', badgeClass:'badge-hdr', desc:'Qum va cho\'l landshafti HDR', prompt:'Upscale desert landscape to 4K HDR. Sand dune texture, heat shimmer, dramatic shadows, vivid sunset sky. Warm orange-red palette. 3840×2160px.' },
  { id:25, cat:'landscape', title:'Tungi Shahar 4K', badge:'4K', badgeClass:'badge-4k', desc:'Shahar tungi nurlarini 4K ga', prompt:'Upscale night cityscape to 4K. Enhance light bokeh, neon signs, building window lights, reflections on wet streets. Vivid urban night palette. 3840×2160px.' },
  { id:26, cat:'landscape', title:'Sharsharani Aniqlash', badge:'PRO', badgeClass:'badge-pro', desc:'Sharshara va daryo detallari', prompt:'Upscale waterfall landscape to 4K. Silky water motion detail, wet rock texture, spray mist, surrounding vegetation. Long-exposure feel. 3840×2160px.' },
  { id:27, cat:'landscape', title:'Qish Manzarasi', badge:'4K', badgeClass:'badge-4k', desc:'Qor va qish tabiat manzarasi', prompt:'Upscale winter landscape to 4K. Snow crystal detail, frozen lake texture, frost on branches, cold blue-white color palette. 3840×2160px.' },
  { id:28, cat:'landscape', title:'Kuz Manzarasi', badge:'HDR', badgeClass:'badge-hdr', desc:'Kuz ranglari HDR bilan portret', prompt:'Upscale autumn landscape to 4K HDR. Vivid orange-red-yellow foliage detail, fallen leaves texture, golden hour light. Rich warm color saturation. 3840×2160px.' },
  { id:29, cat:'landscape', title:'Bahor Manzarasi', badge:'4K', badgeClass:'badge-4k', desc:'Bahor gulli daraxt va tabiat', prompt:'Upscale spring landscape to 4K. Cherry blossom/flower detail, fresh green, morning dew on grass. Soft pastel color palette. 3840×2160px.' },
  { id:30, cat:'landscape', title:'Qoya-Tosh Manzara', badge:'PRO', badgeClass:'badge-pro', desc:'Qoya va tosh strukturalari 4K', prompt:'Upscale rocky cliff landscape to 4K. Maximum rock texture and geological detail, cliff face sharpness, dramatic lighting. 3840×2160px.' },
  { id:31, cat:'landscape', title:'Ko\'l Manzarasi', badge:'4K', badgeClass:'badge-4k', desc:'Ko\'l va suv aksi manzarasi', prompt:'Upscale lake landscape to 4K. Perfect water reflection, mountain mirror image, boat details, shoreline clarity. Serene blue palette. 3840×2160px.' },
  { id:32, cat:'landscape', title:'Quyosh Botishi', badge:'HDR', badgeClass:'badge-hdr', desc:'Quyosh chiqishi va botishi HDR', prompt:'Upscale sunset/sunrise landscape to 4K HDR. Maximum sky gradient detail, cloud texture, golden rays, silhouette sharpness. Vivid warm sky. 3840×2160px.' },
  { id:33, cat:'landscape', title:'Yulduzli Osmon', badge:'AI', badgeClass:'badge-ai', desc:'Milky Way va yulduzlar manzarasi', prompt:'Upscale night sky/milky way landscape to 4K. Individual star clarity, nebula colors, Milky Way core detail, foreground silhouette. 3840×2160px.' },
  { id:34, cat:'landscape', title:'Tuman Manzarasi', badge:'4K', badgeClass:'badge-4k', desc:'Tuman va atmosfera effektlari', prompt:'Upscale foggy/misty landscape to 4K. Atmospheric perspective layers, fog density, emerging trees/hills, ethereal mood. 3840×2160px.' },
  { id:35, cat:'landscape', title:'Vulqon Manzarasi', badge:'PRO', badgeClass:'badge-pro', desc:'Vulqon va lava manzarasi', prompt:'Upscale volcano landscape to 4K. Lava flow texture, volcanic ash, dramatic smoke clouds, glowing embers detail. 3840×2160px.' },
  { id:36, cat:'landscape', title:'Havo Fotosurati', badge:'4K', badgeClass:'badge-4k', desc:'Drone va havo ko\'rinishlari', prompt:'Upscale aerial/drone landscape to 4K. Ground texture detail from above, field patterns, river meanders, urban grid clarity. 3840×2160px.' },
  { id:37, cat:'landscape', title:'Tropik Manzara', badge:'HDR', badgeClass:'badge-hdr', desc:'Tropik o\'rmon va janub manzarasi', prompt:'Upscale tropical landscape to 4K HDR. Palm leaf detail, turquoise water clarity, coral visible underwater, vibrant tropical colors. 3840×2160px.' },
  { id:38, cat:'landscape', title:'Arktika Manzarasi', badge:'4K', badgeClass:'badge-4k', desc:'Muz va arktika landshafti', prompt:'Upscale arctic/polar landscape to 4K. Ice crystal texture, glacier crevasse detail, aurora colors (if present), polar blue-white palette. 3840×2160px.' },
  { id:39, cat:'landscape', title:'Shimir Yoriqlari', badge:'AI', badgeClass:'badge-ai', desc:'Yerosti g\'or va yoriqlari', prompt:'Upscale cave/canyon landscape to 4K. Rock strata colors, light beam through opening, stalactite detail. Underground color palette. 3840×2160px.' },
  { id:40, cat:'landscape', title:'Infraqizil Manzara', badge:'AI', badgeClass:'badge-ai', desc:'Infraqizil ko\'rinishda manzara', prompt:'Upscale infrared landscape to 4K. Pure white foliage, dramatic dark sky, high contrast. Classic infrared photography look. 3840×2160px.' },

  // MAHSULOT (20)
  { id:41, cat:'product', title:'Studio Mahsulot 4K', badge:'4K', badgeClass:'badge-4k', desc:'Oq fonda studio mahsulot fotosi', prompt:'Upscale product studio photo to 4K. Sharp edges, material texture detail, clean white/grey background, professional lighting. E-commerce ready. 3840×2160px.' },
  { id:42, cat:'product', title:'Kosmetika Mahsulot', badge:'PRO', badgeClass:'badge-pro', desc:'Atir va kosmetika mahsulotlari', prompt:'Upscale cosmetics/perfume product to 4K. Glass bottle reflections, liquid clarity, label text sharpness, luxury feel. High-end beauty brand quality. 3840×2160px.' },
  { id:43, cat:'product', title:'Elektronika 4K', badge:'4K', badgeClass:'badge-4k', desc:'Telefon va elektron qurilmalar', prompt:'Upscale electronics product photo to 4K. Screen reflection, button detail, port clarity, metal/glass texture. Tech product photography quality. 3840×2160px.' },
  { id:44, cat:'product', title:'Kiyim-Kechak', badge:'4K', badgeClass:'badge-4k', desc:'Mato va kiyim teksturasi 4K', prompt:'Upscale clothing/fabric product to 4K. Thread texture, stitch detail, fabric weave pattern, color accuracy. Fashion e-commerce quality. 3840×2160px.' },
  { id:45, cat:'product', title:'Poyabzal 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Oyoq kiyim va poyabzal fotosi', prompt:'Upscale footwear product to 4K. Sole texture, stitching detail, material (leather/suede/mesh) clarity, sole pattern. Sneaker/shoe retail quality. 3840×2160px.' },
  { id:46, cat:'product', title:'Soat Va Zargarlik', badge:'PRO', badgeClass:'badge-pro', desc:'Qimmatbaho zargarlik buyumlari', prompt:'Upscale watch/jewelry to 4K. Diamond sparkle, metal polish reflection, engravings, gem clarity. Luxury jewelry photography quality. 3840×2160px.' },
  { id:47, cat:'product', title:'Mebel 4K', badge:'4K', badgeClass:'badge-4k', desc:'Uy mebeli va interior fotosi', prompt:'Upscale furniture product to 4K. Wood grain detail, fabric texture, stitching, metal leg shine. Interior design catalog quality. 3840×2160px.' },
  { id:48, cat:'product', title:'Kitob Muqovasi', badge:'4K', badgeClass:'badge-4k', desc:'Kitob va bosma materiallar', prompt:'Upscale book cover/print product to 4K. Typography sharpness, cover texture, embossing detail, spine clarity. Publishing quality. 3840×2160px.' },
  { id:49, cat:'product', title:'Sport Jihozlari', badge:'4K', badgeClass:'badge-4k', desc:'Sport asbob-uskunalari fotosi', prompt:'Upscale sports equipment product to 4K. Material texture, brand logo clarity, grip texture, equipment detail. Sports retail quality. 3840×2160px.' },
  { id:50, cat:'product', title:'Qurilish Materiallari', badge:'AI', badgeClass:'badge-ai', desc:'Qurilish va ta\'mirlash mahsulotlari', prompt:'Upscale building/hardware product to 4K. Metal texture, surface finish, threading detail, paint/coating quality. Hardware catalog quality. 3840×2160px.' },
  { id:51, cat:'product', title:'O\'yinchoq 4K', badge:'4K', badgeClass:'badge-4k', desc:'Bolalar o\'yinchoqlari fotosi', prompt:'Upscale toy product to 4K. Colorful surface detail, material texture (plastic/plush/wood), branding clarity. Kids retail quality. 3840×2160px.' },
  { id:52, cat:'product', title:'Avtomobil Detali', badge:'PRO', badgeClass:'badge-pro', desc:'Avto qismlar va aksessuarlar', prompt:'Upscale car parts/accessories product to 4K. Metal finish, chrome reflection, rubber texture, brand marking. Automotive catalog quality. 3840×2160px.' },
  { id:53, cat:'product', title:'Oshxona Jihozlari', badge:'4K', badgeClass:'badge-4k', desc:'Oshxona asboblar va idish-tovoq', prompt:'Upscale kitchen product/cookware to 4K. Metal reflection, ceramic glaze, wood handle texture, brand detail. Kitchen retail quality. 3840×2160px.' },
  { id:54, cat:'product', title:'Lifestyle Mahsulot', badge:'HDR', badgeClass:'badge-hdr', desc:'Hayot uslubida mahsulot fotosi', prompt:'Upscale lifestyle product photo to 4K HDR. Sharp product in natural environment, beautiful background bokeh, warm lifestyle tones. 3840×2160px.' },
  { id:55, cat:'product', title:'Sumka Va Charm', badge:'PRO', badgeClass:'badge-pro', desc:'Charm va sumka teksturalari', prompt:'Upscale leather bag/accessory to 4K. Leather grain texture, stitching detail, hardware shine, logo embossing. Luxury fashion quality. 3840×2160px.' },
  { id:56, cat:'product', title:'Optika Va Ko\'zoynak', badge:'4K', badgeClass:'badge-4k', desc:'Ko\'zoynak va optika mahsulotlari', prompt:'Upscale eyewear product to 4K. Frame material detail, lens reflection, hinge mechanism, nose pad texture. Optical retail quality. 3840×2160px.' },
  { id:57, cat:'product', title:'Musiqa Cholg\'ulari', badge:'AI', badgeClass:'badge-ai', desc:'Gitara, pianino va boshqa asboblar', prompt:'Upscale musical instrument to 4K. Wood grain, string detail, fret clarity, finish reflection, brand decal. Music store quality. 3840×2160px.' },
  { id:58, cat:'product', title:'Bog\' Jihozlari', badge:'4K', badgeClass:'badge-4k', desc:'Bog\' va qishloq xo\'jaligi jihozlari', prompt:'Upscale garden tool/outdoor product to 4K. Metal/wood texture, usage wear authentically enhanced, outdoor setting. Garden catalog quality. 3840×2160px.' },
  { id:59, cat:'product', title:'Tibbiy Asboblar', badge:'AI', badgeClass:'badge-ai', desc:'Tibbiy va farmatsevtika mahsulotlari', prompt:'Upscale medical/pharmaceutical product to 4K. Clean clinical appearance, label text clarity, sterile packaging detail. Medical catalog quality. 3840×2160px.' },
  { id:60, cat:'product', title:'Oziq-Ovqat Qadoq', badge:'4K', badgeClass:'badge-4k', desc:'Qadoqlangan oziq-ovqat mahsulotlari', prompt:'Upscale packaged food product to 4K. Label text sharpness, packaging texture, product visibility through window. FMCG retail quality. 3840×2160px.' },

  // SAN'AT (20)
  { id:61, cat:'art', title:'Raqamli San\'at 4K', badge:'AI', badgeClass:'badge-ai', desc:'AI va raqamli rasmlarni 4K ga', prompt:'Upscale digital artwork to 4K. Preserve artistic style and brush strokes. Enhance fine details, color vibrancy. No over-smoothing — keep textures and artistic grain. 3840×2160px.' },
  { id:62, cat:'art', title:'Anime Frame 4K', badge:'4K', badgeClass:'badge-4k', desc:'Anime va manga kadrlarini 4K ga', prompt:'Upscale anime/manga artwork to 4K. Sharp clean lines, vivid colors, smooth gradients. Preserve original art style. Remove pixelation. 3840×2160px.' },
  { id:63, cat:'art', title:'Yog\'li Bo\'yoq 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Yog\'li bo\'yoq rasmlarini skanerlash', prompt:'Upscale oil painting scan to 4K. Enhance brushstroke texture, paint impasto, canvas weave. Preserve artist\'s style. Museum digitization quality. 3840×2160px.' },
  { id:64, cat:'art', title:'Suv Bo\'yoq 4K', badge:'4K', badgeClass:'badge-4k', desc:'Akvarel rasmlarni 4K ga oshirish', prompt:'Upscale watercolor painting to 4K. Transparent washes, paper texture, color bleeding edges, delicate detail. Fine art print quality. 3840×2160px.' },
  { id:65, cat:'art', title:'Grafika Va Vektor', badge:'AI', badgeClass:'badge-ai', desc:'Logo va grafik dizayn elementlari', prompt:'Upscale graphic design/illustration to 4K. Sharp vector-like edges, color flatness, detail clarity. Print-ready quality. 3840×2160px.' },
  { id:66, cat:'art', title:'Konsept San\'at', badge:'AI', badgeClass:'badge-ai', desc:'O\'yin va film konsept rasmlari', prompt:'Upscale concept art to 4K. Enhance environment details, character clarity, lighting atmosphere, color mood. Game/film production quality. 3840×2160px.' },
  { id:67, cat:'art', title:'Kaligrafiya 4K', badge:'4K', badgeClass:'badge-4k', desc:'Xat va kaligrafiya asarlari', prompt:'Upscale calligraphy artwork to 4K. Ink texture, brush stroke edges, paper grain, letter detail. Fine art printing quality. 3840×2160px.' },
  { id:68, cat:'art', title:'Graffiti San\'ati', badge:'HDR', badgeClass:'badge-hdr', desc:'Ko\'cha va graffiti san\'ati', prompt:'Upscale graffiti/street art to 4K HDR. Vivid spray paint colors, wall texture underneath, letter detail, urban context. 3840×2160px.' },
  { id:69, cat:'art', title:'Foto-Realizm 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Fotorealistik rasm va chizmalar', prompt:'Upscale photorealistic drawing to 4K. Enhance hyperrealistic details, surface reflection, material accuracy. Fine art quality exceeding photograph. 3840×2160px.' },
  { id:70, cat:'art', title:'Miniatür San\'ati', badge:'AI', badgeClass:'badge-ai', desc:'Kichik miniatür asarlarni aniqlash', prompt:'Upscale miniature/small artwork to 4K. Maximize micro detail that was invisible at original size. Preserve color accuracy. Research/display quality. 3840×2160px.' },
  { id:71, cat:'art', title:'Ikona Va Din San\'ati', badge:'4K', badgeClass:'badge-4k', desc:'Diniy va ikonografik asarlar', prompt:'Upscale religious icon/sacred art to 4K. Gold leaf detail, fine line work, age-appropriate texture preservation, reverent color accuracy. 3840×2160px.' },
  { id:72, cat:'art', title:'Mozaika 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Mozaika va vitraj san\'ati', prompt:'Upscale mosaic/stained glass artwork to 4K HDR. Individual tile/glass piece clarity, grout lines, light transmission, vivid color. 3840×2160px.' },
  { id:73, cat:'art', title:'Haykaltaroshlik', badge:'4K', badgeClass:'badge-4k', desc:'Haykaltaroshlik va skulptura', prompt:'Upscale sculpture photography to 4K. Stone/metal/clay surface texture, chisel marks, shadow detail, material authenticity. 3840×2160px.' },
  { id:74, cat:'art', title:'Kollaj San\'ati', badge:'AI', badgeClass:'badge-ai', desc:'Kollaj va mikst-media asarlar', prompt:'Upscale collage/mixed media artwork to 4K. Individual element clarity, texture layering, edge detail, material diversity. 3840×2160px.' },
  { id:75, cat:'art', title:'Printmaking 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Gravür va bosmachi san\'ati', prompt:'Upscale printmaking/etching/lithograph to 4K. Individual ink line sharpness, plate texture, tonal gradients. Fine art printing quality. 3840×2160px.' },
  { id:76, cat:'art', title:'Fantaziya Kompozitsiya', badge:'AI', badgeClass:'badge-ai', desc:'Fantastik va fantaziya kompozitsiyalar', prompt:'Upscale fantasy composition artwork to 4K. Magical atmosphere, creature/character detail, environment richness. Fantasy book cover quality. 3840×2160px.' },
  { id:77, cat:'art', title:'Abstrakt San\'at 4K', badge:'4K', badgeClass:'badge-4k', desc:'Abstrakt va nonobjektiv san\'at', prompt:'Upscale abstract artwork to 4K. Enhance color transitions, texture, paint application detail, surface variation. Contemporary art quality. 3840×2160px.' },
  { id:78, cat:'art', title:'Retro Plakat 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Qadimgi plakat va reklama asarlari', prompt:'Upscale vintage poster/advertisement to 4K. Restore faded colors, clean up print artifacts, enhance typography, age authentically. 3840×2160px.' },
  { id:79, cat:'art', title:'Komiks San\'ati', badge:'4K', badgeClass:'badge-4k', desc:'Komiks va graphic novel rasmlari', prompt:'Upscale comic book art to 4K. Sharp inking lines, halftone dots, flat color vibrancy, speech bubble clarity. Comics print quality. 3840×2160px.' },
  { id:80, cat:'art', title:'3D Render 4K', badge:'AI', badgeClass:'badge-ai', desc:'3D render va CGI tasvirlar', prompt:'Upscale 3D render/CGI image to 4K. Enhance surface materials, ray tracing quality, anti-aliasing, ambient occlusion. Photorealistic CGI quality. 3840×2160px.' },

  // ARXITEKTURA (20)
  { id:81,  cat:'architecture', title:'Bino Fasadi 4K', badge:'4K', badgeClass:'badge-4k', desc:'Binolar va fasad detallari', prompt:'Upscale building facade to 4K. Brick/stone/glass texture, window reflections, architectural details, symmetry enhancement. Architectural photography quality. 3840×2160px.' },
  { id:82,  cat:'architecture', title:'Interior Dizayn 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Uy va ofis interieri fotosi', prompt:'Upscale interior design photo to 4K. Fabric textures, wood grain, lighting atmosphere, furniture details. Interior magazine quality. 3840×2160px.' },
  { id:83,  cat:'architecture', title:'Tarixiy Bino 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Tarixiy va madaniy obidalar', prompt:'Upscale historic building to 4K HDR. Stone age texture, weathering authenticity, ornamental detail, dramatic sky. Heritage documentation quality. 3840×2160px.' },
  { id:84,  cat:'architecture', title:'Zamonaviy Arxitektura', badge:'4K', badgeClass:'badge-4k', desc:'Zamonaviy va minimalist binolar', prompt:'Upscale modern architecture to 4K. Glass curtain wall reflections, steel detail, clean lines, geometric precision. Architectural magazine quality. 3840×2160px.' },
  { id:85,  cat:'architecture', title:'Ko\'prik Va Inshoot', badge:'4K', badgeClass:'badge-4k', desc:'Ko\'prik va muhandislik inshootlari', prompt:'Upscale bridge/infrastructure to 4K. Steel cable tension detail, concrete texture, suspension system, river/road below. Engineering photography quality. 3840×2160px.' },
  { id:86,  cat:'architecture', title:'Masjid Va Cherkov', badge:'HDR', badgeClass:'badge-hdr', desc:'Diniy binolar va me\'morchilik', prompt:'Upscale mosque/church/temple to 4K HDR. Intricate tilework, dome detail, calligraphy, stained glass, minaret clarity. Religious architecture quality. 3840×2160px.' },
  { id:87,  cat:'architecture', title:'Oshxona Interior', badge:'PRO', badgeClass:'badge-pro', desc:'Restoran va kafe interieri', prompt:'Upscale restaurant/cafe interior to 4K. Warm lighting atmosphere, surface materials, decor details, ambiance. Hospitality marketing quality. 3840×2160px.' },
  { id:88,  cat:'architecture', title:'Hammom Va Spa', badge:'4K', badgeClass:'badge-4k', desc:'Hamom va spa interier fotosi', prompt:'Upscale bathroom/spa interior to 4K. Tile texture, fixture chrome, water effect, steam atmosphere, luxury materials. Interior design quality. 3840×2160px.' },
  { id:89,  cat:'architecture', title:'Panoramik Bino 4K', badge:'AI', badgeClass:'badge-ai', desc:'Keng burchakli bino surati', prompt:'Upscale panoramic architectural photo to 4K. Consistent sharpness across wide frame, sky detail, ground texture, no distortion artifacts. 3840×2160px.' },
  { id:90,  cat:'architecture', title:'Tungi Bino 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Tungi yoritilgan binolar', prompt:'Upscale night architecture to 4K HDR. Building illumination detail, light spill, sky background, surrounding environment. Architectural night photography. 3840×2160px.' },
  { id:91,  cat:'architecture', title:'Qishloq Uy 4K', badge:'4K', badgeClass:'badge-4k', desc:'Qishloq va an\'anaviy uy arxitekturasi', prompt:'Upscale rural/traditional house to 4K. Wood/mud/stone texture, roof tile detail, garden, authentic character. Rural heritage documentation. 3840×2160px.' },
  { id:92,  cat:'architecture', title:'Ofis Binosi 4K', badge:'4K', badgeClass:'badge-4k', desc:'Zamonaviy ofis va biznes binosi', prompt:'Upscale office building to 4K. Glass facade reflections, corporate signage, entrance detail. Professional real estate quality. 3840×2160px.' },
  { id:93,  cat:'architecture', title:'Kutubxona Interior', badge:'AI', badgeClass:'badge-ai', desc:'Kutubxona va muzey interierlari', prompt:'Upscale library/museum interior to 4K. Book spine detail, shelf texture, architectural ceiling, ambient lighting. Cultural institution quality. 3840×2160px.' },
  { id:94,  cat:'architecture', title:'Yo\'l Va Ko\'cha 4K', badge:'4K', badgeClass:'badge-4k', desc:'Shahar ko\'chalari va yo\'llar', prompt:'Upscale street/road urban photography to 4K. Pavement texture, signage, building facades, depth of field. Urban documentation quality. 3840×2160px.' },
  { id:95,  cat:'architecture', title:'Saroy Va Qasr', badge:'PRO', badgeClass:'badge-pro', desc:'Saroy va qal\'a arxitekturasi', prompt:'Upscale palace/castle architecture to 4K. Stone masonry detail, tower crenellations, gate hardware, courtyard. Historical heritage quality. 3840×2160px.' },
  { id:96,  cat:'architecture', title:'Arxitektura Plani', badge:'AI', badgeClass:'badge-ai', desc:'Me\'moriy chizma va planlar', prompt:'Upscale architectural drawing/blueprint to 4K. Line sharpness, annotation text clarity, dimension numbers, technical detail. Engineering drawing quality. 3840×2160px.' },
  { id:97,  cat:'architecture', title:'Osmonyo\'lar 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Osmono\'par binolar va skyline', prompt:'Upscale skyscraper/skyline to 4K HDR. Glass and steel reflection detail, height perspective, sky/cloud interaction. Urban skyline photography. 3840×2160px.' },
  { id:98,  cat:'architecture', title:'Temir Yo\'l Stansiya', badge:'4K', badgeClass:'badge-4k', desc:'Vokzal va transport infrastrukturasi', prompt:'Upscale train station/terminal to 4K. Iron/steel structure, glass roof, platform detail, historical grandeur. Transportation heritage quality. 3840×2160px.' },
  { id:99,  cat:'architecture', title:'Bog\' Va Park 4K', badge:'4K', badgeClass:'badge-4k', desc:'Shahar bog\' va landshaft dizayni', prompt:'Upscale garden/park landscape architecture to 4K. Path texture, planting arrangement, water feature, bench detail. Landscape design quality. 3840×2160px.' },
  { id:100, cat:'architecture', title:'Zavod Interior', badge:'AI', badgeClass:'badge-ai', desc:'Sanoat va zavod binolari', prompt:'Upscale industrial/factory interior to 4K. Machinery detail, pipe systems, concrete texture, industrial lighting. Industrial documentary quality. 3840×2160px.' },

  // TAOM (15)
  { id:101, cat:'food', title:'Burger Makro 4K', badge:'4K', badgeClass:'badge-4k', desc:'Burger va fastfood ovqatlar', prompt:'Upscale burger/fast food photo to 4K. Every ingredient layer visible, bun sesame seeds, meat texture, sauce drip. Food magazine quality. 3840×2160px.' },
  { id:102, cat:'food', title:'Sushi Va Yapon Taomi', badge:'PRO', badgeClass:'badge-pro', desc:'Sushi va osiyo taomlarini 4K', prompt:'Upscale sushi/Japanese cuisine to 4K. Rice grain detail, fish freshness, nori texture, wasabi, soy sauce gloss. Fine dining quality. 3840×2160px.' },
  { id:103, cat:'food', title:'Shirinliklar 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Tort va shirinliklar HDR', prompt:'Upscale dessert/cake photo to 4K HDR. Frosting texture, sprinkle detail, chocolate sheen, fruit freshness. Bakery/pastry quality. 3840×2160px.' },
  { id:104, cat:'food', title:'Go\'sht Taomi 4K', badge:'4K', badgeClass:'badge-4k', desc:'Kebab va go\'sht taomlar', prompt:'Upscale meat dish to 4K. Grill marks, meat texture, juice/fat detail, char and crust. Steakhouse/BBQ restaurant quality. 3840×2160px.' },
  { id:105, cat:'food', title:'Sabzavot Salat 4K', badge:'4K', badgeClass:'badge-4k', desc:'Salat va sabzavot taomlar', prompt:'Upscale salad/vegetable dish to 4K. Dew drops on leaves, color vibrancy, ingredient variety. Health food photography quality. 3840×2160px.' },
  { id:106, cat:'food', title:'Ichimliklar 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Kofe, choy va ichimliklar', prompt:'Upscale beverage/drink to 4K HDR. Condensation drops, liquid clarity, foam detail, ice cubes, glass reflections. Beverage marketing quality. 3840×2160px.' },
  { id:107, cat:'food', title:'Non Va Hamirli 4K', badge:'4K', badgeClass:'badge-4k', desc:'Non va hamirli mahsulotlar', prompt:'Upscale bread/bakery product to 4K. Crust texture, crumb structure, seed detail, golden color. Artisan bakery quality. 3840×2160px.' },
  { id:108, cat:'food', title:'Meva Va Rezavorlar', badge:'HDR', badgeClass:'badge-hdr', desc:'Yangi meva va rezavorlar', prompt:'Upscale fresh fruits/berries to 4K HDR. Surface texture, juice glistening, color vibrancy, stem/leaf detail. Fresh produce quality. 3840×2160px.' },
  { id:109, cat:'food', title:'Oshpaz Jarayoni', badge:'AI', badgeClass:'badge-ai', desc:'Tayyorlash jarayoni fotosi', prompt:'Upscale cooking process photo to 4K. Steam detail, ingredient textures in motion, chef hand clarity, pan/pot surface. Culinary documentary quality. 3840×2160px.' },
  { id:110, cat:'food', title:'O\'zbek Milliy Taomi', badge:'PRO', badgeClass:'badge-pro', desc:'Osh, lag\'mon va milliy taomlar', prompt:'Upscale Uzbek/Central Asian traditional dish to 4K. Rice grain detail (plov), noodle texture (lagman), spice color vibrancy. Cultural food photography quality. 3840×2160px.' },
  { id:111, cat:'food', title:'Pitstsiya 4K', badge:'4K', badgeClass:'badge-4k', desc:'Pizza va italyan taomlar', prompt:'Upscale pizza photo to 4K. Melted cheese stretch, topping detail, crust texture, basil leaf, tomato sauce. Italian restaurant quality. 3840×2160px.' },
  { id:112, cat:'food', title:'Baliq Taomi 4K', badge:'4K', badgeClass:'badge-4k', desc:'Dengiz mahsulotlari taomlar', prompt:'Upscale seafood dish to 4K. Fish scale/skin texture, shellfish detail, sauce glossiness, garnish. Seafood restaurant quality. 3840×2160px.' },
  { id:113, cat:'food', title:'Shokolad 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Shokolad va kakao mahsulotlar', prompt:'Upscale chocolate product to 4K HDR. Surface sheen, mold detail, cross-section texture, cocoa percentage visual. Luxury chocolate brand quality. 3840×2160px.' },
  { id:114, cat:'food', title:'Flatlay Taom 4K', badge:'4K', badgeClass:'badge-4k', desc:'Yuqoridan ko\'rinishda taom', prompt:'Upscale flatlay food photography to 4K. Even sharpness across all ingredients, prop textures, background surface. Food styling quality. 3840×2160px.' },
  { id:115, cat:'food', title:'Ziyofat Stoli 4K', badge:'PRO', badgeClass:'badge-pro', desc:'To\'liq dasturxon va ziyofat stoli', prompt:'Upscale feast/banquet table to 4K. Multiple dish clarity, table linen texture, tableware detail, atmospheric lighting. Event catering quality. 3840×2160px.' },

  // HAYVON (15)
  { id:116, cat:'animal', title:'It Portreti 4K', badge:'4K', badgeClass:'badge-4k', desc:'Uy hayvoni it va mushuk portreti', prompt:'Upscale dog portrait to 4K. Fur texture strand by strand, eye reflection, nose detail, whiskers. Pet photography quality. 3840×2160px.' },
  { id:117, cat:'animal', title:'Mushuk 4K', badge:'4K', badgeClass:'badge-4k', desc:'Mushuk va uy hayvonlari', prompt:'Upscale cat portrait to 4K. Fine fur, vertical pupil detail, whisker length, paw pads. Cat photography quality. 3840×2160px.' },
  { id:118, cat:'animal', title:'Yovvoyi Hayvon 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Yovvoyi tabiat hayvonlari', prompt:'Upscale wildlife animal to 4K HDR. Fur/feather/scale detail, eye clarity, habitat context. National Geographic quality. 3840×2160px.' },
  { id:119, cat:'animal', title:'Qush Portreti 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Qushlar va parrandalar fotosi', prompt:'Upscale bird portrait to 4K. Individual feather barb detail, eye iris, beak texture, plumage color accuracy. Ornithology quality. 3840×2160px.' },
  { id:120, cat:'animal', title:'Suv Osti Hayvonlar', badge:'AI', badgeClass:'badge-ai', desc:'Baliq va suv osti jonzotlari', prompt:'Upscale underwater animal to 4K. Scale/fin detail, water caustics, color vibrancy. Aquarium/ocean documentary quality. 3840×2160px.' },
  { id:121, cat:'animal', title:'Ot Va Chorva 4K', badge:'4K', badgeClass:'badge-4k', desc:'Ot va qo\'y, sigir hayvonlar', prompt:'Upscale horse/livestock to 4K. Coat sheen, muscle definition, mane detail, eye. Equestrian/farm photography quality. 3840×2160px.' },
  { id:122, cat:'animal', title:'Hasharot Makro 4K', badge:'AI', badgeClass:'badge-ai', desc:'Hasharot va mikro hayvonlar', prompt:'Upscale insect macro photo to 4K. Compound eye facets, wing venation, antenna, exoskeleton texture. Scientific macro quality. 3840×2160px.' },
  { id:123, cat:'animal', title:'Xazorat Sürüngenler', badge:'4K', badgeClass:'badge-4k', desc:'Kaltakesak va ilon rasmlar', prompt:'Upscale reptile photo to 4K. Scale pattern detail, eye slit, color vibrancy. Herpetology photography quality. 3840×2160px.' },
  { id:124, cat:'animal', title:'Ayiq Va Katta Hayvon', badge:'HDR', badgeClass:'badge-hdr', desc:'Katta yirtqich hayvonlar', prompt:'Upscale large predator (lion/tiger/bear) to 4K HDR. Fur density, muscle, paw, fang detail. Wildlife magazine quality. 3840×2160px.' },
  { id:125, cat:'animal', title:'Hayvon Bolalari', badge:'4K', badgeClass:'badge-4k', desc:'Yosh hayvon bolalari portreti', prompt:'Upscale baby animal photo to 4K. Soft downy fur, oversized paws, innocent eyes, playful expression. Wildlife/pet quality. 3840×2160px.' },
  { id:126, cat:'animal', title:'Qo\'ng\'iz Makro 4K', badge:'AI', badgeClass:'badge-ai', desc:'Qo\'ng\'iz va kapalak detallari', prompt:'Upscale butterfly/beetle macro to 4K. Wing scale pattern, color iridescence, antenna, leg detail. Entomology photography quality. 3840×2160px.' },
  { id:127, cat:'animal', title:'Okean Suti 4K', badge:'4K', badgeClass:'badge-4k', desc:'Kit va delfinlar suv osti', prompt:'Upscale whale/dolphin ocean photo to 4K. Skin texture, water interaction, underwater light rays. Marine biology quality. 3840×2160px.' },
  { id:128, cat:'animal', title:'Otryad Harakat 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Harakatdagi hayvon fotosi', prompt:'Upscale action animal photo to 4K. Freeze motion blur sharpen, fur flow, muscle tension, environment context. Wildlife action quality. 3840×2160px.' },
  { id:129, cat:'animal', title:'Qo\'y Va Sigir 4K', badge:'4K', badgeClass:'badge-4k', desc:'Qishloq xo\'jaligi hayvonlari', prompt:'Upscale farm/pastoral animal to 4K. Wool/coat texture, countryside context, natural lighting. Pastoral photography quality. 3840×2160px.' },
  { id:130, cat:'animal', title:'Ilonbaliq 4K', badge:'AI', badgeClass:'badge-ai', desc:'Ekzotik hayvonlar fotosi', prompt:'Upscale exotic animal photo to 4K. Unique pattern/texture detail, vivid color, natural habitat. Wildlife documentary quality. 3840×2160px.' },

  // MODA (20)
  { id:131, cat:'fashion', title:'Podium Fotosi 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Moda ko\'rgazmasi va podium', prompt:'Upscale fashion runway photo to 4K. Fabric flow, model expression, outfit details, runway lighting. Vogue-level fashion quality. 3840×2160px.' },
  { id:132, cat:'fashion', title:'Mato Tekstura 4K', badge:'4K', badgeClass:'badge-4k', desc:'Mato va gazlama teksturasi', prompt:'Upscale fabric/textile to 4K. Weave pattern, thread count visible, surface texture, sheen. Textile industry quality. 3840×2160px.' },
  { id:133, cat:'fashion', title:'Ko\'cha Modasi 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Street style va ko\'cha modasi', prompt:'Upscale street style fashion photo to 4K HDR. Outfit details, accessory clarity, urban background context. Street fashion editorial quality. 3840×2160px.' },
  { id:134, cat:'fashion', title:'Kelin Libosi 4K', badge:'PRO', badgeClass:'badge-pro', desc:'To\'y libosi va aksessuarlar', prompt:'Upscale bridal fashion to 4K. Lace detail, embroidery, veil texture, beading, fabric drape. Bridal magazine quality. 3840×2160px.' },
  { id:135, cat:'fashion', title:'Erkak Moda 4K', badge:'4K', badgeClass:'badge-4k', desc:'Erkaklar moda fotolari', prompt:'Upscale menswear fashion to 4K. Suit texture, tie knot, shoe shine, grooming details. Men\'s fashion magazine quality. 3840×2160px.' },
  { id:136, cat:'fashion', title:'Sport Kiyim 4K', badge:'4K', badgeClass:'badge-4k', desc:'Sportiviy kiyim va amaliy moda', prompt:'Upscale sportswear/activewear to 4K. Technical fabric texture, logo clarity, stitching. Athletic brand catalog quality. 3840×2160px.' },
  { id:137, cat:'fashion', title:'Milliy Kiyim 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'O\'zbek va milliy kiyim-kechak', prompt:'Upscale traditional/national costume to 4K HDR. Embroidery detail, fabric pattern, jewelry, headwear. Cultural heritage photography. 3840×2160px.' },
  { id:138, cat:'fashion', title:'Bolalar Moda 4K', badge:'4K', badgeClass:'badge-4k', desc:'Bolalar kiyim va moda fotosi', prompt:'Upscale children\'s fashion to 4K. Playful clothing details, colorful patterns, natural child expression. Kids fashion brand quality. 3840×2160px.' },
  { id:139, cat:'fashion', title:'Aksessuarlar 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Sumka, kamar va aksessuarlar', prompt:'Upscale fashion accessories to 4K. Leather grain, hardware detail, brand logo, material quality. Luxury accessories catalog. 3840×2160px.' },
  { id:140, cat:'fashion', title:'Atir Reklama 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Parfüm va kosmetika reklama fotosi', prompt:'Upscale perfume/beauty advertising to 4K HDR. Product clarity, model skin, luxury atmosphere, product reflection. Luxury brand advertising quality. 3840×2160px.' },
  { id:141, cat:'fashion', title:'Vintage Moda 4K', badge:'AI', badgeClass:'badge-ai', desc:'Retro va vintage moda fotolari', prompt:'Upscale vintage fashion photo to 4K. Restore era-appropriate colors, fabric period accuracy, vintage atmosphere. Fashion archive quality. 3840×2160px.' },
  { id:142, cat:'fashion', title:'Haute Couture 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Oliy darajali dizayner kiyimlari', prompt:'Upscale haute couture garment to 4K. Hand-stitching, bespoke detail, unusual material texture, artistic construction. High fashion archive quality. 3840×2160px.' },
  { id:143, cat:'fashion', title:'Poyabzal Editorial', badge:'4K', badgeClass:'badge-4k', desc:'Poyabzal reklama va editorial', prompt:'Upscale shoe editorial fashion to 4K. Material texture (leather/suede/patent), sole detail, brand identity. Footwear editorial quality. 3840×2160px.' },
  { id:144, cat:'fashion', title:'Moda Orqa Sahna', badge:'AI', badgeClass:'badge-ai', desc:'Moda ko\'rgazmasi orqa sahna', prompt:'Upscale fashion backstage photo to 4K. Behind-scene clothing detail, makeup, candid model moments. Fashion industry documentary quality. 3840×2160px.' },
  { id:145, cat:'fashion', title:'Swimwear 4K', badge:'HDR', badgeClass:'badge-hdr', desc:'Yoz va suzish kiyimi fotosi', prompt:'Upscale swimwear fashion to 4K HDR. Fabric detail, beach/pool context, color vibrancy, natural lighting. Summer fashion catalog quality. 3840×2160px.' },
  { id:146, cat:'fashion', title:'Kiyim Detalları 4K', badge:'4K', badgeClass:'badge-4k', desc:'Tugma va kiyim detalları makro', prompt:'Upscale clothing detail macro to 4K. Button texture, zipper teeth, buttonhole stitching, label text. Garment manufacturing quality. 3840×2160px.' },
  { id:147, cat:'fashion', title:'Qo\'lqop Va Sharf', badge:'4K', badgeClass:'badge-4k', desc:'Qishki aksessuarlar fotosi', prompt:'Upscale winter accessories (gloves/scarf/hat) to 4K. Knit texture, wool fiber, warmth feel, color richness. Winter accessories catalog. 3840×2160px.' },
  { id:148, cat:'fashion', title:'Lingeriya Moda', badge:'PRO', badgeClass:'badge-pro', desc:'Ipak va nozik mato kiyimlar', prompt:'Upscale lingerie/delicate fabric fashion to 4K. Lace pattern, silk sheen, embroidery, delicate material. Lingerie brand quality. 3840×2160px.' },
  { id:149, cat:'fashion', title:'Gender-Neutral Moda', badge:'AI', badgeClass:'badge-ai', desc:'Zamonaviy uniseks moda', prompt:'Upscale gender-neutral/unisex fashion to 4K. Modern minimal clothing detail, natural tones, clean styling. Contemporary fashion editorial. 3840×2160px.' },
  { id:150, cat:'fashion', title:'Couture Makiyaj 4K', badge:'PRO', badgeClass:'badge-pro', desc:'Professional makiyaj va moda', prompt:'Upscale fashion makeup/beauty to 4K. Eyeshadow pigment detail, lip texture, foundation finish, contour. Beauty editorial quality. 3840×2160px.' },
];

// ─── STATE ───
let selected = null;
let currentCat = 'all';
let searchQuery = '';

// ─── RENDER TABS ───
function renderTabs() {
  const tabsEl = document.getElementById('tabs');
  tabsEl.innerHTML = CATS.map(c => {
    const count = c.id === 'all' ? PROMPTS.length : PROMPTS.filter(p => p.cat === c.id).length;
    return `<button class="tab ${currentCat === c.id ? 'active' : ''}" onclick="filterCat('${c.id}', this)">
      ${c.icon} ${c.label} <span class="tab-count">${count}</span>
    </button>`;
  }).join('');
}

// ─── FILTER & RENDER ───
function getFiltered() {
  let list = currentCat === 'all' ? PROMPTS : PROMPTS.filter(p => p.cat === currentCat);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q)
    );
  }
  return list;
}

function renderCards() {
  const grid = document.getElementById('grid');
  const info = document.getElementById('resultsInfo');
  const filtered = getFiltered();

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty" style="display:block; grid-column:1/-1">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <p>Hech narsa topilmadi</p>
    </div>`;
    info.innerHTML = '';
    return;
  }

  if (searchQuery) {
    info.innerHTML = `<span>${filtered.length}</span> ta natija topildi: "<strong style="color:var(--text)">${searchQuery}</strong>"`;
  } else if (currentCat !== 'all') {
    info.innerHTML = `<span>${filtered.length}</span> ta prompt`;
  } else {
    info.innerHTML = '';
  }

  grid.innerHTML = filtered.map(p => `
    <div class="card ${selected === p.id ? 'selected' : ''}" onclick="selectCard(${p.id})">
      <div class="check-icon">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="card-header">
        <div class="card-icon">${ICONS[p.cat] || ICONS.art}</div>
        <span class="card-badge ${p.badgeClass}">${p.badge}</span>
      </div>
      <div class="card-title">${p.title}</div>
      <div class="card-desc">${p.desc}</div>
      <div class="card-prompt">${p.prompt}</div>
    </div>
  `).join('');
}

function filterCat(cat, btn) {
  currentCat = cat;
  renderTabs();
  renderCards();
}

function selectCard(id) {
  selected = selected === id ? null : id;
  renderCards();
  updateBar();
}

function updateBar() {
  const bar = document.getElementById('bottomBar');
  const label = document.getElementById('selectedLabel');
  if (selected) {
    const p = PROMPTS.find(x => x.id === selected);
    label.innerHTML = `<strong>${p.title}</strong> tanlandi`;
    bar.classList.add('visible');
  } else {
    bar.classList.remove('visible');
  }
}

function clearSelection() {
  selected = null;
  renderCards();
  updateBar();
  resetCopyBtn();
}

function copyPrompt() {
  if (!selected) return;
  const p = PROMPTS.find(x => x.id === selected);
  navigator.clipboard.writeText(p.prompt).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.classList.add('copied');
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Nusxalandi!`;
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      resetCopyBtn();
    }, 2500);
  });
}

function resetCopyBtn() {
  const btn = document.getElementById('copyBtn');
  btn.classList.remove('copied');
  btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Promptni Nusxalash`;
}

// ─── SEARCH ───
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');

searchInput.addEventListener('input', function() {
  searchQuery = this.value.trim();
  searchClear.style.display = searchQuery ? 'flex' : 'none';
  renderCards();
});

function clearSearch() {
  searchInput.value = '';
  searchQuery = '';
  searchClear.style.display = 'none';
  searchInput.focus();
  renderCards();
}

// ─── INIT ───
renderTabs();
renderCards();