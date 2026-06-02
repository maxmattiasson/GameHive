import { type ChangeEvent } from "react";

interface AvatarPickerProps {
  onAvatarSelect: (avatar: ChangeEvent<HTMLSelectElement>) => void;
}

const Avatar = ({ onAvatarSelect }: AvatarPickerProps) => {
  return (
    <div>
      <select onChange={onAvatarSelect} name="avatar_picker">
        <option value="/images/avatar.jpg">Avatar 1</option>
        <option value="/images/avatar2.jpg">Avatar 2</option>
        <option value="/images/avatar3.jpg">Avatar 3</option>
        <option value="/images/avatar4.jpg">Avatar 4</option>
        <option value="/images/avatar5.jpg">Avatar 5</option>
      </select>
    </div>
  );
};
export default Avatar;
