import { Helmet } from 'react-helmet-async';

import { InstanceView } from 'src/sections/instance';

// ----------------------------------------------------------------------

export default function InstancePage() {
  return (
    <>
      <Helmet>
        <title> Instance | Minimal UI </title>
      </Helmet>

      <InstanceView />
    </>
  );
}
