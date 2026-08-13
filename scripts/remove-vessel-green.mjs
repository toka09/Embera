import sharp from 'sharp'

const names = ['amber', 'smoke', 'porcelain', 'burgundy']

for (const name of names) {
  const input = `public/assets/vessel-${name}-chroma.png`
  const output = `public/assets/vessel-${name}-cutout.png`
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i]
    const green = data[i + 1]
    const blue = data[i + 2]
    const dominance = green - Math.max(red, blue)
    const alpha = Math.max(0, Math.min(255, ((92 - dominance) / 56) * 255))

    data[i + 3] = Math.round(alpha)
    if (alpha > 0 && alpha < 255) data[i + 1] = Math.min(green, Math.round(Math.max(red, blue) * 1.04))
  }

  await sharp(data, { raw: info }).png().toFile(output)
}
