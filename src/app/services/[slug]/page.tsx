import { Navbar } from "@/components/Navbar";
import { servicesData } from "@/data/servicesData";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default function SingleServicePage({ params }: { params: { slug: string } }) {
    const service = servicesData.find((s) => s.slug === params.slug);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="mb-12">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 items-center justify-center mb-6">
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-primary text-sm font-bold tracking-wider uppercase mb-4 block">Service Area</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-8">{service.title}</h1>
                    <p className="text-xl text-neutral-400 mb-12 leading-relaxed">
                        {service.fullDescription}
                    </p>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-6">Key Capabilities</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-20">
                    {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-neutral-300 font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 text-center">
                    <h3 className="text-3xl font-bold mb-4">Need help with {service.title.split(' ')[0]}?</h3>
                    <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                        Let's discuss how we can implement this architecture for your business to drive growth and efficiency.
                    </p>
                    <a href="/contact" className="inline-block bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition">
                        Start a Project
                    </a>
                </div>
            </div>
        </>
    );
}

// Generate static params for 100% PageSpeed
export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.slug,
    }));
}
