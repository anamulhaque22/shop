"use client";
import { AddressType } from "@/constants/address-type";
import useToast from "@/hooks/useToast";
import HTTP_CODES from "@/services/api/constants/http-codes";
import {
  useDeleteAddressService,
  useGetAddressesService,
  useGetAddressService,
  usePatchAddressService,
} from "@/services/api/services/address";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";
import * as yup from "yup";
import EditAddress from "./EditAddress";

const validationSchema = yup.object().shape({
  // id: yup.string().required("Id is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  streetAddress: yup.string().required("Street Address is required"),
  aptSuiteUnit: yup.string(),
  city: yup.string().required("City is required"),
  phone: yup.string().required("Phone is required"),
  isDefaultShippingAddress: yup.boolean(),
  isDefaultBillingAddress: yup.boolean(),
  addressType: yup.string().required("Address Type is required"),
});

const MyAddress = () => {
  const [showModal, setShowModal] = useState(false);
  const showToast = useToast();
  const fetchGetAddresses = useGetAddressesService();
  const fetchGetAddress = useGetAddressService();
  const fetchPatchAddress = usePatchAddressService();
  const fetchDeleteAddress = useDeleteAddressService();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // id: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      aptSuiteUnit: "",
      city: "",
      phone: "",
      isDefaultShipping: false,
      isDefaultBilling: false,
      addreddType: AddressType.HOME,
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const getAddresses = async () => {
      const { status, data: addresses } = await fetchGetAddresses();
      if (status === HTTP_CODES.OK) {
        setAddresses(addresses);
      }
    };

    getAddresses();
  }, [fetchGetAddresses]);

  const handleRemoveAddress = async (id) => {
    const { status } = await fetchDeleteAddress(id);
    if (status === HTTP_CODES.NO_CONTENT) {
      const newAddresses = addresses.filter((address) => address.id !== id);
      setAddresses(newAddresses);
    }
  };

  const defaultAddress = (address) => {
    if (address.isDefaultShipping && address.isDefaultBilling) {
      return "Default shipping and billing address";
    } else if (address.isDefaultShipping) {
      return "Default shipping address";
    } else if (address.isDefaultBilling) {
      return "Default billing address";
    }
  };

  const handleEditAddress = async (addressId) => {
    const { status, data: address } = await fetchGetAddress(addressId);
    if (status !== HTTP_CODES.OK) {
      showToast("Error fetching address", "error");
      return;
    }
    reset({
      firstName: address.firstName,
      lastName: address.lastName,
      streetAddress: address.streetAddress,
      aptSuiteUnit: address.aptSuiteUnit,
      city: address.city,
      phone: address.phone,
      isDefaultShipping: address.isDefaultShipping,
      isDefaultBilling: address.isDefaultBilling,
      addressType: address.addressType,
    });
    setSelectedAddressId(addressId);
    setShowModal(true);
  };

  const onSubmit = handleSubmit(async (formData) => {
    const { status, data: updatedAddress } = await fetchPatchAddress(
      selectedAddressId,
      formData
    );

    if (status !== HTTP_CODES.OK) {
      showToast("Error updating address", "error");
      return;
    }

    const newAddresses = addresses.map((address) => {
      if (address.id === selectedAddressId) {
        return updatedAddress;
      }
      return address;
    });

    setAddresses(newAddresses);
    setShowModal(false);
  });

  const handleSetAddressAsDefault = async (id) => {
    const { status, data: updatedAddress } = await fetchPatchAddress(id, {
      isDefaultShipping: true,
      isDefaultBilling: true,
    });

    if (status === HTTP_CODES.OK) {
      showToast("Updated", "success");
      const newAddresses = addresses.map((address) => {
        if (address.id === selectedAddressId) {
          return updatedAddress;
        }
        return address;
      });
      setAddresses(newAddresses);
    } else {
      showToast("Error updating address", "error");
      return;
    }
  };

  return (
    <div className="custom-shadow mt-6 py-6 px-5 rounded-lg">
      <div className="flex justify-between mb-6">
        <h3 className="font-causten-bold text-2xl text-[#3C4242] mb-3">
          My Addresses
        </h3>
        <Link href={"/add-address"} className="hidden md:flex btn">
          Add Address
          <FaMapMarkerAlt className="text-white" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {addresses?.length > 0 ? (
          addresses?.map((address) => (
            <div className="rounded-md shadow-md" key={address.id}>
              <div className="flex justify-between p-5 bg-[#F5F6F8]">
                <p>{address.addressType}</p>
                <p>
                  {defaultAddress({
                    isDefaultShipping: address.isDefaultShipping,
                    isDefaultBilling: address.isDefaultBilling,
                  })}
                </p>
              </div>
              <div className="p-5">
                <p className="text-base font-causten-bold">
                  Name{" "}
                  <span className="font-causten-regular ml-2">
                    {address?.firstName + " " + address?.lastName}
                  </span>
                </p>
                <p className="text-base font-causten-bold">
                  Phone
                  <span className="font-causten-regular ml-2">
                    {address?.phone}
                  </span>
                </p>
                <p className="text-base font-causten-bold">
                  Address
                  <span className="font-causten-regular ml-2">
                    {address?.aptSuiteUnit +
                      ", " +
                      address?.streetAddress +
                      ", " +
                      address?.city}
                  </span>
                </p>
                <div className="text-base font-causten-bold flex flex-row gap-x-2 leading-none mt-3">
                  <button
                    className=""
                    onClick={() => handleRemoveAddress(address.id)}
                  >
                    Remove
                  </button>
                  <button
                    className={`${
                      address.isDefaultBilling || address.isDefaultShipping
                        ? "border-l-2 pl-2"
                        : "border-x-2 px-2"
                    }`}
                    onClick={() => handleEditAddress(address.id)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleSetAddressAsDefault(address.id)}
                    className={`${
                      address.isDefaultBilling || address.isDefaultShipping
                        ? "hidden"
                        : ""
                    }`}
                  >
                    Set as default
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No address found</p>
        )}
      </div>

      <div className="block md:hidden mt-3">
        <Link href={"/add-address"} className="btn">
          Add Address
          <FaMapMarkerAlt className="text-white" />
        </Link>
      </div>

      {showModal && (
        <EditAddress
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MyAddress;
