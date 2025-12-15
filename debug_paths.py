import xml.etree.ElementTree as ET
import html

def create_debug_paths():
    ET.register_namespace('', "http://www.w3.org/2000/svg")
    try:
        tree = ET.parse('public/logo.svg')
        root = tree.getroot()
        ns = {'svg': 'http://www.w3.org/2000/svg'}
        
        paths = root.findall('.//svg:path', ns)
        
        html_content = """
        <html>
        <style>
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .item { border: 1px solid #ccc; padding: 10px; text-align: center; }
            svg { border: 1px solid red; height: 150px; }
        </style>
        <body>
            <h1>SVG Path Debug</h1>
            <div class="grid">
        """
        
        for i, path in enumerate(paths):
            path_class = path.get('class', 'no-class')
            path_d = path.get('d', '')
            path_fill = path.get('style', 'fill:black') 
            
            # Create a mini svg for this path
            # Use original ViewBox
            svg_block = f"""
            <svg viewBox="0 0 4626 2066">
                <path d="{path_d}" class="{path_class}" style="{path_fill}" />
            </svg>
            """
            
            html_content += f"""
            <div class="item">
                <h3>Path {i} ({path_class})</h3>
                {svg_block}
            </div>
            """
            
        html_content += "</div></body></html>"
        
        with open('public/debug-paths.html', 'w') as f:
            f.write(html_content)
            
        print("Created public/debug-paths.html")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_debug_paths()
