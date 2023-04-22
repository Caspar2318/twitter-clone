import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useSpecificUser from "@/hooks/useSpecificUser";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useSpecificUser(
    currentUser?.currentUser.id
  );
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileImage(currentUser?.currentUser.profileImage);
    setCoverImage(currentUser?.currentUser.coverImage);
    setName(currentUser?.currentUser.name);
    setUsername(currentUser?.currentUser.username);
    setBio(currentUser?.currentUser.bio);
  }, [
    currentUser?.currentUser.profileImage,
    currentUser?.currentUser.coverImage,
    currentUser?.currentUser.name,
    currentUser?.currentUser.username,
    currentUser?.currentUser.bio,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();

      toast.success("Profile updated!");
      editModal.onClose();
    } catch (error) {
      toast.error("Please do not leave name or username as empty.");
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    username,
    bio,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image."
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image."
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
