import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, ShoppingBag, ShoppingCart, ListTodo } from "lucide-react"
import { ModeToggle } from "./theme-toggle"
import { useNavigate, useLocation } from "react-router"

type AppBarProps = {
  onMenuClick?: () => void
  user?: {
    name?: string
    email?: string
    image?: string
  }
}

export function AppBar({ onMenuClick, user }: AppBarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 
            className="text-xl font-semibold cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate('/')}
          >
            online store
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-2">
          <Button
            variant={isActive('/') ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Products
          </Button>
          <Button
            variant={isActive('/cart') ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate('/cart')}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Button>
          <Button
            variant={isActive('/orders') ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate('/orders')}
            className="gap-2"
          >
            <ListTodo className="h-4 w-4" />
            Orders
          </Button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Products
                </DropdownMenuItem>
              </DropdownMenuContent>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/cart')}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </DropdownMenuItem>
              </DropdownMenuContent>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  <ListTodo className="h-4 w-4 mr-2" />
                  Orders
                </DropdownMenuItem>
              </DropdownMenuContent>
              </DropdownMenu>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
