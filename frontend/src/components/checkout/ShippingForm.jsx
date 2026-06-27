import Input from "../ui/Input";
import TextArea from "../ui/TextArea";

const ShippingForm = ({
  address,
  updateAddress,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Shipping Address
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {/* Full Name */}

        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={address.fullName}
          onChange={(e) =>
            updateAddress(
              "fullName",
              e.target.value
            )
          }
          required
        />

        {/* Phone */}

        <Input
          label="Phone Number"
          placeholder="9876543210"
          value={address.phone}
          onChange={(e) =>
            updateAddress(
              "phone",
              e.target.value
            )
          }
          required
        />

        {/* Email */}

        <Input
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          value={address.email}
          onChange={(e) =>
            updateAddress(
              "email",
              e.target.value
            )
          }
        />

        {/* Pincode */}

        <Input
          label="Pincode"
          placeholder="110001"
          value={address.pincode}
          onChange={(e) =>
            updateAddress(
              "pincode",
              e.target.value
            )
          }
          required
        />

        {/* State */}

        <Input
          label="State"
          placeholder="Bihar"
          value={address.state}
          onChange={(e) =>
            updateAddress(
              "state",
              e.target.value
            )
          }
          required
        />

        {/* City */}

        <Input
          label="City"
          placeholder="Patna"
          value={address.city}
          onChange={(e) =>
            updateAddress(
              "city",
              e.target.value
            )
          }
          required
        />

      </div>

      {/* Address */}

      <div className="mt-5">

        <TextArea
          label="Address"
          rows={4}
          placeholder="House No, Street, Area..."
          value={address.address}
          onChange={(e) =>
            updateAddress(
              "address",
              e.target.value
            )
          }
          required
        />

      </div>

      {/* Landmark */}

      <div className="mt-5">

        <Input
          label="Landmark"
          placeholder="Near Temple / School"
          value={address.landmark}
          onChange={(e) =>
            updateAddress(
              "landmark",
              e.target.value
            )
          }
        />

      </div>

    </div>
  );
};

export default ShippingForm;