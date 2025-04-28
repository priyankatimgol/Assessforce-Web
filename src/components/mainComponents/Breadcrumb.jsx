import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { DASHBOARD, routesForHelmet } from '../../utils/enums/RoutesEnums';
import '../../styles/commonCSS.styles.css';

const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (path) => {
    const matchedRoute = routesForHelmet.find((route) => route.path === path);
    return matchedRoute ? matchedRoute.name : path;
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
      {/* Home link */}
      <Typography onClick={() => navigate(DASHBOARD)} color='text.secondary' className="breadcrumb-home">
        Home
      </Typography>

      {/* Dynamically render the rest of the breadcrumbs */}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography color="text.primary" key={to} className="breadcrumb-main">
            {getBreadcrumbName(to)}
          </Typography>
        ) : (
          <Link component={RouterLink} underline="hover" color="text.primary" to={to} key={to}>
            {getBreadcrumbName(to)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
