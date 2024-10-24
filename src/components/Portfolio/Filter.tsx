'use client'

import { IconMagnify } from "@/assets";
import { Button, Menu, MenuButton, MenuItem, MenuItems } from "@/components/base";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useHotkeys } from "react-hotkeys-hook";
import Image from "next/image";
import { Input } from "../base";
import { Spinner } from "../shared/Spinner";

export default function PortfolioFilter({
  isLoading,
  onChangeFilter,
  onRefresh,
}: {
  isLoading: boolean,
  onChangeFilter: (search: string, sort: string) => void,
  onRefresh: () => void,
}) {

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"NAME" | "CREATEDAT">("NAME");
  const searchRef = useRef<HTMLInputElement>(null);
  const [seeShortcut, setSeeShortcut] = useState(true);
  useHotkeys("ctrl+k", () => searchRef.current?.focus(), { preventDefault: true });

  useEffect(() => {
    const { startDebounce, stopDebounce } = useDebounce(onChangeFilter, 300);
    startDebounce(search, sort);
    return () => stopDebounce();
  }, [search, sort]);

  return (

    <form
      style={{ width: "100%" }}
      onSubmit={(event) => event.preventDefault()}
      onFocus={() => setSeeShortcut(false)}
      onBlur={() => setSeeShortcut(true)}
    >
      <div className="flex w-full justify-center items-center gap-2">
        <div className="relative w-full flex justify-center items-center w-8 h-8 border border-golden-1300 rounded-full bg-golden-1300">
          <Input
            ref={searchRef}
            type="text"
            id="text"
            name="search"
            value={search}
            className="text-base px-10"
            placeholder="Search NFTs..."
            required={true}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute top-1/2 -translate-y-1/2  md:translate-x-auto -translate-x-1/2 left-1/2 -ml-0.5 md:left-5">
            <Image
              width={24}
              height={24}
              priority
              className="w-6 h-6"
              src={IconMagnify}
              alt="" />
          </div>
          {seeShortcut && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-white">
              <kbd className="kbd">Ctrl</kbd>+
              <kbd className="kbd">K</kbd>
            </div>
          )}
          {search && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button
                className="text-white bg-transparent"
                onClick={() => {
                  setSearch("");
                  setSeeShortcut(true);
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
        <Menu as="div" className="relative inline-block text-left">

          <MenuButton className="inline-flex justify-center items-center text-sm lg:text-sm xxl:text-lg px-4 py-1 bg-gray-600/[30%] shadow-inner shadow-white/10 hover:bg-black/[80%] transition-all ease-out duration-500 font-semibold border border-golden-1000 gap-2 disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-md whitespace-nowrap">
            Sort by: {sort.charAt(0).toUpperCase() + sort.slice(1)}
            <FaChevronDown />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-auto origin-top-right bg-gray-600/[30%] border border-golden-1000 rounded-md shadow-lg">
            <MenuItem>
              {({ focus }) => (
                <button
                  className={`${focus ? 'bg-black/[30%]' : ''
                    } group flex w-full items-center px-4 py-2 text-sm text-white whitespace-nowrap`}
                  onClick={() => setSort("NAME")}
                >
                  Name
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <button
                  className={`${focus ? 'bg-black/[30%]' : ''
                    } group flex w-full items-center px-4 py-2 text-sm text-white whitespace-nowrap`}
                  onClick={() => setSort("CREATEDAT")}
                >
                  Recently Created
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
        <Button
          type="button"
          variant="common"
          className="inline-flex justify-center items-center gap-2 rounded-lg text-white text-sm lg:text-sm xxl:text-lg px-4 py-1"
          onClick={() => !isLoading && onRefresh()}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <LuRefreshCw size={16} />
          )}
          Refresh
        </Button>
      </div>
    </form>
  );
};