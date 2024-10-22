import classNames from "classnames";
import { useCallback, useState } from "react";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import toast from "react-hot-toast";
import { HiOutlineUpload } from "react-icons/hi";

export default function XUpload({
  onFileChange,
  onError,
  isError,
}: {
  onFileChange: (file: File | null) => void;
  onError: (err: "none" | "exceed" | "invalid-ext" | "drop-fail" | null) => void;
  isError: boolean,
}) {
  const [file, setFile] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(([firstFile]: File[]) => {

    try {
      const maxSize = 500 * 1024; // 500KB
      if (firstFile.size > maxSize) {
        onError("exceed");
        setFile(null);
        return;
      }

      // Check for accepted file types
      const acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "video/mp4"];
      if (!acceptedTypes.includes(firstFile.type)) {
        onError("invalid-ext");
        setFile(null);
        return;
      }

      onFileChange(firstFile);

      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => setFile(reader.result as string);
      reader.readAsDataURL(firstFile);
    } catch (err) {
      console.error("[ERROR ON USECALLBACK WITH ONDROP-ZONE]", err);
      onError("drop-fail");
      setFile(null);
    }
  }, [onFileChange]);

  return (
    <>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="relative">
            <div
              {...getRootProps()}
              className={classNames(
                "min-h-[25vw] min-w-[25vw] bg-golden-1300 rounded-2xl flex flex-col items-center justify-center text-white opacity-70 cursor-pointer",
                isError && "border-destructive"
              )}
            >
              <input {...getInputProps()} accept=".jpg, .jpeg, .png, .gif, .svg, .mp4" />
              {!!file ? (
                <>
                  <img
                    src={file}
                    className="max-h-56 rounded-2xl"
                  />
                  {/* <Button
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    className="absolute top-2 right-2"
                    onClick={(event) => {
                      event.stopPropagation();
                      setDialogOpen(true);
                    }}
                  >
                    <Expand size={20} />
                  </Button> */}
                </>
              ) : (
                <>
                  <HiOutlineUpload color="white" size={36} />
                  <span className="text-lg font-medium text-white">Drag & drop media</span>
                  <span className="text-sm font-medium text-golden-1000">Browse files</span>
                  <span className="text-xs text-gray-400">Max size: 500KB</span>
                  <span className="text-xs text-gray-400">JPG, PNG, GIF, SVG, MP4</span>
                </>
              )}
            </div>
          </section>
        )}
      </Dropzone>

      {/* <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[96vw] max-h-[96vh]">
          <MediaRenderer
            client={client}
            src={file}
            style={{
              width: "96vw",
              height: "calc(100vh - 6rem)",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog> */}
    </>
  );
}
