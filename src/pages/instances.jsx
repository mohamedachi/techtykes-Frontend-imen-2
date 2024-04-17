import { Helmet } from 'react-helmet-async';

import { InstancesView } from 'src/sections/instances/view';

// ----------------------------------------------------------------------

export default function InstancesPage() {
  return (
    <>
      <Helmet>
        <title> Instances | Minimal UI </title>
      </Helmet>

      <InstancesView />
    </>
  );
}
