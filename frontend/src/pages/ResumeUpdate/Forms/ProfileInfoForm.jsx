import React from "react";
import Input from "../../../components/inputs/Input";
import TextArea from "../../../components/inputs/TextArea";
import SectionHeader from "../../../components/ResumeSections/SectionHeader";
import ProfilePhotoSelector from "../../../components/inputs/ProfilePhotoSelector";

const ProfileInfoForm = ({ data, onChange }) => {
  return (
    <div>
      <SectionHeader
        title="Profile"
        subtitle="How you introduce yourself at the top of the resume."
      />

      <ProfilePhotoSelector
        image={data?.profileImg}
        setImage={(file) => onChange("profileImg", file)}
        preview={data?.profilePreviewUrl}
        // setPreview intentionally NOT wired to onChange — the selector
        // already tracks its own local blob preview for display. Only a
        // real, server-returned URL should ever be written to
        // profilePreviewUrl, which happens in uploadResumeImages after a
        // successful upload. Persisting a transient blob: URL here would
        // save a dead link that breaks on reload and crashes thumbnail
        // capture (html-to-image can't rasterize a broken <img>).
      />

      <Input
        label="Full Name"
        value={data?.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
        placeholder="Jordan Lee"
      />

      <Input
        label="Designation"
        value={data?.designation}
        onChange={(e) => onChange("designation", e.target.value)}
        placeholder="Product Designer"
      />

      <TextArea
        label="Summary"
        value={data?.summary}
        onChange={(e) => onChange("summary", e.target.value)}
        placeholder="A short pitch about yourself"
      />
    </div>
  );
};

export default ProfileInfoForm;