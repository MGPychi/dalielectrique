import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { getProductDetailWithSlug } from "@/app/data/products-data";
import ImageGallery from "../_components/ImageGallery";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await getProductDetailWithSlug(params.slug);

  if (!product) notFound();

  return (
    <section className="container mx-auto px-4 py-8 pt-14 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images Section */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* Product Details Section */}
        <div className="space-y-8">
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="space-x-2">
                {product.isFeatured && (
                  <Badge className="bg-yellow-100 hover:bg-yellow-100 text-yellow-800 px-3 py-1">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetailsPage;
