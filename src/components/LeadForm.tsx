"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/components/GoogleAnalytics";

export const LeadForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "AI Automation",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                // Track successful lead in GA4 / GTM
                trackEvent("generate_lead", {
                    event_category: "contact_form",
                    event_label: formData.service,
                    value: 1,
                });
                setFormData({ name: "", email: "", service: "AI Automation", message: "" });
            } else {
                setStatus("error");
                trackEvent("form_error", { event_category: "contact_form", event_label: "api_error" });
            }
        } catch (error) {
            setStatus("error");
            trackEvent("form_error", { event_category: "contact_form", event_label: "network_error" });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-card border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>

            <h3 className="text-2xl font-bold mb-6 text-white text-center">Let's Build Something</h3>

            {status === "success" ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-white font-bold text-lg">Message Sent!</p>
                    <p className="text-neutral-400 text-sm mt-2">My automation pipeline has forwarded this to my CRM. I'll be in touch shortly.</p>
                    <button onClick={() => setStatus("idle")} className="mt-8 text-primary text-sm hover:underline">Send another message</button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Your Name</label>
                        <input
                            required type="text"
                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Email Address</label>
                        <input
                            required type="email"
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Project Type</label>
                        <select
                            value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-white appearance-none"
                        >
                            <option>AI Automation & n8n</option>
                            <option>Full-Stack SaaS (Python/Next.js)</option>
                            <option>High-End E-Commerce</option>
                            <option>Custom WordPress / UI Design</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
                        <textarea
                            required rows={3}
                            value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-white resize-none"
                        ></textarea>
                    </div>
                    <button
                        type="submit" disabled={status === "loading"}
                        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition flex justify-center items-center"
                    >
                        {status === "loading" ? "Initializing Pipeline..." : "Send to Pipeline"}
                    </button>

                    {status === "error" && <p className="text-red-500 text-sm text-center mt-2">Error sending message. Please try again.</p>}
                </form>
            )}
        </div>
    );
};
