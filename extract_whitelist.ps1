[xml]$svg = Get-Content public\logo.svg

$ns = New-Object System.Xml.XmlNamespaceManager($svg.NameTable)
$ns.AddNamespace("svg", "http://www.w3.org/2000/svg")

$paths = $svg.SelectNodes("//svg:path", $ns)
$polygons = $svg.SelectNodes("//svg:polygon", $ns)

# Classes to KEEP (Icon components)
$whitelist = @("fil0", "fil1", "fil3", "fil4")

# Remove non-whitelisted paths
foreach ($path in $paths) {
    $class = $path.GetAttribute("class")
    if ($whitelist -notcontains $class) {
        $path.ParentNode.RemoveChild($path) | Out-Null
        Write-Host "Removed path: $class"
    } else {
        Write-Host "Kept path: $class"
    }
}

# Remove non-whitelisted polygons (fil1 is polygon)
foreach ($poly in $polygons) {
    $class = $poly.GetAttribute("class")
    if ($whitelist -notcontains $class) {
        $poly.ParentNode.RemoveChild($poly) | Out-Null
        Write-Host "Removed polygon: $class"
    } else {
        Write-Host "Kept polygon: $class"
    }
}

# Update ViewBox to wrap the icon (approx width 1800)
# Note: Using XmlElement SetAttribute directly
$svg.DocumentElement.SetAttribute("viewBox", "0 0 1800 2066")
$svg.DocumentElement.SetAttribute("width", "1800")

$svg.Save("$PWD\public\icon_final.svg")
Write-Host "Created public\icon_final.svg"
