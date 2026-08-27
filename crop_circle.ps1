Add-Type -AssemblyName System.Drawing

$srcFile = "c:\Users\abdal\Desktop\Operix\work\web projects\moe's pure bite\assets\images\logo_new.jpg"
$dstFile = "c:\Users\abdal\Desktop\Operix\work\web projects\moe's pure bite\assets\images\logo_circle.png"

$img = [System.Drawing.Image]::FromFile($srcFile)
$bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Clear with transparent
$g.Clear([System.Drawing.Color]::Transparent)

# Create a circle path
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(0, 0, $img.Width, $img.Height)

# Set clip to the circle
$g.SetClip($path)

# Draw the original image inside the circle
$rect = New-Object System.Drawing.Rectangle(0, 0, $img.Width, $img.Height)
$g.DrawImage($img, $rect)

$g.Dispose()
$img.Dispose()

$bmp.Save($dstFile, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Done"
