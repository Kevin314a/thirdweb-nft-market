export const dynamic = "force-dynamic";
export const revalidate = 0;
import { client, SONEIUM_MINATO_API_URL } from "@/lib/constants";
import { bulkUpdateNFTs } from "@/lib/db/nft";
import { PosseBridgeNFT } from "@/lib/types";
import { NextResponse } from 'next/server';
import { getContract } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { getNFT as getNFT721 } from "thirdweb/extensions/erc721";
import { resolveScheme } from "thirdweb/storage";

// Define the server action to return the SSE stream
export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);

    const address = searchParams.get("address");
    if (!address) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // sync portfolio data on mongodb with block chain net(soneium minato: https://explorer-testnet.soneium.org/)

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          let nextPageParams = "start";

          controller.enqueue(encoder.encode(`data: Started Synchronizing...\n\n`));
          // after `while` runned, nextPageParms <= json.next_page_params, if next_page_params === null : there is no more items,
          // but if next_page_params !== null : retry request with `API_URL + next_page_params` to get more
          while (!!nextPageParams) {
            // fetching data from SONEIUM_MINATO_CHAINNET with API_URL
            // TODO
            // HERE WE are fetching NFTs from the minato-chainnet only type is ERC-721.
            const queryParams = "type=ERC-721".concat(nextPageParams === "start" ? "" : `&${nextPageParams}`);
            const result = await fetch(`${SONEIUM_MINATO_API_URL}/addresses/${address}/nft/collections?${queryParams}`);
            if (!result.ok) {
              controller.enqueue(encoder.encode(`data: Error fetching own NFTs.\n\n`));
              controller.close();
              return;
            }

            controller.enqueue(encoder.encode(`data: Fetching NFTs from chain net...\n\n`));

            const json = await result.json();

            let nfts: PosseBridgeNFT[] = (json.items || []).flatMap((contract: any) => {
              return contract.token_instances?.map((t: any) => ({
                contract: {
                  category: contract.token.type,
                  address: contract.token.address,
                  name: contract.token.name,
                  description: contract.token.description,
                  symbol: contract.token.symbol,
                  image: contract.token.icon_url,
                  royaltyBps: "0", //contract.royalties,
                  owner: address,
                  traitTypes: t?.metadata?.attributes?.map((attr: any) => attr.trait_type),
                },
                contractAddr: contract.token.address,
                tokenId: t.id,
                category: t.token_type,
                name: t?.metadata?.name,
                description: t?.metadata?.description,
                image: t?.metadata?.image,
                supply: "0",      // only suggest in ERC-1155
                traits: t?.metadata?.attributes?.map((attr: any) => ({
                  type: attr.trait_type,
                  name: attr.value,
                })),
                listedId: "0",
                owner: address,
              }));
            });

            controller.enqueue(encoder.encode(`data: Fetching NFTs from chain net is completed...\n\n`));

            // Create an array to hold promises for batch requests
            const fetchPromises = nfts.map(async (nft) => {
              if (!nft.name) {
                try {

                  const nft3rdWeb = await getNFT721({
                    contract: getContract({
                      client,
                      chain: soneiumMinato,
                      address: nft.contractAddr,
                    }),
                    tokenId: BigInt(nft.tokenId),
                  });

                  if (!!nft3rdWeb.metadata.name) {
                    nft.name = nft3rdWeb.metadata.name;
                    if (nft3rdWeb.metadata.image) {
                      const url = resolveScheme({
                        client,
                        uri: nft3rdWeb.metadata.image,
                      });
                      nft.image = url;
                    }
                    nft.description = nft3rdWeb.metadata.description;
                  }
                } catch (err) {
                  console.error("[ERROR] WITH getting data via thirdweb", err);
                }
              }
              controller.enqueue(encoder.encode(`data: Fetching an NFT #${nft.tokenId} of ${nft.contractAddr}...\n\n`));
            });

            await Promise.all(fetchPromises);

            controller.enqueue(encoder.encode(`data: Updating your NFTs...\n\n`));
            await bulkUpdateNFTs(address, nfts); // upsert data to portfolio collection

            if (!json.next_page_params) {
              nextPageParams = "";
              controller.enqueue(encoder.encode(`data: Completed Synchronizing.\n\n`));
            } else {
              nextPageParams = `token_contract_address_hash=${json.next_page_params.token_contract_address_hash}&token_type=${json.next_page_params.token_type}`;
              controller.enqueue(encoder.encode(`data: Synchronizing is repeating now...\n\n`));
              controller.enqueue(encoder.encode(`data: You have already minted alot more than we thought...\n\n`));
            }
          }

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
    console.error("[MINATO_CHAIN_NET_API_NFT_ERROR]", err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}