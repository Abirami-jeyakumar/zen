import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(8).max(20),
  city: z.string().trim().min(2).max(100),
  interest: z.string().trim().max(100).optional(),
});

export async function POST(request: Request) {
  const form = await request.formData();
  const parsed = inquirySchema.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  const { name, email, phone, city, interest } = parsed.data;
  await prisma.contactSubmission.create({
    data: {
      name, email, phone, subject: `Website enquiry - ${city}`,
      message: `City: ${city}\nInterest: ${interest || "General enquiry"}`,
    },
  });
  return NextResponse.redirect(new URL("/thanks", request.url), 303);
}
