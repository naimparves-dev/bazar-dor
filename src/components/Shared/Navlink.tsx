
import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlink = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );
  if (!res.ok) { throw new Error("Failed to fetch categories"); }

  const data: Category[] = await res.json();

  return (
    <nav className="w-full">
      <div className="flex items-center justify-start gap-7 overflow-x-auto py-3">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/catagory/${item.slug}`}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-gray-800 transition-colors hover:text-green-700"
          >
            <span>{item.icon}</span>
            <span>{item.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlink;