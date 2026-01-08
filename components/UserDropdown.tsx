'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import NavItems from "./NavItems"
import { signOut } from "@/lib/actions/auth.actions"

const UserDropdown = ({ user } : {user: User}) => {
    const router = useRouter()

    const handleSignOut = async () => {
      await signOut()
      router.push('/sign-in')
    }

  return (
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 text-gray-400 hover:bg-yellow-500">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://lh3.googleusercontent.com/ogw/AF2bZygImN8fkcoO5C0QZTQJPf7yG4V8bqBJ4Cx0tKjgLcgEhQ=s64-c-mo" alt={user.name} />
                <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                    {user.name[0]}
                </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
                <span className="text-base font-medium text-gray-400">
                    {user.name}
                </span>
                <span className="font-normal">
                    {user.email}
                </span>
            </div>
        </Button>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="w-46" align="start">
        
        <DropdownMenuGroup className="sm:hidden">
          <nav>
            <NavItems />
          </nav>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="sm:hidden" />
          <DropdownMenuItem onClick={handleSignOut}>
            Log out
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown