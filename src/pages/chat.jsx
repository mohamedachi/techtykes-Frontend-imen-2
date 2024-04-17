import { Helmet } from 'react-helmet-async';

import { ChatView } from 'src/sections/chat';

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Helmet>
        <title> Chat | Minimal UI </title>
      </Helmet>

      <ChatView />
    </>
  );
}
