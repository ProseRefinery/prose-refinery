import xml.etree.ElementTree as ET
import re

def extract_icon():
    try:
        # Register namespaces to prevent ns0: prefixes
        ET.register_namespace('', "http://www.w3.org/2000/svg")
        ET.register_namespace('xlink', "http://www.w3.org/1999/xlink")
        ET.register_namespace('xodm', "http://www.corel.com/coreldraw/odm/2003")

        tree = ET.parse('public/logo.svg')
        root = tree.getroot()
        
        # Namespace map
        ns = {'svg': 'http://www.w3.org/2000/svg'}
        
        paths_to_remove = []
        
        for path in root.findall('.//svg:path', ns):
            d = path.get('d', '')
            # d usually starts with M x y ...
            # Extract first x coordinate
            match = re.search(r'[Mm]\s*(\d+(\.\d+)?)', d)
            if match:
                x = float(match.group(1))
                print(f"Path class={path.get('class')} start_x={x}")
                
                # If x is greater than 1850, it is likely text (Prose Refinery)
                if x > 1850:
                    paths_to_remove.append(path)
            else:
                print(f"Path class={path.get('class')} has no M coordinate")

        # Create a new root for icon only? Or just modify existing?
        # Modifying existing is safer to keep styles/defs.
        
        # Remove the text paths
        # We need to find the parent. XML iter works weirdly for parents.
        # But here the paths are likely in a <g>.
        
        # Traverse and remove
        parent_map = {c: p for p in root.iter() for c in p}
        
        for p in paths_to_remove:
            print(f"Removing path class={p.get('class')}")
            parent_map[p].remove(p)
            
        # Update ViewBox to crop snugly?
        # Original: 0 0 4626 2066
        # New Width: ~1800
        root.set('viewBox', "0 0 1850 2066")
        root.set('width', "1850")
        
        tree.write('public/icon_pure.svg', encoding='utf-8', xml_declaration=True)
        print("Created public/icon_pure.svg")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_icon()
