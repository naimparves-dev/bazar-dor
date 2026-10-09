import Image from "next/image";

const Hero = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    return (
        <section className="mx-auto max-w-7xl px-4 py-5">
            <div className="flex min-h-[228px] flex-col items-center justify-between gap-6 rounded-[22px] border border-[#dfe9e1] bg-[#f9fcf9] px-6 py-6 sm:px-8 md:flex-row md:px-12">
                {/* Left Content */}
                <div className="flex-1">
                    <span className="inline-block rounded-full bg-[#e0f2e7] px-3 py-1 text-xs font-medium text-[#078542]">
                        {date}
                    </span>

                    <h1 className="mt-3 text-2xl font-bold leading-tight text-[#202923] sm:text-3xl md:text-[32px]">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-4 max-w-[470px] text-sm leading-6 text-[#737c75]">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                        বিস্তারিত, দ্রুত, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <a
                        href="/products"
                        className="mt-5 inline-flex items-center justify-center rounded-md bg-[#07883f] px-5 py-2 text-sm font-semibold text-white shadow-[0_3px_0_#05682f] transition hover:bg-[#067535]"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                {/* Right Image */}
                <div className="flex shrink-0 items-center justify-center">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের বিভিন্ন পণ্য"
                        width={220}
                        height={180}
                        priority
                        className="h-auto w-[170px] object-contain sm:w-[200px] md:w-[220px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
