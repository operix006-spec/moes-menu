Add-Type -AssemblyName System.Drawing

$files = @("HOME.png", "MENU.png", "ORDER.png", "ABOUT US.png", "SIDE BAR.png", "LOGO.png")
foreach ($f in $files) {
    if (Test-Path $f) {
        $img = [System.Drawing.Image]::FromFile((Resolve-Path $f).Path)
        Write-Host "$f : $($img.Width) x $($img.Height)"
        $img.Dispose()
    }
}
