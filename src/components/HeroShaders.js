export const vertexShader = `
varying vec2 vUv;
uniform float uHovered;
uniform float uScale;

void main() {
  vUv = uv;
  
  // Very subtle zoom in effect on hover
  vec3 pos = position;
  float scale = 1.0 + (uHovered * uScale);
  // Scale from the center
  pos *= scale;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uMouse;
uniform float uHovered;
uniform float uRadius;
uniform float uSoftness;
uniform vec2 uResolution;
uniform vec2 uImageResolution1;
uniform vec2 uImageResolution2;
uniform vec2 uOffset1;
uniform vec2 uOffset2;
uniform float uScaleFactor2; // Scale for second image relative to first

varying vec2 vUv;

vec2 getCoverUv(vec2 uv, vec2 res, vec2 imgRes, vec2 offset) {
  vec2 ratio = vec2(
    min((res.x / res.y) / (imgRes.x / imgRes.y), 1.0),
    min((res.y / res.x) / (imgRes.y / imgRes.x), 1.0)
  );
  
  return (uv - vec2(0.5) + offset) * ratio + vec2(0.5);
}

void main() {
  // Correct the UVs for both textures independently
  vec2 uvCover1 = getCoverUv(vUv, uResolution, uImageResolution1, uOffset1);
  
  // For the second image, we also allow a scale factor to precisely match the first
  vec2 uv2Base = (vUv - vec2(0.5)) * uScaleFactor2 + vec2(0.5);
  vec2 uvCover2 = getCoverUv(uv2Base, uResolution, uImageResolution2, uOffset2);

  // Get the base colors
  vec4 color1 = texture2D(uTexture1, uvCover1);
  
  // Calculate mask
  vec2 screenRatio = vec2(uResolution.x / uResolution.y, 1.0);
  if (uResolution.y > uResolution.x) {
    screenRatio = vec2(1.0, uResolution.y / uResolution.x);
  }
  
  vec2 uvMouse = vUv * screenRatio;
  vec2 cursor = uMouse * screenRatio;

  float dist = distance(uvMouse, cursor);
  
  float currentRadius = uRadius * uHovered;

  // The mask (1.0 where top image shows, 0.0 where bottom image shows)
  float mask = 1.0 - smoothstep(currentRadius - uSoftness, currentRadius + uSoftness, dist);
  
  // Add a small ripple / distortion on the edge of the mask
  vec2 distortedUv2 = uvCover2 + (mask * (1.0 - mask)) * 0.05 * uHovered;
  vec4 color2 = texture2D(uTexture2, distortedUv2);

  // Mix based on the mask
  vec4 finalColor = mix(color1, color2, mask);

  // Add subtle light bloom
  float glow = 1.0 - smoothstep(0.0, currentRadius * 1.5, dist);
  finalColor.rgb += vec3(0.05, 0.08, 0.1) * glow * uHovered;

  gl_FragColor = finalColor;
}
`;
