const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>

          <p className="text-gray-700 leading-8 mb-10">
            Have questions or need help? Reach out to our support team and we’ll
            get back to you soon.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Get in touch
              </h2>
              <p className="text-gray-700 leading-7 mb-4">
                Email us at <strong>support@krishimarket.example</strong> for
                general inquiries, or call us at <strong>+91 12345 67890</strong>
                for urgent support.
              </p>
              <p className="text-gray-700 leading-7">
                You can also reach our farmer support team for help with listings,
                orders, and product management.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center rounded-2xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
