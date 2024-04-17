import { Helmet } from 'react-helmet-async';

import { PlansView } from 'src/sections/plans/view';

// ----------------------------------------------------------------------

export default function PlansPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <PlansView />
    </>
  );
}
