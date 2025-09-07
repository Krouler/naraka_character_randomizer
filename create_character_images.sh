#!/bin/bash

# Array of character names and their initials
declare -A characters=(
    ["akos-hu"]="AH"
    ["feria-shen"]="FS"
    ["hadi-ismail"]="HI"
    ["justina-gu"]="JG"
    ["kylin-zhang"]="KZ"
    ["lyam-liu"]="LL"
    ["matari"]="M"
    ["shayol-wei"]="SW"
    ["takeda-nobutada"]="TN"
    ["tarka-ji"]="TJ"
    ["temulch"]="T"
    ["tessa"]="TE"
    ["tianhai"]="TH"
    ["tsuchimikado-kurumi"]="TK"
    ["valda-cui"]="VC"
    ["viper-ning"]="VN"
    ["wuchen"]="W"
    ["yoto-hime"]="YH"
    ["yueshan"]="Y"
    ["zai"]="Z"
    ["ziping-yin"]="ZY"
)

# Array of colors for variety
colors=("#FF6B6B" "#4ECDC4" "#45B7D1" "#96CEB4" "#FFEAA7" "#DDA0DD" "#98D8C8" "#F7DC6F" "#BB8FCE" "#85C1E9" "#F8C471" "#82E0AA" "#F1948A" "#85C1E9" "#D7BDE2" "#A3E4D7" "#F9E79F" "#FADBD8" "#D5DBDB" "#AED6F1" "#A9DFBF")

i=0
for char in "${!characters[@]}"; do
    color=${colors[$i]}
    initials=${characters[$char]}
    
    cat > "src/assets/characters/${char}.svg" << SVG_EOF
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${color}" rx="50"/>
  <text x="50" y="50" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>
SVG_EOF
    
    ((i++))
done

echo "Created ${#characters[@]} character images"
