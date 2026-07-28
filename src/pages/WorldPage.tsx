import { Navigate } from 'react-router-dom';

/**
 * /world index is intentionally not a primary hub.
 * Primary entry = home character select → /world/heritage | /world/new-series.
 * Keep route for old links/SEO, send users home (showcase lives under scroll unlock).
 */
const WorldPage = () => <Navigate to="/" replace />;

export default WorldPage;
