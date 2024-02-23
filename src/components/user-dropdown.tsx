import Image from "next/image";
import {
  CreditCard,
  LogOut,
  GalleryHorizontalEnd,
  ImagePlus,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/userAuth";
import { truncateString } from "@/utils/truncate-string";

interface Props {}

const UserDropdown: React.FC<Props> = ({}) => {
  const router = useRouter();
  const email = useAuth()?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-9 w-9 bg-indigo-500 rounded-full drop-shadow">
          <p className="text-white font-semibold font-sans">
            {email?.charAt(0).toUpperCase()}
          </p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-xl border-zinc-300 bg-gradient-to-br font-sans bg-zinc-50 mt-1 mr-6">
        <DropdownMenuLabel className=" px-3 py-2 flex flex-col">
          <p className="text-sm">{truncateString(email || "", 26)}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-200" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="py-2 pl-3 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <FileText className="mr-2 h-5 w-5" />
            <span className="text-base font-medium px-2">Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3 pl-3 cursor-pointer">
            <CreditCard className="mr-2 h-5 w-5" />
            <span className="text-base font-medium px-2">Pricing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-zinc-300" />
        <DropdownMenuItem className="py-2 pl-3 cursor-pointer">
          <LogOut className="mr-2 h-5 w-5" />
          <span className="text-base font-medium px-2">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
