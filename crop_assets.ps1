Add-Type -AssemblyName System.Drawing

function Crop-Image($sourcePath, $destPath, $x, $y, $w, $h) {
    $src = [System.Drawing.Image]::FromFile((Resolve-Path $sourcePath).Path)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $bmp.Save((Resolve-Path -Path "assets/images" -ErrorAction SilentlyContinue).Path + "\" + $destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $src.Dispose()
    Write-Host "Saved assets/images/$destPath"
}

# 1. High-Res Large Burger from ORDER.png
Crop-Image "ORDER.png" "zinger_burger_hero.png" 35 125 526 470

# 2. Refined food images from MENU.png
Crop-Image "MENU.png" "zinger_burger.png" 40 645 235 200
Crop-Image "MENU.png" "zinger_wrap.png" 40 918 235 200
Crop-Image "MENU.png" "zinger_sandwich.png" 40 1192 235 200
Crop-Image "MENU.png" "chicken_quesadilla.png" 40 1466 235 200

# 3. Ingredients Icons from ORDER.png
Crop-Image "ORDER.png" "ing_bun.png" 78 718 58 48
Crop-Image "ORDER.png" "ing_chicken.png" 78 775 58 48
Crop-Image "ORDER.png" "ing_tomato.png" 78 834 58 48
Crop-Image "ORDER.png" "ing_lettuce.png" 520 718 58 48
Crop-Image "ORDER.png" "ing_cheese.png" 520 775 58 48
Crop-Image "ORDER.png" "ing_sauce.png" 520 834 58 48

# 4. Brand & Storefront Photos
Crop-Image "HOME.png" "storefront_interior.png" 395 970 432 280
Crop-Image "ABOUT US.png" "storefront_exterior.png" 520 200 330 390
Crop-Image "ABOUT US.png" "chef_prep.png" 230 635 255 255
Crop-Image "ABOUT US.png" "about_dish.png" 250 1600 230 190

# 5. Favorites
Crop-Image "HOME.png" "zinger_box.png" 437 1342 195 190
Crop-Image "HOME.png" "caesar_salad.png" 640 1342 195 190

Write-Host "All assets prepared successfully!"
