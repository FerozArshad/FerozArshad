import { WhatsAppIcon } from "./icons";
import { WHATSAPP_URL } from "@/lib/home-i18n";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="trans wa-float"
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 60,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25D366",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
      }}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
