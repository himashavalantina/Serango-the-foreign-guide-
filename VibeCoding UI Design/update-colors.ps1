# Comprehensive Color Update Script for SeranGo Frontend
# This script updates all purple and green colors to the new orange/yellow scheme

Write-Host "🎨 Starting comprehensive color update for SeranGo frontend..." -ForegroundColor Cyan

# Define the directory
$srcDir = "src"

# Function to update colors in a file
function Update-Colors {
    param($file)
    Write-Host "Updating colors in: $file" -ForegroundColor Yellow
    
    $content = Get-Content $file -Raw
    
    # Replace purple colors with orange
    $content = $content -replace '#B17BE3', '#F7A160'
    $content = $content -replace '#C1EFC1', '#F7DC79'
    $content = $content -replace '#22C55E', '#F7DC79'
    
    # Replace purple/green gradients with orange/yellow
    $content = $content -replace 'linear-gradient\(90deg, #B17BE3 0%, #C1EFC1 100%\)', 'linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)'
    $content = $content -replace 'linear-gradient\(90deg, #B17BE3 0%, #F7DC79 100%\)', 'linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)'
    
    # Replace Tailwind purple classes with orange
    $content = $content -replace 'bg-purple-', 'bg-orange-'
    $content = $content -replace 'text-purple-', 'text-orange-'
    $content = $content -replace 'border-purple-', 'border-orange-'
    $content = $content -replace 'ring-purple-', 'ring-orange-'
    
    # Replace Tailwind green classes with yellow (for success states)
    $content = $content -replace 'bg-green-', 'bg-yellow-'
    $content = $content -replace 'text-green-', 'text-yellow-'
    $content = $content -replace 'border-green-', 'border-yellow-'
    $content = $content -replace 'ring-green-', 'ring-yellow-'
    
    # Update specific color references
    $content = $content -replace 'color: "#B17BE3"', 'color: "#F7A160"'
    $content = $content -replace 'color: "#C1EFC1"', 'color: "#F7DC79"'
    $content = $content -replace 'color: "#22C55E"', 'color: "#F7DC79"'
    
    # Update style objects
    $content = $content -replace '"#B17BE3"', '"#F7A160"'
    $content = $content -replace '"#C1EFC1"', '"#F7DC79"'
    $content = $content -replace '"#22C55E"', '"#F7DC79"'
    
    # Write the updated content back to the file
    Set-Content $file -Value $content -NoNewline
}

# Get all TypeScript/TSX files in components
$tsxFiles = Get-ChildItem -Path $srcDir -Recurse -Include "*.tsx", "*.ts" | Where-Object { $_.FullName -like "*components*" }

foreach ($file in $tsxFiles) {
    Update-Colors $file.FullName
}

# Get all CSS files
$cssFiles = Get-ChildItem -Path $srcDir -Recurse -Include "*.css"

foreach ($file in $cssFiles) {
    Update-Colors $file.FullName
}

Write-Host "✅ Color update completed!" -ForegroundColor Green
Write-Host "🎨 Updated colors:" -ForegroundColor Cyan
Write-Host "   - Purple (#B17BE3) → Orange (#F7A160)" -ForegroundColor White
Write-Host "   - Green (#22C55E) → Yellow (#F7DC79)" -ForegroundColor White
Write-Host "   - Mint Green (#C1EFC1) → Yellow (#F7DC79)" -ForegroundColor White
Write-Host "   - All gradients updated to orange/yellow scheme" -ForegroundColor White
Write-Host "   - All Tailwind classes updated" -ForegroundColor White
