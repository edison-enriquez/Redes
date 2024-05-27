from moviepy.editor import VideoFileClip

# Ruta al archivo de entrada .mov
input_file = "./src/Networking/routing/video/Mejor_Camino.mov"
# Ruta al archivo de salida .mp4
output_file = "./src/Networking/routing/video/Mejor_Camino.mp4"

# Cargar el video .mov
clip = VideoFileClip(input_file)

# Escribir el video en formato .mp4
clip.write_videofile(output_file, codec="libx264")

print("Conversión completada con éxito!")
