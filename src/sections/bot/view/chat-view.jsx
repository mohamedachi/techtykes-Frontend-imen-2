import { Route, Routes } from "react-router-dom";

// Ensure these imports match the exported component names
import './chat-bot.css';
// eslint-disable-next-line import/named
import { BotList } from "./botList";
// eslint-disable-next-line import/named
import { BotForm } from "./botForm";
// eslint-disable-next-line import/named
import { SharePage } from "./SharePage"


export default function BotView() {
    return (
        <div>
         
          <div className="container">
         <Routes>
  <Route path="/" element={<BotList />} />
  <Route path="/create-bot" element={<BotForm />} />
  <Route path="/edit-bot/:id" element={<BotForm />} />
  {/* Update this line */}
  
   <Route path="/share/:botId" element={<SharePage />} />
</Routes>
          </div>
        </div>
    );
}
