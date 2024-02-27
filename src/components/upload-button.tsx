import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DND from "./drag-n-drop";

type Props = {
  triggerButton: () => void;
  disabled: boolean;
};

const UploadButton: React.FC<Props> = ({ triggerButton, disabled }) => {
  return (
    <Dialog>
      <DialogTrigger
        disabled={disabled}
        className="bg-blue-600 text-sm xl:text-base text-white font-semibold py-2 px-3 xl:px-4 rounded-sm font-sans hover:bg-blue-500 disabled:bg-zinc-200"
      >
        Upload PDF
      </DialogTrigger>
      <DialogContent close={triggerButton}>
        <DialogHeader>
          <DialogTitle>Upload you file here</DialogTitle>
        </DialogHeader>
        <DND />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
