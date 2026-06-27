import { motion } from "framer-motion";

import useProducts from "../../hooks/useProducts";

import SectionHeading from "../../components/ui/SectionHeading";

import ProductSearch from "../../components/product/ProductSearch";
import ProductSort from "../../components/product/ProductSort";
import ProductSidebar from "../../components/product/ProductSidebar";
import ProductGrid from "../../components/product/ProductGrid";

import Pagination from "../../components/ui/Pagination";

const Products = () => {
  const {
    products,
    categories,

    loading,

    page,
    setPage,

    totalPages,

    search,
    setSearch,

    sort,
    setSort,

    filters,
    setFilters,

    resetFilters,
  } = useProducts();

  return (
    <section className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <SectionHeading
          badge="Marketplace"
          title="Fresh"
          highlight="Products"
          subtitle="Buy directly from verified farmers across India."
        />

        {/* Search + Sort */}

        <div className="flex flex-col md:flex-row gap-5 justify-between mb-8">

          <div className="flex-1">

            <ProductSearch
              search={search}
              setSearch={setSearch}
            />

          </div>

          <ProductSort
            sort={sort}
            setSort={setSort}
          />

        </div>

        {/* Main Layout */}

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}

          <ProductSidebar
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />

          {/* Products */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="lg:col-span-3"
          >

            <ProductGrid
              loading={loading}
              products={products}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default Products;