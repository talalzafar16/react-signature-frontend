from PIL import Image
import os
import math

def create_tiles(image_path, output_dir, tile_size=1024):
    # Open the image
    image = Image.open(image_path)
    width, height = image.size

    # Calculate number of tiles
    cols = math.ceil(width / tile_size)
    rows = math.ceil(height / tile_size)

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    for row in range(rows):
        for col in range(cols):
            # Define box for each tile
            left = col * tile_size
            upper = row * tile_size
            right = min(left + tile_size, width)
            lower = min(upper + tile_size, height)

            # Crop the tile
            tile = image.crop((left, upper, right, lower))

            # Save the tile
            tile_path = os.path.join(output_dir, f"{row}_{col}.png")
            tile.save(tile_path)

            print(f"Tile saved: {tile_path}")

# Example usage
create_tiles("overlay10.png", "output_tiles_2")
