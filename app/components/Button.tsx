interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-800 text-white font-medium w-full h-full py-2 px-4 rounded-md border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
