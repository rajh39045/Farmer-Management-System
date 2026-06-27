import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-green-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="
            inline-flex
            items-center
            justify-center
            px-6
            py-3
            rounded-xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-green-600
            to-emerald-500
          "
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
