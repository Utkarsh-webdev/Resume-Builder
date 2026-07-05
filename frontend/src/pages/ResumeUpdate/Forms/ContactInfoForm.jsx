import React from "react";
import Input from "../../../components/inputs/Input";
import SectionHeader from "../../../components/ResumeSections/SectionHeader";

const ContactInfoForm = ({ data, onChange }) => {
  return (
    <div>
      <SectionHeader title="Contact Information" />

      <Input label="Email" value={data?.email} onChange={(e) => onChange("email", e.target.value)} placeholder="you@example.com" />
      <Input label="Phone" value={data?.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="+1 555 000 0000" />
      <Input label="Location" value={data?.location} onChange={(e) => onChange("location", e.target.value)} placeholder="City, Country" />
      <Input label="LinkedIn" value={data?.linkedin} onChange={(e) => onChange("linkedin", e.target.value)} placeholder="linkedin.com/in/you" />
      <Input label="GitHub" value={data?.github} onChange={(e) => onChange("github", e.target.value)} placeholder="github.com/you" />
      <Input label="LeetCode" value={data?.leetcode} onChange={(e) => onChange("leetcode", e.target.value)} placeholder="leetcode.com/you" />
      <Input label="Website" value={data?.website} onChange={(e) => onChange("website", e.target.value)} placeholder="yoursite.com" />
    </div>
  );
};

export default ContactInfoForm;