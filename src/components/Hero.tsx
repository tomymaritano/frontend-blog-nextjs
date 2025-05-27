export default function Hero() {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden flex items-center justify-center text-center">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
      >
        <source src="/hackersvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Text */}
      <div className="relative z-10 px-4 max-w-3xl">
        <h1 className="text-sm md:text-base tracking-widest font-bold text-white uppercase drop-shadow mb-4">
          EXPLORE IDEAS, CODE & CREATIVITY
        </h1>
        <p className="text-base md:text-md text-gray-100 drop-shadow">
          I write about web development, product design, user experience, product engineering, and creative thinking — blending code and design to build better digital products.
        </p>
      </div>
    </section>
  );
}
