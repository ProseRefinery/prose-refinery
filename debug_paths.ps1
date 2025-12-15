[xml]$svg = Get-Content public\logo.svg

$ns = New-Object System.Xml.XmlNamespaceManager($svg.NameTable)
$ns.AddNamespace("svg", "http://www.w3.org/2000/svg")

$paths = $svg.SelectNodes("//svg:path", $ns)

$html = @"
<html>
<style>
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .item { border: 1px solid #ccc; padding: 10px; text-align: center; }
    svg { border: 1px solid red; height: 150px; }
</style>
<body>
    <h1>SVG Path Debug</h1>
    <div class="grid">
"@

$i = 0
foreach ($path in $paths) {
    $class = $path.GetAttribute("class")
    $d = $path.GetAttribute("d")
    $style = $path.GetAttribute("style")
    if (-not $style) { $style = "fill: black;" }
    
    $svgBlock = @"
    <svg viewBox="0 0 4626 2066">
        <path d="$d" class="$class" style="$style" />
    </svg>
"@
    
    $html += @"
    <div class="item">
        <h3>Path $i ($class)</h3>
        $svgBlock
    </div>
"@
    $i++
}

$html += "</div></body></html>"
$html | Out-File "public\debug-paths.html" -Encoding utf8
Write-Host "Created public\debug-paths.html"
