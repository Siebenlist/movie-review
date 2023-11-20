import Link from "next/link";

const DropdownItem = ({ href, genre }) => {
  return (
    <li className="py-3 px-5 text-base">
      <Link href={href}>{genre}</Link>
    </li>
  );
};

export default DropdownItem;
