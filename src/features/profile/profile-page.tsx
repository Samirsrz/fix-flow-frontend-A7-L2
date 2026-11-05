"use client";

import { useState } from "react";
import { useMe, useUpdateMe } from "./hooks";
import { ProfileView } from "./profile-view";
import { ProfileEditForm, type ProfileValues } from "./profile-edit-form";

export function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const { data: user, isPending } = useMe();
  const { mutateAsync: updateMe, isPending: isUpdating } = useUpdateMe();

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
        <div className="h-24 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!user) return null;

  const phone =
    user.resident?.phone ?? user.manager?.phone ?? user.worker?.phone;
  const unitNumber = user.resident?.unitNumber;
  const specialization = user.worker?.specialization;

  const handleSubmit = async (values: ProfileValues) => {
    await updateMe({
      name: values.name,
      phone: values.phone || undefined,
      unitNumber: values.unitNumber || undefined,
      specialization: values.specialization || undefined,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <ProfileEditForm
        defaultValues={{
          name: user.name,
          phone: phone ?? "",
          unitNumber: unitNumber ?? "",
          specialization: specialization ?? "",
        }}
        role={user.role}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(false)}
        isLoading={isUpdating}
      />
    );
  }

  return (
    <ProfileView
      user={{
        name: user.name,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
        phone,
        unitNumber,
        specialization,
      }}
      onEdit={() => setEditing(true)}
    />
  );
}