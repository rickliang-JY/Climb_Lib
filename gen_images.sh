#!/usr/bin/env bash
# Batch image generation for THE CRAG ARCHIVE
TOOL=/app/.agents/plugins/image_generation/scripts/image_generation_tool.py
OUT="$HOME/app-scaffold/public"
mkdir -p "$OUT"
STYLE="Low-saturation warm color palette, muted earth tones (sand, terracotta, ochre, warm grey), soft diffused natural light, editorial photography style, film grain texture, minimal composition, no blue or purple tones. "

gen() {
  local file="$1" ratio="$2" res="$3" desc="$4"
  if [ -s "$OUT/$file" ]; then echo "SKIP $file"; return 0; fi
  if python3 "$TOOL" generate --description "$STYLE$desc" --ratio "$ratio" --resolution "$res" --output "$OUT/$file" >/dev/null 2>&1; then
    echo "OK $file"
  else
    echo "RETRY $file"
    if python3 "$TOOL" generate --description "$STYLE$desc" --ratio "$ratio" --resolution "$res" --output "$OUT/$file" >/dev/null 2>&1; then
      echo "OK $file (retry)"
    else
      echo "FAIL $file"
    fi
  fi
}

case "$1" in
batch1)
  gen hero-wall.png 3:2 1K "Wide-angle low-angle shot of a massive sandstone cliff wall, a single tiny climber silhouette hanging mid-wall on orange-red rock, low morning light, warm golden tones, vast empty sky with generous negative space."
  gen home-history-teaser.png 3:2 1K "Vintage still life close-up of 19th century mountaineering gear: hemp rope and leather mountaineering boots, warm sepia brown tones, shallow depth of field."
  gen home-boulder-teaser.png 3:2 1K "Close-up of colorful climbing holds on a steep indoor bouldering wall, a climber's hand gripping a hold, chalk dust floating in the air, warm tones."
  gen home-3d-teaser.png 3:2 1K "Minimalist still life: colorful rock climbing holds (jug, crimp, sloper shapes) scattered on a tabletop like museum specimens, warm grey background, soft light."
  gen hist-era-1-alpine.png 3:2 1K "1860s Alpine mountaineering scene, climbers in wool coats roped together ascending a snowy rock ridge, vintage engraving texture, warm sepia brown."
  gen hist-era-2-dolomites.png 3:2 1K "1900s Dolomites limestone tower peaks, a climber free climbing a vertical rock face, warm beige limestone, thin mist."
  gen hist-era-3-yosemite.png 3:2 1K "1950s Yosemite golden granite big wall like El Capitan, dusk warm light, dramatic rock texture close-up."
  gen hist-era-4-free.png 3:2 1K "1970s climber in retro gear (tight EB shoes, hex nuts rack) climbing a sandstone crack, warm brown tones, film grain."
  ;;
batch2)
  gen hist-era-5-sport.png 3:2 1K "1980s French limestone cliff like Verdon gorge, lead climber clipping a quickdraw mid-move, warm rock colors dominant, one small controlled turquoise accent on gear."
  gen hist-era-6-comp.png 3:2 1K "1990s indoor climbing competition on an artificial wall, audience silhouettes, warm spotlights on colorful holds."
  gen hist-era-7-olympic.png 3:2 1K "Tokyo 2020 Olympics style speed climbing wall, athlete sprinting upward mid-air, dynamic warm motion lighting, modern feel."
  gen disc-bouldering.png 3:2 1K "Boulderer topping out on a sandstone boulder without a rope, crash pad below, golden hour warm light, low saturation."
  gen disc-sport.png 3:2 1K "Sport climber lead climbing a vertical limestone wall, quickdraws and rope clearly visible, warm beige rock."
  gen disc-trad.png 3:2 1K "Traditional climber's hands placing a cam and nut protection into a granite crack, retro film warm colors."
  gen disc-lead.png 3:2 1K "Indoor lead climbing competition tall wall shot from below, climber near the top, colorful route holds, warm spotlight."
  gen disc-speed.png 3:2 1K "Two speed climbers racing side by side on a standardized speed wall, motion blur conveying sprint, warm red wall."
  ;;
batch3)
  gen disc-bigwall.png 3:2 1K "Big wall climbing: portaledge hanging camp on a vertical granite wall, dusk warm light, epic sense of scale."
  gen disc-freesolo.png 3:2 1K "Free solo climber without protection on a high cliff, distant wide composition, awe and reverence, warm twilight."
  gen disc-indoor.png 3:2 1K "Modern indoor climbing gym panorama, colorful bouldering walls and lead walls, social community atmosphere, warm tones."
  gen disc-alpine.png 3:2 1K "Alpine climbing on snowy mixed terrain of rock and ice, warm morning light on the snow-rock boundary."
  gen disc-deepwater.png 3:2 1K "Deep water soloing: climber hanging on a Mediterranean sea cliff arch, warm rock and deep green sea."
  gen comp-ifsc-wall.png 16:9 2K "IFSC World Cup style competition climbing wall panorama, audience stand silhouettes, three discipline zones marked, warm lighting."
  gen comp-athlete-1.png 2:3 1K "Portrait style photo of a legendary male climber as a silhouette, no recognizable facial features, warm side light."
  gen comp-athlete-2.png 2:3 1K "Legendary female climber in dynamic climbing motion on an indoor competition wall, warm backlit outline."
  ;;
batch4)
  gen comp-athlete-3.png 2:3 1K "Speed climbing athlete's explosive start moment close-up, pushing off the wall, dynamic warm light."
  gen comp-athlete-4.png 2:3 1K "Bouldering World Cup finalist reading the route before the wall, contemplative mood, warm tones."
  gen gear-shoes.png 3:2 1K "Flat lay of two pairs of climbing shoes with different stiffness, like a product catalog specimen display, warm grey background."
  gen gear-harness.png 3:2 1K "Flat lay of climbing harness and quickdraws, editorial still life, warm background."
  gen gear-rope.png 3:2 1K "Coiled climbing rope with warm orange and beige sheath, single rope close-up, product catalog style."
  gen gear-protection.png 3:2 1K "Traditional climbing protection gear arranged flat: nuts, cams, hexes, warm metallic light."
  gen gear-chalk.png 3:2 1K "Chalk bag and magnesium chalk close-up, hand dipping with dust texture floating, warm tones."
  gen gear-belay.png 3:2 1K "Belay devices (ATC and assisted-braking style) and locking carabiners flat lay, warm metallic texture."
  gen texture-granite.png 1:1 1K "Fine grain granite and paper noise texture, extremely subtle pale warm grey, seamless background texture, top-down flat, no objects."
  ;;
*) echo "usage: $0 batch1|batch2|batch3|batch4"; exit 1;;
esac
