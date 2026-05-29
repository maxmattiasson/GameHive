import React, { useState } from "react";
import Button from "./Button";

interface AvatarUploadProps {
  currentAvatarUrl: string;
  onUploadSuccess?: (newUrl: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatarUrl,
  onUploadSuccess
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(currentAvatarUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await fetch("api", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      onUploadSuccess?.(data.avatarUrl);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <img src={preview} alt="Avatar" />
      <input type="file" accept="image/*" onChange={handleAvatarChange} />
      <Button
        color="primary"
        onClick={handleAvatarUpload}
        disabled={!selectedFile || loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
export default AvatarUpload;
