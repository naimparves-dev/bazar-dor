
import MarqueeSlider from "react-fast-marquee";

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const products: Product[] = await res.json();

  return (
    <div className="border-y border-gray-200 bg-white py-3">
      <MarqueeSlider
        speed={40}
        pauseOnHover
        gradient={false}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="mx-6 flex shrink-0 items-center gap-2 text-sm"
          >
            <span className="text-xl">{product.image}</span>

            <span className="font-medium text-gray-800">
              {product.nameBn}
            </span>

            <span className="font-bold text-gray-900">
              ৳{product.today}/{product.unit}
            </span>

            <span
              className={`font-semibold ${product.change.dir === "up"
                  ? "text-green-600"
                  : product.change.dir === "down"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {Math.abs(product.change.pct)}%
            </span>
          </div>
        ))}
      </MarqueeSlider>
    </div>
  );
};

export default Marquee;
