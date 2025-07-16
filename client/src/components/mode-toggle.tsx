import { Moon, Sun } from "lucide-react";
import useTheme from "@/hooks/useTheme";

// UI Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ModeToggle() {
  // Hook
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>

      {/* DROPDOWN TRIGGER */}
      <DropdownMenuTrigger asChild className="fixed z-50 right-5 top-5">
        <Button>
          <Sun className="h-5 w-h-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* DROPDOWN TRIGGER */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
      
    </DropdownMenu>
  );
}

export default ModeToggle;
