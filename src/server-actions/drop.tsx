'use server'

import { END_EARTH_DATE, client } from "@/lib/constants";
import { PosseFormDrop, PosseBridgeDrop, PosseBridgeDropMintStage, PosseDBDrop, PosseBridgeLazyNFT } from "@/lib/types";
import { storeContract } from "@/lib/db/contract";
import { getActiveDrops, getDrop, getDrops, getPastDrops, getUpcomingDrops, storeDrop, updateDrop } from "@/lib/db/drop";
import { getNFTs, storeNFT } from "@/lib/db/nft";
import { getLazyNFTs } from "@/lib/db/lazynft";
import { NFT, getContract } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { contractURI, getContractMetadata, owner } from "thirdweb/extensions/common";
import { getOwnedNFTs, getTotalClaimedSupply, getTotalUnclaimedSupply, totalSupply } from "thirdweb/extensions/erc721";
import { resolveScheme } from "thirdweb/storage";
import { generateUuid } from "@/lib/utils";

export async function deployDrop(newDrop: PosseFormDrop) {
  try {

    const oldOne = await getDrop(newDrop.address);
    if (oldOne) {
      throw new Error("A Drop with the same infos is already exist");
    }

    const bridgeDrop: PosseBridgeDrop = {
      group: newDrop.group,
      address: newDrop.address,
      name: newDrop.name,
      royaltyBps: newDrop.royaltyBps,
      description: newDrop.description,
      image: newDrop.image,
      payToken: newDrop.payToken,
      owner: newDrop.owner,
      mintStages: [],
    };

    if (newDrop.mintStages && Array.isArray(newDrop.mintStages) && newDrop.mintStages.length > 0) {
      const newMintStages: PosseBridgeDropMintStage[] = newDrop.mintStages
        .sort((a, b) => a.startAt - b.startAt)
        .map((stage) => ({
          name: stage.name,
          price: stage.price,
          currency: stage.currency,
          numberOfItems: stage.numberOfItems,
          startAt: stage.startAt,
          endAt: stage.startAt,
          perlimit: stage.perlimit,
          allows: stage.allows?.map((allow) => allow.address),
        }));

      for (let i = 0; i < newMintStages.length; ++i) {
        newMintStages[i].endAt = (i === newMintStages.length - 1) ? END_EARTH_DATE : newMintStages[i + 1].startAt;
      }

      bridgeDrop.mintStages = newMintStages;
    }

    await storeDrop(bridgeDrop);

    const res = {
      error: false,
      message: "Drop is created.",
      actions: "Success, your own Drop has been deployed",
    };
    return res;

  } catch (err) {
    console.error('[ERROR ON DEPLOYING DROP]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured deploying your Drop.",
      actions: "Please try again",
    };
    return res;
  }
}

export async function updateDropStage(dropAddr: string, newStages: PosseBridgeDropMintStage[]) {
  try {

    const oldOne = await getDrop(dropAddr);
    if (!oldOne) {
      throw new Error("A Drop to update its stages is not exist");
    }

    if (!newStages || !Array.isArray(newStages)) {
      throw new Error("Mint stages for this drop via api is invalid");
    }

    const newMintStages: PosseBridgeDropMintStage[] = newStages.sort((a, b) => a.startAt - b.startAt);

    for (let i = 0; i < newMintStages.length; ++i) {
      newMintStages[i].endAt = (i === newMintStages.length - 1) ? END_EARTH_DATE : newMintStages[i + 1].startAt;
    }

    await updateDrop({ address: dropAddr }, { mintStages: newMintStages });

    const res = {
      error: false,
      message: "Drop is created.",
      actions: "Success, your own Drop has been deployed",
    };
    return res;

  } catch (err) {
    console.error('[ERROR ON DEPLOYING DROP]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured deploying your Drop.",
      actions: "Please try again",
    };
    return res;
  }
}

export async function ownedDrops(accountAddr?: string) {
  try {
    const dbDrops = await getDrops(accountAddr);
    const ownDrops: PosseBridgeDrop[] = dbDrops.map(dbDrop => ({
      group: dbDrop.group,
      address: dbDrop.address,
      name: dbDrop.name,
      description: dbDrop.description,
      image: dbDrop.image,
      payToken: dbDrop.payToken,
      owner: dbDrop.owner,
      visible: dbDrop.visible,
      mintStages: dbDrop.mintStages.map((stage: PosseBridgeDropMintStage) => ({
        did: generateUuid(),
        name: stage.name,
        price: stage.price,
        currency: stage.currency,
        numberOfItems: stage.numberOfItems,
        startAt: stage.startAt,
        endAt: stage.endAt,
        perlimit: stage.perlimit,
        allows: stage.allows,
      })),
    }));

    for (let drop of ownDrops) {
      const contract = getContract({
        chain: soneiumMinato,
        client,
        address: drop.address,
      });

      const _totalSupply = await totalSupply({ contract });
      const totalClaimedSupply = await getTotalClaimedSupply({ contract });
      const totalUnclaimedSupply = await getTotalUnclaimedSupply({ contract });

      drop.supplies = {
        totalSupply: _totalSupply.toString(),
        claimedSupply: totalClaimedSupply.toString(),
        unclaimedSupply: totalUnclaimedSupply.toString(),
      };
    }

    return ownDrops;
  } catch (err) {
    console.error('[ERROR ON GETTING Upcoming Drops]', err);
    return [];
  }
}

export async function fetchDrop(dropAddr: string) {
  try {
    const dbDrop: PosseDBDrop = await getDrop(dropAddr);

    const dbLazyNFTs = dbDrop.group === "LIMITED" ?
      await getLazyNFTs(
        { contractAddr: dropAddr },
        { tokenId: -1 },
        20
      ) : [];

    const drop: PosseBridgeDrop = {
      group: dbDrop.group,
      address: dbDrop.address,
      name: dbDrop.name,
      description: dbDrop.description,
      image: dbDrop.image,
      payToken: dbDrop.payToken,
      owner: dbDrop.owner,
      visible: dbDrop.visible,
      mintStages: dbDrop.mintStages.map((stage: PosseBridgeDropMintStage) => ({
        name: stage.name,
        price: stage.price,
        currency: stage.currency,
        numberOfItems: stage.numberOfItems,
        startAt: stage.startAt,
        endAt: stage.endAt,
        perlimit: stage.perlimit,
        allows: stage.allows,
      })),
      createdAt: (new Date(!dbDrop.createdAt ? Date.now() : dbDrop.createdAt)).getTime(),
    };

    const lazyNFTs: PosseBridgeLazyNFT[] = dbLazyNFTs.map((nft) => ({
      contractAddr: nft.contractAddr,
      tokenId: nft.tokenId,
      category: nft.category,
      name: nft.name,
      description: nft.description,
      image: nft.image,
      traits: nft.traits,
    }));

    return { drop, lazyNFTs };
  } catch (err) {
    console.error('[ERROR ON FETCHING DROP]', err);
    return null;
  }
}

export async function upcomingDrops(accountAddr?: string) {
  try {
    const dbDrops = await getUpcomingDrops(accountAddr);
    const resDrops: PosseBridgeDrop[] = dbDrops.map((drop) => ({
      group: drop.group,
      address: drop.address,
      name: drop.name,
      description: drop.description,
      image: drop.image,
      payToken: drop.payToken,
      owner: drop.owner,
      mintStages: [{
        name: drop.mintStages.name,
        price: drop.mintStages.price,
        currency: drop.mintStages.currency,
        numberOfItems: drop.mintStages.numberOfItems,
        startAt: drop.mintStages.startAt,
        endAt: drop.mintStages.endAt,
        perlimit: drop.mintStages.perlimit,
        allows: drop.mintStages.allows,
      }]
    }));

    return resDrops;
  } catch (err) {
    console.error('[ERROR ON GETTING Upcoming Drops]', err);
    return [];
  }
}

export async function activeDrops(accountAddr?: string) {
  try {
    const dbDrops = await getActiveDrops(accountAddr);
    const resDrops: PosseBridgeDrop[] = dbDrops.map((drop) => ({
      group: drop.group,
      address: drop.address,
      name: drop.name,
      description: drop.description,
      image: drop.image,
      payToken: drop.payToken,
      owner: drop.owner,
      mintStages: [{
        name: drop.mintStages.name,
        price: drop.mintStages.price,
        currency: drop.mintStages.currency,
        numberOfItems: drop.mintStages.numberOfItems,
        startAt: drop.mintStages.startAt,
        endAt: drop.mintStages.endAt,
        perlimit: drop.mintStages.perlimit,
        allows: drop.mintStages.allows,
      }]
    }));

    return resDrops;
  } catch (err) {
    console.error('[ERROR ON GETTING Active Drops]', err);
    return [];
  }
}

export async function pastDrops(accountAddr?: string) {
  try {
    const dbDrops = await getPastDrops(accountAddr);
    const resDrops: PosseBridgeDrop[] = dbDrops.map((drop) => ({
      group: drop.group,
      address: drop.address,
      name: drop.name,
      description: drop.description,
      image: drop.image,
      payToken: drop.payToken,
      owner: drop.owner,
      mintStages: [{
        name: drop.mintStages.name,
        price: drop.mintStages.price,
        currency: drop.mintStages.currency,
        numberOfItems: drop.mintStages.numberOfItems,
        startAt: drop.mintStages.startAt,
        endAt: drop.mintStages.endAt,
        perlimit: drop.mintStages.perlimit,
        allows: drop.mintStages.allows,
      }]
    }));

    return resDrops;
    return [];
  } catch (err) {
    console.error('[ERROR ON GETTING Past Drops]', err);
    return [];
  }
}

export async function claimNFT(dropAddr: string, accountAddr: string) {
  try {

    const dropContract = getContract({
      chain: soneiumMinato,
      client,
      address: dropAddr,
    });

    const ownedNFTsofDrop: NFT[] = await getOwnedNFTs({
      contract: dropContract,
      owner: accountAddr,
    });

    if (!ownedNFTsofDrop.length) {
      throw new Error("There is no NFT in this collection");
    }

    const oldNFTsOfDrop = await getNFTs({ contractAddr: dropAddr }, {}, 0);

    const dropOwner = await owner({ contract: dropContract });

    let image = "";
    try {
      const dropContractURI = await contractURI({ contract: dropContract });
      const response = await fetch(dropContractURI);
      const metadata = await response.json();

      image = resolveScheme({
        client,
        uri: metadata.image,
      });

    } catch (err) {
      console.log("[FETCHING CONTRACT METADATA FROM CONTRACTURI IN CLAIM]", err);
      image = "";
    }

    const dropMetadata = await getContractMetadata({ contract: dropContract });
    const parentContractId = await storeContract({
      category: "ERC-721",
      address: dropAddr,
      name: dropMetadata?.name || "",
      symbol: dropMetadata?.symbol,
      owner: dropOwner,
      image: image,
    });

    const differences = !!oldNFTsOfDrop.length ? ownedNFTsofDrop.filter(a => !oldNFTsOfDrop.some(b => b.tokenId === a.id.toString())) : ownedNFTsofDrop;

    for (let diffNFT of differences) {

      let imgPath = "";
      if (diffNFT.metadata.image) {
        const url = resolveScheme({
          client,
          uri: diffNFT.metadata.image,
        });
        imgPath = url;
      }

      await storeNFT({
        contract: parentContractId,
        contractAddr: dropAddr,
        tokenId: diffNFT.id.toString(),
        category: "ERC-721",
        name: diffNFT.metadata.name || "",
        description: diffNFT.metadata.description,
        image: imgPath,
        listedId: "0",
        owner: accountAddr,
      });
    }

    const res = {
      error: false,
      message: "Your new NFT is claimed",
      actions: "Success, your own NFT has been claimed",
    };
    return res;

  } catch (err) {
    console.error('[ERROR ON CLAIMING NFT]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured claiming last NFT.",
      actions: "Please try again",
    };
    return res;
  }
}