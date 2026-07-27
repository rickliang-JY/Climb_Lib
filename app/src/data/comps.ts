// ============================================================================
// comps.ts - Competition & Competitive Climbing structured data
// Bilingual (zh/en) content for the climbing encyclopedia site.
// Facts verified against IFSC / Olympics.com sources, current as of mid-2026.
// ============================================================================

export interface CompFormat {
  id: string;
  nameEn: string;
  nameZh: string;
  rulesZh: string;
  rulesEn: string;
  scoringZh: string;
  scoringEn: string;
  timeLimit: string;
}

export const compFormats: CompFormat[] = [
  {
    id: "boulder",
    nameEn: "Boulder",
    nameZh: "抱石赛",
    rulesZh:
      "运动员在约 4.5 米高的岩壁上攀爬若干条短线路（决赛通常为 4 条，2025 赛季起部分赛事为 5 条），不使用绳索，下方有保护垫。每条线路运动员可多次尝试。比赛前选手被隔离在隔离区（isolation zone），不得提前观看线路或与他人交流；轮到上场前有短暂的集体观察时间（observation time，世界杯决赛通常为每条 2 分钟），随后在限定时间内完成攀爬。",
    rulesEn:
      "Athletes climb a set of short problems (usually 4 in finals, up to 5 in some 2025-season events) on walls around 4.5 m high, without ropes and over padded mats, with unlimited attempts allowed. Competitors wait in an isolation zone before climbing and may not see the problems or communicate with anyone who has; a short collective observation time (typically 2 minutes per problem in World Cup finals) is given before each athlete's climbing window.",
    scoringZh:
      "现行计分制（2025 年起）：每条线路完攀（top）得 25 分，到达中间得分点（zone）得 10 分，每多一次尝试扣 0.1 分。单条线路最高 25 分，名次按总分排序。此前（2024 年及更早）抱石以 top=5分、zone=1分等方案计分，更早的年代则直接比较完攀数、zone 数与尝试次数。",
    scoringEn:
      "Current scoring (from 2025): 25 points for a top, 10 points for reaching the zone hold, with 0.1 deducted per additional attempt; maximum 25 points per problem, ranked on total score. Earlier systems (up to 2024) used schemes such as 5 points per top and 1 per zone, and older eras simply compared the number of tops, zones, and attempts.",
    timeLimit: "决赛每条线路 4 分钟（世界杯）；观察时间每条约 2 分钟 | 4 min per problem in World Cup finals; ~2 min observation per problem",
  },
  {
    id: "lead",
    nameEn: "Lead",
    nameZh: "难度赛",
    rulesZh:
      "运动员系安全带、先锋攀（边爬边挂快挂）一条约 15 米高的大仰角线路，目标是在时间用尽前爬得尽可能高，全程仅有一次尝试机会。赛前运动员在隔离区等待，上场前集体观察线路（通常 6 分钟）。若脱落即计为本次尝试结束，按到达位置计分。",
    rulesEn:
      "Athletes rope up and lead-climb (clipping quickdraws as they go) a single ~15 m overhanging route, aiming to get as high as possible before time runs out, with only one attempt. Competitors wait in isolation and receive a collective observation period (usually 6 minutes) before climbing. A fall ends the attempt, and the reached position determines the score.",
    scoringZh:
      "现行计分制：按通过的手点（hold）计分，线路从底部到顶部分段赋分（通常顶部 40 个点各计 1 分并附更高权重区段，满分 100 分，含 top 奖励），成绩常记为如 43+ 的形式（+ 表示在该点有向上的有效动作）。与抱石合并的两项全能中，难度满分 100 分与抱石满分 100 分相加排名。",
    scoringEn:
      "Current scoring: points are awarded per hold reached, with the route divided into weighted sections (top section holds worth more, up to a 100-point maximum including a top bonus); results are written like 43+, where + indicates positive movement beyond that hold. In the Boulder & Lead combined event, the 100-point Lead score is added to the 100-point Boulder score for the final ranking.",
    timeLimit: "6 分钟（攀爬）+ 约 6 分钟观察时间 | 6 min climbing + ~6 min observation",
  },
  {
    id: "speed",
    nameEn: "Speed",
    nameZh: "速度赛",
    rulesZh:
      "两名运动员并排竞速，攀爬全球统一的 15 米高、5 度仰角标准速度道（支点位置自 2007 年起标准化），由自动保护器（auto belay）保护。分为排位赛（取最快成绩定种子）与单败淘汰赛（两两对决）。抢跑（false start，反应时小于 0.1 秒）即判负；以拍击顶端计时器的时间定胜负。",
    rulesEn:
      "Two athletes race side by side up a globally standardized 15 m wall with a 5-degree overhang (hold positions standardized since 2007), protected by auto belays. The format has a seeding round (fastest time ranks athletes) followed by head-to-head elimination heats. A false start (reaction time under 0.1 s) loses the race; the winner is decided by who slaps the top timing pad first.",
    scoringZh:
      "纯粹以时间排名。由于赛道全球统一，任何一场合规赛事都能刷新世界纪录。男子世界纪录为赵一程（中国）2026 年 5 月 10 日在吴江世界杯创造的 4.54 秒；女子世界纪录为 Aleksandra Miroslaw（波兰）2025 年 9 月 24 日在首尔世锦赛创造的 6.03 秒。",
    scoringEn:
      "Ranked purely on time. Because the route is identical worldwide, any sanctioned event can produce a world record. The men's record is 4.54 s by Zhao Yicheng (CHN) at the Wujiang World Cup on 10 May 2026; the women's record is 6.03 s by Aleksandra Miroslaw (POL) at the Seoul World Championships on 24 September 2025.",
    timeLimit: "无时间上限，世界纪录级成绩在 5 秒内完成 | No time cap; record-level runs finish in under 5 s",
  },
  {
    id: "combined",
    nameEn: "Boulder & Lead Combined (Olympic format)",
    nameZh: "两项全能（奥运赛制）",
    rulesZh:
      "巴黎 2024 奥运采用的赛制：运动员先后进行抱石（4 条线路）与难度（1 条线路）两项比赛。2021 东京奥运则采用更具争议的三项合一赛制——抱石、难度、速度全部参加，以三项名次相乘（乘积越小越好）决出冠军，因迫使专项选手跨项比赛而广受批评。",
    rulesEn:
      "The format used at Paris 2024: athletes contest Boulder (4 problems) then Lead (1 route). Tokyo 2020 used the more controversial tri-discipline combined format in which athletes had to compete in Boulder, Lead AND Speed, with final rankings decided by multiplying the three discipline placements (lowest product wins) - widely criticised for forcing specialists to compete outside their discipline.",
    scoringZh:
      "两项得分相加（各满分 100 分，总计 200 分）排定名次：抱石每条 top=25 分、zone=5 分（巴黎 2024 规则，按尝试扣分），难度按到达点最高 100 分。东京 2020 则为三项名次相乘。",
    scoringEn:
      "Scores from the two disciplines are added (100 points each, 200 maximum): at Paris 2024 Boulder gave 25 points per top and 5 per zone (with attempt deductions), and Lead gave up to 100 points by holds reached. Tokyo 2020 multiplied placements across the three disciplines instead.",
    timeLimit: "抱石每条 5 分钟（奥运赛制）；难度 6 分钟 | 5 min per boulder (Olympic format); 6 min for lead",
  },
];

// ---------------------------------------------------------------------------

export interface CompEvent {
  year: string;
  nameZh: string;
  nameEn: string;
  textZh: string;
  textEn: string;
}

export const olympicTimeline: CompEvent[] = [
  {
    year: "2016",
    nameZh: "国际奥委会宣布攀岩入奥",
    nameEn: "IOC announces sport climbing for Tokyo 2020",
    textZh:
      "2016 年 8 月，国际奥委会在奥林匹克 2020 议程框架下批准竞技攀岩成为 2020 东京奥运会新增项目，攀岩首次进入奥运大家庭。",
    textEn:
      "In August 2016, the IOC approved sport climbing as an additional event for the Tokyo 2020 Games under the Olympic Agenda 2020 framework - climbing's first entry into the Olympic programme.",
  },
  {
    year: "2018",
    nameZh: "布宜诺斯艾利斯青奥会首秀",
    nameEn: "Youth Olympic debut in Buenos Aires",
    textZh:
      "攀岩在 2018 年布宜诺斯艾利斯青年奥运会上率先亮相，采用三项合一赛制，为两年后的东京奥运试水。",
    textEn:
      "Climbing made its Olympic-family debut at the 2018 Buenos Aires Youth Olympic Games using a combined format, a dress rehearsal for Tokyo two years later.",
  },
  {
    year: "2021",
    nameZh: "东京奥运：三项合一首秀",
    nameEn: "Tokyo 2020: the combined debut",
    textZh:
      "因名额限制只设一枚金牌，抱石、难度、速度三项合一，以名次相乘计总分。男子组 Alberto Gines Lopez（西班牙）爆冷夺冠，Nathaniel Coleman（美国）与 Jakob Schubert（奥地利）分列二三；女子组 Janja Garnbret（斯洛文尼亚）夺冠，野中生萌与野口启代（日本）获银铜。赛制因迫使速度选手与技术型选手互相跨项而备受争议。",
    textEn:
      "Quota limits meant a single medal event combining Boulder, Lead and Speed, ranked by multiplied placements. Alberto Gines Lopez (ESP) took a surprise men's gold ahead of Nathaniel Coleman (USA) and Jakob Schubert (AUT); Janja Garnbret (SLO) won the women's event ahead of Miho Nonaka and Akiyo Noguchi (JPN). The format was widely criticised for forcing speed specialists and technical climbers into each other's disciplines.",
  },
  {
    year: "2024",
    nameZh: "巴黎奥运：速度独立设项",
    nameEn: "Paris 2024: Speed goes standalone",
    textZh:
      "金牌数翻倍至两枚：速度赛首次独立设项，抱石与难度合并为两项全能（得分相加，满分 200）。男子速度 Veddriq Leonardo（印尼）夺冠，Sam Watson（美国）在铜牌战中跑出 4.74 秒世界纪录；女子速度 Aleksandra Miroslaw（波兰）夺冠并以 6.06 秒刷新世界纪录。两项全能：男子 Toby Roberts（英国）力压 Sorato Anraku（日本）夺冠；女子 Janja Garnbret 卫冕成功，Brooke Raboutou（美国）获银。",
    textEn:
      "The medal count doubled: Speed became a standalone event while Boulder and Lead formed a 200-point combined event. Veddriq Leonardo (INA) won men's Speed while Sam Watson (USA) set a 4.74 s world record in the bronze race; Aleksandra Miroslaw (POL) won women's Speed and lowered her world record to 6.06 s. In Boulder & Lead, Toby Roberts (GBR) edged Sorato Anraku (JPN) for men's gold, and Janja Garnbret defended her title ahead of Brooke Raboutou (USA).",
  },
  {
    year: "2028",
    nameZh: "洛杉矶奥运：三项独立设项",
    nameEn: "LA 2028: three standalone disciplines",
    textZh:
      "国际奥委会于 2025 年 4 月确认：洛杉矶 2028 将首次为抱石、难度、速度分别设立独立金牌（男女共 6 项），运动员配额增至 76 人；攀岩同时首次成为奥运常设项目（而非特邀项目），残疾人攀岩也将同年完成残奥首秀。三项全能时代正式落幕。",
    textEn:
      "Confirmed by the IOC in April 2025: LA 2028 will award separate medals for Boulder, Lead and Speed (six events across genders) for the first time, with the athlete quota raised to 76. Sport climbing also becomes a permanent programme sport rather than an invited one, and paraclimbing makes its Paralympic debut at the same Games. The combined era is officially over.",
  },
];

// ---------------------------------------------------------------------------

export interface Athlete {
  name: string;
  country: string;
  countryZh: string;
  discipline: string;
  bioZh: string;
  bioEn: string;
  achievements: string[];
}

export const athletes: Athlete[] = [
  {
    name: "Janja Garnbret",
    country: "Slovenia",
    countryZh: "斯洛文尼亚",
    discipline: "Boulder / Lead",
    bioZh:
      "史上成就最高的竞技攀岩运动员，女子抱石与难度的绝对统治者。两届奥运冠军，世锦赛与世界杯总冠军拿到手软，同时在野外完成多条 8c+ 及以上难度线路，是竞技与野外双栖的标杆。",
    bioEn:
      "The most decorated competition climber in history and the dominant force in women's Boulder and Lead. A two-time Olympic champion with a stack of World Championship and World Cup overall titles, she has also climbed 8c+ and harder outdoors - the benchmark for crossing between comp and rock.",
    achievements: [
      "Olympic gold Tokyo 2020 (combined) and Paris 2024 (Boulder & Lead)",
      "Multiple IFSC World Championship titles across Boulder and Lead",
      "First woman to win an overall World Cup title in both Boulder and Lead",
    ],
  },
  {
    name: "Adam Ondra",
    country: "Czech Republic",
    countryZh: "捷克",
    discipline: "Lead / Boulder",
    bioZh:
      "被广泛视为史上最强的攀岩者之一。年少成名，多次问鼎世锦赛与世界杯总冠军；野外成就同样前无古人——首攀世界第一条 9c 线路 Silence（2017），并完成 Dawn Wall 的第二次自由攀登。东京奥运获第六名。",
    bioEn:
      "Widely regarded as one of the strongest climbers ever. A prodigy who won multiple World Championship and World Cup overall titles; his outdoor resume is equally unmatched - the first ascent of Silence (9c, 2017), the world's hardest route, and the second free ascent of the Dawn Wall. Finished 6th at the Tokyo Olympics.",
    achievements: [
      "IFSC World Champion in Lead (2009, 2014) and Boulder (2014)",
      "Multiple World Cup overall titles in Lead and Boulder",
      "First ascent of Silence (9c), Flatanger, Norway, 2017",
    ],
  },
  {
    name: "Jakob Schubert",
    country: "Austria",
    countryZh: "奥地利",
    discipline: "Lead / Boulder",
    bioZh:
      "奥地利难度赛常青树，职业生涯横跨十余年始终保持顶尖水准，东京与巴黎两届奥运均摘得铜牌，2023 年伯尔尼世锦赛两项全能夺冠锁定巴黎门票。野外完成 9c 级线路 B.I.G. 的首攀。",
    bioEn:
      "Austria's evergreen lead specialist, elite across more than a decade, with Olympic bronze at both Tokyo and Paris and the 2023 Bern World Championship combined title that sealed his Paris ticket. Outdoors he made the first ascent of B.I.G. (9c).",
    achievements: [
      "Olympic bronze Tokyo 2020 and Paris 2024",
      "IFSC World Champion (Lead) 2018 and combined World Champion Bern 2023",
      "First ascent of B.I.G. (9c), Flatanger, 2023",
    ],
  },
  {
    name: "Toby Roberts",
    country: "Great Britain",
    countryZh: "英国",
    discipline: "Boulder / Lead",
    bioZh:
      "英国新生代领军人物。2024 年巴黎奥运两项全能决赛中以稳定的抱石发挥和难度决赛的出色表现逆转夺冠，成为英国历史上首位奥运攀岩冠军。",
    bioEn:
      "The leader of Britain's new generation. At Paris 2024 he combined steady bouldering with a superb lead final to win the Boulder & Lead gold, becoming Great Britain's first Olympic climbing champion.",
    achievements: [
      "Olympic champion Paris 2024 (Boulder & Lead)",
      "Multiple IFSC World Cup wins in Lead and Boulder",
    ],
  },
  {
    name: "Sorato Anraku",
    country: "Japan",
    countryZh: "日本",
    discipline: "Boulder / Lead",
    bioZh:
      "日本天才少年，16 岁即横扫 2023 赛季抱石与难度世界杯年度总冠军。巴黎奥运两项全能摘银，是洛杉矶周期公认的最大夺冠热门之一。",
    bioEn:
      "A Japanese prodigy who swept the 2023 Boulder and Lead World Cup overall titles at just 16. Silver medallist in Boulder & Lead at Paris 2024, and widely considered a favourite for LA 2028.",
    achievements: [
      "Olympic silver Paris 2024 (Boulder & Lead)",
      "2023 IFSC World Cup overall champion in both Boulder and Lead, aged 16",
    ],
  },
  {
    name: "Veddriq Leonardo",
    country: "Indonesia",
    countryZh: "印度尼西亚",
    discipline: "Speed",
    bioZh:
      "印尼速度赛旗帜人物，史上第一个爬进 5 秒大关的选手（2023 年首尔世界杯 4.90 秒）。巴黎奥运男子速度决赛战胜中国选手伍鹏夺金，为印尼赢得羽毛球之外的首枚奥运金牌。",
    bioEn:
      "The flag-bearer of Indonesian speed climbing and the first human under 5 seconds (4.90 s, Seoul World Cup 2023). He beat Wu Peng of China in the Paris 2024 final to claim Indonesia's first Olympic gold outside badminton.",
    achievements: [
      "Olympic champion Paris 2024 (Speed)",
      "First climber to break the 5-second barrier (4.90 s, 2023)",
      "Multiple IFSC Speed World Cup titles",
    ],
  },
  {
    name: "Aleksandra Miroslaw",
    country: "Poland",
    countryZh: "波兰",
    discipline: "Speed",
    bioZh:
      "女子速度赛史上最伟大的选手，十余次刷新世界纪录。巴黎奥运以 6.06 秒世界纪录夺金，2025 年首尔世锦赛决赛再将纪录提升至 6.03 秒并拿下个人第三个世锦赛冠军，距离破 6 仅一步之遥。",
    bioEn:
      "The greatest women's speed climber ever, having lowered the world record more than ten times. Olympic champion at Paris 2024 with a 6.06 s world record, she pushed it to 6.03 s in the Seoul 2025 World Championship final to claim her third world title - within touching distance of the sub-6 barrier.",
    achievements: [
      "Olympic champion Paris 2024 (Speed), world record 6.06 s",
      "Three-time IFSC Speed World Champion (2018, 2019, 2025)",
      "Current world record holder: 6.03 s (Seoul, 24 Sep 2025)",
    ],
  },
  {
    name: "Natalia Grossman",
    country: "United States",
    countryZh: "美国",
    discipline: "Boulder / Lead",
    bioZh:
      "美国抱石名将，2021 年横空出世后连续多年统治世界杯抱石赛场，多次获得抱石年度总冠军。巴黎奥运两项全能决赛中以第 9 名完赛。",
    bioEn:
      "America's bouldering star, dominant on the World Cup circuit since her 2021 breakthrough with multiple overall Boulder titles. Finished 9th in the Boulder & Lead final at Paris 2024.",
    achievements: [
      "Multiple IFSC Boulder World Cup overall titles (2021-2023 era)",
      "2024 IFSC Boulder World Champion qualification-series standout",
      "Paris 2024 Olympic finalist",
    ],
  },
  {
    name: "Brooke Raboutou",
    country: "United States",
    countryZh: "美国",
    discipline: "Boulder / Lead",
    bioZh:
      "出身攀岩世家（父母均为世界冠军级选手）。东京奥运决赛第五，巴黎奥运两项全能摘银；2023 年成为首位野外完攀 9b+ 的女性之一，竞技与野外双线俱佳。",
    bioEn:
      "Climbing royalty - both parents were world-class competitors. Fifth in the Tokyo final, she won Boulder & Lead silver at Paris 2024, and in 2023 became one of the first women to climb 9b+ outdoors, excelling in both arenas.",
    achievements: [
      "Olympic silver Paris 2024 (Boulder & Lead)",
      "5th place Tokyo 2020 Olympic final",
      "Among the first women to climb 9b+ outdoors",
    ],
  },
  {
    name: "Oriane Bertone",
    country: "France",
    countryZh: "法国",
    discipline: "Boulder",
    bioZh:
      "法国抱石新星，青少年时期即被寄予厚望。2024 年起在世界杯抱石赛场屡登领奖台，2025 赛季夺得世界杯抱石年度总冠军，是法国在洛杉矶周期的冲金希望。",
    bioEn:
      "France's bouldering prodigy, hyped since her early teens. A regular World Cup podium finisher from 2024, she took the 2025 Boulder World Cup overall title and is France's gold-medal hope for the LA cycle.",
    achievements: [
      "2025 IFSC Boulder World Cup overall champion",
      "Multiple IFSC Boulder World Cup victories",
    ],
  },
  {
    name: "Tomoa Narasaki",
    country: "Japan",
    countryZh: "日本",
    discipline: "Boulder / Lead",
    bioZh:
      "日本抱石风格的代表人物，以爆发力和动态动作革新了竞技抱石美学。2016 与 2019 年世锦赛抱石冠军，东京奥运第四。巴黎奥运半决赛爆冷出局，但仍是世界杯赛场的常胜选手。",
    bioEn:
      "The defining figure of the Japanese bouldering style, who reshaped competition bouldering aesthetics with explosive, dynamic movement. World Boulder champion in 2016 and 2019, 4th at Tokyo 2020. Shock semi-final exit at Paris 2024, but remains a serial World Cup winner.",
    achievements: [
      "IFSC Boulder World Champion 2016 and 2019",
      "4th place Tokyo 2020 Olympics",
      "Multiple World Cup overall titles in Boulder",
    ],
  },
  {
    name: "Lynn Hill",
    country: "United States",
    countryZh: "美国",
    discipline: "Lead (comp) / Big wall",
    bioZh:
      "横跨竞技与野外两个时代的传奇。1980 年代末世界杯难度赛多次夺冠（含 1990 年年度总冠军），退役后转向大岩壁，1993 年完成酋长岩 The Nose 的首次自由攀登，一句话载入史册：It goes, boys.",
    bioEn:
      "A legend who straddled the comp and outdoor eras. Multiple Lead World Cup wins in the late 1980s (including the 1990 overall title), she then moved to big walls and made the first free ascent of The Nose on El Capitan in 1993 - It goes, boys.",
    achievements: [
      "IFSC Lead World Cup overall champion 1990, multiple World Cup wins",
      "First free ascent of The Nose, El Capitan (1993)",
      "First one-day free ascent of The Nose (1994)",
    ],
  },
  {
    name: "Francois Legrand",
    country: "France",
    countryZh: "法国",
    discipline: "Lead",
    bioZh:
      "1990 年代难度赛的王者，连续三届世界杯难度年度总冠军（1990-1992），四届 Rock Master 冠军，定义了现代竞技难度赛的训练与攀爬方式。",
    bioEn:
      "The king of 1990s lead climbing: three consecutive World Cup overall titles (1990-1992) and four Rock Master victories, defining how modern competition lead climbing is trained and climbed.",
    achievements: [
      "IFSC Lead World Cup overall champion 1990, 1991, 1992",
      "Four-time Rock Master winner",
    ],
  },
  {
    name: "Yuji Hirayama",
    country: "Japan",
    countryZh: "日本",
    discipline: "Lead",
    bioZh:
      "亚洲竞技攀岩的先驱。1998 与 2000 年两夺世界杯难度年度总冠军，是首位站上世界之巅的亚洲选手；野外完成多条 9a+ 级线路，退役后长期推动日本攀岩体系建设，影响了整整一代日本选手。",
    bioEn:
      "The pioneer of Asian competition climbing. World Cup Lead overall champion in 1998 and 2000 - the first Asian climber to reach the top of the sport - with multiple 9a+ ascents outdoors. After retiring he shaped Japan's climbing system and influenced a whole generation.",
    achievements: [
      "IFSC Lead World Cup overall champion 1998 and 2000",
      "First Asian World Cup overall champion",
      "Multiple 9a+ first ascents outdoors",
    ],
  },
  {
    name: "Sam Watson",
    country: "United States",
    countryZh: "美国",
    discipline: "Speed",
    bioZh:
      "美国速度天才，曾六次刷新世界纪录（4.90 秒一路压到 4.64 秒）。巴黎奥运铜牌战跑出 4.74 秒世界纪录摘铜，2025 年巴厘岛世界杯再将纪录提升至 4.64 秒，直到 2026 年被赵一程打破。",
    bioEn:
      "America's speed prodigy, who broke the world record six times on his way from 4.90 s down to 4.64 s. He set a 4.74 s record in the Paris 2024 bronze race, lowered it to 4.64 s at the Bali 2025 World Cup, and held the mark until Zhao Yicheng took it in 2026.",
    achievements: [
      "Olympic bronze Paris 2024 (Speed), world record 4.74 s in bronze race",
      "Former world record holder: 4.64 s (Bali World Cup, 3 May 2025)",
      "Youngest climber to win a World Cup event (age 16)",
    ],
  },
  {
    name: "Zhao Yicheng",
    country: "China",
    countryZh: "中国",
    discipline: "Speed",
    bioZh:
      "中国速度赛超新星，2009 年生于苏州。2026 年 4 月在三亚亚沙会成年组首秀即以 4.58 秒打破世界纪录，5 月吴江世界杯半决赛再提升到 4.54 秒并夺冠，成为史上最年轻的速度攀岩世界纪录保持者。",
    bioEn:
      "China's speed-climbing supernova, born in Suzhou in 2009. On his senior debut at the April 2026 Asian Beach Games in Sanya he broke the world record with 4.58 s, then improved it to 4.54 s in the Wujiang World Cup semi-final in May 2026 to win gold - the youngest speed world record holder in history.",
    achievements: [
      "Current world record holder: 4.54 s (Wujiang World Cup, 10 May 2026)",
      "First climber under 4.60 seconds",
      "Multiple IFSC World Youth Championship speed titles (U16, U17)",
    ],
  },
];

// ---------------------------------------------------------------------------

export interface CompTerm {
  term: string;
  zh: string;
  defZh: string;
  defEn: string;
}

export const compTerms: CompTerm[] = [
  {
    term: "Isolation zone",
    zh: "隔离区",
    defZh:
      "赛前运动员集中等候的封闭区域，禁止携带通讯设备、禁止观看已赛选手攀爬或与外界交流，确保每位选手对线路信息完全对等。",
    defEn:
      "A sealed waiting area where athletes stay before climbing. No phones, no watching earlier competitors, no outside contact - guaranteeing everyone faces the route with equal information.",
  },
  {
    term: "Observation time",
    zh: "观察时间",
    defZh:
      "运动员离开隔离区后、正式攀爬前的集体看线时间：抱石通常每条 2 分钟，难度约 6 分钟。选手用这段时间预判动作序列（读线），但不得上墙触碰支点。",
    defEn:
      "The collective route-reading window after leaving isolation and before climbing: usually 2 minutes per boulder problem and about 6 minutes for lead. Athletes plan their sequences but may not touch the wall.",
  },
  {
    term: "Flash attempt",
    zh: "首攀即完成（Flash）",
    defZh:
      "第一次尝试就完攀线路。抱石赛中 flash 意味着最少的尝试次数，在旧计分制下是打破平局的利器；难度赛中一次尝试即是全部，不存在第二次机会。",
    defEn:
      "Completing a problem on the first attempt. In bouldering a flash means the minimum attempt count - a tie-break weapon under older scoring; in lead, the single attempt is all you get.",
  },
  {
    term: "Top / Zone",
    zh: "完攀点 / 得分区",
    defZh:
      "抱石线路的两个关键支点：zone 是线路中部的得分点，top 是终点双手控制即算完攀。现行计分制 top=25 分、zone=10 分，并按尝试次数每次扣 0.1 分。",
    defEn:
      "The two scoring holds on a boulder problem: the zone is a mid-route scoring hold, the top is the finish hold that must be controlled with both hands. Current scoring: top = 25 points, zone = 10, minus 0.1 per additional attempt.",
  },
  {
    term: "Plus/minus scoring",
    zh: "加减计分制的演进",
    defZh:
      "难度赛成绩长期以 到达点+有效动作 表示，如 43+ 表示控制住第 43 点并有向上动作。计分规则历经多次演进：从单纯比较到达高度，到 2025 年起的分段加权百分制（低段 10 分、中段 20 分、高段 30 分、顶段 40 分），让每一分差距都更精细。抱石也从比较 top/zone 数量演变为 25/10 分按尝试扣分制。",
    defEn:
      "Lead results have long been written as hold number plus movement, e.g. 43+ means holding the 43rd hold with upward progress. Scoring has evolved repeatedly: from simply comparing height reached, to the weighted 100-point system from 2025 (sections worth 10/20/30/40 points), making every gap finer. Bouldering likewise moved from counting tops and zones to the 25/10 system with attempt deductions.",
  },
  {
    term: "Countback",
    zh: "追溯（平局判定）",
    defZh:
      "总分相同时回看上一轮次（半决赛、资格赛）成绩判定名次；再相同则比较尝试次数等细分数据。是攀岩排名中最常见的平局裁决方式。",
    defEn:
      "When scores tie, the result from the previous round (semi-final, then qualification) decides the ranking; if still tied, finer data such as attempts are compared. The most common tie-break mechanism in climbing.",
  },
  {
    term: "False start",
    zh: "抢跑",
    defZh:
      "速度赛中反应时间小于 0.1 秒即判定抢跑，直接输掉该轮对决。起跑反应由电子起跑器测定，是速度赛最具戏剧性的判罚。",
    defEn:
      "In speed climbing, a reaction time under 0.1 s is a false start and immediately loses the heat. Reaction is measured electronically at the start pad - the most dramatic call in the discipline.",
  },
  {
    term: "Auto belay",
    zh: "自动保护器",
    defZh:
      "速度赛顶部的自动收绳保护装置，运动员冲线后由其匀速放下。两赛道各配一台，确保竞速双方保护条件完全一致，成绩可比。",
    defEn:
      "The automatic rope-take-up device at the top of the speed wall that lowers athletes at a controlled rate. One per lane guarantees identical belay conditions for both racers, keeping times comparable.",
  },
  {
    term: "Combined format",
    zh: "全能赛制",
    defZh:
      "多个分项合并决定一枚金牌的赛制。东京 2020 为三项名次相乘，巴黎 2024 为抱石与难度得分相加（各 100 分）；洛杉矶 2028 起取消，三大项各自独立设金。",
    defEn:
      "A format where multiple disciplines decide one medal. Tokyo 2020 multiplied placements across three disciplines; Paris 2024 added Boulder and Lead scores (100 each). From LA 2028 it is gone - all three disciplines award standalone medals.",
  },
  {
    term: "World record route (Speed)",
    zh: "标准速度道",
    defZh:
      "全球统一的 15 米、5 度仰角速度赛道，支点形状与位置自 2007 年起固定，此后又在 2011 年确立现行标准路线。正因如此，任何一场 IFSC 认证赛事的成绩都可直接比较并刷新世界纪录。",
    defEn:
      "The globally standardized 15 m, 5-degree-overhanging speed wall whose hold shapes and positions have been fixed since 2007, with the current route established in 2011. This uniformity lets times from any IFSC-sanctioned event be compared and ratified as world records.",
  },
];

// ---------------------------------------------------------------------------
// Speed world records (IFSC-ratified, verified mid-2026)

export const speedRecords: {
  gender: string;
  athlete: string;
  country: string;
  time: string;
  date: string;
}[] = [
  {
    gender: "Men",
    athlete: "Zhao Yicheng",
    country: "China",
    time: "4.54 s",
    date: "2026-05-10, IFSC World Cup Wujiang (semi-final)",
  },
  {
    gender: "Women",
    athlete: "Aleksandra Miroslaw",
    country: "Poland",
    time: "6.03 s",
    date: "2025-09-24, IFSC World Championships Seoul (final)",
  },
];
