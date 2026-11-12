import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export const runtime = "nodejs";
const accepted = new Map([["image/jpeg","jpg"],["image/png","png"],["image/webp","webp"],["image/avif","avif"],["video/mp4","mp4"],["video/webm","webm"]]);
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const form = await request.formData(); const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  if (file.size > 50 * 1024 * 1024) return NextResponse.json({ error: "Files must be 50 MB or smaller." }, { status: 413 });
  const extension = accepted.get(file.type);
  if (!extension) return NextResponse.json({ error: "Use a JPG, PNG, WebP, AVIF, MP4 or WebM file." }, { status: 415 });
  const filename = `${randomUUID()}.${extension}`; const folder = path.join(process.cwd(), "public", "uploads");
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, filename), Buffer.from(await file.arrayBuffer()), { flag: "wx" });
  const mediaUrl = `/uploads/${filename}`; const title = String(form.get("title") || "").trim().slice(0, 120) || null;
  const requestedSection = String(form.get("section") || "general"); const sections = ["general","about","services","locations"];
  await prisma.galleryItem.create({ data: { title, mediaUrl, mediaType: file.type.startsWith("video/") ? "video" : "image", section: sections.includes(requestedSection) ? requestedSection : "general" } });
  revalidatePath("/admin/media"); revalidatePath("/"); revalidateTag("home", "max");
  return NextResponse.json({ ok: true, mediaUrl });
}
