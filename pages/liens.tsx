import React from "react";
import navbar from './navbar.tsx';
import "app/globals.css";

export default function Liens() {

    return (
        <div>
            {navbar()}
            <h1>Liens</h1>
            <p>Voici quelques liens utiles pour la préparation de l&apos;épreuve :</p>
            <ul>
                <li><a href="https://www.youtube.com/watch?v=9oHqMEaLlPo">Link the sun, Introduction à la philosophie (pt1)</a></li>
                <li><a href="https://www.youtube.com/watch?v=E04Q5UdBNF8">Link the sun, Introduction à la philosophie (pt2)</a></li>
                <li><a href="https://www.youtube.com/watch?v=t3ZlSDal1bY">Link the sun, Anecdotes sur des philosophes</a></li>
                <li><a href="https://charles-de-gaulle-compiegne.ac-amiens.fr/matieres/philosophie/philoaccueilset.htm">Site de philo du lycée de Compiègne</a></li>
                <li><a href="http://philosophia.fr/contributions/frise-chronologique-interactive-des-philosophes-dans-lhistoire/">Frise chronologique interactive des philosophes dans l&apos;histoire (petites vidéos)</a></li>
                <li><a href="https://philo5.com/Les%20philosophes/LesPhilosophesChrono.htm">Frise avec description, pensée des philosophes et citations</a></li>
                <li><a href="https://www.tiktok.com/@lacrimosophia">Lacrimosophia, compte TikTok qui vulgarise la philosophie (merci Maxence)</a></li>
                <li><a href="https://open.spotify.com/show/7iK7Y2gFg5T1SqxplJqeJ2">Une chaine Spotify qui fait de très bons podcasts (merci Guillaume)</a></li>
            </ul>
        </div>
    )

}