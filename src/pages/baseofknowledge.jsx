import { Helmet } from 'react-helmet-async';

import { App } from 'src/sections/baseofknowledge/view';

// ----------------------------------------------------------------------

export default function BaseOfKnowledgePage() {
  return (
    <>
      <Helmet>
        <title> Base Of Knowledge | Minimal UI </title>
      </Helmet>

      <App />
    </>
  );
}
