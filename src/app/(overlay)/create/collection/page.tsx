import { ContractForm } from "@/components/Contract";
import { deployContract } from "@/server-actions/contract";

export default async function CreateNFTPage() {

  return (
    <div className="max-w-[1920px] flex-col md:flex-row mx-auto xl:px-10 px-5">
      <div className="mb-4 flex flex-col">
        <span className="text-4xl text-white">Create a collection for your NFT</span>
        <span className="text-sm text-golden-1000">You’ll need to deploy a smart contract on the blockchain for collecting NFTs.</span>
      </div>
      <ContractForm deployContract={deployContract} />
    </div>
  );
}