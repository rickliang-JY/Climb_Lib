// Climbing grade conversion tables, gear guide, and knots data
// Bilingual (EN/ZH) content for the climbing encyclopedia.
// Sources of truth: widely used conversion charts (Rockfax / Wikipedia / Mountain Project style).

// ---------------------------------------------------------------------------
// A1. Roped climbing grade conversion (YDS / French / UIAA)
// ---------------------------------------------------------------------------

export interface GradeRow {
  yds: string;
  french: string;
  uiaa: string;
  note?: string;
  noteZh?: string;
}

export const ropeGrades: GradeRow[] = [
  { yds: '5.6', french: '4c', uiaa: 'IV+', note: 'Beginner top-rope and easy trad terrain', noteZh: '新手顶绳与简单传统攀地形' },
  { yds: '5.7', french: '5a', uiaa: 'V', note: 'Classic moderate classics, e.g. many Gunks moderates', noteZh: '经典初中级线路，如美国 Gunks 大量经典线' },
  { yds: '5.8', french: '5b', uiaa: 'V+', note: 'Solid beginner outdoor lead level', noteZh: '扎实的户外先锋入门水平' },
  { yds: '5.9', french: '5c', uiaa: 'VI-', note: 'Gym beginner-to-intermediate threshold', noteZh: '岩馆新手迈向中级的门槛' },
  { yds: '5.10a', french: '6a', uiaa: 'VI', note: 'Intermediate level begins; first letter-graded tier', noteZh: '中级起点，YDS 从这里开始细分 a-d 字母档' },
  { yds: '5.10b', french: '6a+', uiaa: 'VI+', note: 'Steeper face climbing and thin cracks', noteZh: '更陡的岩壁与细缝攀爬' },
  { yds: '5.10c', french: '6b', uiaa: 'VII-', note: 'Sustained vertical climbing', noteZh: '持续性垂直岩壁' },
  { yds: '5.10d', french: '6b+', uiaa: 'VII', note: 'Top of intermediate; crux sequences appear', noteZh: '中级封顶，开始出现明显难点串' },
  { yds: '5.11a', french: '6c', uiaa: 'VII+', note: 'Advanced level; regular training usually required', noteZh: '高级水平，通常需要规律训练' },
  { yds: '5.11b', french: '6c+', uiaa: 'VIII-', note: 'Powerful cruxes and endurance sections', noteZh: '暴力难点与耐力段并存' },
  { yds: '5.11c', french: '7a', uiaa: 'VIII', note: 'Overhangs and small crimps become standard', noteZh: '仰角与小指力点成为常态' },
  { yds: '5.11d', french: '7a+', uiaa: 'VIII+', note: 'Gateway to serious sport climbing', noteZh: '通往硬核运动攀的大门' },
  { yds: '5.12a', french: '7a+', uiaa: 'VIII+', note: 'A classic lifetime goal for dedicated climbers', noteZh: '许多执着攀岩者的终身目标' },
  { yds: '5.12b', french: '7b', uiaa: 'IX-', note: 'Long-term projecting territory', noteZh: '需要长期磕线的领域' },
  { yds: '5.12c', french: '7b+', uiaa: 'IX', note: 'Demands finger strength and refined technique', noteZh: '对指力与技术细腻度要求很高' },
  { yds: '5.12d', french: '7c', uiaa: 'IX+', note: 'Top amateur / semi-pro level', noteZh: '顶尖业余、半职业水平' },
  { yds: '5.13a', french: '7c+', uiaa: 'X-', note: 'Elite recreational climbing begins', noteZh: '精英业余水平的起点' },
  { yds: '5.13b', french: '8a', uiaa: 'X-', note: 'First big 8th-grade milestone in French terms', noteZh: '法系 8 字头的第一个里程碑' },
  { yds: '5.13c', french: '8a+', uiaa: 'X', note: 'Professional-caliber redpointing', noteZh: '职业水准的红点能力' },
  { yds: '5.13d', french: '8b', uiaa: 'X+', note: 'World-class for most disciplines', noteZh: '在多数地区已是世界级' },
  { yds: '5.14a', french: '8b+', uiaa: 'XI-', note: 'Elite level; e.g. Hubble (8c+ nearby tier) era begins', noteZh: '精英层级，历史上 8c/8c+ 时代开启' },
  { yds: '5.14b', french: '8c', uiaa: 'XI', note: 'e.g. benchmark routes at top crags worldwide', noteZh: '世界顶级岩场的标杆线路' },
  { yds: '5.14c', french: '8c+', uiaa: 'XI+', note: 'e.g. Hubble (1990), among the first of the grade', noteZh: '如 Hubble（1990），该等级最早代表之一' },
  { yds: '5.14d', french: '9a', uiaa: 'XII-', note: 'Action Directe (Wolfgang Gullich, 1991), first 9a', noteZh: 'Action Directe（Wolfgang Gullich，1991），世界首条 9a' },
  { yds: '5.15a', french: '9a+', uiaa: 'XII', note: 'e.g. Realization/Biographie (Chris Sharma, 2001)', noteZh: '如 Realization/Biographie（Chris Sharma，2001）' },
  { yds: '5.15b', french: '9b', uiaa: 'XII+', note: 'e.g. Jumbo Love (Sharma, 2008), La Dura Dura', noteZh: '如 Jumbo Love（Sharma，2008）、La Dura Dura' },
  { yds: '5.15c', french: '9b+', uiaa: 'XIII-', note: 'e.g. Change and Perfecto Mundo (Adam Ondra)', noteZh: '如 Change、Perfecto Mundo（Adam Ondra）' },
  { yds: '5.15d', french: '9c', uiaa: 'XIII-', note: 'Silence (Adam Ondra, 2017), first 9c in history', noteZh: 'Silence（Adam Ondra，2017），史上首条 9c' },
];

// ---------------------------------------------------------------------------
// A2. Bouldering grade conversion (V-scale / Fontainebleau)
// ---------------------------------------------------------------------------

export interface BoulderGradeRow {
  v: string;
  font: string;
  note?: string;
  noteZh?: string;
}

export const boulderGrades: BoulderGradeRow[] = [
  { v: 'VB', font: '3', note: 'Sub-V0 introductory grade, warm-up terrain', noteZh: 'V0 以下的入门档，热身地形' },
  { v: 'V0', font: '4+/5', note: 'First real outdoor boulder problems', noteZh: '野外真正意义上的入门抱石线' },
  { v: 'V1', font: '5+', note: 'Beginner-intermediate gym level', noteZh: '岩馆初中级水平' },
  { v: 'V2', font: '6A/6A+', note: 'Intermediate; basic technique required', noteZh: '中级，需要基本脚法与身位' },
  { v: 'V3', font: '6A+/6B', note: 'Solid intermediate problems', noteZh: '扎实的中级线路' },
  { v: 'V4', font: '6B/6B+', note: 'Advanced-intermediate; dynamic moves appear', noteZh: '中高级，开始出现动态动作' },
  { v: 'V5', font: '6C/6C+', note: 'Serious intermediate projecting begins', noteZh: '中级磕线者的攻坚区' },
  { v: 'V6', font: '7A', note: 'Advanced level; a major milestone', noteZh: '高级水平，重要里程碑' },
  { v: 'V7', font: '7A+', note: 'Powerful compression and crimp lines', noteZh: '抱石与扣点的暴力线路' },
  { v: 'V8', font: '7B/7B+', note: 'Very advanced; a lifetime goal for many', noteZh: '非常高级，许多人的终身目标' },
  { v: 'V9', font: '7C', note: 'Elite amateur territory', noteZh: '精英业余领域' },
  { v: 'V10', font: '7C+', note: 'Semi-professional power level', noteZh: '半职业级爆发力水准' },
  { v: 'V11', font: '8A', note: 'Elite level; first 8th-grade Font milestone', noteZh: '精英水平，Font 8 字头首个里程碑' },
  { v: 'V12', font: '8A+', note: 'World-class outdoor boulderers', noteZh: '世界级野外抱石者水平' },
  { v: 'V13', font: '8B', note: 'Top professional grade for most of history', noteZh: '历史上长期属于顶尖职业难度' },
  { v: 'V14', font: '8B+', note: 'Only a few dozen climbers worldwide', noteZh: '全球仅数十人能达到' },
  { v: 'V15', font: '8C', note: 'e.g. The Wheel of Life linkup era benchmarks', noteZh: '如 The Wheel of Life 时代的标杆难度' },
  { v: 'V16', font: '8C+', note: 'e.g. Terranova (Adam Ondra, 2011)', noteZh: '如 Terranova（Adam Ondra，2011）' },
  { v: 'V17', font: '9A', note: 'Burden of Dreams (Nalle Hukkataival, 2016), first 9A', noteZh: 'Burden of Dreams（Nalle Hukkataival，2016），史上首条 9A' },
];

// ---------------------------------------------------------------------------
// A3. Origins of the five grade systems
// ---------------------------------------------------------------------------

export interface GradeSystem {
  id: string;
  name: string;
  nameZh: string;
  originZh: string;
  originEn: string;
  usedFor: string;
}

export const gradeSystems: GradeSystem[] = [
  {
    id: 'yds',
    name: 'YDS (Yosemite Decimal System)',
    nameZh: 'YDS 优胜美地十进制系统',
    originZh: '20 世纪 30 年代由美国 Sierra Club（塞拉俱乐部）南加州分会在 Tahquitz Rock 创立，最初只分 1-5 级；50-60 年代在 Tahquitz 与 Suicide Rock 发展出 5 级内的十进制细分（5.0-5.9），70 年代封顶被打破后开放延伸至 5.15，并在 5.10 以上加 a-d 字母细分。YDS 中用 5 表示自由攀登，整个体系至今主导北美。',
    originEn: 'Created in the 1930s by the Southern California chapter of the Sierra Club at Tahquitz Rock. The decimal subdivisions of class 5 were developed in the 1950s-60s at Tahquitz and Suicide Rock, and the scale later became open-ended past 5.9, adding a-d letter grades from 5.10 upward. It remains the standard in North America for roped free climbing.',
    usedFor: 'Sport, trad and multi-pitch climbing in North America / 北美运动攀、传统攀与多段攀登',
  },
  {
    id: 'french',
    name: 'French Sport Scale',
    nameZh: '法国运动攀数字体系',
    originZh: '随 20 世纪 70-80 年代法国运动攀革命而成熟，用数字 1-9 加 a/b/c 字母与可选 + 号表示难度（如 7a+）。因法国是螺栓保护运动攀的发源地，该体系成为全球运动攀事实标准，注意法国另有仅用于高山的法文形容词体系（F、PD、AD、D、TD、ED），两者不可混淆。',
    originEn: 'Matured during the French sport-climbing revolution of the 1970s-80s, when bolted climbing was pioneered in France. Numbers 1-9 with a/b/c letters and optional plus signs denote difficulty (e.g. 7a+). It is the de facto world standard for sport climbing. Not to be confused with the separate French adjectival alpine scale (F, PD, AD, D, TD, ED).',
    usedFor: 'Sport climbing worldwide / 全球运动攀',
  },
  {
    id: 'uiaa',
    name: 'UIAA Scale',
    nameZh: 'UIAA 国际山岳联盟体系',
    originZh: '由国际山岳联盟（UIAA）标准化，源自 19 世纪末德语区登山家的 Welzenbach 分级，用罗马数字 I 到 XII（含 +/- 细分）表示。1977 年 VII 级以上开放，1985 年扩展到 XI，如今 XII 以上极少使用，攀岩者在此高度多改用法系。流行于德国、奥地利、瑞士与东欧的传统攀及高山攀登。',
    originEn: 'Standardized by the Union Internationale des Associations d\'Alpinisme, descending from the late-19th-century Welzenbach scale of German-speaking alpinists. Roman numerals I to XII with +/- refinements; the scale was opened above VII in 1977 and extended to XI in 1985. Beyond XII it is rarely used, with the French scale taking over. Common in Germany, Austria, Switzerland and Eastern Europe for trad and alpine climbing.',
    usedFor: 'Trad and alpine climbing in Central and Eastern Europe / 中欧与东欧传统攀及高山攀登',
  },
  {
    id: 'vscale',
    name: 'V-Scale (Hueco Scale)',
    nameZh: 'V 级体系（Hueco 体系）',
    originZh: '由 John "Vermin" Sherman 于 20 世纪 90 年代初在美国德州 Hueco Tanks 创立，发表于他 1991 年的《Hueco Tanks Climbing and Bouldering Guide》。V 取自其绰号 Vermin，VB 表示低于 V0 的入门档，体系开放延伸，目前最高为 V17。是北美及全球抱石的主流标准。',
    originEn: 'Created by John "Vermin" Sherman in the early 1990s at Hueco Tanks, Texas, and published in his 1991 Hueco Tanks Climbing and Bouldering Guide. The V comes from his nickname Vermin; VB denotes sub-V0 introductory problems, and the open-ended scale now reaches V17. It is the dominant bouldering standard in North America and much of the world.',
    usedFor: 'Bouldering in North America and worldwide / 北美及全球抱石',
  },
  {
    id: 'font',
    name: 'Fontainebleau Scale',
    nameZh: '枫丹白露抱石体系',
    originZh: '源自巴黎近郊枫丹白露（Fontainebleau）森林的砂岩抱石场，那里的彩色标记环线（circuits）已有上百年历史。数字 1-9 加大写 A/B/C 字母与可选 + 号（如 7B+），也是欧洲抱石与竞技攀的常用标准。小写 adjectival 版本（如 6a）有时用于表示线路难度而非单步难度。',
    originEn: 'Originated in the sandstone bouldering forest of Fontainebleau near Paris, where painted circuit trails have existed for over a century. Numbers 1-9 with capital A/B/C letters and an optional plus sign (e.g. 7B+); it is the standard bouldering scale in Europe and in competition climbing. A lowercase adjectival variant (e.g. 6a) is sometimes used for overall route difficulty rather than single-move difficulty.',
    usedFor: 'Bouldering in Europe and competitions / 欧洲抱石与竞技攀登',
  },
];

// ---------------------------------------------------------------------------
// B. Gear guide
// ---------------------------------------------------------------------------

export interface Gear {
  id: string;
  nameEn: string;
  nameZh: string;
  category: 'shoes' | 'protection' | 'belay' | 'rope' | 'clothing-acc' | 'bigwall';
  descZh: string;
  descEn: string;
  specs: string[];
  tips: string;
  tipsZh: string;
}

export const gearItems: Gear[] = [
  {
    id: 'climbing-shoes',
    nameEn: 'Climbing Shoes',
    nameZh: '攀岩鞋',
    category: 'shoes',
    descZh: '攀岩鞋用高摩擦粘性橡胶把身体重量集中到脚尖，是最直接影响表现的装备。按鞋型分三类：neutral（平底舒适，适合新手、裂缝与多段）、moderate（轻度下弯，全能型）、downturned/aggressive（激进下弯加不对称鞋楦，适合仰角抱石与运动攀）。',
    descEn: 'Sticky-rubber shoes that focus body weight onto the toes; the single most performance-critical item. Three lasts: neutral (flat, comfortable; beginners, cracks, multi-pitch), moderate (slightly downturned all-rounders), and aggressive downturned asymmetric shoes for steep bouldering and sport climbing.',
    specs: [
      'Rubber thickness 3.5-5.5 mm (thinner = more sensitive, thicker = more durable)',
      'Closure: lace-up / velcro straps / slipper',
      'Last shapes: neutral, moderate, downturned (aggressive)',
      'Typically sized 0.5-2 sizes below street shoes',
      '橡胶厚度 3.5-5.5mm；系带/魔术贴/拖鞋式；三种鞋楦',
    ],
    tips: 'Buy neutral comfort-fit shoes first; only size down aggressively once your footwork justifies it. Leather stretches up to a full size, synthetic barely stretches.',
    tipsZh: '第一双选 neutral 平底、以舒适不痛为准；脚法成熟后再换小码激进鞋。真皮会撑大约一码，合成材质几乎不撑。',
  },
  {
    id: 'harness',
    nameEn: 'Climbing Harness',
    nameZh: '安全带',
    category: 'clothing-acc',
    descZh: '安全带把坠落冲击力分散到腰与腿，并通过保护环连接绳索。坐式安全带是主流；攀岩馆与运动攀用轻量款，传统攀需要 4 个以上装备环挂塞子快挂，大岩壁款强调长时间悬挂的舒适性。',
    descEn: 'Distributes fall forces across waist and thighs and ties the rope to the climber via the belay loop. Sit harnesses are standard; gym/sport models are minimal, trad models need 4+ gear loops for cams and draws, and big-wall models prioritize hanging comfort.',
    specs: [
      'Belay loop strength rated around 15 kN',
      '2-5 gear loops; ice clipper slots on alpine models',
      'Adjustable vs fixed leg loops',
      'UIAA / EN 12277 certified; typical weight 280-500 g',
      '保护环强度约 15kN；2-5 个装备环；重量约 280-500g',
    ],
    tips: 'Fit the waist belt above the hips so it cannot slide down when inverted. Retire after 5-10 years or any major fall with visible wear.',
    tipsZh: '腰带要卡在髋骨上方，倒挂时才不会滑脱。使用 5-10 年或经历大冲坠且有磨损迹象后应退役。',
  },
  {
    id: 'belay-device',
    nameEn: 'Belay Device (ATC / GriGri)',
    nameZh: '保护器（ATC / GriGri）',
    category: 'belay',
    descZh: '保护器通过摩擦力控制绳索以制动坠落。两大类：管式（ATC 类，如 Black Diamond ATC-XP、Petzl Reverso），轻巧便宜、可双绳下降；辅助制动式（如 Petzl GriGri），凸轮在冲坠时自动夹绳，先锋保护更省力更安全，但较贵较重、不适合双绳。',
    descEn: 'Creates friction on the rope to arrest falls. Two families: tubular devices (ATC-style, e.g. Black Diamond ATC-XP, Petzl Reverso) which are light, cheap and can rappel on double strands; and assisted-braking devices (e.g. Petzl GriGri) whose cam pinches the rope during a fall, making lead belaying easier and safer at higher cost and weight.',
    specs: [
      'ATC: works with ropes roughly 7.7-11 mm, weight ~60 g',
      'GriGri: single ropes 8.5-11 mm (GriGri+ 8.0-10.5 mm), weight ~175-200 g',
      'Reverso/ATC-guide add guide mode for belaying a second from an anchor',
      '管式约 60g 可用双绳下降；GriGri 约 175-200g 仅限单绳',
    ],
    tips: 'Beginners often start on a GriGri for its fail-safe, but learn proper ATC technique too. Always keep a hand on the brake strand - no device is hands-free.',
    tipsZh: '新手可从 GriGri 入门获得兜底安全，但也要学会 ATC 手法。无论用哪种，制动端的手永远不能离开绳子。',
  },
  {
    id: 'carabiner',
    nameEn: 'Carabiner (locking / non-locking)',
    nameZh: '主锁 / 快挂锁（带锁与不带锁）',
    category: 'belay',
    descZh: '金属连接环，是整套系统的基础连接件。non-locking（直门/弯门/钢丝门）用于快挂两端与挂装备；locking（丝扣锁/自动锁）用于保护、建站与顶环。梨形 HMS 锁适合保护，D 形锁强度重量比最优。',
    descEn: 'The fundamental metal connector of the system. Non-locking biners (straight/bent/wire gate) serve on quickdraws and for racking; locking biners (screwgate or auto-locking) are used for belaying and anchors. Pear-shaped HMS biners suit belaying; D-shapes optimize strength-to-weight.',
    specs: [
      'Major axis strength 20-28 kN; minor axis 6-8 kN; open gate 7-9 kN',
      'Weight 35-60 g each; aluminum alloy is standard',
      'Gate types: solid straight/bent, wiregate; screw vs twist/triple auto-lock',
      '主轴强度 20-28kN；开口强度仅 7-9kN；单只约 35-60g',
    ],
    tips: 'Never load a biner over an edge or across its minor axis - open-gate strength drops by two thirds. Retire any biner dropped hard onto rock.',
    tipsZh: '绝不要让锁横着受力或卡在棱边上——开门状态强度只剩三分之一。高空摔到岩石上的锁直接退役。',
  },
  {
    id: 'quickdraw',
    nameEn: 'Quickdraw',
    nameZh: '快挂',
    category: 'protection',
    descZh: '由两只锁和一段扁带（dogbone）组成，用于先锋攀时把绳子快速扣入挂片或机械塞。运动攀常用 10-12cm 短快挂，传统攀用 16-18cm 甚至可延长 alpine draw 减少 rope drag。挂片端用直门锁，绳子端用弯门或钢丝门锁。',
    descEn: 'Two carabiners joined by a sewn sling (dogbone), used to clip the lead rope into bolts or gear. Sport draws are 10-12 cm; trad climbers use 16-18 cm or extendable alpine draws to cut rope drag. Straight gate on the bolt end, bent or wire gate on the rope end.',
    specs: [
      'Sling lengths 10 / 12 / 17 / 18 / 25 cm; dyneema or nylon',
      'Sewn sling rated 22 kN',
      'Sport rack: 12-16 draws; trad adds extendable alpine draws',
      '扁带长 10-25cm，强度 22kN；运动攀一般带 12-16 把',
    ],
    tips: 'Clip with the gate facing away from your direction of travel, and make sure the rope runs from rock to climber to avoid back-clipping.',
    tipsZh: '锁门方向背对行进方向，绳子必须从岩壁侧穿向攀登者侧，避免 back-clip 导致脱扣。',
  },
  {
    id: 'cam',
    nameEn: 'Cam (SLCD)',
    nameZh: '机械塞',
    category: 'protection',
    descZh: '弹簧承载凸轮装置，拉动扳机使 3-4 片凸轮收缩后放入裂缝，松开后凸轮撑紧岩壁，把拉力转化为向外的摩擦力。是传统攀平行动态裂缝的核心保护，经典代表为 Black Diamond Camalot C4。',
    descEn: 'Spring-loaded camming device: pull the trigger to retract 3-4 lobes, place in a crack, release - the lobes wedge outward and convert pull into friction against the rock. The core protection for parallel-sided cracks in trad climbing; the Black Diamond Camalot C4 is the classic example.',
    specs: [
      'Range per unit roughly 13-114 mm (BD C4 sizes #0.3-#6)',
      'Strength 5-14 kN depending on size',
      'Single vs double axle; double axle gives wider range per unit',
      'Full rack typically 8-12 units plus micro cams',
      '单个覆盖约 13-114mm；强度 5-14kN；一副标准 rack 约 8-12 个',
    ],
    tips: 'Place cams mid-range in their sweet spot - a nearly closed (over-cammed) unit can get stuck, a fully open one is weak. Practice placements on the ground first.',
    tipsZh: '放置时让凸轮处于行程中段最稳；压到底会卡死取不出，张到全开则强度大减。先在地面练熟再放真保护。',
  },
  {
    id: 'nut',
    nameEn: 'Nut (wire stopper)',
    nameZh: '岩塞',
    category: 'protection',
    descZh: '最简单的被动保护：楔形金属块穿在钢丝绳上，塞进由宽变窄的裂缝中卡住。便宜、轻、耐用，是传统攀入门与窄缝保护的基础。偏移形（offset）塞适合喇叭口与扩缝。',
    descEn: 'The simplest passive protection: a wedge of metal on a wire cable, slotted into constrictions in cracks. Cheap, light and durable; the foundation of a trad rack and ideal for narrow seams. Offset nuts fit flared placements.',
    specs: [
      'Standard sets of 10-13 sizes covering roughly 4-28 mm',
      'Strength 5-12 kN depending on size',
      'Offset nuts and micro nuts (RPs) expand the range',
      '一套 10-13 个覆盖约 4-28mm；强度 5-12kN',
    ],
    tips: 'Seat the nut with a firm tug, orient it along the direction of pull, and slot as much surface area against rock as possible. Carry a nut tool to clean stuck pieces.',
    tipsZh: '放好后用力顿一下坐实，受力方向要对，接触面越大越好。随身带取塞器，方便取出卡死的塞子。',
  },
  {
    id: 'helmet',
    nameEn: 'Climbing Helmet',
    nameZh: '攀岩头盔',
    category: 'clothing-acc',
    descZh: '防止落石、岩壁撞击与倒挂摔时的头部伤害。分硬壳（hardshell，耐用便宜）与发泡吸能（EPS/EPP 泡沫，轻量）两类。野攀、多段与冰攀基本必戴，岩馆与抱石则少见。',
    descEn: 'Protects against rockfall, head impacts with the wall, and inverted falls. Two constructions: hardshell (durable, cheaper) and foam (EPS/EPP, lighter). Near-mandatory outdoors, on multi-pitch and ice; uncommon in gyms and bouldering.',
    specs: [
      'UIAA / EN 12492 certified',
      'Weight 150-300 g (foam models lightest)',
      'Headlamp clips; adjustable dial or strap fit systems',
      '重量约 150-300g；带登山头灯卡扣',
    ],
    tips: 'A helmet only works if it stays on - adjust so it cannot slide back exposing the forehead. Replace after any significant impact, even without visible cracks.',
    tipsZh: '头盔戴得住才有用——调节到低头抬头都不滑动、不露出额头。受过明显撞击即使无裂纹也要更换。',
  },
  {
    id: 'chalk',
    nameEn: 'Chalk and Chalk Bag',
    nameZh: '镁粉与镁粉袋',
    category: 'clothing-acc',
    descZh: '碳酸镁粉末吸汗增加摩擦力，装在腰后小袋中随取随用。有粉状、块状与液态（liquid chalk，酒精基底，岩馆粉尘规定下常用）三种形态。',
    descEn: 'Magnesium carbonate absorbs sweat and improves friction, carried in a waist bag for mid-route re-chalking. Comes loose, as a block, or as liquid chalk (alcohol-based; often preferred where gyms restrict dust).',
    specs: [
      'Chalk bags: cylindrical with drawstring closure and brush loop',
      'Liquid chalk dries in seconds and lasts longer per application',
      'Chalk balls reduce dust in gyms',
      '镁粉袋带收口绳与刷子挂环；液态镁粉适合限尘岩馆',
    ],
    tips: 'Chalk is not a substitute for finger strength - over-chalking wastes time on route. Brush excess chalk off holds to leave the crag clean.',
    tipsZh: '镁粉替代不了指力，线上狂抹粉只会浪费时间。爬完用刷子清掉点上的粉，给岩场留干净。',
  },
  {
    id: 'crash-pad',
    nameEn: 'Crash Pad',
    nameZh: '抱石垫',
    category: 'protection',
    descZh: '抱石的唯一保护装备：多层发泡垫吸收坠落冲击。结构分 taco（整体对折，无缝隙但不完全平放）与 hinge（铰链式，铺得平但接缝处是弱点）。多人协作搬多块垫子铺平台是高线抱石常态。',
    descEn: 'The only protection in bouldering: layered foam pads that absorb landing impacts. Two folds: taco (single fold, no seam gap but never lies perfectly flat) and hinge (lies flat, but the seam is a weak spot). Highball bouldering often means stacking several pads carried in by a team.',
    specs: [
      'Open size roughly 90-130 x 100-150 cm, thickness 9-13 cm',
      'Dual-density foam: firm closed-cell top over soft open-cell base',
      'Backpack straps and waist belt for the approach',
      '展开约 90-130 x 100-150cm，厚 9-13cm；双层密度泡棉',
    ],
    tips: 'Cover the actual landing zone including the swing-out arc, not just the spot under the crux. A good spotter and pad placement matter more than pad thickness.',
    tipsZh: '垫子要盖住真实落点与荡出的弧线，不只是难点正下方。好的保护员加合理铺垫比垫子厚度更重要。',
  },
  {
    id: 'rope',
    nameEn: 'Climbing Rope (dynamic / static)',
    nameZh: '攀岩绳（动力绳 / 静力绳）',
    category: 'rope',
    descZh: '动力绳（dynamic）靠延展吸收冲坠冲击，是先锋与顶绳保护唯一可用的绳：单绳直径 8.5-10.2mm 最常见；半绳/双子绳 7.5-8.5mm 用于多段与冰攀。静力绳（static，9-11mm）几乎不延展，只用于下降、修路、拖拽与大岩壁吊运，绝不能用于先锋保护。',
    descEn: 'Dynamic ropes stretch to absorb fall energy and are the only ropes allowed for lead and top-rope belaying: single ropes run 8.5-10.2 mm; half/twin ropes at 7.5-8.5 mm serve multi-pitch and ice. Static ropes (9-11 mm) barely stretch and are reserved for rappelling, fixed lines and hauling - never for lead climbing.',
    specs: [
      'Single ropes 8.5-10.2 mm, length 50-80 m (60 m is the modern default)',
      'UIAA fall rating typically 5-10+ falls; impact force 7-9 kN',
      'Dry treatment for ice/alpine; middle mark or bi-pattern weave',
      'Static ropes 9-11 mm with elongation under 5%',
      '单绳 8.5-10.2mm、50-80m 长；UIAA 冲坠次数 5-10+；静力绳延展小于 5%',
    ],
    tips: 'Match rope length to your crag - many modern sport routes need a full 70-80 m to lower off. Retire after a huge factor-2 fall, visible sheath damage, or about 5 years of regular use.',
    tipsZh: '先看岩场再买绳——现代运动攀线路很多需要 70-80m 才能下降到底。经历大冲坠系数冲坠、绳皮破损或使用约 5 年后应退役。',
  },
  {
    id: 'slings',
    nameEn: 'Slings and Cordelettes',
    nameZh: '扁带与辅绳圈',
    category: 'protection',
    descZh: '缝合扁带圈（60/120/240cm）用于延长保护点、搭建锚点、套岩柱；材质分大力马（dyneema，细轻、强度大但熔点低不耐磨）与尼龙（nylon，粗重但耐操吸能好）。辅绳圈（cordelette，约 6m 长的 7-8mm 辅绳）是传统攀多段建站的经典材料。',
    descEn: 'Sewn sling loops (60/120/240 cm) for extending placements, building anchors and slinging blocks; dyneema is thin, light and very strong but has a low melting point, while nylon is bulkier but tougher and absorbs energy better. A cordelette (about 6 m of 7-8 mm accessory cord) is the classic trad anchor-building material.',
    specs: [
      'Sewn slings rated 22 kN; common lengths 60 / 120 / 240 cm',
      'Dyneema 8-12 mm wide; nylon 15-18 mm wide',
      'Cordelette: about 6 m of 7-8 mm accessory cord, tied in a loop',
      '扁带圈强度 22kN；辅绳圈为约 6m 的 7-8mm 辅绳',
    ],
    tips: 'Never shock-load a short dyneema sling in a static system - dyneema transmits fall energy with almost no absorption. Keep at least one locking biner per sling on anchors.',
    tipsZh: '切忌让短大力马扁带在静态系统里直接承受冲坠——它几乎不吸能。建站时每条扁带至少配一把带锁主锁。',
  },
  {
    id: 'pas',
    nameEn: 'PAS (Personal Anchor System)',
    nameZh: '个人锚点系统（牛尾）',
    category: 'belay',
    descZh: '由多个全强度独立环串联成的链条式连接带，把安全带安全连到锚点，用于多段换站、顶绳建站与下降延伸。比传统 daisy chain 安全——daisy 的中间环只有约 2kN，而 PAS 每个环都是全强度 22kN。',
    descEn: 'A chain of independently full-strength loops that clips the harness securely to anchors for multi-pitch changeovers, top-rope anchor building and rappel extensions. Safer than a daisy chain, whose intermediate pockets hold only about 2 kN while every loop of a PAS is rated to 22 kN.',
    specs: [
      'Every loop rated to 22 kN; total length 90-120 cm',
      'Dyneema or dynamic rope-based (e.g. Petzl Connect Adjust) versions',
      'Adjustable models allow fine positioning at the anchor',
      '每个环全强度 22kN；总长 90-120cm；可调款可精确定位',
    ],
    tips: 'Always girth-hitch or clip it through both tie-in points, and never climb above the anchor while attached - a short fall onto any static tether can generate huge forces.',
    tipsZh: '务必用双套结式穿法或直接扣进两个保护点环；挂上后绝不能爬得高于锚点——静态连接带上的小落差冲坠也会产生巨大冲击力。',
  },
  {
    id: 'portaledge',
    nameEn: 'Portaledge',
    nameZh: '吊帐',
    category: 'bigwall',
    descZh: '大岩壁攀登的悬挂露营平台：铝合金管框架撑起一块绷布床面，四点吊挂系统连到锚点，配合防雨罩（fly）可在垂直岩壁上过夜。El Capitan 级别的多日攀登必需品。',
    descEn: 'The hanging camp platform of big-wall climbing: an aluminum tube frame tensions a fabric bed, suspended by a four-point rig from the anchor, with a storm fly for weather. Essential for multi-day ascents on walls like El Capitan.',
    specs: [
      'Single ledge roughly 113 x 190 cm; double about 130 x 210 cm',
      'Weight 6-9 kg including fly',
      'Frame rated to support two people plus gear on anchor',
      '单人款约 113 x 190cm；含防雨罩重 6-9kg',
    ],
    tips: 'Practice setup on the ground and always clip the ledge (and yourself) to a bombproof anchor with the haul bag weighted as ballast in wind.',
    tipsZh: '先在地面练熟搭建；吊帐与人都要挂进绝对可靠的锚点，大风天可把吊包挂在下面压舱。',
  },
  {
    id: 'haul-bag',
    nameEn: 'Haul Bag',
    nameZh: '吊运包',
    category: 'bigwall',
    descZh: '大岩壁攀登用来拖拽补给的圆桶形重装备包，外层是超耐磨乙烯基或厚尼龙，配吊装旋转接头（swivel）与可拆卸背负系统。多天攀登中补给全靠一段一段拖上去。',
    descEn: 'The cylindrical, bombproof bag used to haul supplies up big walls: ultra-abrasion vinyl or heavy nylon shell, haul swivel attachment and a removable carry system. Multi-day walls are supplied by dragging these up pitch by pitch.',
    specs: [
      'Volumes 45-115 L (e.g. Metolius, Black Diamond models)',
      'Abrasion-resistant haul-rated fabric; roll-top closure',
      'Docking tether and swivel rated for hauling loads',
      '容量 45-115L；超耐磨面料；卷口设计',
    ],
    tips: 'Pack heavy items low, keep the profile narrow, and pad the top with soft goods - the bag spends its life grinding up granite.',
    tipsZh: '重物放低、外形收细、顶部垫软物——这包一辈子都在花岗岩上蹭着走。',
  },
  {
    id: 'finger-tape',
    nameEn: 'Finger Tape',
    nameZh: '指胶带',
    category: 'clothing-acc',
    descZh: '氧化锌运动胶带，主要用途二合一：保护裂缝攀磨破的手背（缠成 crack gloves）与支撑受伤的手指肌腱滑车（pulley）或关节。宽 3.8cm 的布基胶带最常用。',
    descEn: 'Zinc-oxide athletic tape with two main jobs: protecting the backs of hands in crack climbing (taped crack gloves) and supporting injured finger pulleys and joints. The 3.8 cm-wide cloth tape is the standard.',
    specs: [
      'Width 2.5-3.8 cm; non-stretch cotton with zinc-oxide adhesive',
      'H-taping or X-taping patterns for pulley support',
      'Full-hand glove taping for wide crack climbing',
      '宽 2.5-3.8cm 布基氧化锌胶带；H 型/X 型缠法支撑滑车',
    ],
    tips: 'Tape is support, not a cure - a pulley injury needs rest first. For crack gloves, wrap snugly but check circulation after a few minutes of climbing.',
    tipsZh: '胶带只是辅助不是治疗——滑车受伤先要休息。缠裂缝手套要贴实，爬几分钟后检查手指血液循环。',
  },
  {
    id: 'climbing-brush',
    nameEn: 'Climbing Brush',
    nameZh: '岩点刷',
    category: 'clothing-acc',
    descZh: '刷掉岩点上的旧镁粉与橡胶碎屑恢复摩擦力的小刷子，鬃毛（猪鬃）不伤岩面，是运动攀与抱石标配；长杆刷可够到高处的点。',
    descEn: 'A small brush that removes old chalk and rubber from holds to restore friction; boar-hair bristles are gentle on rock. Standard kit for sport climbing and bouldering; extendable stick brushes reach high holds.',
    specs: [
      'Boar hair or nylon bristles; wood or plastic handle',
      'Compact 10-17 cm handles; extendable stick brushes to 1 m+',
      'L-shaped heads for pockets and crimps',
      '猪鬃或尼龙刷毛；常规 10-17cm，加长杆可超 1m',
    ],
    tips: 'Use boar hair on real rock to avoid polishing soft sandstone, and always brush tick marks off before you leave.',
    tipsZh: '野外用猪鬃刷，避免把软砂岩抛光；离开前务必刷掉自己画的标记线。',
  },
  {
    id: 'rope-bag',
    nameEn: 'Rope Bag',
    nameZh: '绳包',
    category: 'rope',
    descZh: '内置防水地布（tarp）的背包式绳袋：绳子摊在地布上收放，抱进岩场不拖泥不带土，换场地一卷就走，显著延长绳子寿命并防止绳结缠绕。',
    descEn: 'A backpack-style bag with an integrated tarp: the rope flakes out onto the tarp at the crag, staying clean of dirt and grit, and the whole thing rolls up for a fast move between routes. Extends rope life and prevents tangles.',
    specs: [
      'Tarp roughly 120 x 140 cm with tie-in loops at corners',
      'Fits 60-80 m rope plus a few draws and shoes',
      'Backpack straps or single sling carry',
      '地布约 120 x 140cm；可装 60-80m 绳加少量装备',
    ],
    tips: 'Tie one rope end to the tarp loop so you never lower off the end, and re-flake the rope rather than stuffing it to keep it kink-free.',
    tipsZh: '绳头系在地布挂环上，避免下降时滑出绳尾；收绳时叠放理顺而不是硬塞，绳子才不打卷。',
  },
  {
    id: 'belay-glasses',
    nameEn: 'Belay Glasses',
    nameZh: '保护眼镜',
    category: 'belay',
    descZh: '利用棱镜把视线向上折射 60-90 度的眼镜，保护员抬头看攀爬者时不用仰脖子，长时间先锋保护大幅减轻颈椎负担，是运动攀岩场的常见装备。',
    descEn: 'Prism glasses that bend the view 60-90 degrees upward, so the belayer can watch the climber without craning the neck. They remove most of the neck strain from long lead-belaying sessions and are common at sport crags.',
    specs: [
      'Prism deflection 60-90 degrees depending on model',
      'Fits over prescription glasses on most models',
      'Weight 36-60 g with case and neck strap',
      '棱镜折射 60-90 度；多数款可套在近视眼镜外；约 36-60g',
    ],
    tips: 'Practice paying out slack while wearing them before trusting them on a hard catch - the flipped depth perception takes a session or two to learn.',
    tipsZh: '先在轻松线路上练熟带着它给绳，再上难线——翻转的透视感需要一两次适应才能安全接冲坠。',
  },
];

// ---------------------------------------------------------------------------
// C. Knots and belay techniques
// ---------------------------------------------------------------------------

export interface Knot {
  nameEn: string;
  nameZh: string;
  useZh: string;
  useEn: string;
  when: string;
  whenZh: string;
}

export const knots: Knot[] = [
  {
    nameEn: 'Figure-8 Follow Through',
    nameZh: '八字穿绕结',
    useZh: '把绳子系进安全带的两个保护点环，是攀岩界标准的连接结：强度保留约 75-80%，受力后仍相对好解，且形状直观易检查。',
    useEn: 'The standard tie-in knot, threaded through both tie-in points of the harness. Retains about 75-80% of rope strength, stays relatively easy to untie after loading, and its shape is easy to visually partner-check.',
    when: 'Every time you tie in for lead or top-rope climbing; finish with a backup overhand or a long enough tail.',
    whenZh: '每次先锋或顶绳攀爬系绳时必用；收尾留足绳尾或加防脱结。',
  },
  {
    nameEn: 'Clove Hitch',
    nameZh: '双套结（丁香结）',
    useZh: '快速把绳子可调长度地固定到主锁上，并可随时单手调节松紧，是多段建站的万能连接结。',
    useEn: 'Quickly attaches the rope to a carabiner with adjustable length, tweakable one-handed; the all-purpose connector for multi-pitch anchor building.',
    when: 'Clipping yourself into anchors on multi-pitch routes, equalizing two bolts, or fixing the rope at a stance.',
    whenZh: '多段攀登把自己挂进锚点、平衡两个挂片、或在保护站固定绳子时。',
  },
  {
    nameEn: 'Munter Hitch',
    nameZh: '骡结（意大利半扣）',
    useZh: '不用保护器、只靠一把 HMS 主锁产生摩擦力来制动绳索的结，可做保护与下降，且能双向受力。',
    useEn: 'A friction hitch on a single HMS carabiner that belays and rappels without any device, and works when loaded in either direction.',
    when: 'Emergency belay or rappel when the belay device is dropped or forgotten; short lowers and glacier travel.',
    whenZh: '保护器掉落或忘带时的应急保护与下降；短距离下放与冰川行进。',
  },
  {
    nameEn: "Double Fisherman's",
    nameZh: '双渔人结',
    useZh: '连接两根绳子或绳子的两端的结，受拉后越拉越紧且几乎不会滑脱，是辅绳圈与普鲁士环的标准闭合结。',
    useEn: 'Joins two ropes or the two ends of a cord; it tightens under load and virtually never slips, making it the standard bend for cordelettes and prusik loops.',
    when: 'Tying prusik loops, cordelettes and cord slings; joining two ropes for a full-length rappel (triple fisherman preferred with dyneema).',
    whenZh: '打普鲁士环、辅绳圈；双绳全长下降时连接两根绳（大力马材质建议三渔人结）。',
  },
  {
    nameEn: 'Prusik',
    nameZh: '普鲁士结',
    useZh: '用细辅绳环在主绳上缠三圈形成的抓结：不受力时可上下滑动，受力即锁死，是最经典的上升与自保抓结。',
    useEn: 'A friction hitch wrapped three times around the main rope with a thinner cord loop: it slides freely when unloaded and grips solidly when weighted; the classic ascender and backup hitch.',
    when: 'Rappel backup below the device, ascending a rope in self-rescue, or backing up a haul system.',
    whenZh: '下降时在保护器下方做自保、自救时沿绳上升、或拖拽系统的止滑备份。',
  },
  {
    nameEn: 'Klemheist',
    nameZh: '克莱姆海斯特结',
    useZh: '单方向锁定的抓结，比普鲁士结更省绳、可用扁带打，且在上拉方向抓得更牢，但反向几乎不制动。',
    useEn: 'A one-directional friction hitch that uses less cord than a prusik, works with webbing slings, and grips harder in the upward-pull direction, but barely holds when loaded the other way.',
    when: 'Ascending a fixed line, escaping the system in rescue, or when only slings (no cord) are available for a friction hitch.',
    whenZh: '沿固定绳上升、救援中脱离系统，或手头只有扁带没有辅绳时打抓结。',
  },
  {
    nameEn: 'Alpine Butterfly',
    nameZh: '蝴蝶结',
    useZh: '在绳子中段打出可双向受力的绳环，且不降低太多绳体强度，是隔离绳皮破损段的经典结。',
    useEn: 'Creates a mid-rope loop that can be loaded in both directions while retaining good strength; the classic knot for isolating a damaged section of rope.',
    when: 'Rigging a middleman on glacier travel, clipping a third person into the rope, or bypassing a frayed sheath section.',
    whenZh: '冰川结组中打中间人绳环、三人结组连接，或绕开绳皮破损段。',
  },
  {
    nameEn: 'Bowline',
    nameZh: '布林结（称人结）',
    useZh: '打出固定大小、永不收紧的绳环，受力后依然极易解开；强度低于八字结，攀岩用必须加防脱收尾。',
    useEn: 'Forms a fixed loop that never jams and unties easily even after heavy loading; weaker than the figure-8, so climbing use always requires a secure backup finish.',
    when: 'Slinging trees and boulders for anchors, rescue situations needing easy release, or tie-in where repeated untying matters (always with backup).',
    whenZh: '建站时套大树或巨石、需要快速解开的救援场合，或需要频繁解结的连接（务必加防脱结）。',
  },
];
