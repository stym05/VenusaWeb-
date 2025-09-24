export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/*<div className="h-4 w-4 rounded-full bg-brand-white" />*/}
      <span className="tracking-[0.2em] h-6 font-heading font-regular text-black">VENUSA</span>
    </div>
  )
}
