#!/bin/bash

# Comprehensive Color Update Script for SeranGo Frontend
# This script updates all purple and green colors to the new orange/yellow scheme

echo "🎨 Starting comprehensive color update for SeranGo frontend..."

# Define the directory
DIR="src"

# Function to update colors in a file
update_colors() {
    local file="$1"
    echo "Updating colors in: $file"
    
    # Replace purple colors with orange
    sed -i 's/#B17BE3/#F7A160/g' "$file"
    sed -i 's/#C1EFC1/#F7DC79/g' "$file"
    sed -i 's/#22C55E/#F7DC79/g' "$file"
    
    # Replace purple/green gradients with orange/yellow
    sed -i 's/linear-gradient(90deg, #B17BE3 0%, #C1EFC1 100%)/linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)/g' "$file"
    sed -i 's/linear-gradient(90deg, #B17BE3 0%, #F7DC79 100%)/linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)/g' "$file"
    
    # Replace Tailwind purple classes with orange
    sed -i 's/bg-purple-/bg-orange-/g' "$file"
    sed -i 's/text-purple-/text-orange-/g' "$file"
    sed -i 's/border-purple-/border-orange-/g' "$file"
    sed -i 's/ring-purple-/ring-orange-/g' "$file"
    
    # Replace Tailwind green classes with yellow (for success states)
    sed -i 's/bg-green-/bg-yellow-/g' "$file"
    sed -i 's/text-green-/text-yellow-/g' "$file"
    sed -i 's/border-green-/border-yellow-/g' "$file"
    sed -i 's/ring-green-/ring-yellow-/g' "$file"
    
    # Update specific color references
    sed -i 's/color: "#B17BE3"/color: "#F7A160"/g' "$file"
    sed -i 's/color: "#C1EFC1"/color: "#F7DC79"/g' "$file"
    sed -i 's/color: "#22C55E"/color: "#F7DC79"/g' "$file"
    
    # Update style objects
    sed -i 's/"#B17BE3"/"#F7A160"/g' "$file"
    sed -i 's/"#C1EFC1"/"#F7DC79"/g' "$file"
    sed -i 's/"#22C55E"/"#F7DC79"/g' "$file"
}

# Update all TypeScript/TSX files in components
find "$DIR/components" -name "*.tsx" -o -name "*.ts" | while read -r file; do
    update_colors "$file"
done

# Update all TypeScript/TSX files in pages
find "$DIR/components/pages" -name "*.tsx" -o -name "*.ts" | while read -r file; do
    update_colors "$file"
done

# Update CSS files
find "$DIR" -name "*.css" | while read -r file; do
    update_colors "$file"
done

echo "✅ Color update completed!"
echo "🎨 Updated colors:"
echo "   - Purple (#B17BE3) → Orange (#F7A160)"
echo "   - Green (#22C55E) → Yellow (#F7DC79)"
echo "   - Mint Green (#C1EFC1) → Yellow (#F7DC79)"
echo "   - All gradients updated to orange/yellow scheme"
echo "   - All Tailwind classes updated"
