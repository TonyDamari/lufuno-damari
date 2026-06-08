import { portfolioData } from "@/data/portfolio";

export function QuickInfoBar() {
  const { quickInfoItems } = portfolioData;

  return (
    <section className="py-16 lg:py-[120px] border-white/10 border-y">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="gap-6 grid grid-cols-2 md:grid-cols-4">
          {quickInfoItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/40 mx-auto mb-2 rounded-full w-1.5 h-1.5" />
              <p className="text-[#ededed]/80 text-base">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
