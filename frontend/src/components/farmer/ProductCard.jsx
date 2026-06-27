import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
} from "../../utils/icons";

const ProductCard = ({
  product,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <img
        src={
          product.images?.[0]?.url ||
          "https://via.placeholder.com/400"
        }
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-semibold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {product.category?.name}
        </p>

        <h3 className="text-2xl text-green-600 font-bold mt-4">
          ₹{product.price}
        </h3>

        <div className="flex justify-between items-center mt-6">

          <Link
            to={`/farmer/products/edit/${product._id}`}
            className="flex items-center gap-2 text-blue-600"
          >
            <FaEdit />
            Edit
          </Link>

          <button
            onClick={() =>
              onDelete(product._id)
            }
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