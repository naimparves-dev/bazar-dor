// import TodayUp from "@/components/Homepage/TodayUp";
// import TodayDown from "@/components/Homepage/TodayDown";
// import AllProducts from "@/components/Homepage/AllProducts";
// import type { Product } from "@/components/Shared/Marquee";

// const ProductsSection = async () => {
//   const res = await fetch(
//     "https://api.api-store.workers.dev/api/bazardor/products"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const products: Product[] = await res.json();

//   const UpProducts = products.filter(
//     (product) => product.change.dir === "up"
//   );

//   const downProducts = products.filter(
//     (product) => product.change.dir === "down"
//   );

//   return (
//     <>
//       <TodayUp UpProducts={UpProducts.slice(0, 6)} />

//       <TodayDown downProducts={downProducts.slice(0, 6)} />

//       <AllProducts products={products.slice(0, 33)} />
//     </>
//   );
// };

// export default ProductsSection;