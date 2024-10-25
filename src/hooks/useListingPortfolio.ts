import { getOwnedNFTs, listNFT, verifyNFTtoList } from "@/server-actions/nft";
import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { NATIVE_TOKEN_ICON_MAP, SUPPORTED_CURRENCIES } from "@/lib/currencies";
import { MARKETPLACE_CONTRACT, client } from "@/lib/constants";
import { PosseFormListing, PosseViewNFT, PosseCurrency } from "@/lib/types";
import { useEffect, useState } from "react";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { soneiumMinato } from "thirdweb/chains";
import { getContract, sendAndConfirmTransaction } from "thirdweb";
import { isApprovedForAll as isApprovedForAll721, setApprovalForAll as setApprovalForAll721 } from "thirdweb/extensions/erc721";
import { isApprovedForAll as isApprovedForAll1155, setApprovalForAll as setApprovalForAll1155 } from "thirdweb/extensions/erc1155";
import { createListing, cancelListing } from "thirdweb/extensions/marketplace";
import axios from "axios";
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


  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const currencies: PosseCurrency[] = [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: MARKETPLACE_CONTRACT.chain.nativeCurrency?.symbol || "ETH",
      icon: NATIVE_TOKEN_ICON_MAP[MARKETPLACE_CONTRACT.chain.id] || "",
    }
  ].concat(SUPPORTED_CURRENCIES);

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    };
  }, [eventSource]);

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

  const onRefresh = async () => {
    if (!account) {
      toast.error("Please connect your wallet!");
      return;
    }
    if (isLoading) {
      return;
    }
    if (eventSource) return; // Avoid opening multiple connections

    // Create an EventSource to connect to the server action SSE
    const newEventSource = new EventSource(`/api/nfts/sync?address=${account.address}`);

    // Listen for SSE messages and update state
    newEventSource.onmessage = (event) => {
      toast.success(event.data);
    };

    // Handle error or closure of the connection
    newEventSource.onerror = async () => {
      newEventSource.close();
      setEventSource(null);
      setIsLoading(false);

      toast.success("Loading NFTs...", { duration: 5000 });
      await fnReload();
      toast.success("Successfully Load your NFTs...");
    };

    setEventSource(newEventSource);
    setIsLoading(true); // Set listening state to true
  };

  const fnReload = async () => {
    if (!account) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/nfts/own`, {
        params: { address: account.address, search: filters.search, sort: filters.sort, page: 0 }
      });

      setNfts(JSON.parse(response.data.nfts));
    } catch (err) {
      console.error("error on fetching data from backend", err);
      toast.error("Please reload this page");
    }
    setIsLoading(false);
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

      const verified = await props.verifyNFTtoList(listingItem.contract.address, listingItem.tokenId);
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
        address: listingItem.contractAddr,
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

      await props.listNFT(listingItem.contractAddr, listingItem.tokenId);
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
    await fnReload();
    setIsListPanelOpen(false);
  };

  const handleDelist = async (listedItem: PosseViewNFT) => {
    if (isOperating) {
      return;
    }
    if (!account) {
      connect({ client });
      return;
    }
    if (!listedItem || !listedItem.listedId || listedItem.listedId === "0") {
      toast.error("Please select the item to delist.");
      return;
    }

    setIsOperating(true);
    try {

      if (activeWalletChain?.id !== soneiumMinato.id) {
        await switchChain(soneiumMinato);
      }

      const transaction = cancelListing({
        contract: MARKETPLACE_CONTRACT,
        listingId: BigInt(listedItem.listedId),
      });

      await sendAndConfirmTransaction({
        transaction,
        account,
      });

      const response = await axios.delete(`/api/market`, {
        data: { address: account.address, marketId: listedItem.listedId, contractAddr: listedItem.contractAddr, tokenId: listedItem.tokenId }
      });

      if (!response.data.result.error) {
        toast.success("Delisted successfully");
      } else {
        toast.error(response.data.result.message);
      }
      await fnReload();

    } catch (err) {
      console.error("[ERROR ON DELISTING YOUR NFT]", err);
      const error = err as { code: number, message: string };
      if (!!error.code) {
        toast.error(error.message);
      } else {
        toast.error(typeof err === 'string' ? err : "An Error occured in delisting your NFT");
      }
    }

    setIsOperating(false);
  };

  return {
    nfts,
    isLoading,
    currencies,
    filters,
    onChangeFilter,
    // onLoadMore,
    onRefresh,
    listingItem,
    setListingItem,
    handleList,
    handleDelist,
    isOperating,
    isListPanelOpen,
    setIsListPanelOpen,
  };
}