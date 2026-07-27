// Climbing holds content data: hold type library + interactive wall scene.
// All positions: wall is the XY plane, x in [-1.75, 1.75], y in [0.3, 4.4], z = 0.
// ASCII quotes only, valid TypeScript.

export interface HoldType {
  id: string;
  nameEn: string;
  nameZh: string;
  category: 'positive' | 'neutral' | 'negative' | 'foot' | 'feature';
  descZh: string;
  descEn: string;
  techniqueZh: string; // 使用手法 50-100字
  techniqueEn: string;
  grip: 'open-hand' | 'crimp' | 'pinch' | 'pocket' | 'friction' | 'foot';
  geometry: {
    primitive: 'sphere' | 'box' | 'cylinder' | 'torus' | 'composite';
    params: Record<string, number>; // e.g. { radius: 0.5, tube: 0.15, scaleY: 0.4 }
    deform: string;                 // deformation recipe for 3D developers
  };
  color: string;                    // hex, low-saturation resin / PU tones
  texture: 'smooth' | 'sandstone' | 'granite' | 'resin';
  sizeHint: number;                 // 0.1-1.0 relative size
}

export const holdTypes: HoldType[] = [
  {
    id: 'jug',
    nameEn: 'Jug',
    nameZh: '大把手',
    category: 'positive',
    descZh: '大而深的正手抓握点，整只手可以勾住，是最省力、最适合新手的岩点。',
    descEn: 'A large, deep, positive hold the whole hand can wrap around. The most restful and beginner-friendly hold type.',
    techniqueZh: '四指并拢勾住上沿，拇指可扣在侧面辅助锁定，手臂尽量伸直承重，让身体贴近岩壁。大把手适合休息调整呼吸，也可作为动态动作的落点，抓住后迅速稳定重心再继续移动。',
    techniqueEn: 'Wrap all four fingers over the lip with the thumb locking alongside, keep arms straight and weight on the skeleton. Jugs are rest spots and safe targets for dynamic moves; stabilize your core before moving on.',
    grip: 'open-hand',
    geometry: {
      primitive: 'sphere',
      params: { radius: 0.5, widthSegments: 32, heightSegments: 24, scaleX: 1.0, scaleY: 0.55, scaleZ: 0.5, scoopRadius: 0.32, scoopDepth: 0.2 },
      deform: 'Flatten a sphere (scaleY 0.55, scaleZ 0.5), then boolean-subtract a smaller sphere (scoopRadius) from the lower-front quadrant to carve the finger bucket. Slightly rotate the scoop 15 degrees upward so the lip overhangs and reads as incut.'
    },
    color: '#8FA3A0',
    texture: 'resin',
    sizeHint: 0.8
  },
  {
    id: 'crimp',
    nameEn: 'Crimp',
    nameZh: '小扣点',
    category: 'positive',
    descZh: '只能容纳一到两节手指的小棱边，是指力训练的核心点型，对手指肌腱负荷极大。',
    descEn: 'A small edge holding only one or two finger pads. The core hold for finger strength; loads the tendons heavily.',
    techniqueZh: '用指尖第一指节扣住棱边，采用半扣（half crimp）姿势，拇指叠压食指可切换为全扣以增力。保持手腕抬高、肘部下沉，重心贴近墙面，避免突然发力冲击，防止屈肌腱和滑车受伤。',
    techniqueEn: 'Grip the edge with the first finger pads in a half-crimp; overlay the thumb on the index for a full crimp when more force is needed. Keep the wrist high, elbow low, hips to the wall, and avoid shock-loading to protect pulleys and flexor tendons.',
    grip: 'crimp',
    geometry: {
      primitive: 'box',
      params: { width: 0.4, height: 0.09, depth: 0.12, bevel: 0.02, lipOverhang: 0.015, scaleTopY: 0.6 },
      deform: 'Start from a thin box, taper the top edge inward (scaleTopY on the upper vertex row) to form a shallow incut lip, then round all edges with a small bevel. The usable surface is the top 2-3 cm strip.'
    },
    color: '#A3927C',
    texture: 'sandstone',
    sizeHint: 0.25
  },
  {
    id: 'sloper',
    nameEn: 'Sloper',
    nameZh: '圆包点',
    category: 'negative',
    descZh: '没有棱边的圆弧面点，只能靠手掌摩擦力与开放手抓握，极考验身体位置与重心控制。',
    descEn: 'A rounded, edgeless hold usable only through friction and an open hand. Demands precise body position and tension.',
    techniqueZh: '五指张开用整个掌面贴住点的最顶部，采用开放手姿势，手臂完全伸直把重量挂在骨架上。关键是让身体重心保持在点的正下方，脚要踩高并信任摩擦，任何外拉都会立刻滑脱。',
    techniqueEn: 'Open-hand the very top with the full palm, arm straight so weight hangs on the skeleton. Keep your center of gravity directly below the hold, feet high, and trust the friction; any outward pull peels you off instantly.',
    grip: 'friction',
    geometry: {
      primitive: 'sphere',
      params: { radius: 0.42, widthSegments: 32, heightSegments: 24, scaleX: 1.0, scaleY: 0.5, scaleZ: 0.6, noiseAmp: 0.02, noiseFreq: 3.0 },
      deform: 'Squash a sphere into a low dome (scaleY 0.5), flatten the back pole so it sits flush on the wall, and add low-amplitude vertex noise for a subtle resin unevenness. No lip or edge anywhere; the silhouette must stay convex.'
    },
    color: '#B0A18E',
    texture: 'resin',
    sizeHint: 0.75
  },
  {
    id: 'pocket',
    nameEn: 'Pocket',
    nameZh: '指洞',
    category: 'neutral',
    descZh: '带有一到三个指洞的岩点，通常只能插入两到三根手指，力量集中但稳定性好。',
    descEn: 'A hold with one to three finger holes, usually taking two or three fingers. Focused load but very stable once seated.',
    techniqueZh: '选择最强的中指与无名指插入洞中，指腹贴住洞的上沿内壁，其余手指收起。插入深度以第二指节为宜，上拉时保持手腕中立，出洞换点前先让对侧脚承重，避免手指被洞口别住扭伤。',
    techniqueEn: 'Slot the strongest middle and ring fingers, pads against the upper inner lip, other fingers tucked. Insert to the second knuckle, keep the wrist neutral while pulling, and load the opposite foot before exiting so fingers do not jam and twist.',
    grip: 'pocket',
    geometry: {
      primitive: 'sphere',
      params: { radius: 0.4, scaleY: 0.55, scaleZ: 0.55, holeRadius: 0.075, holeDepth: 0.16, holeCount: 2, holeSpacing: 0.11 },
      deform: 'Flatten a sphere, then boolean-subtract 2-3 short cylinders (holeRadius, holeDepth, spaced holeSpacing apart) perpendicular to the wall face. Chamfer each hole rim so the openings read as worn pockets rather than drilled holes.'
    },
    color: '#96897A',
    texture: 'sandstone',
    sizeHint: 0.55
  },
  {
    id: 'mono',
    nameEn: 'Mono',
    nameZh: '单指洞',
    category: 'negative',
    descZh: '仅能容纳一根手指的小洞，是极限指力点型，常见于高难度线路与指力板训练。',
    descEn: 'A hole taking a single finger. An extreme finger-strength hold seen on hard routes and campus-style training.',
    techniqueZh: '用中指或食指单指插入，指腹顶住洞的上沿，另一手指叠压辅助锁定。发力前确保肩部收紧、核心绷住，动作必须缓慢可控，切勿动态冲击，否则极易造成屈肌腱撕裂，新手应避免使用。',
    techniqueEn: 'Insert one finger (middle or index), pad against the upper lip, and stack the other finger on top to lock. Engage the shoulder and core first, pull slowly and statically; never shock-load a mono, and beginners should avoid it entirely.',
    grip: 'pocket',
    geometry: {
      primitive: 'cylinder',
      params: { radiusTop: 0.14, radiusBottom: 0.17, height: 0.1, radialSegments: 24, holeRadius: 0.05, holeDepth: 0.09, scaleZ: 0.7 },
      deform: 'Take a short tapered cylinder flush to the wall, squash its depth (scaleZ 0.7), then boolean-subtract a single small cylinder dead-center to form the one-finger hole. Round the rim with a fillet of about 0.01.'
    },
    color: '#8C7B6B',
    texture: 'resin',
    sizeHint: 0.3
  },
  {
    id: 'pinch',
    nameEn: 'Pinch',
    nameZh: '捏点',
    category: 'neutral',
    descZh: '需要用拇指与其余四指从两侧对捏的岩点，宽度决定难度，是捏力训练的主要点型。',
    descEn: 'A hold squeezed between thumb on one side and fingers on the other. Width sets the difficulty; the main pinch-strength trainer.',
    techniqueZh: '四指放在点的一侧、拇指在另一侧，对向用力夹住，力量来自拇指根部的鱼际肌群。尽量让捏点贴近身体正前方，利用身体摆动穿过捏点而不是纯靠手臂硬捏，窄捏点可用指尖半扣辅助。',
    techniqueEn: 'Fingers on one face, thumb opposed on the other, squeezing from the thenar muscles at the thumb base. Keep the pinch in front of your chest and move through it with momentum rather than raw squeeze; on narrow pinches add a half-crimp on top.',
    grip: 'pinch',
    geometry: {
      primitive: 'composite',
      params: { lobeRadius: 0.22, lobeScaleY: 1.2, lobeScaleZ: 0.7, gap: 0.1, lobeOffsetX: 0.16, spineWidth: 0.12 },
      deform: 'Mirror two vertical lobes (squashed spheres, lobeScaleY 1.2) across a thin central spine box; offset each lobe by lobeOffsetX so the gap between grip faces is the pinch width. Union the three parts and inflate the spine ends to blend.'
    },
    color: '#7A8B8C',
    texture: 'resin',
    sizeHint: 0.6
  },
  {
    id: 'undercling',
    nameEn: 'Undercling',
    nameZh: '反提点',
    category: 'negative',
    descZh: '开口朝下的岩点，掌心向上从下方勾提，必须依靠脚部压力与身体张力维持抓握。',
    descEn: 'A downward-facing hold gripped palm-up from below. Useless without high feet and full body tension.',
    techniqueZh: '掌心向上、手指勾住点的下沿，手臂下压形成张力。关键是把脚踩高，利用腿向上蹬的力量把身体压向岩壁，让反提点变成支点。换点前先移动脚，手保持勾住直到新点抓稳为止。',
    techniqueEn: 'Palm up, fingers hooked under the lip, arm pressing down to build tension. The secret is high feet: drive the legs upward so the body presses into the wall and the undercling becomes a pivot. Move feet before hands when releasing.',
    grip: 'open-hand',
    geometry: {
      primitive: 'torus',
      params: { radius: 0.28, tube: 0.09, tubularSegments: 32, radialSegments: 16, arc: 1.9, scaleZ: 0.8, tiltDeg: 100 },
      deform: 'Cut a torus to about 55 percent of its ring (arc 1.9 rad), squash the depth (scaleZ 0.8), and rotate it so the opening faces down and slightly toward the wall (tiltDeg ~100). Mount the flat cut ends into a thin backplate box.'
    },
    color: '#A79C8E',
    texture: 'resin',
    sizeHint: 0.6
  },
  {
    id: 'sidepull',
    nameEn: 'Sidepull',
    nameZh: '侧拉点',
    category: 'negative',
    descZh: '开口朝向侧面的岩点，需要横向发力拉动，常与对侧脚旗或对蹬动作配合使用。',
    descEn: 'A sideways-facing hold pulled horizontally, usually paired with a flag or opposition foot on the other side.',
    techniqueZh: '手指勾住点的侧沿，手臂像拉门把手一样横向发力。身体要向拉力的反方向偏移，配合对侧脚外踩或后旗形成力偶，让侧拉保持稳定。旋转岩点方向可将其变为反提或正手点，定线常借此调节难度。',
    techniqueEn: 'Hook the side edge and pull like a vertical door handle. Lean your body opposite to the pull and oppose it with an outside edge or flag, forming a force couple. Rotating the hold turns it into an undercling or jug, a classic routesetting dial.',
    grip: 'open-hand',
    geometry: {
      primitive: 'box',
      params: { width: 0.14, height: 0.34, depth: 0.16, bevel: 0.03, edgeInset: 0.04, bulgeX: 0.06 },
      deform: 'Start from a tall thin box standing on the wall, push its vertical centerline outward (bulgeX) to form one convex grip edge, carve a shallow inset channel along that edge for the fingers, then bevel everything. Default mount: long axis vertical.'
    },
    color: '#6E7F80',
    texture: 'resin',
    sizeHint: 0.5
  },
  {
    id: 'edge',
    nameEn: 'Edge / Rail',
    nameZh: '棱点',
    category: 'positive',
    descZh: '长条形带棱边的岩点，可用一到两手抓握，是最通用的中间深度点型。',
    descEn: 'An elongated positive edge taking one or two hands. The most general-purpose medium-depth hold.',
    techniqueZh: '四指并拢放在棱边上，拇指根据宽度选择搭扣或贴边，采用开放手或半扣姿势。长棱点可在移动中调整手的位置，两手共用一条棱点时注意给同伴或自己的另一只手留出空间，并沿棱边方向平移而非抽出。',
    techniqueEn: 'Four fingers along the rail, thumb wrapping or stacking by width, open-hand or half-crimp. Long rails let you walk the hand along mid-move; when sharing one rail, leave space for the second hand and slide along it instead of pulling off.',
    grip: 'open-hand',
    geometry: {
      primitive: 'box',
      params: { width: 0.55, height: 0.12, depth: 0.13, bevel: 0.025, incutDeg: 12, waveAmp: 0.01, waveFreq: 2.0 },
      deform: 'Take a long low box, tilt the top face inward by incutDeg to make the rail incut, add a gentle sinusoidal undulation along the length (waveAmp), and bevel the perimeter. Scale width 0.3-0.8 to generate a whole family of rails.'
    },
    color: '#7D8C98',
    texture: 'granite',
    sizeHint: 0.7
  },
  {
    id: 'volume',
    nameEn: 'Volume',
    nameZh: '大造型点',
    category: 'feature',
    descZh: '大型空心造型结构，可改变墙面角度，常作为支点、踩点或与其他岩点组合使用。',
    descEn: 'A large hollow feature that changes the wall angle itself, used as stance, foot, or a carrier for other holds.',
    techniqueZh: '大造型点通常以开放手掌压、推或整条小臂贴靠使用，当作脚点时用鞋底大面积贴合其斜面。站上造型点前先确认其表面纹理与摩擦，下坡面站法是把重心放低、膝盖内扣，利用角度把身体压在造型点上方。',
    techniqueEn: 'Volumes are palmed, pushed, or leaned on with open hands and forearms; as feet, smear the whole sole on their faces. Before standing up, read the surface friction; on sloping faces drop your hips, turn the knee in, and keep weight stacked over the feature.',
    grip: 'friction',
    geometry: {
      primitive: 'composite',
      params: { width: 0.9, height: 0.7, depth: 0.35, sides: 5, taperTop: 0.6, bevel: 0.04, faceTiltDeg: 18 },
      deform: 'Build a low-poly prism (5-6 sides) extruded from the wall, taper the outline toward the top (taperTop) so the front face is a climbable slab tilted at faceTiltDeg, and bevel all silhouette edges. Optional: union two prisms at an angle for a dihedral volume.'
    },
    color: '#8B8F94',
    texture: 'smooth',
    sizeHint: 1.0
  },
  {
    id: 'foothold',
    nameEn: 'Foothold',
    nameZh: '脚点',
    category: 'foot',
    descZh: '专为踩踏设计的中小型点，顶面较平或有微小棱边，要求脚尖精准放置。',
    descEn: 'A small to medium hold made for feet, with a flat top or micro edge, demanding precise toe placement.',
    techniqueZh: '用攀岩鞋脚尖内侧（大脚趾下方）踩住点的最上沿，而不是整个脚掌压上去。踩稳后脚跟可下沉增加摩擦（smear），换脚时保持另一只脚不动作支撑，视线先找好下一个脚点再移动。',
    techniqueEn: 'Step on the uppermost edge with the inside toe under the big toe, not the whole foot. Once placed, drop the heel for friction, keep the standing foot quiet during swaps, and spot the next foothold with your eyes before moving.',
    grip: 'foot',
    geometry: {
      primitive: 'sphere',
      params: { radius: 0.16, widthSegments: 24, heightSegments: 16, scaleY: 0.45, scaleZ: 0.5, flatTopDeg: 25 },
      deform: 'Flatten a small sphere (scaleY 0.45), then clip the top pole with a plane angled flatTopDeg to create a level stepping surface. Keep the front edge slightly rounded so a missed toe still slides on rather than snagging.'
    },
    color: '#9C8F7F',
    texture: 'resin',
    sizeHint: 0.35
  },
  {
    id: 'chip',
    nameEn: 'Chip',
    nameZh: '小脚点',
    category: 'foot',
    descZh: '极小的螺丝点级脚点，只能容纳鞋尖边缘，是平衡线与高难线路的常见配置。',
    descEn: 'A screw-on sized micro foothold taking only the shoe edge; standard on balance and hard routes.',
    techniqueZh: '只用鞋尖最前端一到两厘米的边缘踩住，身体重量必须完全垂直压在小脚点正上方，任何侧向力都会打滑。需要极强的脚踝刚性，配合手部点把重心拉住，眼睛盯住点直到踩实为止。',
    techniqueEn: 'Stand on the outermost 1-2 cm of shoe rubber with weight stacked perfectly vertical; any lateral load skates off. Ankle stiffness is everything, hands hold your center over the chip, and watch the placement until it is set.',
    grip: 'foot',
    geometry: {
      primitive: 'box',
      params: { width: 0.12, height: 0.05, depth: 0.07, bevel: 0.012, topInsetDeg: 8 },
      deform: 'A tiny box barely protruding from the wall. Bevel all edges aggressively (relative to size), tilt the top face in by topInsetDeg for a whisper of incut, and keep the back flat for flush screw-on mounting.'
    },
    color: '#B5A89B',
    texture: 'resin',
    sizeHint: 0.15
  },
  {
    id: 'hueco',
    nameEn: 'Hueco',
    nameZh: '大洞点',
    category: 'feature',
    descZh: '内部中空的大洞造型，整只手甚至前臂可以伸入，源自石灰岩溶蚀地貌的经典点型。',
    descEn: 'A hollow pocket big enough for a whole hand or forearm, echoing solution pockets of limestone.',
    techniqueZh: '整只手伸入洞内，手指展开勾住洞内的上沿或侧沿，也可用手掌顶住洞顶形成对撑。洞较深时可将前臂伸入做肘部锁定（arm bar）休息，注意出洞时旋转手腕避免被洞口卡住。',
    techniqueEn: 'Sink the whole hand and span fingers across the inner lip, or palm the roof in opposition. Deep huecos take a forearm for an arm-bar rest; rotate the wrist on the way out so the rim does not trap your hand.',
    grip: 'pocket',
    geometry: {
      primitive: 'sphere',
      params: { radius: 0.45, scaleY: 0.6, scaleZ: 0.5, mouthRadius: 0.2, mouthDepth: 0.3, rimBulge: 0.05, segments: 32 },
      deform: 'Flatten a sphere, boolean-subtract a large shallow cone or sphere (mouthRadius) from the front face to open the cavity, leaving walls at least 0.06 thick. Inflate the rim outward (rimBulge) so the lip is itself an incut edge around the hole.'
    },
    color: '#93877B',
    texture: 'sandstone',
    sizeHint: 0.85
  },
  {
    id: 'tufa',
    nameEn: 'Tufa',
    nameZh: '钟乳柱点',
    category: 'feature',
    descZh: '模仿石灰岩钟乳柱的竖长凸起，可用双手交替抓握或夹抱，考验手指跨度与捏抱结合的手法。',
    descEn: 'A vertical stalactite-like rib mimicking limestone tufas, climbed with wrap-around and pinch-grip alternation.',
    techniqueZh: '双手一上一下环抱钟乳柱两侧，手指扣住柱体后侧的棱，用拇指捏住前侧形成对锁。身体沿柱体一侧上升，脚配合踩柱体根部凸起，换手时交叉进行，利用柱体的扭角选择最顺手的一侧抓握。',
    techniqueEn: 'Wrap both hands around the rib, fingers hooked behind, thumbs pinching the front for a lock. Climb up one side of the column, feet on its base bumps, cross hands through, and exploit any twist in the column for the friendliest face.',
    grip: 'pinch',
    geometry: {
      primitive: 'cylinder',
      params: { radiusTop: 0.09, radiusBottom: 0.13, height: 0.7, radialSegments: 12, heightSegments: 8, noiseAmp: 0.03, twistDeg: 25, scaleZ: 0.6 },
      deform: 'Extrude a tapered cylinder, displace vertices with periodic noise along the height (noiseAmp) to form knuckly bulges, twist the column by twistDeg top to bottom, and flatten the back (scaleZ) so it hugs the wall. Run the long axis vertical.'
    },
    color: '#A8A29A',
    texture: 'sandstone',
    sizeHint: 0.9
  },
  {
    id: 'flake',
    nameEn: 'Flake',
    nameZh: '片点',
    category: 'positive',
    descZh: '与岩壁之间留有一道缝隙的薄片状岩点，手指可以插入片后勾拉，常见于裂缝风格线路。',
    descEn: 'A thin slab detached from the wall leaving a slot behind; fingers wrap behind it to pull, crack-climbing style.',
    techniqueZh: '手指插入片点与墙之间的缝隙，指腹顶住片点背面，拇指压在前侧形成捏拉。片点通常可以整段上手，双手交替沿缝隙上移，脚可踩片点突出的下沿，注意判断片点牢固程度再全力发力。',
    techniqueEn: 'Slide fingers into the slot behind the flake, pads on its back face, thumb pinching the front. You can often hand-over-hand up the whole feature, feet on its protruding lower lip; test how solid the flake feels before yarding on it.',
    grip: 'pinch',
    geometry: {
      primitive: 'box',
      params: { width: 0.18, height: 0.5, depth: 0.08, standoff: 0.06, curveAmp: 0.04, bevel: 0.02, taperBottom: 0.5 },
      deform: 'Bend a tall thin box slightly along its length (curveAmp), taper the bottom edge to a point (taperBottom) so it emerges from the wall, and mount the slab on a standoff of 0.06 via two small spacer boxes at top and bottom, leaving the slot open for fingers.'
    },
    color: '#7E7468',
    texture: 'granite',
    sizeHint: 0.65
  },
  {
    id: 'horn',
    nameEn: 'Horn',
    nameZh: '角点',
    category: 'positive',
    descZh: '从墙面伸出的角状或耳状凸起，可整手抓握或勾拉，常作为动态动作的目标点。',
    descEn: 'A horn or ear protruding from the wall, grabbable with the whole hand; a classic target for dynamic moves.',
    techniqueZh: '整只手像握门把一样从上方或侧方包住角点，手指绕到角点背面勾住。角点握持面积大且方向明确，适合作为摆荡或动态出手的目标，抓住瞬间立即收核心稳定身体，避免被惯性带离岩壁。',
    techniqueEn: 'Wrap the whole hand over or around the horn like a door knob, fingers curled behind it. The generous, directional grip makes horns ideal targets for swings and dynos; engage the core the instant you latch to kill the swing.',
    grip: 'open-hand',
    geometry: {
      primitive: 'torus',
      params: { radius: 0.16, tube: 0.055, tubularSegments: 24, radialSegments: 12, arc: 2.6, bendDeg: 20, scaleZ: 0.9 },
      deform: 'Sweep a torus segment of arc ~2.6 rad (three-quarter ring), then bend the free tip slightly upward (bendDeg) and taper the tube toward the tip for a horn profile. Sink the open end into the wall or a small base disk.'
    },
    color: '#C2B49A',
    texture: 'resin',
    sizeHint: 0.45
  }
];

export interface WallHold {
  id: number;
  position: [number, number, number];
  rotation: [number, number, number];
  holdTypeId: string;
  color: string;
  routeTag: string;
  size: number;
}

export interface WallRoute {
  id: string;
  nameEn: string;
  nameZh: string;
  grade: string;
  color: string;
  holdTypeIds: string[];
  descZh: string;
  descEn: string;
}

export const wallRoutes: WallRoute[] = [
  {
    id: 'route-v0',
    nameEn: 'Green Warmup',
    nameZh: '绿色热身线',
    grade: 'V0',
    color: '#7CB342',
    holdTypeIds: ['jug', 'edge', 'sloper', 'foothold', 'volume'],
    descZh: '全程大把手与大脚点的热身线路，动作直线向上，适合新手熟悉墙面与基本移动节奏。',
    descEn: 'A straight-up warmup of jugs and generous feet, perfect for learning the wall and basic movement rhythm.'
  },
  {
    id: 'route-v2',
    nameEn: 'Blue Circuit',
    nameZh: '蓝色进阶线',
    grade: 'V2',
    color: '#42A5F5',
    holdTypeIds: ['jug', 'edge', 'sloper', 'pinch', 'sidepull', 'foothold'],
    descZh: '混合棱点、圆包与捏点的进阶线，中段需要一次侧拉配合，开始考验身体位置。',
    descEn: 'A step-up line mixing rails, slopers and a pinch, with one sidepull sequence that starts to test body position.'
  },
  {
    id: 'route-v4',
    nameEn: 'Red Problem',
    nameZh: '红色技术线',
    grade: 'V4',
    color: '#EF5350',
    holdTypeIds: ['edge', 'crimp', 'pocket', 'pinch', 'sloper', 'undercling', 'foothold'],
    descZh: '以小扣点与指洞为主的技术线，关键动作是反提点上高脚后的锁定，需要良好的核心张力。',
    descEn: 'A technical line on crimps and pockets, cruxing on an undercling-to-high-foot lockoff that demands solid core tension.'
  },
  {
    id: 'route-v6',
    nameEn: 'Purple Project',
    nameZh: '紫色指力线',
    grade: 'V6',
    color: '#AB47BC',
    holdTypeIds: ['crimp', 'pinch', 'mono', 'sloper', 'pocket', 'edge', 'chip'],
    descZh: '右侧指力考验线，包含单指洞与小脚点，需要精确的身体张力与果断的小动态发力。',
    descEn: 'A finger-strength testpiece on the right, featuring a mono and chips; precise tension and one decisive pop are required.'
  },
  {
    id: 'route-v8',
    nameEn: 'Orange Limit',
    nameZh: '橙色极限线',
    grade: 'V8',
    color: '#FFA726',
    holdTypeIds: ['pinch', 'crimp', 'mono', 'sloper', 'hueco', 'chip'],
    descZh: '从左下横跨至右上的极限线，长距离移动连接薄弱圆包点，是整面墙的毕业考验。',
    descEn: 'The graduation test: a rising rightward traverse linking poor slopers and crimps across the full width of the wall.'
  }
];

// 38 holds total. Adjacent holds on a route are 0.45-0.7 apart in y.
export const wallHolds: WallHold[] = [
  // ---- route-v0 (green) ----
  { id: 1, position: [-1.2, 0.5, 0], rotation: [0, 0, 0], holdTypeId: 'jug', color: '#7CB342', routeTag: 'route-v0', size: 0.9 },
  { id: 2, position: [-0.8, 0.95, 0], rotation: [0, 0, 0], holdTypeId: 'jug', color: '#7CB342', routeTag: 'route-v0', size: 0.85 },
  { id: 3, position: [-1.3, 1.4, 0], rotation: [0, 0, 0.2], holdTypeId: 'jug', color: '#7CB342', routeTag: 'route-v0', size: 0.9 },
  { id: 4, position: [-0.85, 1.85, 0], rotation: [0, 0, 0], holdTypeId: 'edge', color: '#7CB342', routeTag: 'route-v0', size: 0.7 },
  { id: 5, position: [-1.25, 2.3, 0], rotation: [0, 0, 0], holdTypeId: 'jug', color: '#7CB342', routeTag: 'route-v0', size: 0.85 },
  { id: 6, position: [-0.75, 2.75, 0], rotation: [0, 0, 0], holdTypeId: 'sloper', color: '#7CB342', routeTag: 'route-v0', size: 0.6 },
  { id: 7, position: [-1.2, 3.2, 0], rotation: [0, 0, -0.15], holdTypeId: 'jug', color: '#7CB342', routeTag: 'route-v0', size: 0.9 },
  { id: 8, position: [-0.8, 3.7, 0], rotation: [0, 0, 0], holdTypeId: 'edge', color: '#7CB342', routeTag: 'route-v0', size: 0.7 },
  { id: 9, position: [-1.1, 4.2, 0], rotation: [0, 0, 0], holdTypeId: 'jug', color: '#7CB342', routeTag: 'route-v0', size: 0.95 },
  // ---- route-v2 (blue) ----
  { id: 10, position: [-0.1, 0.5, 0], rotation: [0, 0, 0], holdTypeId: 'jug', color: '#42A5F5', routeTag: 'route-v2', size: 0.75 },
  { id: 11, position: [0.35, 0.95, 0], rotation: [0, 0, 0], holdTypeId: 'edge', color: '#42A5F5', routeTag: 'route-v2', size: 0.6 },
  { id: 12, position: [-0.2, 1.45, 0], rotation: [0, 0, 0], holdTypeId: 'sloper', color: '#42A5F5', routeTag: 'route-v2', size: 0.55 },
  { id: 13, position: [0.3, 1.95, 0], rotation: [0, 0, 0], holdTypeId: 'pinch', color: '#42A5F5', routeTag: 'route-v2', size: 0.55 },
  { id: 14, position: [-0.15, 2.45, 0], rotation: [0, 0, 0], holdTypeId: 'edge', color: '#42A5F5', routeTag: 'route-v2', size: 0.55 },
  { id: 15, position: [0.4, 2.95, 0], rotation: [0, 0, 1.5708], holdTypeId: 'sidepull', color: '#42A5F5', routeTag: 'route-v2', size: 0.5 },
  { id: 16, position: [0.0, 3.5, 0], rotation: [0, 0, 0], holdTypeId: 'sloper', color: '#42A5F5', routeTag: 'route-v2', size: 0.5 },
  { id: 17, position: [0.3, 4.05, 0], rotation: [0, 0, 0], holdTypeId: 'jug', color: '#42A5F5', routeTag: 'route-v2', size: 0.7 },
  // ---- route-v4 (red) ----
  { id: 18, position: [0.9, 0.45, 0], rotation: [0, 0, 0], holdTypeId: 'edge', color: '#EF5350', routeTag: 'route-v4', size: 0.5 },
  { id: 19, position: [0.5, 0.95, 0], rotation: [0, 0, 0], holdTypeId: 'crimp', color: '#EF5350', routeTag: 'route-v4', size: 0.45 },
  { id: 20, position: [1.0, 1.45, 0], rotation: [0, 0, 0], holdTypeId: 'pocket', color: '#EF5350', routeTag: 'route-v4', size: 0.5 },
  { id: 21, position: [0.55, 1.95, 0], rotation: [0, 0, 0.3], holdTypeId: 'pinch', color: '#EF5350', routeTag: 'route-v4', size: 0.5 },
  { id: 22, position: [1.0, 2.5, 0], rotation: [0, 0, 0], holdTypeId: 'crimp', color: '#EF5350', routeTag: 'route-v4', size: 0.4 },
  { id: 23, position: [0.6, 3.05, 0], rotation: [0, 0, 0], holdTypeId: 'sloper', color: '#EF5350', routeTag: 'route-v4', size: 0.45 },
  { id: 24, position: [1.05, 3.65, 0], rotation: [0, 0, 3.1416], holdTypeId: 'undercling', color: '#EF5350', routeTag: 'route-v4', size: 0.5 },
  { id: 25, position: [0.7, 4.2, 0], rotation: [0, 0, 0], holdTypeId: 'edge', color: '#EF5350', routeTag: 'route-v4', size: 0.55 },
  // ---- route-v6 (purple) ----
  { id: 26, position: [1.45, 0.5, 0], rotation: [0, 0, 0], holdTypeId: 'crimp', color: '#AB47BC', routeTag: 'route-v6', size: 0.4 },
  { id: 27, position: [1.05, 1.05, 0], rotation: [0, 0, -0.3], holdTypeId: 'pinch', color: '#AB47BC', routeTag: 'route-v6', size: 0.45 },
  { id: 28, position: [1.5, 1.6, 0], rotation: [0, 0, 0], holdTypeId: 'mono', color: '#AB47BC', routeTag: 'route-v6', size: 0.4 },
  { id: 29, position: [1.1, 2.2, 0], rotation: [0, 0, 0], holdTypeId: 'sloper', color: '#AB47BC', routeTag: 'route-v6', size: 0.4 },
  { id: 30, position: [1.55, 2.8, 0], rotation: [0, 0, 0], holdTypeId: 'crimp', color: '#AB47BC', routeTag: 'route-v6', size: 0.35 },
  { id: 31, position: [1.15, 3.5, 0], rotation: [0, 0, 0.2], holdTypeId: 'pocket', color: '#AB47BC', routeTag: 'route-v6', size: 0.4 },
  { id: 32, position: [1.5, 4.2, 0], rotation: [0, 0, 0], holdTypeId: 'edge', color: '#AB47BC', routeTag: 'route-v6', size: 0.45 },
  // ---- route-v8 (orange) ----
  { id: 33, position: [-1.6, 0.5, 0], rotation: [0, 0, 0.4], holdTypeId: 'pinch', color: '#FFA726', routeTag: 'route-v8', size: 0.4 },
  { id: 34, position: [-1.1, 1.15, 0], rotation: [0, 0, 0], holdTypeId: 'crimp', color: '#FFA726', routeTag: 'route-v8', size: 0.35 },
  { id: 35, position: [-0.5, 1.8, 0], rotation: [0, 0, 0], holdTypeId: 'mono', color: '#FFA726', routeTag: 'route-v8', size: 0.35 },
  { id: 36, position: [0.1, 2.45, 0], rotation: [0, 0, 0], holdTypeId: 'sloper', color: '#FFA726', routeTag: 'route-v8', size: 0.35 },
  { id: 37, position: [0.7, 3.15, 0], rotation: [0, 0, 0], holdTypeId: 'crimp', color: '#FFA726', routeTag: 'route-v8', size: 0.35 },
  { id: 38, position: [1.2, 3.85, 0], rotation: [0, 0, 0], holdTypeId: 'sloper', color: '#FFA726', routeTag: 'route-v8', size: 0.4 }
];
