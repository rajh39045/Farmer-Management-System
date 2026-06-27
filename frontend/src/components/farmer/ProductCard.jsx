import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "../../utils/icons";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <img
        src={product.images?.[0]?.url || "/placeholder-product.svg"}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="mt-2 text-gray-500">
              {product.category?.name || "Uncategorized"}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.isAvailable === false ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {product.isAvailable === false ? "Inactive" : "Active"}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>Price: ₹{product.price}</p>
          <p>Quantity: {product.quantity} {product.unit}</p>
          <p>Method: {product.farmingMethod || (product.organic ? "Organic" : "Conventional")}</p>
        </div>

        <h3 className="mt-4 text-2xl font-bold text-green-600">₹{product.price}</h3>

        <div className="mt-6 flex items-center justify-between">
          <Link
            to={`/farmer/products/edit/${product._id}`}
            className="flex items-center gap-2 text-blue-600"
          >
            <FaEdit />
            Edit
          </Link>

          <button
            onClick={() => onDelete(product._id)}
            className="flex items-center gap-2 text-red-600"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;