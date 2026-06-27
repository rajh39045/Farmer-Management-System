import { Outlet } from "react-router-dom";

import AuthBanner from "../components/auth/AuthBanner";

const AuthLayout = () => {
  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-br
        from-green-50
        via-white
        to-emerald-100
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-7xl
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          grid
          lg:grid-cols-2
        "
      >
        {/* Left Side */}

        <AuthBanner />

        {/* Right Side */}

        <div
          className="
            flex
            items-center
            justify-center
            p-8
            lg:p-16
          "
        >
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;