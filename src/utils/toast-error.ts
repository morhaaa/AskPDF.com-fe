import toast from "react-hot-toast";

export default function toastError(message: JSX.Element | string) {
  return toast.error(message, {
    style: { backgroundColor: "#fcbdb8", border: "0.5px red solid" },
  });
}
