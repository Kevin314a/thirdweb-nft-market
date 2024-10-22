'use server'

import { NFTDetail } from "@/components/NFT";
import { getToken } from "@/server-actions/nft";

export default async function TokenPage({
  params,
}) {
  const { addr: contractAddress, id: tokenId } = params;

  const nft = await getToken(contractAddress, tokenId);

  return (
    <NFTDetail nft={nft} />
  );
}
