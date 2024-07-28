/** @format */

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from '@mui/material/Link';
import { Breadcrumb } from "./types";
import { Link } from "react-router-dom";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

type BasicBreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
  updateBreadcrumbs: (index: number) => void;
};

//I need a function that removes all the breadcrumbs after the clicked one

export default function BasicBreadcrumbs({
  breadcrumbs,
  updateBreadcrumbs,
}: BasicBreadcrumbsProps) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          if (index === breadcrumbs.length - 1) {
            return (
              <Typography key={breadcrumb.href} color="textPrimary">
                {breadcrumb.name}
              </Typography>
            );
          }
          return (
            <Link
              key={breadcrumb.href}
              color="inherit"
              to={breadcrumb.href}
              onClick={() => {
                updateBreadcrumbs(index);
              }}
            >
              {breadcrumb.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
