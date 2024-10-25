import { getAllValidNFTs } from "@/server-actions/market";
import { NATIVE_TOKEN_ICON_MAP, SUPPORTED_CURRENCIES } from "@/lib/currencies";
import { MARKETPLACE_CONTRACT, client } from "@/lib/constants";
import { PosseCurrency, PosseViewMarket } from "@/lib/types";
import { useEffect, useState } from "react";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { allowance, approve, decimals } from "thirdweb/extensions/erc20"; import { soneiumMinato } from "thirdweb/chains";
import { type Hex, NATIVE_TOKEN_ADDRESS, sendTransaction, toTokens, waitForReceipt, getContract, sendAndConfirmTransaction } from "thirdweb";
// import { isApprovedForAll as isApprovedForAll721, setApprovalForAll as setApprovalForAll721 } from "thirdweb/extensions/erc721";
// import { isApprovedForAll as isApprovedForAll1155, setApprovalForAll as setApprovalForAll1155 } from "thirdweb/extensions/erc1155";
import { buyFromListing, cancelListing } from "thirdweb/extensions/marketplace";
import axios from "axios";
import toast from "react-hot-toast";

interface MarketProps {
  getAllValidNFTs: typeof getAllValidNFTs,
}

export function useMarket(props: MarketProps) {

  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ search: string, sort: string, currency: string, page: number, hasMore: boolean }>({ search: "", sort: "", currency: "ALL", page: 0, hasMore: false });
  const [nfts, setNfts] = useState<PosseViewMarket[] | null>(null);


  const [isOperating, setIsOperating] = useState<boolean>(false);
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

  const onChangeFilter = async (_search: string, _sort: string, _currency: string) => {
    setIsLoading(true);
    const { nfts, hasMore, page } = await props.getAllValidNFTs(_search, _sort, _currency, 0);
    setFilters({
      search: _search,
      sort: _sort,
      currency: _currency,
      page: page,
      hasMore: hasMore,
    });
    setNfts(JSON.parse(nfts));
    setIsLoading(false);
  };

  const onLoadMore = async () => {
    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/market`, {
        params: { address: account.address, search: filters.search, sort: filters.sort, currency: filters.currency, page: filters.page }
      });

      setFilters({
        search: filters.search,
        sort: filters.sort,
        currency: filters.currency,
        page: response.data.page,
        hasMore: response.data.hasMore,
      });

      setNfts((!!nfts ? nfts : []).concat(JSON.parse(response.data.nfts)));

    } catch (err) {
      console.error("error on fetching data from backend", err);
      toast.error("Please reload this page");
    }
    setIsLoading(false);
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
    const newEventSource = new EventSource(`/api/market/sync?address=${account.address}`);

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
      const response = await axios.get(`/api/market`, {
        params: { address: account.address, search: filters.search, sort: filters.sort, currency: filters.currency, page: 0 }
      });

      setFilters({
        search: filters.search,
        sort: filters.sort,
        currency: filters.currency,
        page: response.data.page,
        hasMore: response.data.hasMore,
      });
      setNfts(JSON.parse(response.data.nfts));

    } catch (err) {
      console.error("error on fetching data from backend", err);
      toast.error("Please reload this page");
    }
    setIsLoading(false);
  };

  const onBuy = async (item: PosseViewMarket) => {
    if (isOperating) {
      return;
    }
    if (!account) {
      return;
    }

    if (activeWalletChain?.id !== soneiumMinato.id) {
      await switchChain(soneiumMinato);
    }

    setIsOperating(true);
    try {
      if (item.currencyContractAddress.toLowerCase() !== NATIVE_TOKEN_ADDRESS.toLowerCase()) {
        const customTokenContract = getContract({
          address: item.currencyContractAddress as Hex,
          client,
          chain: soneiumMinato,
        });
        const result = await allowance({
          contract: customTokenContract,
          owner: account?.address || '0x',
          spender: MARKETPLACE_CONTRACT.address as Hex,
        });

        if (result < BigInt(item?.pricePerToken || 0)) {
          const _decimals = await decimals({
            contract: customTokenContract,
          });
          const transaction = approve({
            contract: customTokenContract,
            spender: MARKETPLACE_CONTRACT.address as Hex,
            amount: toTokens(BigInt(item?.pricePerToken || 0), _decimals),
          });
          await sendAndConfirmTransaction({ transaction, account });
        }
      }

      const transaction = buyFromListing({
        contract: MARKETPLACE_CONTRACT,
        listingId: BigInt(item.mid),
        quantity: BigInt(item.quantity),
        recipient: account.address,
      });
      const receipt = await sendTransaction({
        transaction,
        account,
      });
      await waitForReceipt({
        transactionHash: receipt.transactionHash,
        client,
        chain: soneiumMinato,
      });

      const response = await axios.put(`/api/market`, {
        address: account.address, marketId: item.mid, contractAddr: item.assetContractAddress, tokenId: item.tokenId
      });

      if (!response.data.result.error) {
        if (!!nfts) {
          const newNFTs = nfts.filter(nft => nft.mid != item.mid);
          setNfts(newNFTs);
        }
        toast.success("Purchase completed! The asset(s) should arrive in your account shortly");
      } else {
        toast.error(response.data.result.message);
      }
      // TODO: refreching all datas
    } catch (err) {
      console.error(err);
      if ((err as Error).message.startsWith("insufficient funds for gas")) {
        toast("You don't have enough funds for this purchase.");
      }
    }
    setIsOperating(false);

  };

  const onDelist = async (item: PosseViewMarket) => {
    if (isOperating) return;

    if (!account) {
      toast.error("Please connect your wallet!");
      return;
    }

    setIsOperating(true);
    try {
      const transaction = cancelListing({
        contract: MARKETPLACE_CONTRACT,
        listingId: BigInt(item.mid),
      });

      await sendAndConfirmTransaction({
        transaction,
        account,
      });

      const response = await axios.delete(`/api/market`, {
        data: { address: account.address, marketId: item.mid, contractAddr: item.assetContractAddress, tokenId: item.tokenId }
      });

      if (!response.data.result.error) {
        if (!!nfts) {
          const newNFTs = nfts.filter(nft => nft.mid != item.mid);
          setNfts(newNFTs);
        }
        toast.success("Delisted successfully");
      } else {
        toast.error(response.data.result.message);
      }

      // TODO: refeching dailo contes;
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
    onLoadMore,
    onRefresh,
    onBuy,
    onDelist,
    isOperating,
  };
}