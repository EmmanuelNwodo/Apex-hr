import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const appDirectory = join(process.cwd(), "src", "app");
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function expectPngDimensions(path: string, width: number, height: number) {
  const image = readFileSync(path);
  expect(image.subarray(0, 8)).toEqual(pngSignature);
  expect(image.readUInt32BE(16)).toBe(width);
  expect(image.readUInt32BE(20)).toBe(height);
}

describe("ApexHR favicon assets", () => {
  it("provides the complete ApexHR monogram in Next.js app and Apple icon sizes", () => {
    expectPngDimensions(join(appDirectory, "icon.png"), 512, 512);
    expectPngDimensions(join(appDirectory, "apple-icon.png"), 180, 180);
  });

  it("provides a valid multi-size ICO favicon containing the ApexHR artwork", () => {
    const favicon = readFileSync(join(appDirectory, "favicon.ico"));
    expect(favicon.readUInt16LE(0)).toBe(0);
    expect(favicon.readUInt16LE(2)).toBe(1);

    const imageCount = favicon.readUInt16LE(4);
    expect(imageCount).toBeGreaterThan(0);

    for (let index = 0; index < imageCount; index += 1) {
      const entry = 6 + index * 16;
      const width = favicon.readUInt8(entry) || 256;
      const height = favicon.readUInt8(entry + 1) || 256;
      const imageLength = favicon.readUInt32LE(entry + 8);
      const imageOffset = favicon.readUInt32LE(entry + 12);
      const image = favicon.subarray(imageOffset, imageOffset + imageLength);

      if (image.subarray(0, 8).equals(pngSignature)) {
        expect(image.readUInt32BE(16)).toBe(width);
        expect(image.readUInt32BE(20)).toBe(height);
      } else {
        expect(image.readUInt32LE(0)).toBe(40);
        expect(image.readInt32LE(4)).toBe(width);
        expect(image.readInt32LE(8)).toBe(height * 2);
      }
    }
  });
});
