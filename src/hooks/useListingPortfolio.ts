import { getOwnedNFTs, listNFT, verifyNFTtoList } from "@/server-actions/nft";
import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { NATIVE_TOKEN_ICON_MAP, SUPPORTED_CURRENCIES } from "@/lib/currencies";
import { MARKETPLACE_CONTRACT, client } from "@/lib/constants";
import { PosseFormListing, PosseViewNFT, PosseCurrency } from "@/lib/types";
import { useState } from "react";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { soneiumMinato } from "thirdweb/chains";
import { getContract, sendAndConfirmTransaction } from "thirdweb";
import { isApprovedForAll as isApprovedForAll721, setApprovalForAll as setApprovalForAll721 } from "thirdweb/extensions/erc721";
import { isApprovedForAll as isApprovedForAll1155, setApprovalForAll as setApprovalForAll1155 } from "thirdweb/extensions/erc1155";
import { type DirectListing, createListing, cancelListing, getAllValidListings, totalListings, getAllListings, getListing, totalAuctions, getAllAuctions } from "thirdweb/extensions/marketplace";
import toast from "react-hot-toast";

interface ListingPortfolioProps {
  getOwnedNFTs: typeof getOwnedNFTs;
  listNFT: typeof listNFT;
  verifyNFTtoList: typeof verifyNFTtoList;
}

export function useListingPortfolio(props: ListingPortfolioProps) {

  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ search: string, sort: string, page: number }>({ search: "", sort: "", page: 0 });
  const [nfts, setNfts] = useState<PosseViewNFT[]>([]);
  const [isListPanelOpen, setIsListPanelOpen] = useState(false);

  const [isOperating, setIsOperating] = useState<boolean>(false);
  const [listingItem, setListingItem] = useState<PosseViewNFT>();

  const currencies: PosseCurrency[] = [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: MARKETPLACE_CONTRACT.chain.nativeCurrency?.symbol || "ETH",
      icon: NATIVE_TOKEN_ICON_MAP[MARKETPLACE_CONTRACT.chain.id] || "",
    }
  ].concat(SUPPORTED_CURRENCIES);

  const onChangeFilter = async (_search: string, _sort: string) => {
    setIsLoading(true);
    setFilters({
      search: _search,
      sort: _sort,
      page: 0,
    });
    const json_nfts = await props.getOwnedNFTs(_search, _sort, 0);
    setNfts(JSON.parse(json_nfts));
    setIsLoading(false);
  };

  const onLoadMore = async () => {
    setFilters({
      ...filters,
      page: filters.page + 1,
    });
    const _nfts = await props.getOwnedNFTs(filters.search, filters.sort, filters.page + 1);
    // setNfts(_nfts);
  };

  const handleList = async (listInfo: PosseFormListing) => {
    if (isOperating) {
      return;
    }
    if (!account) {
      connect({ client });
      return;
    }
    if (!listingItem) {
      toast.error("Please select the item to list.");
      setIsListPanelOpen(false);
      return;
    }

    const _qty = BigInt(listInfo.qty ?? 1);
    if (listingItem.type === "ERC-1155") {
      if (!_qty || _qty <= 0n) {
        toast.error("Please input the valid quantity for list");
        setIsListPanelOpen(false);
        return;
      }
    }

    setIsOperating(true);
    try {

      if (activeWalletChain?.id !== soneiumMinato.id) {
        await switchChain(soneiumMinato);
      }

      const verified = await props.verifyNFTtoList(listingItem.collectionId.address, listingItem.tokenId);
      if (verified.error) {
        if (!!verified.actions) {
          throw new Error(verified.message.concat(verified.actions));
        } else {
          toast.error(verified.message);
          setIsOperating(false);
          setIsListPanelOpen(false);
          return;
        }
      }

      const nftContract = getContract({
        address: listingItem.collectionId.address,
        chain: soneiumMinato,
        client,
      });

      // Check for approval
      const checkApprove = listingItem.type === "ERC-1155" ? isApprovedForAll1155 : isApprovedForAll721;
      const isApproved = await checkApprove({
        contract: nftContract,
        owner: account.address,
        operator: MARKETPLACE_CONTRACT.address,
      });

      if (!isApproved) {
        const setApproval = listingItem.type === "ERC-1155" ? setApprovalForAll1155 : setApprovalForAll721;
        const approveTx = setApproval({
          contract: nftContract,
          operator: MARKETPLACE_CONTRACT.address,
          approved: true,
        });
        await sendAndConfirmTransaction({
          transaction: approveTx,
          account,
        });
      }

      const transaction = createListing({
        contract: MARKETPLACE_CONTRACT,
        assetContractAddress: nftContract.address,
        tokenId: BigInt(listingItem.tokenId),
        quantity: listingItem.type === "ERC-721" ? 1n : _qty,
        currencyContractAddress: listInfo.currency,
        pricePerToken: listInfo.price,
      });

      await sendAndConfirmTransaction({ transaction, account });

      await props.listNFT(listingItem.collectionId.address, listingItem.tokenId);
      toast.success("Successfully Listed to POSSE Market");

    } catch (err) {
      console.error("[ERROR ON LISTING YOUR NFT]", err);
      const error = err as { code: number, message: string };
      if (!!error.code) {
        toast.error(error.message);
      } else {
        toast.error(typeof err === 'string' ? err : "An Error occured in listing");
      }
    }

    setIsOperating(false);
    setIsListPanelOpen(false);
  };

  return {
    nfts,
    isLoading,
    currencies,
    filters,
    onChangeFilter,
    // onLoadMore,
    listingItem,
    setListingItem,
    handleList,
    isOperating,
    isListPanelOpen,
    setIsListPanelOpen,
  };
}