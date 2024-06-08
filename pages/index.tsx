import definition from '../app/data.json';
import '../app/globals.css';
import style from 'app/style.module.css';
import { ReactNode } from 'react';
import Link from 'next/link';

async function handleNotionSelection() {
    let elements = document.querySelectorAll('main > div');
    const notion_selector = document.getElementById('notion-select') as HTMLSelectElement;
    const notion_selector_value = notion_selector.value;
    elements.forEach(el => {
        let element = el as HTMLElement;
        let notionsMot = element.getAttribute('data-notion');
        element.style.display = 'none';
        notionsMot.split(',').forEach(notion => {
            if (notion === notion_selector_value) element.style.display = 'inherit';
        });
        if (notion_selector_value === 'none' || notion_selector_value === 'all'){
            element.style.display = 'inherit';
        }
    });
}
function getOnlyNotion(){
    let notions = [];
    for (let i = 0; i < definition.notions.length; i++) {
        notions.push(definition.notions[i].word);
    }
    return (
        <select name="notion" id="notion-select" onChange={handleNotionSelection}>
            <option value="none">Choisir une notion</option>
            <option value="all">Afficher tout</option>
            {notions.map((notion) => {
                return (
                    <option value={notion} key={notion}>{notion}</option>
                )
            })}
        </select>
    )
}
export default function definition_reader(){
    let notions = definition.notions;
    const notion_renderer : ReactNode = notions.map((notion) => {
        return (
            <div key={notion.word} data-notion={notion.word}>
                <p className={style.word}><span className={style.keyword}>{notion.word.toUpperCase()}</span> : <span className={style.definition}>{notion.definition.split(/\n/g).map((item)=>{
                    return (
                        <span key={item}>{item}<br /></span>
                    )
                })}</span></p>
            </div>
        );
    });
    let mots_cles = definition.mot_cles;
    const keyword_renderer : ReactNode = mots_cles.map((mot_cle) => {
        return (
            <div key={mot_cle.word} data-notion={mot_cle.notion}>
                <p className={style.word}><span className={style.keyword}>{mot_cle.word.toUpperCase()}</span> : <span className={style.definition}>{mot_cle.definition.split(/\n/g).map((item)=>{
                    return (
                        <span key={item}>{item}<br /></span>
                    )
                })}</span></p>
            </div>
        );
    });
    const citation_renderer : ReactNode = definition.citations.map((citation) => {
        if ("latin" in citation){
            return (
                <div key={citation.citation} data-notion={citation.notion}>
                    <p className={style.citation}>
                    <span className={style.latin}>«{citation.latin}»</span><br />
                    <span className={style.citation}>{citation.citation}</span><br /><span className={style.ouvrage}>  {citation.ouvrage}</span> — <span className={style.definition}>{citation.auteur}</span></p>
                </div>
            );
        }
        else {
            return (
                <div key={citation.citation} data-notion={citation.notion}>
                    <p className={style.citation}><span className={style.citation}>{citation.citation}</span><br /><span className={style.ouvrage}>  {citation.ouvrage}</span> — <span className={style.definition}>{citation.auteur}</span></p>
                </div>
            );
        }
    });
    return (
        <div> 
            <nav>
                <Link  href="/methodologie"> Méthodologie </Link>
            </nav>

            <br />
            {getOnlyNotion()}
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
