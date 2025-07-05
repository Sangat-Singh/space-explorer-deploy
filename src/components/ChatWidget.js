import React, { useEffect, useState } from "react";
import "./ChatWidget.css"; // Optional styling

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBot = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button className="tarabot-button" onClick={toggleBot}>
        {isOpen ? "❌ Close TaraBot" : "💬 Talk to TaraBot"}
      </button>

      {isOpen && (
        <div className="tarabot-frame">
          <iframe
            title="TaraBot"
            src="https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/04/15/20250704150831-M1EE5B0J.json"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "12px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ChatWidget;
