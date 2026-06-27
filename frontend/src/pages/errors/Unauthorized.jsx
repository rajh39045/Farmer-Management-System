import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          403
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          You do not have permission to access this page.
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
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default Unauthorized;
