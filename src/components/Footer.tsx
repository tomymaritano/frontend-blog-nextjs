export default function Footer() {
  return (
    <footer className="mt-16 py-6 text-center text-sm text-gray-400 backdrop-blur-md">
      <p>
        © {new Date().getFullYear()} — Built with <span className="text-white">Next.js</span>,{" "}
        <span className="text-white">Sanity</span> & <span className="text-white">Tailwind CSS</span>.
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Crafted with ☕ & ⚡ from Argentina by <span className="text-teal-400 font-medium">Tomás Maritano</span>.
      </p>
    </footer>
  );
}
