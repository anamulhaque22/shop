import { useState } from "react";

export default function SelectAddress({ handleSetBillingAddressId }) {
  const [addresses, setAddresses] = useState([]);
  // const fetchGetAddresses = useGetAddressesService();
  // useEffect(() => {
  //   const getAddresses = async () => {
  //     const { status, data: addresses } = await fetchGetAddresses();
  //     if (status === HTTP_CODES.OK) {
  //       setAddresses(addresses);
  //       const defaultAddress = addresses.find((a) => a.isDefaultBilling);
  //       if (defaultAddress) {
  //         handleSetBillingAddressId(defaultAddress.id);
  //       }
  //     }
  //   };

  //   getAddresses();
  // }, [fetchGetAddresses, handleSetBillingAddressId]);
  return addresses?.length > 0 ? (
    <div>
      <h3>Select Address</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white custom-shadow overflow-hidden rounded-lg flex flex-row items-center gap-x-3
            px-2 py-3"
          >
            <input
              type="radio"
              name="radio-1"
              className="radio flex-shrink-0"
              checked={address.isDefaultBilling}
              onChange={() => handleSetBillingAddressId(address.id)}
            />

            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {address.firstName} {address.lastName}
                </h3>
                <h3 className="text-base font-medium leading-6 text-gray-900">
                  {address.addressType}
                </h3>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {address.streetAddress}, {address.city}
              </p>
            </div>
            {/* <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {address.phone}
                  </dd>
                </div>
              </dl>
            </div> */}
            {/* <div className="px-4 py-4 sm:px-6">
              <button
                // onClick={() => handleSetBillingAddressId(address.id)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Use this address
              </button>
              <button
                // onClick={() => handleRemoveAddress(address.id)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Remove
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
