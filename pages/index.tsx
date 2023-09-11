import definition from '../app/data.json';
import style from 'app/style.module.css';
import { ReactNode } from 'react';
import Link from 'next/link';


enum word_type {
    notion,
    mot_cle,
    definition,
}

function definition_writer(word : string, definition: string, type: word_type){
    if (type == word_type.notion){
        return (
            <main>
                <div>
                    <p className={style.word}>{word}</p>
                </div>
            </main>
        )
    }
}

export default function definition_reader(){
    let notions = definition.notions;
    const notion_renderer : ReactNode = notions.map((notion) => {
        return (
            <div key={notion.word}>
                <p className={style.word}><span className={style.keyword}>{notion.word.toUpperCase()}</span> : <span className={style.definition}>{notion.definition}</span></p>
            </div>
        );
    });
    let mots_cles = definition.mot_cles;
    const keyword_renderer : ReactNode = mots_cles.map((mot_cle) => {
        return (
            <div key={mot_cle.word}>
                <p className={style.word}><span className={style.keyword}>{mot_cle.word.toUpperCase()}</span> : <span className={style.definition}>{mot_cle.definition}</span></p>
            </div>
        );
    });
    const citation_renderer : ReactNode = definition.citations.map((citation) => {
        return (
            <div key={citation.citation}>
                <p className={style.citation}><span className={style.citation}>{citation.citation}</span> — <span className={style.definition}>{citation.auteur}</span></p>
            </div>
        );
    });
    return (
        <div> 
            <nav>
                <Link  href="/methodologie"> Méthodologie </Link>
            </nav>
            <main className={style.main}>
                <h2>Définition de notions:</h2>
                {notion_renderer}
                <h2>Définition de mot clés:</h2>
                {keyword_renderer}
                <h2>Citations:</h2>
                {citation_renderer}
            </main>
        </div>
    )
}

;