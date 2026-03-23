$urls = @(
    "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/promo_video.mp4",
    "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/summer_collection.mp4",
    "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/vintage_flower.mp4",
    "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/pashmina_crinkle.mp4",
    "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/hampers_mukena.mp4"
)

$outDir = "public\videos"
if (!(Test-Path -Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

foreach ($url in $urls) {
    $filename = Split-Path $url -Leaf
    $tempFile = "$outDir\temp_$filename"
    $outFile = "$outDir\$filename"
    
    if (Test-Path -Path $outFile) {
        Write-Host "File $outFile already exists. Skipping..."
        continue
    }

    Write-Host "Downloading $filename..."
    & curl.exe -s -L -o $tempFile $url
    
    Write-Host "Compressing $filename..."
    & ffmpeg -y -i $tempFile -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k -movflags +faststart $outFile
    
    if (Test-Path -Path $tempFile) {
        Remove-Item -Path $tempFile
    }
    Write-Host "Finished $filename"
}
