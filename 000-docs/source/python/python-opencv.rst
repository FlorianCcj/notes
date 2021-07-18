Pyhton - OpenCV
###############

3 color channels: RGB

import cv2
in_path = './img.jpg'
img = cv2.imread(in_path, cv2.IMREAD_UNCHANGED)

cv2.IMREAD_COLOR: load a color image
cv2.GRAYSCALE: loads image in grayscale mode
cv2.IMREAD_UNCHANGED: loads image as such including alpha channel

print (impath) # will show each channel

out_path = './out_img.jpg'
cv2.imwrite(out_path, img)

# image, point begin, point end, color BGR, thickness
cv2.line(img, (0,0), (200, 200), (255, 0, 0), 5) # just a line
cv2.arrowedLine(img, (0,255), (255, 255), (255, 0, 0), 5) # a line with an arrow at the end

# thickness = -1 for full the figure
# image, point begin, point end, color BGR, thickness, line type, shift
cv2.rectangle(img, (0,0), (200, 200), (255, 0, 0), 5) # a rectangle
# image, center, radius, color BGR, thickness, line type
cv2.circle(img, (0,0), 200, (255, 0, 0), 5) # a circle

# image, text, ord, fontScale, color, thickness, lineType
cv2.putText(img, 'opencv rocks', (255, 255), cv2.FONT_HERSHEY_SIMPLEX, 4, (255, 0, 0), 10, cv2.LINE_AA)

# maker an empty image
import numpy as np
empty_impg = np.zeros([512, 512, 3], np.uint8)
