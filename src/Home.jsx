import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Scene from "./Scene";
import FloatingParticles from "./FloatingParticles";


import { EffectComposer, Pixelation } from "@react-three/postprocessing";

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const mainRef = useRef(null);
    const sceneRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    //Utilisation d'un useEffect pour gérer le scroll et les animations associées.
    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                onUpdate: (self) => {
                    setProgress(self.progress);
                },
            },
        })
            .to(sceneRef.current, {
                ease: "none",
                x: "-25vw",
                y: "100vh",
            })
            .to(sceneRef.current, {
                ease: "none",
                x: "25vw",
                y: "200vh",
            })
            .to(sceneRef.current, {
                ease: "none",
                x: "-25vw",
                y: "300vh",
            });
    }, []);

    return (
        <main ref={mainRef} className="overflow-x-hidden">
            {/* Le Suspense me permet d'afficher un écran de chargement tant que la scène 3D n'est pas prête. */}
            <Suspense
                fallback={
                    <div className="fixed inset-0 grid place-items-center font-pixelify bg-black text-white">
                        Chargement...
                    </div>
                }
            >
                <section className="relative grid place-items-center h-[100vh]">
                    <p className="text-white text-center absolute top-[5%] mx-4 w-fit text-6xl font-pixelify">
                        Découvrez le dernier Yoyo Pixel
                    </p>
                    <p className="text-white text-center absolute bottom-[5%] mx-4 w-fit text-5xl font-pixelify">
                        Votre Appareil Photo Vintage
                    </p>

                    <div ref={sceneRef} className="h-[100vh] w-[100vw] text-white">
                        <Canvas>
                            <FloatingParticles />
                            <Scene progress={progress} />

                            <EffectComposer>
                                <Pixelation granularity={4.5} />
                            </EffectComposer>
                        </Canvas>
                    </div>
                </section>

                <section className="relative flex items-center justify-evenly h-[100vh]">
                    <p className="w-[50%] border-0 border-red-700"></p>
                    <p className="text-white w-[50%] text-center px-4 text-4xl font-pixelify">
                        Une ergonomie 100% rétro, pour des photos au style inimitable.

                    </p>
                </section>

                <section className="relative flex items-center justify-evenly h-[100vh]">
                    <p className="text-white order-1 w-[50%] text-center px-4 text-4xl font-pixelify">
                        Capturez le moment présent avec un charme d'antan pour figer à jamais vos souvenirs !
                    </p>
                    <p className="w-[50%] order-2"></p>
                </section>

                <section className="relative flex items-center justify-evenly h-[100vh]">
                    <p className="w-[50%] border-0 border-red-700"></p>
                    <p className="text-white w-[50%] text-center px-4 text-4xl font-pixelify">
                        Retour vers un passé que vous n'avez sûrement jamais connu, mais que vous allez adorer !
                    </p>

                    <button
                        onClick={() => navigate("/gallery")}
                        className="absolute bottom-10 bg-white text-black px-6 py-3 rounded-full font-pixelify hover:bg-gray-200 transition"
                    >
                        Voir la Galerie 📸
                    </button>
                </section>
            </Suspense>
        </main>
    );
}

export default Home;
