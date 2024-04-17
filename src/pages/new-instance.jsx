import { Helmet } from 'react-helmet-async';

import { NewInstanceView } from 'src/sections/new-instance';

// ----------------------------------------------------------------------

export default function InstancePage() {
  return (
    <>
      <Helmet>
        <title> New Instance | Minimal UI </title>
      </Helmet>

      <NewInstanceView />
    </>
  );
}
