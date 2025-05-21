"use client";

import { ROLES } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function FilterUser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [roles, setRoles] = useState(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) {
      const parsedFilters = JSON.parse(searchParamsFilter);
      return parsedFilters.roles || [];
    }
    return [];
  });

  const updateURLParams = (updatedRoles) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (updatedRoles.length > 0) {
      searchParams.set(
        "filter",
        JSON.stringify({ roles: updatedRoles.map((role) => ({ id: role.id })) })
      );
    } else {
      searchParams.delete("filter");
    }

    router.push(window.location.pathname + "?" + searchParams.toString());
  };

  const handleAddRole = (e) => {
    const value = e.target.value;
    if (!value) return;

    const roleObj = JSON.parse(value);

    // Prevent duplicates
    if (roles.some((role) => role.id === roleObj.id)) return;

    const updatedRoles = [...roles, roleObj];
    setRoles(updatedRoles);
    updateURLParams(updatedRoles);
  };

  const handleRemoveRole = (roleId) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId);
    setRoles(updatedRoles);
    updateURLParams(updatedRoles);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Display Selected Roles */}
      {roles.map((role) => (
        <div
          key={role.id}
          className="flex items-center bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md"
        >
          {/* <span>{role.name}</span> */}
          {Object.entries(ROLES).map(([key, value]) => {
            if (value === role.id) {
              return <span key={key}>{key}</span>;
            }
          })}
          <button
            onClick={() => handleRemoveRole(role.id)}
            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
          >
            <FiX size={16} />
          </button>
        </div>
      ))}

      {/* Select Input */}
      <select
        onChange={handleAddRole}
        value=""
        className="select select-sm select-bordered focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary text-text"
      >
        <option value="">Add Role</option>
        <option value={JSON.stringify({ id: ROLES.USER, name: "User" })}>
          User
        </option>
        <option value={JSON.stringify({ id: ROLES.ADMIN, name: "Admin" })}>
          Admin
        </option>
      </select>
    </div>
  );
}
