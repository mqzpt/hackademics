import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-radial-gradient"></div>
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-radial-gradient"></div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
