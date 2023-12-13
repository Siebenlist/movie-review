import Link from "next/link";

const DropdownItem = ({ endpoint, genre }) => {
  return (
    <li className="py-3 px-5">
      <Link href={`http://localhost:3000/list/${endpoint}`}>{genre}</Link>
    </li>
  );
};

export default DropdownItem;
