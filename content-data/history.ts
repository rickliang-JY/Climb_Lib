// Climbing history content data (bilingual zh/en)
// Facts cross-checked against standard climbing history sources (June 2024).

export interface TimelineEvent {
  year: string; // e.g. "1886" or "1930s"
  era: 'origins' | 'golden' | 'free-revolution' | 'sport' | 'modern' | 'olympic';
  titleZh: string;
  titleEn: string;
  textZh: string; // 80-150 Chinese characters
  textEn: string; // English version
  highlight?: boolean; // landmark event
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "1886",
    era: "origins",
    titleZh: "内普斯针峰首攀：攀岩从登山中独立",
    titleEn: "Napes Needle: Climbing Splits from Mountaineering",
    textZh: "1886年6月，英国登山者 W.P. Haskett Smith 在英格兰湖区独自攀上 Napes Needle 岩柱。这次攀登被视为攀岩作为独立运动的开端：此前攀登岩壁只是登山的辅助手段，此后人们开始为攀爬本身而上岩壁。",
    textEn: "In June 1886, English mountaineer W.P. Haskett Smith soloed the Napes Needle pinnacle in England's Lake District. Widely regarded as the birth of rock climbing as a sport in its own right, the ascent marked the moment climbers began to seek out rock for its own sake rather than as training for mountaineering.",
    highlight: true
  },
  {
    year: "1880s-1910s",
    era: "origins",
    titleZh: "萨克森砂岩传统：最早的自由攀登伦理",
    titleEn: "The Elbsandstein Sandstone Tradition",
    textZh: "在德国易北砂岩山区（Elbsandstein），攀爬者围绕林立的砂岩塔发展出独特的攀登文化：禁止在岩面打金属支点，只用绳环和沙袋做保护，强调以身体能力自由攀登。Oliver Perry-Smith 等人在此攀登了大量先锋线路，奠定了欧洲最早的攀登伦理。",
    textEn: "In Germany's Elbsandstein (Saxon Switzerland), climbers built a distinctive culture around the sandstone towers: metal pitons in the rock were forbidden, protection relied on rope rings slung over horns, and free climbing was the ethical ideal. Pioneers like Oliver Perry-Smith established bold routes there and shaped Europe's earliest climbing ethics."
  },
  {
    year: "1897",
    era: "origins",
    titleZh: "第一本攀岩指南出版",
    titleEn: "The First Climbing Guidebook",
    textZh: "1897年，Owen Glynne Jones 出版《英格兰湖区攀岩》（Rock-Climbing in the English Lake District），这是历史上第一部系统的攀岩指南。Jones 本人是湖区最活跃的先锋攀登者，他的著作让攀岩从少数人的冒险变成可学习、可传承的运动。",
    textEn: "In 1897 Owen Glynne Jones published Rock-Climbing in the English Lake District, the first systematic climbing guidebook. Jones was himself the most active pioneer in the Lakes, and his book turned climbing from a private adventure into a teachable, transmissible sport."
  },
  {
    year: "1911",
    era: "origins",
    titleZh: "Paul Preuss 的自由攀登宣言",
    titleEn: "Paul Preuss and the Ethics of Free Climbing",
    textZh: "奥地利攀登者 Paul Preuss 主张：攀登者应仅凭自身能力克服岩壁，岩钉只能用于保护而非助力，能爬上去的地方也应该能爬下来。他以此理念在多洛米蒂完成大量独攀，其论文成为现代自由攀登伦理的思想源头。",
    textEn: "Austrian climber Paul Preuss argued that a climber should overcome the rock by ability alone: pitons were for protection, never for aid, and one should climb only what one could also descend. He applied this creed to bold solos in the Dolomites, and his essays became the philosophical root of modern free climbing ethics."
  },
  {
    year: "1933",
    era: "origins",
    titleZh: "多洛米蒂的垂直直登时代",
    titleEn: "The Dolomites and the Direttissima Era",
    textZh: "1930年代，Emilio Comici、Riccardo Cassin 等意大利攀登者在多洛米蒂的巨壁上开辟直登线路。1933年 Comici 首攀 Cima Grande 西北壁，将难度推至 VI 级。装备简陋、依赖岩钉器械攀登的这一段历史，既是阿尔卑斯攀登的高峰，也埋下了后来自由攀登革命的反弹伏笔。",
    textEn: "In the 1930s Italian climbers such as Emilio Comici and Riccardo Cassin forced direct lines up the great Dolomite walls. Comici's 1933 first ascent of the northwest face of Cima Grande pushed standards to grade VI. This era of piton-dependent aid climbing was both a high point of alpinism and the provocation against which the later free climbing revolution reacted."
  },
  {
    year: "1930s-1940s",
    era: "golden",
    titleZh: "器材革命：岩钉、铁锁与尼龙绳",
    titleEn: "The Hardware Revolution: Pitons, Karabiners, Nylon",
    textZh: "1930至40年代，钢制岩钉、登山铁锁和尼龙绳索相继普及，二战后大量军用盈余装备流入民间。更可靠的保护让攀登者敢于挑战更陡、更高的岩壁，美国优胜美地（Yosemite）的花岗岩巨壁由此成为新一代攀登的中心舞台。",
    textEn: "Through the 1930s and 1940s, steel pitons, karabiners and nylon ropes spread, and war-surplus gear flooded the civilian market after 1945. Reliable protection emboldened climbers to attempt steeper, bigger walls, and the granite of Yosemite Valley became the new center of world climbing."
  },
  {
    year: "1950s",
    era: "golden",
    titleZh: "优胜美地十进制定级系统诞生",
    titleEn: "Birth of the Yosemite Decimal System",
    textZh: "1950年代，南加州 Sierra Club 的攀登者在 Tahquitz 岩壁设计出十进制难度分级，后经优胜美地推广为 Yosemite Decimal System（YDS）。5.0 到 5.9 的刻度首次让线路难度有了统一语言，此后随难度突破不断向上开放，沿用至今。",
    textEn: "In the 1950s Sierra Club climbers at Tahquitz Rock devised a decimal grading scale that spread through Yosemite as the Yosemite Decimal System (YDS). Its 5.0 to 5.9 range gave route difficulty a common language for the first time; as standards rose the scale was opened upward, and it remains in use today."
  },
  {
    year: "1958",
    era: "golden",
    titleZh: "The Nose 首攀：大岩壁时代开启",
    titleEn: "First Ascent of The Nose: the Big Wall Era Begins",
    textZh: "1958年，Warren Harding 率队历时47个攀爬日、跨越两个季节，以器械攀登方式首攀优胜美地酋长岩 The Nose 线路，全程约870米，打入大量岩钉与膨胀螺栓。这次攀登轰动美国，宣告大岩壁攀登时代到来。",
    textEn: "In 1958 Warren Harding's team completed the first ascent of The Nose on El Capitan, spending 47 days of climbing across two seasons on the roughly 870-meter line, hammering in hundreds of pitons and bolts. The feat made national news in America and opened the era of big wall climbing.",
    highlight: true
  },
  {
    year: "1950s-1960s",
    era: "golden",
    titleZh: "John Gill：抱石成为独立学科",
    titleEn: "John Gill Makes Bouldering a Discipline",
    textZh: "体操运动员出身的 John Gill 把抱石当作独立项目而非训练手段：他引入体操镁粉防滑、强调动态发力和单步难度，自创 B 级难度系统，并在1961年独攀南达科他 The Thimble 等超前时代的线路。他被誉为现代抱石与运动训练理念之父。",
    textEn: "Former gymnast John Gill treated bouldering as a discipline in its own right, not mere training. He introduced gymnastic chalk, emphasized dynamic movement and single-move difficulty, devised his own B-scale, and soloed futuristic lines such as The Thimble in South Dakota in 1961. He is regarded as the father of modern bouldering and climbing-specific training.",
    highlight: true
  },
  {
    year: "1961",
    era: "golden",
    titleZh: "Royal Robbins 首攀 Salathe Wall",
    titleEn: "Royal Robbins and the Salathe Wall",
    textZh: "1961年，Royal Robbins 与 Tom Frost、Chuck Pratt 首攀酋长岩 Salathe Wall，仅使用13个螺栓，最大限度依靠岩缝与自然保护。Robbins 以简约克制的风格树立了与 Harding 截然不同的美学标准，成为优胜美地黄金年代的精神旗手。",
    textEn: "In 1961 Royal Robbins, Tom Frost and Chuck Pratt made the first ascent of the Salathe Wall on El Capitan using only 13 bolts, relying wherever possible on natural features for protection. Robbins' spare, restrained style set an aesthetic opposite to Harding's and made him the moral standard-bearer of Yosemite's golden age."
  },
  {
    year: "1967",
    era: "golden",
    titleZh: "Nutcracker：首次全程无岩钉攀登",
    titleEn: "The Nutcracker: First All-Nut Ascent",
    textZh: "1967年，Royal Robbins 与妻子 Liz Robbins 在优胜美地完成 Nutcracker 线路，全程只用可移除的铝合金岩塞（nuts）做保护，未敲入一枚岩钉。这次攀登证明岩壁可以不受伤痕地被征服，是清洁攀登（clean climbing）理念的第一次实践示范。",
    textEn: "In 1967 Royal and Liz Robbins climbed the Nutcracker in Yosemite protecting the entire route with removable aluminum nuts, driving not a single piton. The ascent proved that rock could be climbed without scarring it - the first practical demonstration of what would soon be called clean climbing."
  },
  {
    year: "1972",
    era: "golden",
    titleZh: "清洁攀登宣言：Chouinard 器材目录",
    titleEn: "The Clean Climbing Manifesto",
    textZh: "1972年，Yvon Chouinard 在其装备公司目录中发表清洁攀登宣言，呼吁放弃破坏岩缝的岩钉，改用可重复取放的岩塞与六角塞（hexentrics），并随刊推出新产品。岩钉销量应声下跌，无痕攀登从此成为主流伦理。",
    textEn: "In 1972 Yvon Chouinard published a clean climbing essay in his equipment catalog, urging climbers to abandon rock-scarring pitons in favor of removable nuts and hexentrics, which his company began selling alongside it. Piton sales collapsed, and leave-no-trace climbing became the mainstream ethic.",
    highlight: true
  },
  {
    year: "1970s",
    era: "free-revolution",
    titleZh: "自由攀登革命与镁粉之争",
    titleEn: "The Free Climbing Revolution and the Chalk Debate",
    textZh: "1970年代，Henry Barber、John Bachar 等新一代攀登者把自由攀登推向极致：不再在装备上悬吊休息，反复尝试直至一气呵成。镁粉的普及引发关于岩面痕迹与伦理的争论；同期 John Stannard 等人将美式难度推进到 5.12，纪录以年为单位被刷新。",
    textEn: "In the 1970s a new generation led by Henry Barber and John Bachar pushed free climbing to its limit: no more resting on gear, just repeated attempts until a route went in a single push. The spread of chalk sparked debate over rock stains and ethics, while climbers like John Stannard drove American standards into 5.12, with records falling almost yearly."
  },
  {
    year: "1975",
    era: "free-revolution",
    titleZh: "红点理念诞生：Kurt Albert 的红圈",
    titleEn: "Kurt Albert Invents the Redpoint",
    textZh: "1975年前后，德国攀登者 Kurt Albert 在弗兰肯侏罗山（Frankenjura）开始给已经无需器械、自由完成的线路根部画上红点（Rotpunkt）。先练习、再不借力一次完成的红点模式，为日后运动攀的伦理与定级体系确立了基本规则。",
    textEn: "Around 1975 German climber Kurt Albert began painting a red dot (Rotpunkt) at the base of Frankenjura routes he had freed without aid. The redpoint model - practice first, then climb clean in one go - established the ethical and grading ground rules on which sport climbing would later be built.",
    highlight: true
  },
  {
    year: "1977",
    era: "free-revolution",
    titleZh: "Ray Jardine 攀上 5.13，发明 Friends",
    titleEn: "Ray Jardine: 5.13 and the Friend",
    textZh: "1977年，Ray Jardine 在优胜美地首攀 The Phoenix，成为史上第一条公认的 5.13a 线路。次年他为自研的凸轮保护器 Friends 申请专利，这种能平行涨开的机械塞彻底改变了裂缝攀登的安全边界，成为现代机械塞的鼻祖。",
    textEn: "In 1977 Ray Jardine made the first ascent of The Phoenix in Yosemite, the first consensus 5.13a in history. A year later he patented the Friend, his spring-loaded camming device, which transformed the safety margins of crack climbing and became the ancestor of all modern cams."
  },
  {
    year: "1979",
    era: "free-revolution",
    titleZh: "Grand Illusion：世界首条 8a",
    titleEn: "Grand Illusion: the World's First 8a",
    textZh: "1979年，19岁的 Tony Yaniro 在加州 Sugarloaf 完成 Grand Illusion（5.13b），即后来的法国定级 8a，被公认为世界首条该难度线路。他吊绳摸点、回家仿制裂缝专项训练的做法虽在当时备受争议，却预示了系统化训练时代的到来。",
    textEn: "In 1979, 19-year-old Tony Yaniro climbed Grand Illusion at Sugarloaf, California (5.13b, later French 8a) - the world's first route of the grade. His then-scandalous tactics of hangdogging to inspect holds and building a replica crack to train at home anticipated the era of systematic, route-specific preparation.",
    highlight: true
  },
  {
    year: "1980",
    era: "sport",
    titleZh: "运动攀诞生：Verdon 与 Buoux",
    titleEn: "Sport Climbing is Born: Verdon and Buoux",
    textZh: "1980年代初，法国 Verdon 峡谷与 Buoux 岩场成为新运动的实验室：攀登者自上而下沿最直、最难的岩面线路预置膨胀螺栓，纯粹以自由攀登挑战极限难度。Patrick Edlinger 以优雅风格成为这项新运动的偶像，运动攀（sport climbing）一词由此进入主流。",
    textEn: "In the early 1980s France's Verdon Gorge and the crag of Buoux became the laboratory of a new sport: climbers rappelled in to pre-place expansion bolts along the steepest, most direct lines, then attacked them purely as free climbs. Patrick Edlinger became the movement's graceful icon, and the term sport climbing entered the mainstream.",
    highlight: true
  },
  {
    year: "1984-1987",
    era: "sport",
    titleZh: "Wolfgang Güllich 的难度三级跳",
    titleEn: "Wolfgang Güllich's Grade Leaps",
    textZh: "Wolfgang Güllich 以科学训练与绝对实力接连改写难度上限：1984年 Kanal im Ruecken 为世界首条 8b，1985年在澳大利亚完成首条 8b+ Punks in the Gym，1987年在弗兰肯侏罗山完成首条 8c Wallstreet。他还发明了指力板（campus board），把训练变成一门学问。",
    textEn: "With scientific training and supreme ability, Wolfgang Güllich repeatedly rewrote the upper limit: Kanal im Ruecken (1984) was the world's first 8b, Punks in the Gym in Australia (1985) the first 8b+, and Wallstreet in the Frankenjura (1987) the first 8c. He also invented the campus board, turning training into a discipline of its own."
  },
  {
    year: "1985",
    era: "sport",
    titleZh: "SportRoccia：首场国际攀岩比赛",
    titleEn: "SportRoccia: the First International Competition",
    textZh: "1985年夏，首届 SportRoccia 在意大利 Bardonecchia 的天然岩壁上举行，这是史上第一场正式国际攀岩赛事，Stefan Glowacz 与 Catherine Destivelle 分获男女冠军。次年赛事移师 Arco 吸引上万观众，法国 Vaulx-en-Velin 举办了首场室内赛，竞技攀岩由此起步。",
    textEn: "In summer 1985 the first SportRoccia was held on natural rock at Bardonecchia, Italy - history's first formal international climbing competition, won by Stefan Glowacz and Catherine Destivelle. The 1986 edition moved to Arco before crowds of over ten thousand, and Vaulx-en-Velin in France hosted the first indoor event; competition climbing had begun.",
    highlight: true
  },
  {
    year: "1988",
    era: "sport",
    titleZh: "Salathe Wall 自由首攀：大岩壁进入自由时代",
    titleEn: "Salathe Wall Freed: Big Walls Enter the Free Era",
    textZh: "1988年，Todd Skinner 与 Paul Piana 历时30余天攻坚，完成酋长岩 Salathe Wall 的全程自由攀登（约 5.13b），把红点伦理带上900米级大岩壁。这次攀登证明大岩壁可以不依赖器械攀登，直接启发了后来 Lynn Hill 与 Dawn Wall 的壮举。",
    textEn: "In 1988 Todd Skinner and Paul Piana, after more than 30 days of siege tactics, freed the entire Salathe Wall on El Capitan at about 5.13b, carrying redpoint ethics onto a 900-meter big wall. The ascent proved big walls could go free and directly inspired Lynn Hill's Nose and, later, the Dawn Wall."
  },
  {
    year: "1989",
    era: "sport",
    titleZh: "首届攀岩世界杯",
    titleEn: "The First Climbing World Cup",
    textZh: "1988年 UIAA 正式承认竞技攀岩，1989年5月首届世界杯系列赛在英国利兹举行，设难度与速度两个项目，Jerry Moffatt 赢得揭幕战。1990年起国际赛事统一在人工岩壁上举办，室内竞技体系与岩馆产业开始同步扩张。",
    textEn: "The UIAA formally recognized competition climbing in 1988, and in May 1989 the first World Cup series opened in Leeds, England, with lead and speed disciplines; Jerry Moffatt won the inaugural event. From 1990 international events moved exclusively to artificial walls, and indoor competition structures grew in step with the climbing gym industry."
  },
  {
    year: "1990-1991",
    era: "modern",
    titleZh: "Hubble 与 Action Directe：首条 8c+ 与 9a",
    titleEn: "Hubble and Action Directe: First 8c+ and 9a",
    textZh: "1990年，Ben Moon 在英国 Raven Tor 完成 Hubble，成为世界首条 8c+；次年 Wolfgang Güllich 在弗兰肯侏罗山完成 Action Directe——一条仅十余米、以单指洞点和极限动态著称的线路，成为世界首条公认的 9a，至今仍是衡量顶尖攀登者的试金石。",
    textEn: "In 1990 Ben Moon climbed Hubble at Raven Tor in England, the world's first 8c+. The following year Wolfgang Güllich completed Action Directe in the Frankenjura - barely a dozen meters of one-finger pockets and explosive dynos - the world's first consensus 9a, still the litmus test for elite sport climbers.",
    highlight: true
  },
  {
    year: "1991",
    era: "modern",
    titleZh: "V 级系统：抱石有了自己的标尺",
    titleEn: "The V-Scale Gives Bouldering Its Own Ruler",
    textZh: "1991年，John \"Vermin\" Sherman 在其 Hueco Tanks 抱石指南中发表 Vermin 分级系统（V0 起开放向上）。凭借这座德州沙漠岩场数千条经典线路的影响力，V 级迅速成为英语世界抱石难度的通用标准，与法国枫丹白露的 Font 体系并立至今。",
    textEn: "In 1991 John \"Vermin\" Sherman published the V-scale (open-ended from V0) in his guide to the bouldering of Hueco Tanks. Carried by the influence of that Texas desert venue and its thousands of classic problems, the V-scale quickly became the standard for bouldering difficulty in the English-speaking world, standing alongside Fontainebleau's Font grades."
  },
  {
    year: "1993",
    era: "modern",
    titleZh: "Lynn Hill 自由首攀 The Nose",
    titleEn: "Lynn Hill Frees The Nose",
    textZh: "1993年，Lynn Hill 与 Brooke Sandahl 搭档，完成 The Nose 的全程自由攀登（最难段 5.13c），次年她又用不到24小时单人自由完攀，并留下名言 \"It goes, boys!\"。这是大岩壁自由攀登的里程碑，也永远改写了攀岩界的性别想象。",
    textEn: "In 1993 Lynn Hill, partnered by Brooke Sandahl, made the first free ascent of The Nose (crux 5.13c); a year later she freed it in under 24 hours, leaving the famous sign-off \"It goes, boys!\" It was a landmark of big wall free climbing and permanently redrew assumptions about gender in the sport.",
    highlight: true
  },
  {
    year: "2001",
    era: "modern",
    titleZh: "Realization：首条 9a+ 与 Sharma 时代",
    titleEn: "Realization: the First 9a+ and the Sharma Era",
    textZh: "2001年，20岁的 Chris Sharma 在法国 Ceuse 完成 Biographie（后称 Realization），成为世界首条公认的 9a+。此后十余年 Sharma 以 Jumbo Love（2008，首条公认 9b）等线路持续领跑世界难度榜，并凭 Mandala 等抱石经典推动抱石走向主流。",
    textEn: "In 2001, 20-year-old Chris Sharma climbed Biographie (later called Realization) at Ceuse, France - the world's first consensus 9a+. For the next decade and more he led the world standard with routes like Jumbo Love (2008, the first consensus 9b), while boulder classics such as The Mandala helped push bouldering into the mainstream.",
    highlight: true
  },
  {
    year: "2007",
    era: "modern",
    titleZh: "国际攀岩联合会（IFSC）成立",
    titleEn: "Founding of the IFSC",
    textZh: "2006年国际登山联合会（UIAA）同意竞技攀岩脱离单飞，2007年国际攀岩联合会（IFSC）正式成立，独立管理难度、抱石与速度三大项目的国际赛事。统一而专业的治理体系为攀岩最终进入奥运会铺平了道路。",
    textEn: "After the UIAA agreed in 2006 to let competition climbing go its own way, the International Federation of Sport Climbing (IFSC) was founded in 2007, independently governing lead, boulder and speed competition. Unified, professional governance paved the road that would eventually lead climbing to the Olympic Games."
  },
  {
    year: "2012",
    era: "olympic",
    titleZh: "Adam Ondra 攀上首条 9b+",
    titleEn: "Adam Ondra Climbs the First 9b+",
    textZh: "2012年10月，捷克天才 Adam Ondra 在挪威 Flatanger 洞穴完成 Change，成为世界首条 9b+。这位1993年出生的攀登者此前已横扫各难度纪录，此后又以首次公开视频定级、一天内连攀多条高难线路等方式，把人类极限系统性向前推进。",
    textEn: "In October 2012 Czech prodigy Adam Ondra climbed Change in Norway's Flatanger cave, the world's first 9b+. Born in 1993, Ondra had already swept the record books, and he kept systematically advancing the human limit - first ascent videos, multiple extreme routes in a day, and ever-harder projects."
  },
  {
    year: "2015",
    era: "olympic",
    titleZh: "Dawn Wall 自由首攀",
    titleEn: "First Free Ascent of the Dawn Wall",
    textZh: "2015年1月，Tommy Caldwell 与 Kevin Jorgeson 经过19天连续攻坚，完成酋长岩 Dawn Wall 的全程自由攀登（难点 5.14d），Caldwell 为此筹备七年。事件登上全球主流媒体头条，被普遍认为是有史以来最难的大岩壁自由攀登。",
    textEn: "In January 2015, Tommy Caldwell and Kevin Jorgeson topped out the Dawn Wall on El Capitan after 19 continuous days on the wall (crux 5.14d), capping Caldwell's seven-year project. The ascent made front-page news worldwide and is widely considered the hardest big wall free climb ever done.",
    highlight: true
  },
  {
    year: "2017",
    era: "olympic",
    titleZh: "Alex Honnold 自由独攀酋长岩",
    titleEn: "Alex Honnold Free Solos El Capitan",
    textZh: "2017年6月3日，Alex Honnold 无绳无保护独攀酋长岩 Freerider 线路（约900米，难点 5.13a），用时3小时56分。这次被称为攀岩史上最伟大壮举的攀登经纪录片《Free Solo》（2018，奥斯卡最佳纪录长片）传播，让攀岩一举进入全球大众视野。",
    textEn: "On June 3, 2017, Alex Honnold climbed El Capitan's Freerider (about 900 meters, crux 5.13a) without rope or protection in 3 hours 56 minutes. Widely called the greatest feat in climbing history, it reached a global audience through the Oscar-winning documentary Free Solo (2018) and carried the sport into mainstream culture.",
    highlight: true
  },
  {
    year: "2017",
    era: "olympic",
    titleZh: "Silence：世界首条 9c",
    titleEn: "Silence: the World's First 9c",
    textZh: "2017年9月3日，Adam Ondra 在挪威 Flatanger 完成 Silence，给出世界首个 9c 定级，至今无人重复。线路核心是一段极难抱石序列，Ondra 为此专项训练数年，并首次为9c定级。攀岩难度天花板至此推入全新量级。",
    textEn: "On September 3, 2017, Adam Ondra completed Silence in Flatanger, Norway, proposing the world's first 9c; it remains unrepeated. The crux is an extreme boulder sequence for which Ondra trained specifically for years. The ceiling of climbing difficulty had entered a new magnitude.",
    highlight: true
  },
  {
    year: "2018",
    era: "olympic",
    titleZh: "The Nose 速攀纪录突破两小时",
    titleEn: "The Nose Speed Record Breaks Two Hours",
    textZh: "2018年6月，Alex Honnold 与 Tommy Caldwell 搭档，以1小时58分07秒完成 The Nose 速攀，首次突破两小时大关。这条线路的速攀竞争可追溯至1975年，从近两天缩短到不足两小时，直观展现了半个世纪间技术与体能的飞跃。",
    textEn: "In June 2018 Alex Honnold and Tommy Caldwell teamed up to climb The Nose in 1:58:07, the first sub-two-hour ascent. Speed attempts on the route date back to 1975; the drop from nearly two days to under two hours vividly shows half a century of progress in technique and fitness."
  },
  {
    year: "2021",
    era: "olympic",
    titleZh: "攀岩首登奥运舞台：东京2020",
    titleEn: "Climbing's Olympic Debut at Tokyo 2020",
    textZh: "攀岩于2016年获国际奥委会批准入奥，因疫情延期后于2021年8月在东京完成奥运首秀，设男、女全能（速度、抱石、难度三项合一）两枚金牌。西班牙 Alberto Gines Lopez 与斯洛文尼亚 Janja Garnbret 分获史上首枚男女攀岩奥运金牌。",
    textEn: "Approved by the IOC in 2016 and delayed a year by the pandemic, sport climbing made its Olympic debut in August 2021 in Tokyo, with a combined format of speed, boulder and lead for men and women. Alberto Gines Lopez of Spain and Janja Garnbret of Slovenia took the first Olympic gold medals in climbing history.",
    highlight: true
  },
  {
    year: "2024",
    era: "olympic",
    titleZh: "巴黎奥运会：四个小项的新格局",
    titleEn: "Paris 2024: A New Four-Medal Format",
    textZh: "2024年巴黎奥运会，攀岩扩为四个小项：速度单独设项，抱石与难度合并为全能。Janja Garnbret 成功卫冕女子全能，英国 Toby Roberts 获男子全能金牌；速度赛场波兰 Aleksandra Miroslaw 破世界纪录夺冠，印度尼西亚 Veddriq Leonardo 摘得男子金牌。",
    textEn: "At Paris 2024 climbing expanded to four medal events: speed stood alone, while boulder and lead formed a combined event. Janja Garnbret defended her title, Toby Roberts of Great Britain won the men's combined gold, and in speed Poland's Aleksandra Miroslaw won with a world record while Indonesia's Veddriq Leonardo took the men's title."
  }
];

export interface Pioneer {
  name: string; // English name
  nameZh?: string; // common Chinese translation, if any
  era: string; // active decades
  bioZh: string; // 60-100 Chinese characters
  bioEn: string;
  achievement: string; // bilingual, separated by " / "
}

export const pioneers: Pioneer[] = [
  {
    name: "W.P. Haskett Smith",
    nameZh: "哈斯克特·史密斯",
    era: "1880s-1910s",
    bioZh: "英国登山家、律师，被誉为英国攀岩之父。1886年独攀湖区 Napes Needle 岩柱，被视为攀岩脱离登山成为独立运动的标志性事件，此后长期活跃于湖区岩壁。",
    bioEn: "English mountaineer and barrister, often called the father of British rock climbing. His 1886 solo of Napes Needle in the Lake District is taken as the moment climbing became a sport of its own, and he remained active on Lakeland crags for decades.",
    achievement: "First ascent of Napes Needle (1886) / Napes Needle 首攀（1886）"
  },
  {
    name: "Paul Preuss",
    nameZh: "保罗·普罗伊斯",
    era: "1900s-1913",
    bioZh: "奥地利攀登者与伦理思想家，主张仅凭身体能力自由攀登、拒绝以岩钉借力，并认为能上也应能下。他在多洛米蒂完成大量超前独攀，1913年坠亡，年仅27岁。",
    bioEn: "Austrian climber and ethical thinker who preached free climbing by ability alone, refusing aid from pitons and holding that one should climb down what one climbs up. He soloed far ahead of his time in the Dolomites and died in a fall in 1913, aged 27.",
    achievement: "Foundational free climbing ethics / 自由攀登伦理的奠基"
  },
  {
    name: "Oliver Perry-Smith",
    nameZh: "奥利弗·佩里-史密斯",
    era: "1900s-1910s",
    bioZh: "移居德国的美国攀登者，易北砂岩山区最杰出的先锋。他在砂岩塔林开辟了大量无金属支点的自由线路，以大胆领攀著称，塑造了萨克森独特的攀登传统与伦理。",
    bioEn: "American-born climber who settled in Germany and became the leading pioneer of the Elbsandstein towers. He opened numerous free routes without metal aids, famed for bold leads, and shaped Saxon Switzerland's distinctive climbing tradition and ethics.",
    achievement: "Pioneering Elbsandstein tower routes / 易北砂岩塔林先锋线路"
  },
  {
    name: "Emilio Comici",
    nameZh: "埃米利奥·科米奇",
    era: "1920s-1940",
    bioZh: "意大利攀登者，多洛米蒂直登时代的代表人物。1933年首攀 Cima Grande 西北壁，将难度推至 VI 级，以优雅与艺术化的攀登风格著称，1940年因事故早逝。",
    bioEn: "Italian climber and emblem of the Dolomites' direttissima era. His 1933 first ascent of the northwest face of Cima Grande pushed standards to grade VI; celebrated for an elegant, almost artistic style, he died in an accident in 1940.",
    achievement: "First ascent of Cima Grande NW face (1933) / Cima Grande 西北壁首攀（1933）"
  },
  {
    name: "John Gill",
    nameZh: "约翰·吉尔",
    era: "1950s-1970s",
    bioZh: "美国数学家、体操运动员出身的攀登者，现代抱石之父。他引入镁粉与动态发力，把抱石提升为独立学科，1961年独攀 The Thimble 等线路超前时代数十年。",
    bioEn: "American mathematician and former gymnast, the father of modern bouldering. He introduced chalk and dynamic movement, elevated bouldering into a discipline of its own, and his 1961 solo of The Thimble and similar feats were decades ahead of their time.",
    achievement: "Founded bouldering as a discipline; The Thimble solo (1961) / 创立抱石学科；The Thimble 独攀（1961）"
  },
  {
    name: "Warren Harding",
    nameZh: "沃伦·哈丁",
    era: "1950s-1970s",
    bioZh: "美国大岩壁攀登先驱，以强悍坚韧和不羁个性著称。1958年率队首攀酋长岩 The Nose，历时47个攀爬日，1970年又首攀 Wall of the Early Morning Light，其大量使用螺栓的做法引发持久争论。",
    bioEn: "American big wall pioneer known for brute perseverance and a maverick personality. He led the 1958 first ascent of The Nose over 47 days of climbing and the 1970 Wall of the Early Morning Light, whose heavy bolting provoked lasting controversy.",
    achievement: "First ascent of The Nose, El Capitan (1958) / 酋长岩 The Nose 首攀（1958）"
  },
  {
    name: "Royal Robbins",
    nameZh: "罗亚尔·罗宾斯",
    era: "1950s-1970s",
    bioZh: "美国攀登者，优胜美地黄金年代的精神领袖。首攀 Salathe Wall、完成酋长岩首次单人攀登（Muir Wall），并以1967年无岩钉攀登 Nutcracker 开创清洁攀登先河，著有多部经典教材。",
    bioEn: "American climber and moral leader of Yosemite's golden age. He made the first ascent of the Salathe Wall, the first solo ascent of El Capitan (Muir Wall), and pioneered clean climbing with the all-nut ascent of the Nutcracker in 1967, alongside writing classic instructional books.",
    achievement: "First ascent of the Salathe Wall (1961); clean climbing pioneer / Salathe Wall 首攀（1961）；清洁攀登先驱"
  },
  {
    name: "Yvon Chouinard",
    nameZh: "伊冯·乔伊纳德",
    era: "1950s-1980s",
    bioZh: "美国铁匠出身的攀登者与装备革新者，Chouinard Equipment 与 Patagonia 创始人。他改良岩钉、发明六角塞与岩塞体系，1972年发表清洁攀登宣言，深刻改变了攀登伦理与装备工业。",
    bioEn: "American blacksmith-turned-climber and gear innovator, founder of Chouinard Equipment and Patagonia. He refined pitons, invented hexentrics and modern nut systems, and his 1972 clean climbing manifesto transformed both climbing ethics and the equipment industry.",
    achievement: "Clean climbing manifesto and modern protection gear (1972) / 清洁攀登宣言与现代保护器材（1972）"
  },
  {
    name: "Henry Barber",
    nameZh: "亨利·巴伯",
    era: "1970s",
    bioZh: "美国攀登者，绰号 Hot Henry，1970年代自由攀登革命的旗手。他周游全球以 onsight 风格首攀高难度传统线路，大力倡导不使用岩钉的轻简伦理，把自由攀登理念传播到欧洲与澳大利亚。",
    bioEn: "American climber nicknamed Hot Henry, a standard-bearer of the 1970s free climbing revolution. He traveled the world making onsight first ascents of hard traditional routes, championed piton-free clean ethics, and carried free climbing ideals to Europe and Australia.",
    achievement: "Global standard-setting free ascents in the 1970s / 1970年代全球范围的高难度自由首攀"
  },
  {
    name: "John Bachar",
    nameZh: "约翰·巴查",
    era: "1970s-2000s",
    bioZh: "美国攀登者，以超强指力与无保护独攀闻名。他在约书亚树与优胜美地完成大量高难线路与自由独攀，发明训练器械 Bachar Ladder，是自由独攀美学的化身，2009年坠亡。",
    bioEn: "American climber famed for extraordinary finger strength and ropeless soloing. He made hard first ascents and free solos in Joshua Tree and Yosemite, invented the Bachar Ladder training device, and embodied the free solo aesthetic; he died in a fall in 2009.",
    achievement: "Pioneering free solos and training methods / 自由独攀与训练方法先驱"
  },
  {
    name: "Kurt Albert",
    nameZh: "库尔特·阿尔伯特",
    era: "1970s-2000s",
    bioZh: "德国攀登者，红点（Rotpunkt）理念的发明者。1975年起他在弗兰肯侏罗山给自由完成的线路画红点，确立了先练习后无借力完攀的模式，为运动攀的伦理与规则奠基，2010年因事故去世。",
    bioEn: "German climber and inventor of the redpoint. From 1975 he painted red dots on Frankenjura routes he had climbed free, formalizing the practice-then-send model that became the ethical foundation of sport climbing; he died after an accident in 2010.",
    achievement: "Invented the redpoint concept (Rotpunkt) / 发明红点（Rotpunkt）理念"
  },
  {
    name: "Wolfgang Güllich",
    nameZh: "沃尔夫冈·古利希",
    era: "1980s-1992",
    bioZh: "德国攀登者，1980年代世界难度纪录的绝对统治者，接连完成首条 8b、8b+、8c 与 9a。他发明指力板、以科学方法训练，1991年完成 Action Directe 成为时代丰碑，1992年因车祸去世。",
    bioEn: "German climber who dominated world standards in the 1980s with the first 8b, 8b+, 8c and 9a. He invented the campus board and trained scientifically; his 1991 Action Directe remains a monument of the era. He died in a car accident in 1992.",
    achievement: "First 9a: Action Directe (1991) / 世界首条 9a：Action Directe（1991）"
  },
  {
    name: "Patrick Edlinger",
    nameZh: "帕特里克·埃德兰热",
    era: "1980s-1990s",
    bioZh: "法国攀登者，运动攀诞生时期的标志性人物。他在 Buoux 与 Verdon 的高难 onsight 和流畅优雅的风格，经攀岩电影传播使这项运动风靡法国，2012年去世。",
    bioEn: "French climber and the iconic figure of sport climbing's birth. His hard onsights at Buoux and Verdon and his fluid, graceful style, popularized through climbing films, made the sport a phenomenon in France; he died in 2012.",
    achievement: "Icon of Verdon and Buoux sport climbing / Verdon 与 Buoux 运动攀时代偶像"
  },
  {
    name: "Lynn Hill",
    nameZh: "林恩·希尔",
    era: "1980s-2000s",
    bioZh: "美国攀登者，史上最具影响力的攀岩者之一。1993年完成 The Nose 首次全程自由攀登，次年又在24小时内自由完攀；她也是世界杯早期冠军与传统攀登高难纪录保持者。",
    bioEn: "American climber, among the most influential in the sport's history. She made the first free ascent of The Nose in 1993 and freed it in under 24 hours the following year; she was also an early World Cup champion and set hard traditional climbing benchmarks.",
    achievement: "First free ascent of The Nose (1993) / The Nose 首次自由攀登（1993）"
  },
  {
    name: "Chris Sharma",
    nameZh: "克里斯·夏尔马",
    era: "1990s-2010s",
    bioZh: "美国攀登者，2000年代世界难度领军人物。2001年完成首条 9a+ Realization，2008年完成首条公认 9b Jumbo Love，在抱石、深水抱石领域同样开创经典，长期定义世界最高水平。",
    bioEn: "American climber who led world standards through the 2000s. He climbed the first 9a+, Realization, in 2001 and the first consensus 9b, Jumbo Love, in 2008, while also establishing classics in bouldering and deep-water soloing, defining the elite level for years.",
    achievement: "First 9a+: Realization (2001) / 世界首条 9a+：Realization（2001）"
  },
  {
    name: "Adam Ondra",
    nameZh: "亚当·翁德拉",
    era: "2000s-2020s",
    bioZh: "捷克攀登者，被广泛视为史上最强的攀岩者。他完成首条 9b+ Change 与首条 9c Silence，多次同一天连攀世界最难线路，并将奥运竞技与野外攀登同时推向顶峰。",
    bioEn: "Czech climber, widely regarded as the strongest rock climber in history. He established the first 9b+, Change, and the first 9c, Silence, climbed multiple world-class routes in single days, and pushed Olympic competition and outdoor climbing to their peaks simultaneously.",
    achievement: "First 9b+ Change (2012) and first 9c Silence (2017) / 首条 9b+ Change（2012）与首条 9c Silence（2017）"
  },
  {
    name: "Tommy Caldwell",
    nameZh: "汤米·考德威尔",
    era: "2000s-2010s",
    bioZh: "美国大岩壁攀登者，酋长岩自由攀登的集大成者。2015年与 Kevin Jorgeson 完成 Dawn Wall 自由首攀，并与 Honnold 搭档保持 The Nose 两小时内的速攀纪录。",
    bioEn: "American big wall climber who brought free climbing on El Capitan to its fullest expression. He completed the first free ascent of the Dawn Wall with Kevin Jorgeson in 2015 and, partnered with Alex Honnold, holds the sub-two-hour speed record on The Nose.",
    achievement: "First free ascent of the Dawn Wall (2015) / Dawn Wall 自由首攀（2015）"
  },
  {
    name: "Alex Honnold",
    nameZh: "亚历克斯·霍诺德",
    era: "2000s-2020s",
    bioZh: "美国攀登者，以无保护自由独攀闻名于世。2017年无绳独攀酋长岩 Freerider 线路，被公认为攀岩史上最伟大的壮举，经奥斯卡获奖纪录片《Free Solo》成为全球文化符号。",
    bioEn: "American climber famous for ropeless free soloing. His 2017 rope-free solo of El Capitan's Freerider is regarded as the greatest feat in climbing history and, through the Oscar-winning film Free Solo, became a global cultural touchstone.",
    achievement: "Free solo of El Capitan, Freerider (2017) / 自由独攀酋长岩 Freerider（2017）"
  }
];

export interface EraIntro {
  era: TimelineEvent['era'];
  labelZh: string;
  labelEn: string;
  summaryZh: string;
  summaryEn: string;
}

export const eraIntros: EraIntro[] = [
  {
    era: "origins",
    labelZh: "起源：从登山到攀岩",
    labelEn: "Origins: From Mountaineering to Rock Climbing",
    summaryZh: "19世纪后期，攀岩从阿尔卑斯登山中分化出来：1886年 Napes Needle 的首攀宣告它成为独立运动。英国湖区、德国易北砂岩与多洛米蒂各自孕育出独特的攀登传统，Paul Preuss 等人的自由攀登思想为整个20世纪定下伦理基调。",
    summaryEn: "In the late 19th century climbing split away from alpinism: the 1886 ascent of Napes Needle announced it as a sport of its own. The English Lake District, Germany's Elbsandstein and the Dolomites each nurtured distinct traditions, and the free climbing philosophy of figures like Paul Preuss set the ethical tone for the century to come."
  },
  {
    era: "golden",
    labelZh: "大岩壁黄金年代",
    labelEn: "The Big Wall Golden Age",
    summaryZh: "1930至60年代，岩钉、铁锁与尼龙绳的普及让更陡更高的岩壁变得可攀，美国优胜美地成为世界的中心。Harding 与 Robbins 两种风格的交锋定义了大岩壁攀登，John Gill 则悄悄把抱石培养成一门独立学科，清洁攀登的理念在此期末尾萌芽。",
    summaryEn: "From the 1930s to the 1960s, pitons, karabiners and nylon made steeper, bigger walls climbable, and Yosemite became the world center. The clash of Harding's and Robbins' styles defined big wall climbing, John Gill quietly raised bouldering into a discipline, and the seeds of clean climbing were sown at the era's end."
  },
  {
    era: "free-revolution",
    labelZh: "自由攀登革命",
    labelEn: "The Free Climbing Revolution",
    summaryZh: "1970年代，攀登者拒绝在装备上借力，把不悬吊、一气呵成的自由攀登推为最高标准。清洁攀登成为主流伦理，镁粉之争、红点理念与 5.13 的突破接连发生，系统化训练初露端倪，运动攀的一切要素在此齐备。",
    summaryEn: "In the 1970s climbers refused to weight their gear and elevated free climbing - no hanging, one clean push - as the highest standard. Clean climbing became mainstream ethics; the chalk debate, the redpoint concept and the first 5.13s arrived in quick succession, systematic training emerged, and every ingredient of sport climbing fell into place."
  },
  {
    era: "sport",
    labelZh: "运动攀诞生",
    labelEn: "The Birth of Sport Climbing",
    summaryZh: "1980年代，法国 Verdon 与 Buoux 的预置螺栓岩壁催生了运动攀：纯粹以难度为目标、以红点为规则。Gullich 把世界纪录从 8b 推到 8c，首场国际比赛与世界杯相继诞生，攀岩第一次成为有观众、有赛历的竞技运动。",
    summaryEn: "In the 1980s the pre-bolted walls of Verdon and Buoux gave birth to sport climbing: pure difficulty as the goal, the redpoint as the rule. Gullich drove the world record from 8b to 8c, the first international competitions and World Cups appeared, and climbing became for the first time a spectator sport with a competitive calendar."
  },
  {
    era: "modern",
    labelZh: "难度爆炸与全球化",
    labelEn: "Exploding Grades and Globalization",
    summaryZh: "1990至2000年代，难度纪录以十年两级的速度爆炸：首条 9a、9a+ 与 9b 相继问世。Lynn Hill 自由首攀 The Nose 改写大岩壁历史，V 级系统与岩馆产业推动抱石大众化，IFSC 的成立则为攀岩职业化与入奥搭建好制度框架。",
    summaryEn: "Through the 1990s and 2000s grades exploded by roughly two levels a decade: the first 9a, 9a+ and 9b all appeared. Lynn Hill's free ascent of The Nose rewrote big wall history, the V-scale and the gym industry popularized bouldering, and the founding of the IFSC built the institutional frame for professionalism and the Olympics."
  },
  {
    era: "olympic",
    labelZh: "奥运时代",
    labelEn: "The Olympic Era",
    summaryZh: "2010年代以来，攀岩同时向两个方向抵达巅峰：野外，Dawn Wall、Honnold 的自由独攀与 9c 的 Silence 不断刷新人类极限；赛场，IFSC 体系下的竞技攀岩于2021年登上东京奥运舞台，并在2024年巴黎扩为四个小项，攀岩真正成为全球性大众运动。",
    summaryEn: "Since the 2010s climbing has reached twin summits. Outdoors, the Dawn Wall, Honnold's free solo and the 9c of Silence kept resetting the human limit; in the arena, IFSC-governed competition climbing reached the Tokyo Olympics in 2021 and expanded to four medal events at Paris 2024, making climbing a truly global mainstream sport."
  }
];
