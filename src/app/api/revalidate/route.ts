import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature && process.env.SANITY_REVALIDATE_SECRET) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // Invalidate global sanity tag and domain-specific tag
    revalidateTag("sanity", "max");
    revalidateTag(body._type, "max");

    return NextResponse.json({
      status: 200,
      revalidated: true,
      type: body._type,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error revalidating";
    return new NextResponse(message, { status: 500 });
  }
}
