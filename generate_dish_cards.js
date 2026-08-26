const fs = require('fs');
const path = require('path');

// We will create rich, beautiful SVG food illustrations matching the color scheme and studio lighting for dishes without crops.
const imagesDir = path.join(__dirname, 'assets', 'images');

function saveSvg(filename, svgContent) {
    fs.writeFileSync(path.join(imagesDir, filename), svgContent.trim());
    console.log(`Saved SVG: ${filename}`);
}

// 1. Greek Salad SVG
saveSvg('greek_salad.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bowlBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FBF9F4"/>
      <stop offset="70%" stop-color="#EBE4D5"/>
      <stop offset="100%" stop-color="#D7CDBC"/>
    </radialGradient>
    <radialGradient id="cucGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#80B967"/>
      <stop offset="80%" stop-color="#3F7A2C"/>
      <stop offset="100%" stop-color="#245116"/>
    </radialGradient>
    <radialGradient id="tomGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FF6B52"/>
      <stop offset="70%" stop-color="#D92B14"/>
      <stop offset="100%" stop-color="#931303"/>
    </radialGradient>
    <radialGradient id="fetaGrad" cx="25%" cy="25%" r="75%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#F4EFE6"/>
      <stop offset="100%" stop-color="#DED6C8"/>
    </radialGradient>
    <radialGradient id="oliveGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#544B5E"/>
      <stop offset="70%" stop-color="#221B2A"/>
      <stop offset="100%" stop-color="#0E0A12"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#063B29" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="transparent"/>
  <!-- Bowl Base Shadow -->
  <ellipse cx="200" cy="275" rx="145" ry="50" fill="#063B29" opacity="0.12" filter="blur(14px)"/>
  <!-- Ceramic Bowl -->
  <circle cx="200" cy="200" r="160" fill="url(#bowlBg)" filter="url(#shadow)" stroke="#D4C8B5" stroke-width="3"/>
  <circle cx="200" cy="200" r="142" fill="#E8DEC9" opacity="0.6"/>
  <!-- Lettuce Base -->
  <g opacity="0.95">
    <path d="M120 180 Q100 130 160 120 Q200 90 250 120 Q300 130 280 180 Q320 220 280 260 Q240 300 180 280 Q110 270 110 220 Z" fill="#679C42"/>
    <path d="M135 190 Q120 150 170 140 Q210 110 245 135 Q285 145 265 190 Q295 225 265 255 Q225 285 180 265 Q125 255 125 215 Z" fill="#7BB554"/>
  </g>
  <!-- Sliced Cucumbers -->
  <circle cx="150" cy="170" r="26" fill="url(#cucGrad)" stroke="#A9E090" stroke-width="3"/>
  <circle cx="150" cy="170" r="18" fill="#C2EDB0"/>
  <circle cx="245" cy="160" r="25" fill="url(#cucGrad)" stroke="#A9E090" stroke-width="3"/>
  <circle cx="245" cy="160" r="17" fill="#C2EDB0"/>
  <circle cx="210" cy="240" r="28" fill="url(#cucGrad)" stroke="#A9E090" stroke-width="3"/>
  <circle cx="210" cy="240" r="20" fill="#C2EDB0"/>
  <!-- Fresh Red Tomatoes -->
  <circle cx="185" cy="140" r="22" fill="url(#tomGrad)"/>
  <path d="M185 122 Q180 130 175 140" stroke="#FFF" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
  <circle cx="255" cy="215" r="24" fill="url(#tomGrad)"/>
  <circle cx="140" cy="235" r="21" fill="url(#tomGrad)"/>
  <!-- Feta Cheese Cubes -->
  <rect x="180" y="180" width="36" height="32" rx="4" fill="url(#fetaGrad)" stroke="#C8C0B2" stroke-width="1.5" transform="rotate(15 198 196)"/>
  <rect x="140" y="140" width="30" height="28" rx="4" fill="url(#fetaGrad)" stroke="#C8C0B2" stroke-width="1.5" transform="rotate(-20 155 154)"/>
  <rect x="220" y="170" width="32" height="30" rx="4" fill="url(#fetaGrad)" stroke="#C8C0B2" stroke-width="1.5" transform="rotate(45 236 185)"/>
  <rect x="175" y="225" width="28" height="28" rx="4" fill="url(#fetaGrad)" stroke="#C8C0B2" stroke-width="1.5" transform="rotate(-10 189 239)"/>
  <!-- Kalamata Olives -->
  <ellipse cx="215" cy="145" rx="14" ry="10" fill="url(#oliveGrad)" transform="rotate(-30 215 145)"/>
  <circle cx="212" cy="143" r="2.5" fill="#FFF" opacity="0.7"/>
  <ellipse cx="145" cy="195" rx="15" ry="11" fill="url(#oliveGrad)" transform="rotate(25 145 195)"/>
  <ellipse cx="225" cy="225" rx="14" ry="10" fill="url(#oliveGrad)" transform="rotate(70 225 225)"/>
  <!-- Red Onion Slivers -->
  <path d="M160 125 C 190 115, 230 120, 245 140" stroke="#AF2F6E" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M130 210 C 150 250, 190 265, 220 260" stroke="#AF2F6E" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <!-- Herb Garnish & Olive Oil Gloss -->
  <circle cx="195" cy="190" r="2" fill="#E99A16"/>
  <circle cx="205" cy="185" r="1.5" fill="#063B29"/>
  <circle cx="160" cy="175" r="2" fill="#063B29"/>
  <circle cx="230" cy="195" r="2" fill="#E99A16"/>
</svg>`);

// 2. Broasted Chicken SVG
saveSvg('broasted.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="boxBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#0A4B35"/>
      <stop offset="80%" stop-color="#063B29"/>
      <stop offset="100%" stop-color="#032217"/>
    </radialGradient>
    <radialGradient id="crispyGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#F2A83B"/>
      <stop offset="40%" stop-color="#D97A18"/>
      <stop offset="80%" stop-color="#B25306"/>
      <stop offset="100%" stop-color="#7A3200"/>
    </radialGradient>
    <linearGradient id="fryGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE07A"/>
      <stop offset="100%" stop-color="#E59E1B"/>
    </linearGradient>
    <filter id="bsShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#063B29" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="transparent"/>
  <!-- Box Base / Platter -->
  <rect x="60" y="160" width="280" height="170" rx="20" fill="url(#boxBg)" filter="url(#bsShadow)" stroke="#0E583F" stroke-width="2"/>
  <!-- Box Branding Gold Accent -->
  <path d="M60 210 Q200 235 340 210 L340 220 Q200 245 60 220 Z" fill="#E99A16" opacity="0.85"/>
  <text x="200" y="275" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#F7F3EA" text-anchor="middle" letter-spacing="3">MOE'S PUREBITE</text>
  <text x="200" y="295" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#E99A16" text-anchor="middle" letter-spacing="4">CRISPY BROASTED</text>
  <!-- French Fries overflowing -->
  <g opacity="0.95">
    <rect x="100" y="100" width="14" height="85" rx="3" fill="url(#fryGrad)" transform="rotate(-18 100 100)"/>
    <rect x="120" y="90" width="13" height="90" rx="3" fill="url(#fryGrad)" transform="rotate(-8 120 90)"/>
    <rect x="135" y="95" width="14" height="80" rx="3" fill="url(#fryGrad)" transform="rotate(12 135 95)"/>
    <rect x="150" y="85" width="13" height="95" rx="3" fill="url(#fryGrad)" transform="rotate(4 150 85)"/>
  </g>
  <!-- Crispy Broasted Pieces (Drumstick / Thigh) -->
  <!-- Piece 1: Thigh / Breast -->
  <path d="M190 140 C 180 100, 240 70, 280 90 C 310 105, 325 140, 305 170 C 280 200, 210 180, 190 140 Z" fill="url(#crispyGrad)" stroke="#7A3200" stroke-width="2"/>
  <!-- Crunchy texture bumps -->
  <circle cx="230" cy="115" r="8" fill="#FCD27B" opacity="0.8"/>
  <circle cx="260" cy="110" r="10" fill="#FCD27B" opacity="0.7"/>
  <circle cx="275" cy="135" r="9" fill="#FCD27B" opacity="0.85"/>
  <circle cx="245" cy="145" r="11" fill="#FCD27B" opacity="0.75"/>
  <circle cx="215" cy="140" r="7" fill="#FCD27B" opacity="0.9"/>
  <!-- Piece 2: Drumstick Front -->
  <path d="M140 160 C 120 130, 160 100, 195 115 C 225 130, 230 165, 205 185 C 185 200, 155 190, 140 160 Z" fill="url(#crispyGrad)" stroke="#7A3200" stroke-width="2"/>
  <!-- Drumstick Bone -->
  <path d="M125 180 L100 205" stroke="#F4EDE2" stroke-width="12" stroke-linecap="round"/>
  <circle cx="97" cy="207" r="7" fill="#E8DBC9"/>
  <circle cx="103" cy="213" r="7" fill="#E8DBC9"/>
  <!-- Crunch bumps on front piece -->
  <circle cx="165" cy="135" r="7" fill="#FCD27B" opacity="0.85"/>
  <circle cx="185" cy="145" r="9" fill="#FCD27B" opacity="0.9"/>
  <circle cx="170" cy="165" r="8" fill="#FCD27B" opacity="0.8"/>
  <!-- Fresh Herb Sprinkle -->
  <circle cx="205" cy="135" r="3" fill="#3D7B24"/>
  <circle cx="175" cy="120" r="2.5" fill="#3D7B24"/>
  <circle cx="240" cy="130" r="3" fill="#3D7B24"/>
</svg>`);

// 3. Mandi Rice & Chicken (Main Dish)
saveSvg('mandi.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="platterBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="80%" stop-color="#EAE3D2"/>
      <stop offset="100%" stop-color="#C5BAA3"/>
    </radialGradient>
    <radialGradient id="riceGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFF2A3"/>
      <stop offset="50%" stop-color="#E8B923"/>
      <stop offset="100%" stop-color="#C28E0D"/>
    </radialGradient>
    <radialGradient id="roastGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#D6681E"/>
      <stop offset="60%" stop-color="#9E3B06"/>
      <stop offset="100%" stop-color="#601E00"/>
    </radialGradient>
    <radialGradient id="daqoosGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FF4D36"/>
      <stop offset="70%" stop-color="#C71D08"/>
      <stop offset="100%" stop-color="#780A00"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="transparent"/>
  <!-- Platter Shadow -->
  <ellipse cx="200" cy="285" rx="160" ry="55" fill="#063B29" opacity="0.14" filter="blur(16px)"/>
  <!-- Ceramic / Metal Platter -->
  <ellipse cx="200" cy="205" rx="175" ry="125" fill="url(#platterBg)" stroke="#B8AC94" stroke-width="4"/>
  <ellipse cx="200" cy="205" rx="155" ry="105" fill="#DFD6C2"/>
  <!-- Fragrant Mandi Spiced Yellow Rice Bed -->
  <ellipse cx="200" cy="205" rx="142" ry="92" fill="url(#riceGrad)"/>
  <!-- Rice grains pattern & toasted almonds / raisins -->
  <g opacity="0.8" stroke="#8C6507" stroke-width="2" stroke-linecap="round">
    <line x1="100" y1="180" x2="110" y2="185"/>
    <line x1="120" y1="160" x2="132" y2="162"/>
    <line x1="140" y1="210" x2="152" y2="216"/>
    <line x1="260" y1="160" x2="272" y2="165"/>
    <line x1="280" y1="200" x2="292" y2="204"/>
    <line x1="240" y1="240" x2="252" y2="242"/>
    <line x1="170" y1="250" x2="182" y2="255"/>
  </g>
  <!-- Toasted Golden Almond Slivers & Raisins -->
  <ellipse cx="125" cy="190" rx="8" ry="3.5" fill="#FFE59E" transform="rotate(30 125 190)"/>
  <ellipse cx="270" cy="180" rx="8" ry="3.5" fill="#FFE59E" transform="rotate(-20 270 180)"/>
  <ellipse cx="230" cy="250" rx="8" ry="3.5" fill="#FFE59E" transform="rotate(40 230 250)"/>
  <circle cx="150" cy="170" r="4.5" fill="#42140B"/>
  <circle cx="250" cy="220" r="4.5" fill="#42140B"/>
  <circle cx="160" cy="240" r="4" fill="#42140B"/>
  <!-- Roasted Whole Golden Half-Chicken Centerpiece -->
  <path d="M140 180 C 130 130, 200 110, 245 125 C 275 140, 280 185, 255 215 C 220 240, 160 230, 140 180 Z" fill="url(#roastGrad)" stroke="#4A1800" stroke-width="2"/>
  <!-- Chicken Glaze / Char highlights -->
  <path d="M165 140 Q210 135 240 155" stroke="#FFA752" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
  <path d="M160 170 Q200 175 235 200" stroke="#FFA752" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
  <ellipse cx="195" cy="150" rx="14" ry="8" fill="#541B01" opacity="0.7"/>
  <!-- Fresh Daqoos Sauce Bowl (Right corner) -->
  <g transform="translate(265, 110)">
    <circle cx="40" cy="40" r="38" fill="#F4EFE6" stroke="#C9BFA8" stroke-width="3"/>
    <circle cx="40" cy="40" r="32" fill="url(#daqoosGrad)"/>
    <circle cx="34" cy="34" r="3" fill="#2E7D32"/>
    <circle cx="44" cy="38" r="2.5" fill="#1B5E20"/>
    <circle cx="40" cy="46" r="2" fill="#E99A16"/>
  </g>
</svg>`);

// 4. Zurbian Rice & Chicken
saveSvg('zurbian.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="zPlatter" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FAF7F0"/>
      <stop offset="85%" stop-color="#E2D8C3"/>
      <stop offset="100%" stop-color="#BAAC91"/>
    </radialGradient>
    <radialGradient id="zRice" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#E88B27"/>
      <stop offset="50%" stop-color="#C25F0A"/>
      <stop offset="100%" stop-color="#8C3E00"/>
    </radialGradient>
    <radialGradient id="potatoGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFCE6B"/>
      <stop offset="70%" stop-color="#C98816"/>
      <stop offset="100%" stop-color="#8F5700"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="transparent"/>
  <!-- Shadow & Platter -->
  <ellipse cx="200" cy="285" rx="160" ry="55" fill="#063B29" opacity="0.14" filter="blur(16px)"/>
  <ellipse cx="200" cy="205" rx="175" ry="125" fill="url(#zPlatter)" stroke="#B8AC94" stroke-width="4"/>
  <ellipse cx="200" cy="205" rx="142" ry="92" fill="url(#zRice)"/>
  <!-- Caramelized Golden-Brown Onion Strands -->
  <path d="M110 180 Q130 160 160 175" stroke="#4A1E05" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M240 170 Q265 190 290 175" stroke="#4A1E05" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M150 240 Q180 260 210 245" stroke="#4A1E05" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Spiced Golden Potatoes (Zurbian Specialty) -->
  <ellipse cx="130" cy="210" rx="22" ry="16" fill="url(#potatoGrad)" stroke="#784800" stroke-width="1.5" transform="rotate(-15 130 210)"/>
  <ellipse cx="265" cy="225" rx="24" ry="18" fill="url(#potatoGrad)" stroke="#784800" stroke-width="1.5" transform="rotate(20 265 225)"/>
  <ellipse cx="160" cy="145" rx="20" ry="15" fill="url(#potatoGrad)" stroke="#784800" stroke-width="1.5" transform="rotate(10 160 145)"/>
  <!-- Tender Zurbian Spiced Chicken Centerpiece -->
  <path d="M160 160 C 150 120, 220 110, 250 135 C 275 160, 260 205, 230 220 C 190 235, 165 200, 160 160 Z" fill="#9C3A08" stroke="#5E1D00" stroke-width="2"/>
  <circle cx="210" cy="160" r="10" fill="#E87625" opacity="0.8"/>
  <circle cx="230" cy="180" r="12" fill="#E87625" opacity="0.8"/>
  <!-- Daqoos Bowl -->
  <g transform="translate(265, 105)">
    <circle cx="40" cy="40" r="36" fill="#F4EFE6" stroke="#C9BFA8" stroke-width="3"/>
    <circle cx="40" cy="40" r="30" fill="#C71D08"/>
    <circle cx="36" cy="36" r="3" fill="#2E7D32"/>
  </g>
</svg>`);

// 5. Kabsa Spiced Rice & Chicken
saveSvg('kabsa.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="kRice" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#FF9E3B"/>
      <stop offset="60%" stop-color="#D95708"/>
      <stop offset="100%" stop-color="#8C2C00"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="transparent"/>
  <ellipse cx="200" cy="285" rx="160" ry="55" fill="#063B29" opacity="0.14" filter="blur(16px)"/>
  <ellipse cx="200" cy="205" rx="175" ry="125" fill="#F7F2E6" stroke="#B8AC94" stroke-width="4"/>
  <ellipse cx="200" cy="205" rx="142" ry="92" fill="url(#kRice)"/>
  <!-- Julienne Carrots & Raisins -->
  <line x1="110" y1="180" x2="135" y2="175" stroke="#FF5722" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="250" y1="190" x2="275" y2="185" stroke="#FF5722" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="170" y1="245" x2="195" y2="250" stroke="#FF5722" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="130" cy="210" r="4.5" fill="#360E03"/>
  <circle cx="270" cy="220" r="4.5" fill="#360E03"/>
  <!-- Roasted Chicken -->
  <path d="M150 170 C 140 125, 210 115, 250 135 C 280 155, 270 200, 240 220 C 195 240, 160 215, 150 170 Z" fill="#993605" stroke="#5E1D00" stroke-width="2"/>
  <path d="M170 145 Q210 140 240 160" stroke="#FFA752" stroke-width="4.5" stroke-linecap="round" opacity="0.8"/>
</svg>`);

// 6. Uzbekian Plov (Meat & Chickpeas)
saveSvg('uzbekian.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="uRice" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#FAC25A"/>
      <stop offset="60%" stop-color="#C78316"/>
      <stop offset="100%" stop-color="#804D03"/>
    </radialGradient>
    <radialGradient id="meatGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#8A341A"/>
      <stop offset="70%" stop-color="#541B0B"/>
      <stop offset="100%" stop-color="#300C03"/>
    </radialGradient>
    <radialGradient id="chickpeaGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFE8A3"/>
      <stop offset="80%" stop-color="#CCA03B"/>
      <stop offset="100%" stop-color="#9E741B"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="transparent"/>
  <ellipse cx="200" cy="285" rx="160" ry="55" fill="#063B29" opacity="0.14" filter="blur(16px)"/>
  <ellipse cx="200" cy="205" rx="175" ry="125" fill="#F7F2E6" stroke="#B8AC94" stroke-width="4"/>
  <ellipse cx="200" cy="205" rx="142" ry="92" fill="url(#uRice)"/>
  <!-- Sweet Yellow & Red Carrots -->
  <line x1="120" y1="180" x2="145" y2="170" stroke="#FF9800" stroke-width="4" stroke-linecap="round"/>
  <line x1="250" y1="170" x2="275" y2="180" stroke="#FF5722" stroke-width="4" stroke-linecap="round"/>
  <line x1="160" y1="240" x2="185" y2="245" stroke="#FF9800" stroke-width="4" stroke-linecap="round"/>
  <!-- Golden Chickpeas (Garbanzo) -->
  <circle cx="135" cy="205" r="7.5" fill="url(#chickpeaGrad)"/>
  <circle cx="260" cy="210" r="8" fill="url(#chickpeaGrad)"/>
  <circle cx="180" cy="245" r="7.5" fill="url(#chickpeaGrad)"/>
  <circle cx="225" cy="240" r="7.5" fill="url(#chickpeaGrad)"/>
  <circle cx="210" cy="140" r="7" fill="url(#chickpeaGrad)"/>
  <!-- Dark Sweet Raisins -->
  <circle cx="150" cy="170" r="4.5" fill="#2B0E05"/>
  <circle cx="240" cy="190" r="4.5" fill="#2B0E05"/>
  <!-- Braised Tender Meat Chunks -->
  <rect x="160" y="160" width="38" height="32" rx="8" fill="url(#meatGrad)" stroke="#300C03" stroke-width="1.5" transform="rotate(-10 179 176)"/>
  <rect x="205" y="165" width="42" height="35" rx="8" fill="url(#meatGrad)" stroke="#300C03" stroke-width="1.5" transform="rotate(15 226 182)"/>
  <rect x="180" y="195" width="40" height="30" rx="8" fill="url(#meatGrad)" stroke="#300C03" stroke-width="1.5" transform="rotate(5 200 210)"/>
</svg>`);

// 7. Kinza Soft Drink & Mineral Water SVGs
saveSvg('kinza.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%">
  <defs>
    <linearGradient id="canBg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#021A3D"/>
      <stop offset="30%" stop-color="#073B82"/>
      <stop offset="60%" stop-color="#0C56B8"/>
      <stop offset="90%" stop-color="#073B82"/>
      <stop offset="100%" stop-color="#021A3D"/>
    </linearGradient>
    <linearGradient id="canRim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#A6AFB8"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#808891"/>
    </linearGradient>
  </defs>
  <rect width="300" height="400" fill="transparent"/>
  <ellipse cx="150" cy="350" rx="65" ry="20" fill="#063B29" opacity="0.16" filter="blur(10px)"/>
  <!-- Can Body -->
  <rect x="90" y="90" width="120" height="240" rx="20" fill="url(#canBg)"/>
  <ellipse cx="150" cy="90" rx="60" ry="18" fill="url(#canRim)"/>
  <ellipse cx="150" cy="90" rx="50" ry="14" fill="#6A727A"/>
  <ellipse cx="150" cy="330" rx="60" ry="18" fill="url(#canRim)"/>
  <text x="150" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="4" transform="rotate(-90 150 210)">KINZA</text>
  <rect x="145" y="100" width="10" height="220" fill="#FFFFFF" opacity="0.15"/>
</svg>`);

saveSvg('water.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%">
  <defs>
    <linearGradient id="botGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#AEE4FA" stop-opacity="0.7"/>
      <stop offset="40%" stop-color="#E1F5FE" stop-opacity="0.9"/>
      <stop offset="80%" stop-color="#81D4FA" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#4FC3F7" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <rect width="300" height="400" fill="transparent"/>
  <ellipse cx="150" cy="355" rx="50" ry="16" fill="#063B29" opacity="0.14" filter="blur(8px)"/>
  <!-- Bottle Cap -->
  <rect x="135" y="55" width="30" height="20" rx="4" fill="#0288D1"/>
  <!-- Bottle Neck & Body -->
  <path d="M140 75 L140 100 Q140 120 105 150 L105 320 Q105 340 150 340 Q195 340 195 320 L195 150 Q160 120 160 100 L160 75 Z" fill="url(#botGrad)" stroke="#B3E5FC" stroke-width="2"/>
  <!-- Label -->
  <rect x="105" y="200" width="90" height="60" fill="#063B29" opacity="0.85"/>
  <text x="150" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PURE WATER</text>
  <text x="150" y="248" font-family="'Inter', sans-serif" font-size="9" fill="#E99A16" text-anchor="middle">500ml</text>
</svg>`);

console.log("Dish graphic generation complete!");
