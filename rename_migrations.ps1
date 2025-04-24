# PowerShell script to rename migration files
$migrationPath = "supabase/migrations"
$files = Get-ChildItem $migrationPath -Filter "*.sql" | Sort-Object Name
$timestamp = Get-Date -Format "yyyyMMdd"
$counter = 1

foreach ($file in $files) {
    $paddedCounter = $counter.ToString("000")
    # Extract the descriptive part of the name, removing all numbers and underscores from the start
    $descriptiveName = $file.Name -replace '^[\d_]+'
    $newName = "${timestamp}_${paddedCounter}_${descriptiveName}"
    $newPath = Join-Path $file.Directory.FullName $newName
    
    Write-Host "Renaming $($file.Name) to $newName"
    Rename-Item -Path $file.FullName -NewName $newName -Force
    
    $counter++
} 