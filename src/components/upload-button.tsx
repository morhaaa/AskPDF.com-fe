import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import DND from "./drag-n-drop"
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {
  triggerButton: () => void;
};

const UploadButton: React.FC<Props> = ({triggerButton}) => {
  return (
      <Dialog>
        <DialogTrigger className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-sm font-sans hover:bg-blue-500">
            Upload PDF
        </DialogTrigger>
        <DialogContent close={triggerButton}>
            <DialogHeader>
            <DialogTitle>Upload you file here</DialogTitle>
            </DialogHeader>
            <DND/>
        </DialogContent>
    </Dialog>
  )
}

export default UploadButton
