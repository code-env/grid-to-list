import { LayoutGrid, List, LucideIcon, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "./utils";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

type ViewType = "grid" | "list";

const listItems: {
  name: ViewType;
  icon: LucideIcon;
}[] = [
  {
    name: "grid",
    icon: LayoutGrid,
  },
  {
    name: "list",
    icon: List,
  },
];

export default function App() {
  const [view, setView] = useState<ViewType>("grid");

  // Load view from localStorage on mount
  useEffect(() => {
    const savedView = localStorage.getItem("view");
    if (savedView) {
      setView(savedView as ViewType);
    }
  }, []);

  // Memoize the view change handler
  const handleViewChange = useCallback((view: ViewType) => {
    localStorage.setItem("view", view);
    setView(view);
  }, []);

  return (
    <div className="min-h-screen overflow-y-auto py-20 bg-gray-50">
      <div className="flex flex-col gap-10 max-w-5xl w-full mx-auto p-10">
        <Header view={view} onViewChange={handleViewChange} />
        {view === "grid" ? <GridView /> : <ListView />}
      </div>
    </div>
  );
}

type HeaderProps = {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
};

const Header = ({ view, onViewChange }: HeaderProps) => {
  return (
    <div className="flex items-center w-full justify-between h-16 border-b border-gray-200 pb-10">
      <h1 className="text-4xl font-bold">Grid to List</h1>
      <div className="rounded-lg bg-gray-100 p-1 gap-4 flex items-center">
        {listItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onViewChange(item.name)}
            className={cn(
              "size-10 flex items-center justify-center rounded",
              view === item.name && "bg-gray-200"
            )}
            aria-pressed={view === item.name}
          >
            <item.icon aria-hidden="true" className="size-4" />
          </button>
        ))}
      </div>
    </div>
  );
};

const GridView = () => {
  return (
    <motion.div>
      <div className="grid grid-cols-3 gap-4 ">
        {Array.from({ length: 10 }).map((_, index) => (
          <Item key={index} index={index} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Avatar index={index} />
              <Options index={index} />
            </div>
            <Other index={index} />
          </Item>
        ))}
      </div>
    </motion.div>
  );
};

const ListView = () => {
  return (
    <motion.div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Item
          key={index}
          index={index}
          className="flex items-center justify-between gap-4"
        >
          <Avatar index={index} />
          <Other index={index} />
          <Options index={index} />
        </Item>
      ))}
    </motion.div>
  );
};

const Item = ({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "bg-white w-full rounded-lg p-4 shadow-md hover:shadow-lg",
        className
      )}
      layoutId={`item-${index}`}
    >
      {children}
    </motion.div>
  );
};

const Avatar = ({ index }: { index: number }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <motion.div
          layoutId={`avatar-${index}`}
          className="size-10 rounded-full bg-gray-200"
        />
        <div className="flex flex-col">
          <motion.h3 layoutId={`name-${index}`} className="text-lg font-bold">
            John Doe
          </motion.h3>
          <motion.p
            layoutId={`email-${index}`}
            className="text-sm text-gray-500"
          >
            john@doe.com
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const Options = ({ index }: { index: number }) => {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        layoutId={`delete-${index}`}
        className="size-8 rounded-full border-2 border-gray-200 flex items-center justify-center"
      >
        <Trash2 className="size-4 text-gray-500" />
      </motion.button>
    </div>
  );
};

const Other = ({ index }: { index: number }) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-72">
      <motion.div
        layoutId={`other-${index}`}
        className="w-full h-2 rounded-full border-2 border-gray-200 flex items-center justify-center"
      />
      <motion.div
        layoutId={`other-another-${index}`}
        className="w-full max-w-56 h-2 rounded-full border-2 border-gray-200 flex items-center justify-center"
      />
    </div>
  );
};
