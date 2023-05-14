import { Tree } from "primereact/tree";
import {categories} from "../assets/categories";

const getTreeData = () => {
  const treeData = [
    {
      key: "women",
      label: "Women",
      children: categories.women.map((category) => ({
        key: `women/${category}`,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        url: `/women/${category}`,
      })),
    },
    {
      key: "men",
      label: "Men",
      children: categories.men.map((category) => ({
        key: `men/${category}`,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        url: `/men/${category}`,
      })),
    },
  ];
  return treeData;
};
