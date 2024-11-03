'use client'

import { PosseBridgeDrop, PosseFormDropMintStage, PosseBridgeDropMintStage } from "@/lib/types";
import { useState, useRef, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { isAddress } from "thirdweb";
import { Button, Field, Fieldset, Input, Label, Switch, Textarea, XDatePicker } from "../base";
import { XUpload } from "../XUpload";
import { isNotOverMin, isValidBigInt, isValidNumber } from "@/lib/utils";
import { FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

export function PhaseForm({
  drop,
  stageId,
  onEditDone,
  onClose,
}: {
  drop: PosseBridgeDrop;
  stageId: string,
  onEditDone: (stage: PosseBridgeDropMintStage) => void,
  onClose: () => void,
}) {

  const formRef = useRef<HTMLFormElement | null>(null);
  const { control, register, handleSubmit: useSubmit, setValue, formState: { errors }, reset } = useForm<PosseFormDropMintStage>({
    defaultValues: {
      allows: [],
    }
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [mintLimitPerWallet, setMintLimitPerWallet] = useState<boolean>(false);

  const [errorFile, setErrorFile] = useState<"none" | "exceed" | "invalid-ext" | "drop-fail" | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'allows',
  });

  useEffect(() => {
    const stage = drop.mintStages.filter(s => s.did === stageId).shift();

    if (stage) {
      setValue("name", stage.name);
      setValue("price", stage.price);
      setValue("currency", stage.currency);
      setValue("numberOfItems", stage.numberOfItems);
      setValue("startAt", stage.startAt);
      setValue("perlimit", stage.perlimit);
      setValue("allows", stage.allows.map((allow) => ({ address: allow })));
      setSelectedDate(new Date(stage.startAt));
    } else {
      setValue("name", "");
      setValue("price", "");
      setValue("currency", "");
      setValue("numberOfItems", "");
      setValue("startAt", (new Date()).getTime());
      setValue("perlimit", "");
      setValue("allows", []);
      setSelectedDate(new Date());
    }
  }, [drop, stageId]);

  const handleSubmit = async (newStage: PosseFormDropMintStage) => {
    newStage.currency = "ETH";
    console.log(newStage);

    const newBridgeStage: PosseBridgeDropMintStage = {
      name: newStage.name,
      price: newStage.price,
      currency: newStage.currency,
      numberOfItems: newStage.numberOfItems,
      startAt: newStage.startAt,
      endAt: newStage.startAt,
      perlimit: newStage.perlimit,
      allows: newStage.allows.map(allow => allow.address),
    };

    onEditDone(newBridgeStage);
  };

  return (
    <div className="flex flex-col">
      <form
        ref={formRef}
        onSubmit={useSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <Fieldset className="flex flex-col gap-4">
          <Field>
            <Label htmlFor="stagename" className="block mb-2">Name *</Label>
            <Input
              {...register('name', {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 charaters long",
                }
              })}
              id="stagename"
              type="text"
              className="px-3 py-1"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </Field>
          <Field>
            <Label htmlFor="stageprice" className="block mb-2">Sale Price *</Label>
            <Input
              {...register('price', {
                required: "Sale Price is required",
                validate: {
                  isValid: (v) => isValidNumber(v, true) || "Price is invalid",
                  overFlowMin: (v) => isNotOverMin(v, 0) || "Price must over 0",
                }
              })}
              id="stageprice"
              type="text"
              className="px-3 py-1"
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
            )}
          </Field>
          <Field>
            <Label htmlFor="mintStartAt" as="p" className="block mb-2">Mint start date & time</Label>
            <XDatePicker
              className="px-3 py-1"
              variant="inline"
              xDate={selectedDate}
              onChangeDate={(d) => {
                setValue("startAt", (!d) ? (new Date()).getTime() : d.getTime());
                setSelectedDate(d);
              }}
            />
          </Field>
          <Field>
            <Label htmlFor="numberOfItems" className="block mb-2">Number of items</Label>
            <Input
              {...register('numberOfItems', {
                validate: (v) => isValidBigInt(v, false) || "Number of items is invalid",
              })}
              id="numberOfItems"
              type="text"
              className="px-3 py-1"
            />
            {errors.numberOfItems && (
              <p className="mt-1 text-xs text-red-600">{errors.numberOfItems.message}</p>
            )}
          </Field>
          <Field>
            <div className="w-full flex justify-between items-center">
              <p className="block mb-2">Per-wallet mint limit(optional)</p>
              <Switch
                checked={mintLimitPerWallet}
                onChange={setMintLimitPerWallet}
                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                />
              </Switch>
            </div>
            {mintLimitPerWallet && (
              <>
                <Label htmlFor="stageperlimit" className="block mb-2">Limits</Label>
                <Input
                  {...register('perlimit', {
                    validate: (v) => isValidBigInt(v, false) || "Limits is invalid",
                  })}
                  id="stageperlimit"
                  type="number"
                  className="px-3 py-1"
                />
                {errors.perlimit && (
                  <p className="mt-1 text-xs text-red-600">{errors.perlimit.message}</p>
                )}
              </>
            )}
          </Field>

          <div>
            <div className="w-full flex justify-between items-center">
              <p className="block text-white text-sm font-medium">Allowlist</p>
              <button type="button" onClick={() => append({ address: "" })}>
                <FaPlusCircle color="blue" size="18" />
              </button>
            </div>
            <p className="block text-white/[60%] text-xs">You can set specific mint limits and prices per wallet, which will override the global sale price and mint limit above for those specified.</p>
          </div>
          <div className="space-y-2">
            {fields.map((field, i) => (
              <>
                <div key={field.id} className="w-full flex items-center">
                  <Input
                    {...register(`allows.${i}.address` as const, {
                      validate: (value) => isAddress(value) || "address is invalid"
                    })}
                    type="text"
                    className="px-3 py-1 mr-1"
                  />
                  <button type="button" onClick={() => remove(i)}><RiDeleteBin2Line color="red" size="18" /></button>
                </div>
                <>
                  {errors.allows?.[i]?.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.allows?.[i]?.address?.message}</p>
                  )}
                </>
              </>
            ))}
          </div>
          <XUpload
            onFileChange={(file) => {
              // TODO uploading csv, and decoding addresses
              // if (!file) {
              //   setErrorFile("none");
              // }
              // setFile(file);
            }}
            onError={(err) => {
              // setErrorFile(err);
            }}
            isError={!errorFile}
            className="w-full min-w-[80px] min-h-[48px]"
            caption="Drag and drop a CSV file"
          />
        </Fieldset>
        <div className="flex lg:w-full items-center justify-end gap-2">
          <Button
            className="w-full"
            type="submit"
          >
            Done
          </Button>
        </div>
      </form>
    </div>
  );
}