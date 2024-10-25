export const dynamic = "force-dynamic";
export const revalidate = 0;
import { MARKETPLACE_CONTRACT } from "@/lib/constants";
import { bulkUpdateMarket } from "@/lib/db/market";
import { removeAllInvalidNFTs } from "@/server-actions/market";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { getAllValidListings, totalListings } from "thirdweb/extensions/marketplace";

// Define the server action to return the SSE stream
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const accountAddr = cookieStore.get('userAddr')?.value;

    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address || accountAddr !== address || address !== process.env.NEXT_PUBLIC_ADMIN_ID) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // sync NFTs on the POSSE market with mongodb
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(encoder.encode(`data: Started Synchronizing...\n\n`));

          const validListingIds: string[] = [];

          let i = 0n;

          const totalListed = await totalListings({ contract: MARKETPLACE_CONTRACT });
          const maxRetries = 3;

          while (i <= totalListed) {
            // Retry mechanism for handling failed requests
            const executeWithRetries = async (fn: () => Promise<void>, retries: number) => {
              let attempt = 0;
              while (attempt < retries) {
                try {
                  await fn();
                  break;  // Exit loop if successful
                } catch (error) {
                  attempt++;
                  if (attempt >= retries) {
                    throw error;  // After max retries, throw error
                  }
                  controller.enqueue(encoder.encode(`data: Retry attempt ${attempt}...\n\n`));
                }
              }
            };

            // Define the async task, but do not immediately execute it.
            const promise = async () => {
              controller.enqueue(encoder.encode(`data: Fetching NFTs from Marketplace #${i} ~ #${i + 50n}...\n\n`));

              const result = await getAllValidListings({
                contract: MARKETPLACE_CONTRACT,
                start: Number(i),
                count: 50n,
              });

              result.forEach((item) => validListingIds.push(item.id.toString()));

              controller.enqueue(encoder.encode(`data: Updating database...\n\n`));
              await bulkUpdateMarket(address, result);
              controller.enqueue(encoder.encode(`data: Synchronized DB with valid listed NFTs...\n\n`));
            };

            // Execute the promise with retries
            await executeWithRetries(promise, maxRetries);

            // Increment for the next batch
            i += 50n;
          }

          console.log('gggggggggggggggggggggggg', validListingIds);
          await removeAllInvalidNFTs(validListingIds);

          controller.enqueue(encoder.encode(`data: Completed Synchronizing.\n\n`));
          controller.close();

        } catch (err) {
          controller.enqueue(encoder.encode(`data: Error in fetching NFTs via SSE\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (err) {
    console.error("[MINATO_THIRDWEB_API_MARKET_ERROR]", err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}