import { type ChangeEvent } from "react";
interface AvatarPickerProps {
  value: string;
  onAvatarSelect: (avatar: ChangeEvent<HTMLSelectElement>) => void;
}

const Avatar = ({ value, onAvatarSelect }: AvatarPickerProps) => {
  return (
    <div>
      <select value={value} onChange={onAvatarSelect} name="avatar_picker">
        <option value="avatar1">Avatar 1</option>
        <option value="avatar2">Avatar 2</option>
        <option value="avatar3">Avatar 3</option>
        <option value="avatar4">Avatar 4</option>
        <option value="avatar5">Avatar 5</option>
      </select>
    </div>
  );
};
export default Avatar;
