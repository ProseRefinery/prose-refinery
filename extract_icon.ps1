[xml]$svg = Get-Content public\logo.svg

# Namespace manager
$ns = New-Object System.Xml.XmlNamespaceManager($svg.NameTable)
$ns.AddNamespace("svg", "http://www.w3.org/2000/svg")

# Find all paths
$paths = $svg.SelectNodes("//svg:path", $ns)

foreach ($path in $paths) {
    $d = $path.GetAttribute("d")
    # Check for M x coordinate
    if ($d -match "M\s*(\d+(\.\d+)?)") {
        $x = [double]$matches[1]
        Write-Host "Path class=$($path.getAttribute('class')) start_x=$x"
        
        if ($x -gt 1850) {
            Write-Host "Removing text path..."
            $path.ParentNode.RemoveChild($path) | Out-Null
        }
    }
}

# Update ViewBox and Width
$svg.svg.SetAttribute("viewBox", "0 0 1850 2066")
$svg.svg.SetAttribute("width", "1850")

$svg.Save("$PWD\public\icon_pure.svg")
Write-Host "Created public\icon_pure.svg"
