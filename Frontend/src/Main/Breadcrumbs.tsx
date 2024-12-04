/** @format */

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import { Breadcrumb } from '../types';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
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
    <div role='presentation' onClick={handleClick}>
      <Breadcrumbs aria-label='breadcrumb'>
        {breadcrumbs.map((breadcrumb, index) => {
          if (index === breadcrumbs.length - 1) {
            return (
              <Button disabled key={breadcrumb.href} color='inherit'>
                {breadcrumb.name}
              </Button>
            );
          }
          return (
            <Link
              // component={Button}
              key={breadcrumb.href}
              color='inherit'
              //Stylize this with modern look
              // style={{ textDecoration: 'none' }}
              to={breadcrumb.href}
              onClick={() => {
                updateBreadcrumbs(index);
              }}>
              <Button>{breadcrumb.name}</Button>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
