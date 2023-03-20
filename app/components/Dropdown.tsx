import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  selected?: string;
  options: Array<{
    label: string;
    key: string;
  }>;
  onClick: (key: string) => void;
}

export default function Dropdown({
  options,
  selected,
  onClick,
}: DropdownProps) {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left max-sm:w-full max-sm:h-11 md:w-48"
    >
      <div className="h-full">
        <Menu.Button className="inline-flex w-full h-full justify-center md:justify-between md:content gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 items-center">
          <div>
            {options.find((o) => o.key === selected)?.label ||
              "Choose practice focus"}
          </div>
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full text-center md:text-left origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, i) => (
              <Menu.Item key={`stroke-option-${i}`}>
                <div
                  onClick={() => onClick(option.key)}
                  className={
                    "block px-4 py-2 text-sm text-gray-900 cursor-pointer"
                  }
                >
                  {option.label}
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
