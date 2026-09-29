import AppKit

let src = CommandLine.arguments[1]
let dst = CommandLine.arguments[2]

guard let image = NSImage(contentsOfFile: src) else {
  fputs("no image\n", stderr)
  exit(1)
}

var rect = NSRect(origin: .zero, size: image.size)
guard let cg = image.cgImage(forProposedRect: &rect, context: nil, hints: nil) else {
  fputs("no cg\n", stderr)
  exit(1)
}

let w = cg.width
let h = cg.height
let bitmap = NSBitmapImageRep(
  bitmapDataPlanes: nil,
  pixelsWide: w,
  pixelsHigh: h,
  bitsPerSample: 8,
  samplesPerPixel: 4,
  hasAlpha: true,
  isPlanar: false,
  colorSpaceName: .deviceRGB,
  bytesPerRow: w * 4,
  bitsPerPixel: 32
)!

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
NSImage(cgImage: cg, size: NSSize(width: w, height: h)).draw(
  in: NSRect(x: 0, y: 0, width: w, height: h)
)
NSGraphicsContext.restoreGraphicsState()

guard let data = bitmap.bitmapData else { exit(1) }

func isBackground(_ i: Int) -> Bool {
  let r = Int(data[i])
  let g = Int(data[i + 1])
  let b = Int(data[i + 2])
  let mx = max(r, g, b)
  let mn = min(r, g, b)
  return mn > 242 && (mx - mn) < 14
}

var seen = [UInt8](repeating: 0, count: w * h)
var queue = [Int]()
queue.reserveCapacity(w * 4)

func push(_ x: Int, _ y: Int) {
  if x < 0 || y < 0 || x >= w || y >= h { return }
  let p = y * w + x
  if seen[p] == 1 { return }
  if !isBackground(p * 4) { return }
  seen[p] = 1
  queue.append(p)
}

for x in 0..<w {
  push(x, 0)
  push(x, h - 1)
}
for y in 0..<h {
  push(0, y)
  push(w - 1, y)
}

var index = 0
while index < queue.count {
  let p = queue[index]
  index += 1
  let x = p % w
  let y = p / w
  push(x + 1, y)
  push(x - 1, y)
  push(x, y + 1)
  push(x, y - 1)
}

for p in 0..<(w * h) where seen[p] == 1 {
  data[p * 4 + 3] = 0
}

for y in 1..<(h - 1) {
  for x in 1..<(w - 1) {
    let p = y * w + x
    if seen[p] == 1 { continue }
    var edge = false
    if seen[p - 1] == 1 || seen[p + 1] == 1 || seen[p - w] == 1 || seen[p + w] == 1 {
      edge = true
    }
    if !edge { continue }
    let i = p * 4
    let r = Int(data[i])
    let g = Int(data[i + 1])
    let b = Int(data[i + 2])
    let mn = min(r, g, b)
    if mn > 200 {
      let alpha = max(0, min(255, (248 - mn) * 8))
      data[i + 3] = UInt8(alpha)
    }
  }
}

var minX = w
var minY = h
var maxX = 0
var maxY = 0
for y in 0..<h {
  for x in 0..<w where data[(y * w + x) * 4 + 3] > 12 {
    if x < minX { minX = x }
    if y < minY { minY = y }
    if x > maxX { maxX = x }
    if y > maxY { maxY = y }
  }
}

let pad = 12
minX = max(0, minX - pad)
minY = max(0, minY - pad)
maxX = min(w - 1, maxX + pad)
maxY = min(h - 1, maxY + pad)
let cw = maxX - minX + 1
let ch = maxY - minY + 1

let cropped = NSBitmapImageRep(
  bitmapDataPlanes: nil,
  pixelsWide: cw,
  pixelsHigh: ch,
  bitsPerSample: 8,
  samplesPerPixel: 4,
  hasAlpha: true,
  isPlanar: false,
  colorSpaceName: .deviceRGB,
  bytesPerRow: cw * 4,
  bitsPerPixel: 32
)!

guard let srcData = bitmap.bitmapData, let dstData = cropped.bitmapData else { exit(1) }
for row in 0..<ch {
  let from = ((minY + row) * w + minX) * 4
  let to = row * cw * 4
  dstData.advanced(by: to).update(from: srcData.advanced(by: from), count: cw * 4)
}

guard let png = cropped.representation(using: .png, properties: [:]) else { exit(1) }
try png.write(to: URL(fileURLWithPath: dst))
print("wrote \(cw)x\(ch)")
