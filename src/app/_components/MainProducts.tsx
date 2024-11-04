import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { getAllFeaturedActiveProducts } from "../data/products-data";
import Image from "next/image";

const MainProducts = async () => {
  const products = await getAllFeaturedActiveProducts();
  return (
    <section>
      <div className="mx-auto container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((item) => (
            <ProductItem product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
interface ProductItemProps {
  product: Awaited<ReturnType<typeof getAllFeaturedActiveProducts>>[0];
}
const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Card>
      <CardHeader>
        <Image
          alt={`${product.name} image`}
          src={product.images[0].url}
          width={300}
          height={250}
        />
      </CardHeader>
      <CardContent>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default MainProducts;
