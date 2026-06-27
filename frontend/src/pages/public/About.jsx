const About = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Krishi Market
          </h1>

          <p className="text-lg text-gray-700 leading-8 mb-6">
            Krishi Market connects farmers directly with customers across India.
            Our platform helps farmers showcase fresh, organic produce while
            buyers discover trusted local products at fair prices.
          </p>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-8">
                We believe in building a sustainable supply chain that empowers
                farmers and offers customers fresh, traceable produce.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                What We Offer
              </h2>
              <ul className="list-disc list-inside text-gray-700 leading-8">
                <li>Verified farmer listings</li>
                <li>Fresh product discovery</li>
                <li>Easy ordering and secure checkout</li>
                <li>Transparent pricing</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Freshness
              </h3>
              <p className="text-gray-600 leading-7">
                Every product is sourced directly from farmers and delivered
                with care.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Trust
              </h3>
              <p className="text-gray-600 leading-7">
                We verify our farmers and ensure quality in every step of the
                supply chain.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600 leading-7">
                Supporting local agriculture means supporting communities and
                sustainable livelihoods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
