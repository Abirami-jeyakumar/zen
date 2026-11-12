"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Sign in required");
}
const value = (form: FormData, key: string) => String(form.get(key) || "").trim();

export async function createContent(form: FormData) {
  await requireAdmin();
  const type = value(form, "type");
  const id = value(form, "id");
  if (type === "services") {
    const title = value(form, "title");
    const data = { title, slug: slugify(value(form, "slug") || title, { lower: true }), shortDesc: value(form, "shortDesc"), description: value(form, "description"), image: value(form, "image") || "/images/service-placeholder.jpg", duration: value(form, "duration") || null, benefits: value(form, "benefits").split("\n").map(x => x.trim()).filter(Boolean) };
    if (id) await prisma.service.update({ where: { id }, data }); else await prisma.service.create({ data });
  } else if (type === "locations") {
    const name = value(form, "name");
    const data = { name, slug: slugify(value(form, "slug") || name, { lower: true }), city: value(form, "city"), state: value(form, "state"), address: value(form, "address"), phone: value(form, "phone"), email: value(form, "email") || null, mapUrl: value(form, "mapUrl") || null };
    if (id) await prisma.location.update({ where: { id }, data }); else await prisma.location.create({ data });
  } else if (type === "faqs") {
    const data = { question: value(form, "question"), answer: value(form, "answer"), category: value(form, "category") || "general" };
    if (id) await prisma.fAQ.update({ where: { id }, data }); else await prisma.fAQ.create({ data });
  } else if (type === "posts") {
    const title = value(form, "title");
    const isPublished = form.get("isPublished") === "on";
    const data = { title, slug: slugify(value(form, "slug") || title, { lower: true }), excerpt: value(form, "excerpt"), content: value(form, "content"), coverImage: value(form, "coverImage"), category: value(form, "category"), author: value(form, "author"), isPublished, publishedAt: isPublished ? new Date() : null };
    if (id) await prisma.blogPost.update({ where: { id }, data }); else await prisma.blogPost.create({ data });
  } else {
    throw new Error("Unknown content type");
  }
  revalidatePath("/"); revalidatePath("/journal"); revalidatePath("/admin/content");
  revalidateTag("home", "max"); revalidateTag("journal", "max");
  redirect(`/admin/content?type=${type}&saved=1`);
}

export async function deleteContent(form: FormData) {
  await requireAdmin();
  const id = value(form, "id"); const type = value(form, "type");
  if (type === "services") await prisma.service.delete({ where: { id } });
  else if (type === "locations") await prisma.location.delete({ where: { id } });
  else if (type === "faqs") await prisma.fAQ.delete({ where: { id } });
  else if (type === "posts") await prisma.blogPost.delete({ where: { id } });
  else throw new Error("Unknown content type");
  revalidatePath("/"); revalidatePath("/journal"); revalidatePath("/admin/content");
  revalidateTag("home", "max"); revalidateTag("journal", "max");
}
