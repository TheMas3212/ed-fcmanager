import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { LinkProps, Link as RouterLink } from "react-router-dom";

interface NavListItemProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function NavListItem(props: NavListItemProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link(
        itemProps,
        ref,
      ) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default NavListItem;