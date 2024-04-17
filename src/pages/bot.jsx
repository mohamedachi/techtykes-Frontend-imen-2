import React from 'react';
import { Helmet } from 'react-helmet-async';

import { BotView } from 'src/sections/bot/view';
// ----------------------------------------------------------------------



export default function BotPage() {

  return (
    <>
      <Helmet>
        <title>Bots | Minimal UI</title>
      </Helmet>

      <BotView /> {/* Changed to PascalCase */}
    </>
  );
}
