interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
