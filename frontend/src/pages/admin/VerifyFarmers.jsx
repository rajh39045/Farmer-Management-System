import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PrimaryButton from "../../components/ui/PrimaryButton";

import useVerifyFarmers from "../../hooks/useVerifyFarmers";

const VerifyFarmers = () => {
  const {
    loading,
    farmers,
    verify,
  } = useVerifyFarmers();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
      />
    );
  }

  return (
    <section className="min-h-screen py-10 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          Verify Farmers
        </h1>

        <div className="space-y-5">

          {farmers.map((farmer) => (

            <div
              key={farmer._id}
              className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
            >

              <div>

                <h2 className="font-bold">
                  {farmer.user?.fullName || farmer.farmName}
                </h2>

                <p className="text-gray-500">
                  {farmer.user?.email}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {farmer.farmLocation}, {farmer.district}
                </p>

              </div>

              {farmer.verificationStatus === "Approved" ? (

                <span className="text-green-600 font-semibold">
                  Verified
                </span>

              ) : (

                <PrimaryButton
                  onClick={() =>
                    verify(farmer._id)
                  }
                >
                  Verify
                </PrimaryButton>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default VerifyFarmers;
