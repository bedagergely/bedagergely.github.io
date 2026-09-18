# bedagergely.github.io

Used 3D model:
"Z-Anatomy" muscular system (https://github.com/LluisV/Z-Anatomy, `Resources/Models/FBX/MuscularSystem100.fbx`)
by the Z-Anatomy project, licensed under Creative Commons Attribution-ShareAlike 4.0
(http://creativecommons.org/licenses/by-sa/4.0/). Derived from "BodyParts3D", The Database Center
for Life Science, licensed under CC-BY-SA 2.1 Japan.

`public/models/muscles.glb` was produced from that FBX with FBX2glTF, keeping every muscle a
separate named object, dropping non-muscle structures (fasciae, bursae, tendon sheaths,
retinacula, septa, ligaments), normalizing the figure to 1.8 units tall standing at the origin,
and Draco-compressing the result.
