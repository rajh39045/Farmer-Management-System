import PrimaryButton from "../ui/PrimaryButton";

const ProductForm = ({
  form,
  loading,
  handleChange,
  handleImages,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label>Quantity</label>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label>Unit</label>

          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="input"
          >
            <option value="kg">kg</option>
            <option value="gram">
              gram
            </option>
            <option value="piece">
              piece
            </option>
            <option value="dozen">
              dozen
            </option>
          </select>
        </div>

        <div className="flex items-center gap-3 mt-8">

          <input
            type="checkbox"
            name="organic"
            checked={form.organic}
            onChange={handleChange}
          />

          <label>Organic Product</label>

        </div>

      </div>

      <div>

        <label>Description</label>

        <textarea
          rows="5"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="input"
          required
        />

      </div>

      <div>

        <label>Product Images</label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
          className="mt-3"
        />

      </div>

      <PrimaryButton
        type="submit"
        loading={loading}
      >
        Save Product
      </PrimaryButton>

    </form>
  );
};

export default ProductForm;