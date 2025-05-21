export default function Button({ text, type }) {
  return (
    <button
      type={type}
      className="bg-transparent border border-secondary font-causten-medium text-lg rounded-lg px-12 py-3 text-black"
    >
      {text}
    </button>
  );
}
