
import type { Product } from "./Marquee";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="rounded-xl border border-[#e1e9e2] bg-[#f9fcf9] p-3 transition hover:border-[#b8d8c2] hover:shadow-sm">
      {/* Product Image & Name */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f4eb] text-2xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#27332b]">
            {product.nameBn}
          </h3>

          <p className="text-[11px] text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      {/* Price & Percentage */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-gray-500">
            আজকের বাজারদর
          </p>

          <p className="text-base font-bold text-[#202923]">
            ৳{product.today} <span className="text-xs font-normal">টাকা</span>
          </p>
        </div>

        <span
          className={`mb-0.5 inline-flex shrink-0 items-center rounded-full px-2 py-1 text-[10px] font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {Math.abs(product.change.pct).toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
